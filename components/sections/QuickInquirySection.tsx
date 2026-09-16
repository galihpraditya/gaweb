"use client";

import React, { useState } from "react";
import { getWhatsAppUrl } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MessageCircle, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function QuickInquirySection() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    selectedPackage: "bisnis",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const packageNames: Record<string, string> = {
      starter: language === "en" ? "Starter Plan (Landing Page)" : "Promo Starter (Landing Page Rp 999.000)",
      bisnis: language === "en" ? "Business Plan (Company Profile)" : "Promo Bisnis (Company Profile Rp 1.999.000)",
      travel: language === "en" ? "Custom Plus Plan (Catalog & Features)" : "Promo Custom Plus (Katalog & Fitur Rp 2.800.000)",
      custom_plus: language === "en" ? "Custom Plus Plan (Catalog & Features)" : "Promo Custom Plus (Katalog & Fitur Rp 2.800.000)",
      custom: language === "en" ? "Custom Project Consultation" : "Kebutuhan Custom Khusus",
    };

    const prefix = language === "en" 
      ? "Hello admin! I would like to inquire about building a custom website:\n\n"
      : "Halo admin! Saya ingin tanya pembuatan website custom:\n\n";

    const nameLine = language === "en" ? `Name: ${formData.name || "-"}` : `Nama: ${formData.name || "-"}`;
    const businessLine = language === "en" ? `Business Name: ${formData.businessName || "-"}` : `Nama Usaha: ${formData.businessName || "-"}`;
    const packageLine = language === "en" ? `Interested Package: ${packageNames[formData.selectedPackage] || formData.selectedPackage}` : `Paket Diminati: ${packageNames[formData.selectedPackage] || formData.selectedPackage}`;
    const notesLine = formData.notes ? (language === "en" ? `\nNotes: ${formData.notes}` : `\nCatatan: ${formData.notes}`) : "";

    const message = `${prefix}${nameLine}\n${businessLine}\n${packageLine}${notesLine}`;

    window.open(getWhatsAppUrl(message), "_blank");
  };

  return (
    <section className="py-20 lg:py-24 bg-[#F9F9F9] relative border-t border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-[36px] lg:text-[40px] font-extrabold text-[#092734] tracking-tight leading-snug">
            {t.inquiry.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.inquiry.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#092734] mb-1.5">
                  {t.inquiry.nameLabel} <span className="text-[#004F72]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.inquiry.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-slate-300 focus:border-[#004F72] rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004F72]/20 transition-all shadow-2xs"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#092734] mb-1.5">
                  {t.inquiry.businessLabel} <span className="text-[#004F72]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.inquiry.businessPlaceholder}
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-white border border-slate-300 focus:border-[#004F72] rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004F72]/20 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#092734] mb-1.5">
                {t.inquiry.packageLabel}
              </label>
              <select
                value={formData.selectedPackage}
                onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                className="w-full bg-white border border-slate-300 focus:border-[#004F72] rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004F72]/20 transition-all shadow-2xs"
              >
                {t.inquiry.packageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#092734] mb-1.5">
                {t.inquiry.notesLabel}
              </label>
              <textarea
                rows={2}
                placeholder={t.inquiry.notesPlaceholder}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white border border-slate-300 focus:border-[#004F72] rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004F72]/20 transition-all shadow-2xs resize-none"
              />
            </div>

            {/* Reassurance Banner */}
            <div className="p-3 bg-[#004F72]/5 border border-[#004F72]/20 rounded-xl flex items-start gap-2.5 text-xs text-[#004F72]">
              <Sparkles className="w-4 h-4 text-[#004F72] shrink-0 mt-0.5" />
              <span>
                <strong>{language === "en" ? "Don't have a logo or photos yet?" : "Belum punya logo atau foto?"}</strong>{" "}
                {language === "en" 
                  ? "No worries, we are ready to assist and guide you from the start." 
                  : "Tenang saja, kami siap bantu siapkan dan arahkan dari awal."}
              </span>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full gap-2.5 py-3.5 text-base font-bold shadow-sm">
              <MessageCircle className="w-5 h-5 text-emerald-300" />
              <span>{t.inquiry.submitButton}</span>
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />{" "}
                {language === "en" ? "No Hidden Fees" : "Tanpa Biaya Tersembunyi"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#004F72]" />{" "}
                {language === "en" ? "Fast Response < 2 Hours" : "Respon Cepat < 2 Jam"}
              </span>
              <span>• {language === "en" ? "No Purchase Obligation" : "Tanpa Komitmen Pembelian"}</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
