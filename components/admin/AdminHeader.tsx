"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Save, CheckCircle2 } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
}

export function AdminHeader({ onOpenMobileSidebar }: AdminHeaderProps) {
  const pathname = usePathname();
  const { isDirty, isSaving, handleSaveChanges, editorLang, setEditorLang } =
    useAdmin();

  const getSectionTitle = () => {
    if (pathname.includes("/portfolios")) {
      return {
        title: "Kelola Portofolio Website",
        subtitle: "Daftar proyek showcase, skor metrik, dan link live demo",
      };
    }
    if (pathname.includes("/media")) {
      return {
        title: "Pustaka Media & Gambar",
        subtitle: "Kelola aset gambar hero, mockup portofolio, dan ikon",
      };
    }
    if (pathname.includes("/content")) {
      return {
        title: "Konten Hero & Kontak Resmi",
        subtitle: "Header utama, subjudul, dan saluran komunikasi WhatsApp",
      };
    }
    if (pathname.includes("/pricing")) {
      return {
        title: "Pengaturan Paket Layanan & Harga",
        subtitle: "Tarif promo, estimasi hari pengerjaan, dan checklist fitur",
      };
    }
    if (pathname.includes("/faqs")) {
      return {
        title: "Daftar Tanya Jawab (FAQ)",
        subtitle: "Jawaban pertanyaan yang sering diajukan calon klien",
      };
    }
    if (pathname.includes("/backup")) {
      return {
        title: "Backup & Sinkronisasi Vercel",
        subtitle: "Ekspor backup JSON dan panduan deploy permanen Git",
      };
    }
    return {
      title: "Ringkasan & Status Website",
      subtitle: "Statistik cepat dan status operasional landing page",
    };
  };

  const { title, subtitle } = getSectionTitle();

  return (
    <header className="sticky top-0 z-30 min-h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden shrink-0 cursor-pointer"
          aria-label="Buka menu navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="truncate">
          <h1 className="text-base sm:text-lg font-extrabold text-[#092734] truncate">
            {title}
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Action Zone: Language Selector, Dirty Status, Save Button */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
        {/* Editor Language Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setEditorLang("id")}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              editorLang === "id"
                ? "bg-white text-[#004F72] shadow-2xs font-extrabold"
                : "text-slate-500 hover:text-slate-800"
            }`}
            title="Edit teks versi Bahasa Indonesia"
          >
            🇮🇩 ID
          </button>
          <button
            type="button"
            onClick={() => setEditorLang("en")}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              editorLang === "en"
                ? "bg-white text-[#004F72] shadow-2xs font-extrabold"
                : "text-slate-500 hover:text-slate-800"
            }`}
            title="Edit teks versi Bahasa Inggris"
          >
            🇬🇧 EN
          </button>
        </div>

        {/* Dirty Indicator */}
        {isDirty ? (
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Ada perubahan</span>
          </span>
        ) : (
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tersimpan</span>
          </span>
        )}

        {/* Save Button */}
        <button
          onClick={handleSaveChanges}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#004F72] hover:bg-[#092734] shadow-sm transition-all disabled:opacity-60 cursor-pointer active:scale-95"
          title="Simpan Perubahan (Ctrl+S)"
        >
          {isSaving ? (
            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>Simpan</span>
          <kbd className="hidden lg:inline-block text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
            Ctrl+S
          </kbd>
        </button>
      </div>
    </header>
  );
}
