"use client";

import React from "react";
import Link from "next/link";
import {
  FolderKanban,
  ImageIcon,
  CreditCard,
  HelpCircle,
  MessageCircle,
  Plus,
  UploadCloud,
  FileDown,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { SiteContentSchema } from "@/lib/types/content";
import { AdminNavSection } from "../AdminSidebar";

interface OverviewTabProps {
  formData: SiteContentSchema;
  onNavigate: (section: AdminNavSection) => void;
  onOpenAddPortfolio: () => void;
  onDownloadBackup: () => void;
}

export function OverviewTab({
  formData,
  onNavigate,
  onOpenAddPortfolio,
  onDownloadBackup,
}: OverviewTabProps) {
  const totalPortfolios = formData.portfolios?.length || 0;
  const featuredPortfolios =
    formData.portfolios?.filter((p) => p.featured).length || 0;
  const totalMedia = formData.mediaLibrary?.length || 0;
  const totalPricing = formData.pricing?.length || 0;
  const totalFaqs = formData.faqs?.length || 0;
  const waNumber = formData.contact?.whatsappNumber || "62881036657944";

  const lastUpdatedText = formData.lastUpdated
    ? new Date(formData.lastUpdated).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    })
    : "Baru saja";

  return (
    <div className="space-y-6">
      {/* Welcome & System Summary Banner */}
      <div className="bg-gradient-to-br from-[#092734] to-[#004F72] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            Selamat Datang di Panel Pengelolaan Website gaweb
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            Kelola portofolio showcase, media gambar, teks hero, paket harga,
            dan integrasi WhatsApp. Seluruh data disimpan dan disinkronkan langsung
            ke landing page Anda.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-300" />
              <span>Pembaruan terakhir: {lastUpdatedText}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sesi Admin Terproteksi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Portofolio */}
        <div
          onClick={() => onNavigate("portfolios")}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#004F72] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Portofolio</span>
            <div className="p-2 rounded-xl bg-[#004F72]/10 text-[#004F72] group-hover:scale-110 transition-transform">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#092734]">
              {totalPortfolios}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Semua proyek aktif
            </div>
          </div>
        </div>

        {/* Media Library */}
        <div
          onClick={() => onNavigate("media")}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#004F72] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Aset Media</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#092734]">
              {totalMedia}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Gambar & mockup tersimpan
            </div>
          </div>
        </div>

        {/* Paket Harga */}
        <div
          onClick={() => onNavigate("pricing")}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#004F72] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Paket Layanan</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 group-hover:scale-110 transition-transform">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#092734]">
              {totalPricing}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Paket harga aktif
            </div>
          </div>
        </div>

        {/* WhatsApp & Tanya Jawab */}
        <div
          onClick={() => onNavigate("content")}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#004F72] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">WhatsApp Resmi</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 truncate">
            <div className="text-base sm:text-lg font-black text-[#092734] truncate">
              +{waNumber}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {totalFaqs} tanya-jawab FAQ
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#092734]">Tindakan Cepat</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={onOpenAddPortfolio}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#004F72] hover:bg-sky-50/40 text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#004F72] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-[#092734]">Tambah Portofolio</div>
              <div className="text-[10px] text-slate-500">Upload proyek baru</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("media")}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#004F72] hover:bg-sky-50/40 text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#004F72] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-[#092734]">Unggah Gambar</div>
              <div className="text-[10px] text-slate-500">Pustaka aset media</div>
            </div>
          </button>

          <button
            type="button"
            onClick={onDownloadBackup}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <FileDown className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-[#092734]">Download Backup</div>
              <div className="text-[10px] text-slate-500">Simpan site-content.json</div>
            </div>
          </button>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-[#092734] flex items-center gap-1">
                <span>Preview Website</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[10px] text-slate-500">Buka live di tab baru</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Guide Note */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#092734]">
          <CheckCircle2 className="w-4 h-4 text-[#004F72]" />
          <span>Informasi Penyimpanan & Sinkronisasi Hosting</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Setiap kali Anda menekan tombol <strong>Simpan Perubahan</strong> (atau shortcut <code>Ctrl+S</code>), data langsung disimpan ke file repository lokal (<code>data/site-content.json</code>) dan aktif di sesi browser. Untuk penyimpanan permanen di Vercel, cukup unduh file JSON dari tab <strong>SEO & Backup</strong> lalu commit &amp; push ke repositori GitHub Anda.
        </p>
      </div>
    </div>
  );
}
