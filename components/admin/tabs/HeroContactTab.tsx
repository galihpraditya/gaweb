"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  ExternalLink,
  ImageIcon,
  Sparkles,
  PhoneCall,
  Mail,
  Instagram,
  MapPin,
} from "lucide-react";
import { SiteContentSchema } from "@/lib/types/content";
import { MediaPickerModal } from "../modals/MediaPickerModal";
import { getWhatsAppUrl } from "@/lib/constants";

interface HeroContactTabProps {
  hero: SiteContentSchema["hero"];
  contact: SiteContentSchema["contact"];
  mediaLibrary: SiteContentSchema["mediaLibrary"];
  onUpdateHero: (updater: (prev: SiteContentSchema["hero"]) => SiteContentSchema["hero"]) => void;
  onUpdateContact: (updater: (prev: SiteContentSchema["contact"]) => SiteContentSchema["contact"]) => void;
  editorLang: "id" | "en";
}

export function HeroContactTab({
  hero,
  contact,
  mediaLibrary = [],
  onUpdateHero,
  onUpdateContact,
  editorLang,
}: HeroContactTabProps) {
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // Safe fallbacks
  const h1PreText = hero?.h1Pre?.[editorLang] ?? hero?.h1Pre?.id ?? "";
  const h1HighlightText = hero?.h1Highlight?.[editorLang] ?? hero?.h1Highlight?.id ?? "";
  const h1PostText = hero?.h1Post?.[editorLang] ?? hero?.h1Post?.id ?? "";
  const subtitleText = hero?.subtitle?.[editorLang] ?? hero?.subtitle?.id ?? "";
  const ctaPrimaryText = hero?.ctaPrimary?.[editorLang] ?? hero?.ctaPrimary?.id ?? "";
  const ctaSecondaryText = hero?.ctaSecondary?.[editorLang] ?? hero?.ctaSecondary?.id ?? "";

  const handleUpdateBilingualHero = (
    field: "h1Pre" | "h1Highlight" | "h1Post" | "subtitle" | "ctaPrimary" | "ctaSecondary",
    value: string
  ) => {
    onUpdateHero((prev) => ({
      ...prev,
      [field]: {
        id: prev[field]?.id ?? "",
        en: prev[field]?.en ?? "",
        [editorLang]: value,
      },
    }));
  };

  const testWaUrl = getWhatsAppUrl(
    "Halo admin gaweb, ini adalah tes pesan otomatis dari panel admin.",
    contact?.whatsappNumber
  );

  return (
    <div className="space-y-6">
      {/* 1. HERO SECTION SETTINGS */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#092734]">
              Header Utama (Hero Section)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Headline, sorotan warna, deskripsi, dan tombol CTA yang pertama kali dilihat pengunjung.
            </p>
          </div>
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-[#004F72]/10 text-[#004F72] border border-[#004F72]/20">
            Bahasa Editor: {editorLang === "id" ? "🇮🇩 Indonesia" : "🇬🇧 English"}
          </span>
        </div>

        {/* H1 Row (Pre + Highlight + Post) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Teks Awalan H1</label>
            <input
              type="text"
              value={h1PreText}
              onChange={(e) => handleUpdateBilingualHero("h1Pre", e.target.value)}
              placeholder="Contoh: Bikin Website Modern yang"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#004F72]">
              Teks Sorotan (Warna Biru / Highlight)
            </label>
            <input
              type="text"
              value={h1HighlightText}
              onChange={(e) => handleUpdateBilingualHero("h1Highlight", e.target.value)}
              placeholder="Contoh:  Gampang Dikelola"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-[#004F72] focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Teks Akhiran H1</label>
            <input
              type="text"
              value={h1PostText}
              onChange={(e) => handleUpdateBilingualHero("h1Post", e.target.value)}
              placeholder="Contoh:  Sendiri"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
            />
          </div>
        </div>

        {/* Subtitle */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Subjudul Deskripsi</label>
          <textarea
            rows={3}
            value={subtitleText}
            onChange={(e) => handleUpdateBilingualHero("subtitle", e.target.value)}
            placeholder="Deskripsi singkat value proposition..."
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none leading-relaxed"
          />
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Teks Tombol CTA Utama (WhatsApp)</label>
            <input
              type="text"
              value={ctaPrimaryText}
              onChange={(e) => handleUpdateBilingualHero("ctaPrimary", e.target.value)}
              placeholder="Chat WhatsApp Sekarang"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Teks Tombol CTA Sekunder (Harga)</label>
            <input
              type="text"
              value={ctaSecondaryText}
              onChange={(e) => handleUpdateBilingualHero("ctaSecondary", e.target.value)}
              placeholder="Lihat Portofolio & Harga"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
            />
          </div>
        </div>

        {/* Hero Background Image */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">URL Background Hero</label>
            <button
              type="button"
              onClick={() => setIsMediaPickerOpen(true)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#004F72] hover:underline cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Pilih dari Pustaka Media</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={hero?.bgImageUrl || ""}
              onChange={(e) =>
                onUpdateHero((prev) => ({ ...prev, bgImageUrl: e.target.value }))
              }
              placeholder="/images/... atau https://..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
            />
            {hero?.bgImageUrl && (
              <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                <Image
                  src={hero.bgImageUrl}
                  alt="Hero preview"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. CONTACT SETTINGS */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#092734]">
              Kontak Resmi & Integrasi WhatsApp
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Nomor WhatsApp dan saluran kontak yang digunakan di seluruh tombol website.
            </p>
          </div>
          <a
            href={testWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
            title="Buka WhatsApp untuk menguji nomor ini"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tes WhatsApp</span>
            <ExternalLink className="w-3 h-3 text-emerald-600" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nomor WhatsApp Resmi (Awali 62 tanpa +)</span>
            </label>
            <input
              type="text"
              value={contact?.whatsappNumber || ""}
              onChange={(e) =>
                onUpdateContact((prev) => ({
                  ...prev,
                  whatsappNumber: e.target.value.replace(/[^0-9]/g, ""),
                }))
              }
              placeholder="62881036657944"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
            />
            <p className="text-[10px] text-slate-400">
              Format internasional tanpa tanda plus (+). Contoh: 62881036657944
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-600" />
              <span>Email Bisnis Resmi</span>
            </label>
            <input
              type="email"
              value={contact?.email || ""}
              onChange={(e) =>
                onUpdateContact((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="gaweb.website@gmail.com"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>Username Instagram</span>
            </label>
            <input
              type="text"
              value={contact?.instagram || ""}
              onChange={(e) =>
                onUpdateContact((prev) => ({ ...prev, instagram: e.target.value }))
              }
              placeholder="@gaweb.website"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Kota / Alamat Usaha</span>
            </label>
            <input
              type="text"
              value={contact?.location || ""}
              onChange={(e) =>
                onUpdateContact((prev) => ({
                  ...prev,
                  location: e.target.value,
                  city: e.target.value.split(",")[0]?.trim() || prev.city,
                }))
              }
              placeholder="Malang, Jawa Timur, Indonesia"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Embedded Media Picker */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        mediaLibrary={mediaLibrary}
        onSelectImage={(url) =>
          onUpdateHero((prev) => ({ ...prev, bgImageUrl: url }))
        }
      />
    </div>
  );
}
