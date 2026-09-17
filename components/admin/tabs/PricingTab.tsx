"use client";

import React from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { SitePricingPlan } from "@/lib/types/content";

interface PricingTabProps {
  pricing: SitePricingPlan[];
  onUpdatePricing: (plans: SitePricingPlan[]) => void;
  editorLang?: "id" | "en";
  onSetEditorLang?: (lang: "id" | "en") => void;
}

// Helpers to handle bilingual or fallback string fields
function getBilingualText(
  val: string | { id?: string; en?: string } | undefined,
  lang: "id" | "en"
): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val[lang] ?? val.id ?? "";
}

function setBilingualText(
  val: string | { id?: string; en?: string } | undefined,
  newText: string,
  lang: "id" | "en"
): { id: string; en: string } {
  if (typeof val === "string") {
    return {
      id: lang === "id" ? newText : val,
      en: lang === "en" ? newText : "",
    };
  }
  return {
    id: lang === "id" ? newText : (val?.id || ""),
    en: lang === "en" ? newText : (val?.en || ""),
  };
}

function getBilingualFeatures(
  features: string[] | { id?: string[]; en?: string[] } | undefined,
  lang: "id" | "en"
): string[] {
  if (!features) return [];
  if (Array.isArray(features)) return features;
  return features[lang] ?? features.id ?? [];
}

function setBilingualFeatures(
  features: string[] | { id?: string[]; en?: string[] } | undefined,
  newLines: string[],
  lang: "id" | "en"
): { id: string[]; en: string[] } {
  if (Array.isArray(features)) {
    return {
      id: lang === "id" ? newLines : features,
      en: lang === "en" ? newLines : [],
    };
  }
  return {
    id: lang === "id" ? newLines : (features?.id || []),
    en: lang === "en" ? newLines : (features?.en || []),
  };
}

export function PricingTab({
  pricing = [],
  onUpdatePricing,
  editorLang = "id",
}: PricingTabProps) {
  const currentLang = editorLang;

  const handleUpdatePlan = (index: number, updatedFields: Partial<SitePricingPlan>) => {
    const next = pricing.map((plan, i) =>
      i === index ? { ...plan, ...updatedFields } : plan
    );
    onUpdatePricing(next);
  };

  const handleAddPlan = () => {
    const newPlan: SitePricingPlan = {
      id: `plan-${Date.now()}`,
      name: {
        id: "Paket Baru",
        en: "New Package",
      },
      badge: {
        id: "Promo",
        en: "Promo",
      },
      isPopular: false,
      target: {
        id: "Cocok untuk usaha baru atau promosi produk.",
        en: "Ideal for new businesses or product promotion.",
      },
      originalPrice: "Rp 1.500.000",
      discountBadge: {
        id: "Diskon",
        en: "Discount",
      },
      priceDisplay: "Rp 999.000",
      timeline: {
        id: "3–5 hari kerja",
        en: "3–5 business days",
      },
      description: {
        id: "Website modern dan cepat untuk bisnis Anda.",
        en: "Modern, high-performance website for your business.",
      },
      features: {
        id: [
          "1 Halaman Landing Page konversi tinggi",
          "Domain (.com) & Cloud Hosting 1 tahun",
          "Dashboard admin mandiri",
          "Garansi perbaikan bug 7 hari",
        ],
        en: [
          "1 High-converting landing page",
          "Domain (.com) & 1-Year Cloud Hosting",
          "Self-serve admin dashboard",
          "7-Day bug repair warranty",
        ],
      },
    };
    onUpdatePricing([...pricing, newPlan]);
  };

  const handleDeletePlan = (index: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus paket layanan ini?")) return;
    const next = pricing.filter((_, i) => i !== index);
    onUpdatePricing(next);
  };

  const handleMovePlan = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= pricing.length) return;
    const next = [...pricing];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    onUpdatePricing(next);
  };

  return (
    <div className="space-y-5">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-base font-bold text-[#092734]">
            Paket Layanan & Harga ({pricing.length} Paket)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Atur harga promo, diskon, estimasi timeline, checklist fitur (bilingual ID & EN), dan tandai paket rekomendasi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddPlan}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#004F72] hover:bg-[#092734] text-white text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Paket</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pricing.map((plan, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === pricing.length - 1;

          const planName = getBilingualText(plan.name, currentLang);
          const planBadge = getBilingualText(plan.badge, currentLang);
          const planTarget = getBilingualText(plan.target, currentLang);
          const planTimeline = getBilingualText(plan.timeline, currentLang);
          const planDescription = getBilingualText(plan.description, currentLang);
          const planFeatures = getBilingualFeatures(plan.features, currentLang);

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border p-5 shadow-2xs flex flex-col justify-between transition-all ${
                plan.isPopular
                  ? "border-[#004F72] ring-2 ring-[#004F72]/15"
                  : "border-slate-200"
              }`}
            >
              <div className="space-y-4">
                {/* Header Strip with Order & Action Buttons */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      Paket #{idx + 1}
                    </span>
                    {plan.isPopular && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#004F72]/10 text-[#004F72] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Rekomendasi</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={() => handleMovePlan(idx, "up")}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                      title="Geser paket ke kiri/atas"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={() => handleMovePlan(idx, "down")}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                      title="Geser paket ke kanan/bawah"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePlan(idx)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                      title="Hapus paket ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Name & Badge */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-600">Nama Paket</label>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {currentLang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={planName}
                      onChange={(e) =>
                        handleUpdatePlan(idx, {
                          name: setBilingualText(plan.name, e.target.value, currentLang),
                        })
                      }
                      placeholder={currentLang === "id" ? "Paket Promo Starter" : "Promo Starter Package"}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#092734] outline-none focus:border-[#004F72]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-600">Teks Badge / Diskon</label>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {currentLang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={planBadge}
                      onChange={(e) => {
                        const updatedBadge = setBilingualText(plan.badge, e.target.value, currentLang);
                        handleUpdatePlan(idx, {
                          badge: updatedBadge,
                          discountBadge: updatedBadge,
                        });
                      }}
                      placeholder={currentLang === "id" ? "Hemat 33%" : "Save 33%"}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72]"
                    />
                  </div>
                </div>

                {/* Popular / Recommended Toggle */}
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id={`popular-${plan.id}`}
                    checked={plan.isPopular || false}
                    onChange={(e) => handleUpdatePlan(idx, { isPopular: e.target.checked })}
                    className="w-4 h-4 rounded text-[#004F72] focus:ring-[#004F72] cursor-pointer"
                  />
                  <label
                    htmlFor={`popular-${plan.id}`}
                    className="text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    Tandai sebagai Paket Rekomendasi (Highlight Biru)
                  </label>
                </div>

                {/* Prices: Promo & Original */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">Harga Promo</label>
                    <input
                      type="text"
                      value={plan.priceDisplay}
                      onChange={(e) => handleUpdatePlan(idx, { priceDisplay: e.target.value })}
                      placeholder="Rp 999.000"
                      className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#004F72] outline-none focus:border-[#004F72]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">Harga Coret</label>
                    <input
                      type="text"
                      value={plan.originalPrice || ""}
                      onChange={(e) => handleUpdatePlan(idx, { originalPrice: e.target.value })}
                      placeholder="Rp 1.500.000"
                      className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-400 line-through outline-none focus:border-[#004F72]"
                    />
                  </div>
                </div>

                {/* Timeline & Target */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-600">Estimasi Timeline</label>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {currentLang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={planTimeline}
                    onChange={(e) =>
                      handleUpdatePlan(idx, {
                        timeline: setBilingualText(plan.timeline, e.target.value, currentLang),
                      })
                    }
                    placeholder={currentLang === "id" ? "3–5 hari kerja" : "3–5 business days"}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-600">Target Pengguna</label>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {currentLang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={planTarget}
                    onChange={(e) =>
                      handleUpdatePlan(idx, {
                        target: setBilingualText(plan.target, e.target.value, currentLang),
                      })
                    }
                    placeholder={currentLang === "id" ? "Cocok untuk UMKM pemula..." : "Ideal for startups..."}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-600">Deskripsi Singkat Paket</label>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {currentLang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={planDescription}
                    onChange={(e) =>
                      handleUpdatePlan(idx, {
                        description: setBilingualText(plan.description, e.target.value, currentLang),
                      })
                    }
                    placeholder={currentLang === "id" ? "Website 1 halaman konversi tinggi..." : "High-converting single-page website..."}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72] leading-relaxed"
                  />
                </div>

                {/* Features Checklist */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-600">
                      Checklist Fitur (1 baris per item)
                    </label>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {currentLang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={planFeatures.join("\n")}
                    onChange={(e) => {
                      const lines = e.target.value.split("\n").filter(Boolean);
                      handleUpdatePlan(idx, {
                        features: setBilingualFeatures(plan.features, lines, currentLang),
                      });
                    }}
                    placeholder="Fitur 1&#10;Fitur 2&#10;Fitur 3"
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed outline-none focus:border-[#004F72]"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    {planFeatures.length} fitur terdaftar ({currentLang.toUpperCase()})
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
