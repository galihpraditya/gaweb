"use client";

import React, { useState } from "react";
import { getWhatsAppUrl } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Check, Clock, ChevronDown, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

export function PricingSection() {
  const { t, language } = useLanguage();
  const { content } = useSiteContent();
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({});

  const dynamicPricing = content?.pricing;
  const whatsappNumber = content?.contact?.whatsappNumber;

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
    const tPlan = t.pricing.plans.find((p) => p.id === dp.id);
    const planName = getBilingualValue(dp.name, tPlan?.name || "Paket Website");
    const defaultWaMessage =
      language === "en"
        ? `Hello gaweb, I am interested in ordering the "${planName}" (${dp.priceDisplay}). Can we discuss the details?`
        : `Halo gaweb, saya tertarik memesan "${planName}" (${dp.priceDisplay}). Bisa info detailnya?`;

    return {
      id: dp.id,
      name: planName,
      badge: getBilingualValue(dp.badge, tPlan?.badge || ""),
      isPopular: typeof dp.isPopular === "boolean" ? dp.isPopular : (tPlan?.isPopular || false),
      target: getBilingualValue(dp.target, tPlan?.target || ""),
      originalPrice: dp.originalPrice || tPlan?.originalPrice || "",
      discountBadge: getBilingualValue(dp.discountBadge, tPlan?.discountBadge || ""),
      priceDisplay: dp.priceDisplay || tPlan?.priceDisplay || "",
      timeline: getBilingualValue(dp.timeline, tPlan?.timeline || ""),
      description: getBilingualValue(dp.description, tPlan?.description || ""),
      features: getBilingualFeaturesList(dp.features, tPlan?.features || []),
      waMessage: tPlan?.waMessage || defaultWaMessage,
    };
  });

  const toggleExpand = (planId: string) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  return (
    <section id="harga" className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan) => {
            const isExpanded = expandedPlans[plan.id];
            const visibleFeatures = isExpanded ? plan.features : plan.features.slice(0, 5);

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border flex flex-col transition-all duration-200 ${
                  plan.isPopular
                    ? "border-[#004F72] bg-white shadow-card ring-1 ring-[#004F72]/20"
                    : "border-slate-200 bg-white hover:border-slate-300 shadow-xs"
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                    <span
                      className={`text-xs font-bold px-3.5 py-0.5 rounded-full border shadow-2xs flex items-center gap-1.5 ${
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

                <div className="p-6 sm:p-7 space-y-5 flex-1">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[#092734]">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {plan.target}
                    </p>
                  </div>

                  {/* Price Block with Discount */}
                  <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/80 shadow-2xs space-y-1">
                    {plan.originalPrice && (
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs sm:text-sm text-slate-400 line-through font-semibold">
                          {plan.originalPrice}
                        </span>
                        {plan.discountBadge && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200/80">
                            {plan.discountBadge}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#092734]">
                      {plan.priceDisplay}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{t.pricing.timelinePrefix} {plan.timeline}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-1">
                    <div className="text-xs font-bold text-[#092734] uppercase tracking-wider">
                      {t.pricing.featuresLabel}
                    </div>
                    <ul className="space-y-2">
                      {visibleFeatures.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-snug"
                        >
                          <Check className="w-4 h-4 text-[#004F72] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expand/Collapse Toggle Button */}
                    {plan.features.length > 5 && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(plan.id)}
                        className="pt-1.5 text-xs font-bold text-[#004F72] hover:underline flex items-center gap-1 cursor-pointer focus:outline-none"
                      >
                        <span>
                          {isExpanded
                            ? t.pricing.viewLess
                            : t.pricing.viewAll(plan.features.length)}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="p-6 sm:p-7 pt-0">
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
                      ? "Fast response • Directly connected to WhatsApp"
                      : "Respon cepat • Langsung terhubung WhatsApp"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Request Banner */}
        <div className="mt-10 max-w-3xl mx-auto bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="text-slate-600 font-medium text-center sm:text-left">
            {language === "en"
              ? "Need custom features or specific integrations outside standard packages?"
              : "Butuh fitur custom atau integrasi khusus di luar paket standar?"}
          </span>
          <a
            href={getWhatsAppUrl(
              language === "en"
                ? "Hello gaweb, I would like to inquire about custom website features outside standard packages."
                : "Halo gaweb, saya ingin tanya kebutuhan custom website di luar paket standar.",
              whatsappNumber
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#004F72] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            {language === "en" ? "Consult via WhatsApp →" : "Konsultasi via WhatsApp →"}
          </a>
        </div>
      </div>
    </section>
  );
}
