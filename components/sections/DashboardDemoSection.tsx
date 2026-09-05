"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  RefreshCw,
  Check,
  Wand2,
  Upload,
  ImageIcon,
  EyeOff,
  MessageCircle,
  Sparkles,
  Store,
  Smartphone,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PRESET_IMAGES = [
  {
    id: "kopi",
    labelId: "Kopi",
    labelEn: "Coffee",
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&h=420&fit=crop&q=80",
  },
  {
    id: "wisata",
    labelId: "Wisata",
    labelEn: "Travel",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=700&h=420&fit=crop&q=80",
  },
  {
    id: "produk",
    labelId: "Produk",
    labelEn: "Retail",
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=420&fit=crop&q=80",
  },
];

export function DashboardDemoSection() {
  const { t, language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [headline, setHeadline] = useState(
    language === "en" ? "Special Coffee & Mountain Tour Promo" : "Promo Wisata Bromo & Kopi Nusantara"
  );
  const [price, setPrice] = useState(language === "en" ? "$25.00" : "Rp 350.000");
  const [isLive, setIsLive] = useState(true);
  const [image, setImage] = useState(PRESET_IMAGES[1].url);

  const [savedHeadline, setSavedHeadline] = useState(headline);
  const [savedPrice, setSavedPrice] = useState(price);
  const [savedIsLive, setSavedIsLive] = useState(true);
  const [savedImage, setSavedImage] = useState(PRESET_IMAGES[1].url);

  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (t.dashboard.presets && t.dashboard.presets.length > 0) {
      const defaultPreset = t.dashboard.presets[0];
      setHeadline(defaultPreset.headline);
      setPrice(defaultPreset.price);
      setSavedHeadline(defaultPreset.headline);
      setSavedPrice(defaultPreset.price);
    }
  }, [language]);

  const applyPreset = (p: { label: string; headline: string; price: string }, idx: number) => {
    setHeadline(p.headline);
    setPrice(p.price);
    if (PRESET_IMAGES[idx]) {
      setImage(PRESET_IMAGES[idx].url);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setSavedHeadline(headline);
      setSavedPrice(price);
      setSavedIsLive(isLive);
      setSavedImage(image);
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4500);
    }, 350);
  };

  return (
    <section id="demo" className="py-16 sm:py-20 lg:py-24 bg-[#F9F9F9] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-[36px] lg:text-[40px] font-extrabold text-[#092734] tracking-tight leading-snug">
            {t.dashboard.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            {t.dashboard.subtitle}
          </p>
        </div>

        {/* Live Interactive Simulator Box */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
          {/* Top Browser Chrome Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-100 bg-slate-50/80">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3.5 py-0.5 rounded-full shadow-2xs truncate max-w-[180px] sm:max-w-xs">
              {language === "en" ? "yourbrand.com/admin" : "usahakamu.com/admin"}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-emerald-700 flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden xs:inline">{language === "en" ? "Live Simulator Demo" : "Simulasi Live Demo"}</span>
              <span className="xs:hidden">Demo</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-0 items-stretch">
            {/* Left: Interactive Input Form (6 cols) */}
            <form onSubmit={handleSave} className="lg:col-span-6 p-5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5 bg-white flex flex-col justify-between">
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-[#092734] flex items-center gap-2">
                    <span>{t.dashboard.panelEdit}</span>
                    <span className="text-[10px] text-[#004F72] font-bold bg-[#004F72]/10 border border-[#004F72]/20 px-2 py-0.5 rounded-full">
                      {t.dashboard.typingPrompt}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{t.dashboard.autoFormat}</span>
                </div>

                {/* Quick Preset Buttons (1-Click Sample) */}
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                    <Wand2 className="w-3.5 h-3.5 text-[#004F72]" />
                    <span>{t.dashboard.presetsLabel}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.dashboard.presets.map((p, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => applyPreset(p, pIdx)}
                        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#004F72]/50 hover:bg-[#004F72]/5 text-slate-700 hover:text-[#004F72] transition-all shadow-2xs active:scale-95 cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3.5">
                  {/* Headline Input */}
                  <div>
                    <label className="text-xs font-bold text-[#092734] block mb-1.5">
                      {t.dashboard.headlineLabel}
                    </label>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-[#004F72] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004F72]/20 transition-all shadow-2xs"
                    />
                  </div>

                  {/* Price & Interactive Live Status */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#092734] block mb-1.5">
                        {t.dashboard.priceLabel}
                      </label>
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#004F72] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#004F72] focus:outline-none focus:ring-2 focus:ring-[#004F72]/20 transition-all shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#092734] block mb-1.5 flex items-center justify-between">
                        <span>{t.dashboard.statusLabel}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {language === "en" ? "Click to toggle" : "Klik utk ganti"}
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsLive(!isLive)}
                        className={`w-full rounded-xl px-3 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border shadow-2xs ${
                          isLive
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                            : "bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200"
                        }`}
                        title={language === "en" ? "Toggle Live/Draft" : "Ubah status Siap Tayang / Draft"}
                      >
                        {isLive ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="truncate">{t.dashboard.readyLabel}</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4 text-slate-500 shrink-0" />
                            <span className="truncate">{t.dashboard.draftLabel}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Option to Change / Upload Image */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#092734] flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-[#004F72]" />
                        <span>{language === "en" ? "Change Photo" : "Opsi Ganti Foto"}</span>
                      </label>
                      <span className="text-[10px] text-[#004F72] font-semibold">
                        {language === "en" ? "Preset / Upload" : "Pilih Preset / Upload"}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {PRESET_IMAGES.map((preset) => {
                        const isSelected = image === preset.url;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => setImage(preset.url)}
                            className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                              isSelected
                                ? "border-[#004F72] ring-2 ring-[#004F72]/20 shadow-xs"
                                : "border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={language === "en" ? preset.labelEn : preset.labelId}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1">
                              <span className="text-[10px] font-bold text-white truncate">
                                {language === "en" ? preset.labelEn : preset.labelId}
                              </span>
                            </div>
                            {isSelected && (
                              <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#004F72] text-white flex items-center justify-center shadow-xs">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}
                          </button>
                        );
                      })}

                      {/* Custom Upload Button */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="relative aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 hover:border-[#004F72] bg-slate-50 hover:bg-[#004F72]/5 transition-all flex flex-col items-center justify-center p-1 cursor-pointer group text-slate-600 hover:text-[#004F72]"
                        title={language === "en" ? "Upload from device" : "Upload foto dari HP / laptop"}
                      >
                        <Upload className="w-4 h-4 mb-0.5 text-slate-400 group-hover:text-[#004F72] transition-colors" />
                        <span className="text-[9px] font-bold text-center leading-tight">
                          {language === "en" ? "Upload" : "Upload"}
                        </span>
                      </button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="admin-image-upload"
                    />

                    <div className="text-[11px] text-slate-500 leading-snug pt-0.5">
                      {t.dashboard.uploadSub}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-[#004F72] hover:bg-[#092734] text-white text-sm font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-[#004F72]/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{t.dashboard.savingButton}</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.dashboard.saveButton}</span>
                    </>
                  )}
                </button>

                {/* Toast Feedback */}
                {showToast && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t.dashboard.toastSuccess}</span>
                  </div>
                )}
              </div>
            </form>

            {/* Right: Live Preview Result (6 cols) - Realistic Website Mockup */}
            <div className="lg:col-span-6 bg-slate-50/70 border-t lg:border-t-0 lg:border-l border-slate-200/80 p-5 sm:p-7 lg:p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3.5">
                {/* Header title */}
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-[#092734]">
                    {t.dashboard.panelPreview}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/90 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t.dashboard.realTimeTag}
                  </span>
                </div>

                {/* Realistic Website Mockup Container */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  {/* Mockup Mini Navbar */}
                  <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#092734]">
                      <Store className="w-3.5 h-3.5 text-[#004F72]" />
                      <span>{language === "en" ? "YourBrand Studio" : "Brand Usaha Kamu"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      <span>Menu</span>
                      <span>•</span>
                      <span>Promo</span>
                      <span>•</span>
                      <span className="text-[#004F72] font-semibold">Kontak</span>
                    </div>
                  </div>

                  {/* Photo Display with Status Badges (No Duplicate Title) */}
                  <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
                    <img
                      src={savedImage}
                      alt="Preview showcase"
                      className="w-full h-full object-cover photo-natural transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {savedIsLive ? (
                        <span className="text-[10px] font-extrabold bg-emerald-600/95 backdrop-blur-xs text-white px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>{t.dashboard.readyLabel}</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-extrabold bg-slate-800/95 backdrop-blur-xs text-white px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                          <EyeOff className="w-3 h-3 text-slate-300" />
                          <span>{t.dashboard.draftLabel}</span>
                        </span>
                      )}

                      <span className="text-[10px] font-bold bg-[#004F72]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Featured</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Strip (Headline, Price, & Action Button) */}
                  <div className="p-4 sm:p-5 space-y-3 bg-white">
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#092734] leading-snug">
                        {savedHeadline}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {language === "en"
                          ? "Available for instant reservation & online order."
                          : "Tersedia untuk reservasi & pemesanan online sekarang."}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400">
                          {t.dashboard.specialPricePrefix}
                        </div>
                        <div className="text-lg sm:text-xl font-extrabold text-[#004F72]">
                          {savedPrice}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="px-4 py-2.5 bg-[#004F72] hover:bg-[#092734] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                        <span>{t.dashboard.orderBtn}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Reassurance Feature Card (Fills empty vertical whitespace nicely) */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2 text-xs text-slate-600 mt-2">
                <div className="font-bold text-[#092734] flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#004F72]" />
                  <span>{language === "en" ? "Ultra-Fast Client Advantage" : "Keunggulan Dashboard Klien"}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                  {t.dashboard.syncNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
