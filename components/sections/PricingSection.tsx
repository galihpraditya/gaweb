"use client";

import React, { useState } from "react";
import { getWhatsAppUrl } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Check, Clock, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { formatDiscountBadge } from "@/lib/price-utils";

export function PricingSection() {
  const { t, language } = useLanguage();
  const { content } = useSiteContent();

  const dynamicPricing = content?.pricing;
  const whatsappNumber = content?.contact?.whatsappNumber;

  // Track expanded state per card
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({});

  const togglePlanExpand = (planId: string) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  const getBilingualValue = (val: any, fallback = ""): string => {
    if (!val) return fallback;
    if (typeof val === "string") return val;
    return val[language] || val.id || val.en || fallback;
  };

  const getBilingualFeaturesList = (val: any, fallback: string[] = []): string[] => {
    if (!val) return fallback;
    if (Array.isArray(val)) return val;
    return val[language] || val.id || val.en || fallback;
  };

  // Render from content.pricing if available, merging with translation text
  const plans = (dynamicPricing && dynamicPricing.length > 0 ? dynamicPricing : t.pricing.plans).map((dp) => {
    const tPlan = t.pricing.plans.find(
      (p) =>
        p.id === dp.id ||
        (p.id === "travel" && dp.id === "custom-plus") ||
        (p.id === "custom-plus" && dp.id === "travel")
    );
    const planName = getBilingualValue(dp.name, tPlan?.name || "Paket Website");
    const originalPrice = dp.originalPrice || tPlan?.originalPrice || "";
    const priceDisplay = dp.priceDisplay || tPlan?.priceDisplay || "";

    const defaultWaMessage =
      language === "en"
        ? `Hello gaweb, I am interested in ordering the "${planName}" (${priceDisplay}). Can we discuss the details?`
        : `Halo gaweb, saya tertarik memesan "${planName}" (${priceDisplay}). Bisa info detailnya?`;

    // Otomatisasi perhitungan diskon dari harga coret dan harga promo
    const rawDiscountBadge = getBilingualValue(dp.discountBadge, tPlan?.discountBadge || "");
    const computedDiscount = formatDiscountBadge(
      originalPrice,
      priceDisplay,
      language,
      rawDiscountBadge
    );

    // Hindari redundansi jika badge atas berisi diskon yang sama dengan badge merah
    let topBadge = getBilingualValue(dp.badge, tPlan?.badge || "");
    if (
      topBadge &&
      computedDiscount &&
      (topBadge.toLowerCase().includes("hemat") || topBadge.toLowerCase().includes("save"))
    ) {
      topBadge = "";
    }

    return {
      id: dp.id,
      name: planName,
      badge: topBadge,
      isPopular: typeof dp.isPopular === "boolean" ? dp.isPopular : (tPlan?.isPopular || false),
      target: getBilingualValue(dp.target, tPlan?.target || ""),
      originalPrice,
      discountBadge: computedDiscount,
      priceDisplay,
      timeline: getBilingualValue(dp.timeline, tPlan?.timeline || ""),
      description: getBilingualValue(dp.description, tPlan?.description || ""),
      features: getBilingualFeaturesList(dp.features, tPlan?.features || []),
      waMessage: tPlan?.waMessage || defaultWaMessage,
    };
  });

  const renderPrice = (priceStr: string) => {
    const trimmed = priceStr.trim();
    if (trimmed.startsWith("Rp") || trimmed.startsWith("rp")) {
      const amount = trimmed.slice(2).trim();
      return (
        <div className="flex items-baseline gap-1">
          <span className="text-sm sm:text-base font-bold text-slate-500">Rp</span>
          <span className="text-3xl sm:text-4xl font-extrabold text-[#092734] tracking-tight">{amount}</span>
        </div>
      );
    }
    return (
      <div className="text-3xl sm:text-4xl font-extrabold text-[#092734] tracking-tight">
        {priceStr}
      </div>
    );
  };

  const getGridClasses = (count: number) => {
    switch (count) {
      case 1:
        return "max-w-md mx-auto grid grid-cols-1 gap-6 items-stretch";
      case 2:
        return "max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch";
      case 3:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch";
      case 4:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch";
      case 5:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 items-stretch";
      case 6:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 items-stretch";
    }
  };

  const getCardColClass = (count: number, index: number) => {
    if (count === 5) {
      if (index === 3) {
        return "sm:col-span-1 lg:col-span-2 lg:col-start-2";
      }
      if (index === 4) {
        return "sm:col-span-2 sm:max-w-md sm:mx-auto lg:max-w-none lg:mx-0 lg:col-span-2";
      }
      return "sm:col-span-1 lg:col-span-2";
    }
    return "";
  };

  const cardPadding = plans.length >= 4 ? "p-5 sm:p-6 lg:p-5 xl:p-6" : "p-5 sm:p-6";

  return (
    <section id="harga" className="py-20 lg:py-24 bg-white relative">
      <div className={`${plans.length === 4 ? "max-w-7xl" : "max-w-6xl"} mx-auto px-4 sm:px-6 lg:px-8`}>
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-[36px] lg:text-[40px] font-extrabold text-[#092734] tracking-tight leading-snug">
            {t.pricing.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className={getGridClasses(plans.length)}>
          {plans.map((plan, planIdx) => {
            const isExpanded = !!expandedPlans[plan.id];
            const maxInitialFeatures = 4;
            const visibleFeatures = isExpanded
              ? plan.features
              : plan.features.slice(0, maxInitialFeatures);
            const hiddenCount = plan.features.length - maxInitialFeatures;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border flex flex-col justify-between transition-all duration-200 ${getCardColClass(
                  plans.length,
                  planIdx
                )} ${
                  plan.isPopular
                    ? "border-[#004F72] bg-white shadow-md ring-1 ring-[#004F72]/20 lg:-translate-y-1.5"
                    : "border-slate-200 bg-white hover:border-slate-300 shadow-xs"
                }`}
              >
                {/* Top Status Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                    <span
                      className={`text-xs font-bold px-3 py-0.5 rounded-full border shadow-2xs flex items-center gap-1.5 ${
                        plan.isPopular
                          ? "bg-[#004F72] text-white border-[#003d59]"
                          : "bg-slate-900 text-white border-slate-800"
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                <div className={`${cardPadding} space-y-4 flex-1 flex flex-col`}>
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[#092734] tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
                      {plan.target}
                    </p>
                  </div>

                  {/* Price Block with Auto-Calculated Discount Badge */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs space-y-1.5">
                    {plan.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm text-slate-400 line-through font-semibold">
                          {plan.originalPrice}
                        </span>
                        {plan.discountBadge && (
                          <span className="inline-flex items-center text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200/90 shadow-2xs">
                            {plan.discountBadge}
                          </span>
                        )}
                      </div>
                    )}

                    {renderPrice(plan.priceDisplay)}

                    <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{t.pricing.timelinePrefix} {plan.timeline}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {plan.description}
                  </p>

                  {/* Clean Features Checklist with Collapsible Extension */}
                  <div className="space-y-2.5 pt-1 flex-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {t.pricing.featuresLabel}
                    </div>
                    <ul className="space-y-2">
                      {visibleFeatures.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-snug"
                        >
                          <Check className="w-4 h-4 text-[#004F72] shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {hiddenCount > 0 && (
                      <button
                        type="button"
                        onClick={() => togglePlanExpand(plan.id)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#004F72] hover:text-[#092734] transition-colors py-1 cursor-pointer select-none group"
                        aria-expanded={isExpanded}
                      >
                        <span>
                          {isExpanded
                            ? (t.pricing.viewLess || (language === "en" ? "Show less" : "Sembunyikan"))
                            : (typeof t.pricing.viewAll === "function"
                                ? t.pricing.viewAll(hiddenCount)
                                : `+ ${hiddenCount} ${language === "en" ? "more features" : "fitur lainnya"}`)}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className={`${cardPadding} pt-0 mt-auto`}>
                  <a
                    href={getWhatsAppUrl(plan.waMessage, whatsappNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant={plan.isPopular ? "primary" : "outline"}
                      size="lg"
                      className="w-full gap-2 font-bold text-sm sm:text-base shadow-2xs"
                    >
                      <span>{t.pricing.ctaButton}</span>
                    </Button>
                  </a>
                  <p className="text-[11px] text-center text-slate-500 mt-2">
                    {language === "en"
                      ? "Directly connected to WhatsApp"
                      : "Langsung terhubung ke WhatsApp"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Request Banner */}
        <div className="mt-12 max-w-3xl mx-auto bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#004F72] shadow-2xs hidden sm:flex">
              <Sparkles className="w-4 h-4 text-[#004F72]" />
            </div>
            <span className="text-slate-700 font-medium leading-relaxed">
              {language === "en"
                ? "Need custom features or dynamic setups outside standard packages?"
                : "Punya kebutuhan website dengan fitur khusus di luar paket standar?"}
            </span>
          </div>
          <a
            href={getWhatsAppUrl(
              language === "en"
                ? "Hello gaweb, I would like to inquire about custom website features outside standard packages."
                : "Halo gaweb, saya ingin tanya kebutuhan custom website di luar paket standar.",
              whatsappNumber
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-[#004F72] hover:text-[#092734] transition-colors whitespace-nowrap shrink-0 py-2 px-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
          >
            <span>{language === "en" ? "Consult via WhatsApp →" : "Konsultasi via WhatsApp →"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
