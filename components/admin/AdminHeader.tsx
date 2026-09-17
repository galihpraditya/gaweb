"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Save,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
}

export function AdminHeader({ onOpenMobileSidebar }: AdminHeaderProps) {
  const pathname = usePathname();
  const { isDirty, isSaving, handleSaveChanges, editorLang, setEditorLang } =
    useAdmin();

  const getSectionInfo = () => {
    if (pathname.includes("/portfolios")) {
      return {
        section: "Portofolio",
        title: "Kelola Portofolio Website",
        subtitle: "Daftar proyek showcase, skor metrik, dan link demo",
      };
    }
    if (pathname.includes("/media")) {
      return {
        section: "Pustaka Media",
        title: "Pustaka Media & Gambar",
        subtitle: "Kelola aset gambar hero, mockup portofolio, dan ikon",
      };
    }
    if (pathname.includes("/content")) {
      return {
        section: "Hero & Kontak",
        title: "Konten Hero & Kontak Resmi",
        subtitle: "Header utama, subjudul, dan saluran WhatsApp",
      };
    }
    if (pathname.includes("/pricing")) {
      return {
        section: "Paket Harga",
        title: "Pengaturan Paket Layanan & Harga",
        subtitle: "Tarif promo, estimasi hari pengerjaan, dan checklist fitur",
      };
    }
    if (pathname.includes("/faqs")) {
      return {
        section: "Tanya Jawab (FAQ)",
        title: "Daftar Tanya Jawab (FAQ)",
        subtitle: "Jawaban pertanyaan yang sering diajukan calon klien",
      };
    }
    if (pathname.includes("/backup")) {
      return {
        section: "Backup & Vercel",
        title: "Backup & Sinkronisasi Vercel",
        subtitle: "Ekspor backup JSON dan panduan deploy permanen Git",
      };
    }
    return {
      section: "Ringkasan",
      title: "Ringkasan & Status Website",
      subtitle: "Statistik cepat dan status operasional landing page",
    };
  };

  const { section, title, subtitle } = getSectionInfo();

  return (
    <header className="sticky top-0 z-30 min-h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap shadow-2xs">
      {/* Left: Mobile Toggle & Breadcrumbs / Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden shrink-0 cursor-pointer"
          aria-label="Buka menu navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0 space-y-0.5">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <Link
              href="/admin/overview"
              className="hover:text-[#004F72] transition-colors"
            >
              Admin
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-600 font-semibold truncate">
              {section}
            </span>
          </div>

          <h1 className="text-base sm:text-lg font-extrabold text-[#092734] truncate tracking-tight">
            {title}
          </h1>
          <p className="text-[11px] text-slate-400 hidden md:block truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Action Zone */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
        {/* Quick External Link (hidden on extra small) */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-[#004F72] hover:border-slate-300 hover:bg-slate-50 transition-all"
        >
          <span>Web Live</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        {/* Editor Language Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setEditorLang("id")}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              editorLang === "id"
                ? "bg-white text-[#004F72] shadow-2xs font-extrabold"
                : "text-slate-500 hover:text-slate-800"
            }`}
            title="Edit konten Bahasa Indonesia"
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
            title="Edit konten Bahasa Inggris"
          >
            🇬🇧 EN
          </button>
        </div>

        {/* Dirty State Indicator */}
        {isDirty ? (
          <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Belum disimpan</span>
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
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer active:scale-95 ${
            isDirty
              ? "bg-[#004F72] hover:bg-[#092734] shadow-md ring-2 ring-amber-400/60"
              : "bg-[#004F72] hover:bg-[#092734] shadow-xs opacity-90 hover:opacity-100"
          } disabled:opacity-60`}
          title="Simpan Perubahan (Ctrl+S)"
        >
          {isSaving ? (
            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isDirty ? (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
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
