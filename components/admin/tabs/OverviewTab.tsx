"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FolderKanban,
  ImageIcon,
  CreditCard,
  MessageCircle,
  Plus,
  UploadCloud,
  FileDown,
  Globe,
  ArrowUpRight,
  Clock,
  Cloud,
  ChevronRight,
} from "lucide-react";
import { SiteContentSchema } from "@/lib/types/content";
import { AdminNavSection } from "../AdminSidebar";

interface OverviewTabProps {
  formData: SiteContentSchema;
  storageInfo?: {
    isR2Configured: boolean;
    engine: "r2" | "local" | "ephemeral";
  } | null;
  onNavigate: (section: AdminNavSection) => void;
  onOpenAddPortfolio: () => void;
  onDownloadBackup: () => void;
}

export function OverviewTab({
  formData,
  storageInfo,
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

  const heroHeadline =
    `${formData.hero?.h1Pre?.id || ""} ${formData.hero?.h1Highlight?.id || ""} ${formData.hero?.h1Post?.id || ""}`.trim() ||
    "Solusi Website Modern Tanpa WordPress";

  const latestPortfolios = (formData.portfolios || []).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* 1. Welcome & System Status Banner */}
      <div className="bg-gradient-to-br from-[#092734] via-[#092734] to-[#004F72] rounded-2xl p-6 text-white shadow-xs relative overflow-hidden">
        {/* Subtle Decorative Background Glow */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#004F72]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
            Selamat Datang, Admin
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Kelola portofolio, pustaka media, paket harga, dan konten landing page gaweb.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5 text-sky-300" />
              <span>Update: {lastUpdatedText}</span>
            </div>
            {storageInfo?.isR2Configured && (
              <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Cloud className="w-3.5 h-3.5 text-emerald-300" />
                <span className="font-semibold">Cloudflare R2 Aktif</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Quick Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Portofolio */}
        <div
          onClick={() => onNavigate("portfolios")}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#004F72] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
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
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>{featuredPortfolios} unggulan</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004F72] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Media Library */}
        <div
          onClick={() => onNavigate("media")}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#004F72] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
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
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>Cloudflare R2 CDN</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004F72] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Paket Harga */}
        <div
          onClick={() => onNavigate("pricing")}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#004F72] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
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
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>Paket harga aktif</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004F72] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* WhatsApp & Tanya Jawab */}
        <div
          onClick={() => onNavigate("content")}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#004F72] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
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
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>{totalFaqs} tanya jawab FAQ</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004F72] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Action Shortcuts */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#092734]">
            Tindakan Cepat (Quick Actions)
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">
            Shortcut menu praktis
          </span>
        </div>

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
              <div className="text-xs font-bold text-[#092734]">
                Tambah Portofolio
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                Showcase proyek baru
              </div>
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
              <div className="text-xs font-bold text-[#092734]">
                Unggah Media
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                Simpan ke Cloudflare R2
              </div>
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
              <div className="text-xs font-bold text-[#092734]">
                Download Backup
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                File site-content.json
              </div>
            </div>
          </button>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#092734] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-[#092734] flex items-center gap-1">
                <span>Preview Website</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-[#004F72]" />
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                Buka live di tab baru
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. Live Content Snapshot & Recent Showcases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Live Content Info */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 lg:col-span-1">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Snapshot Konten Aktif
            </h3>
            <button
              onClick={() => onNavigate("content")}
              className="text-xs text-[#004F72] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Edit</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Headline Hero
              </span>
              <p className="text-xs font-semibold text-[#092734] mt-0.5 line-clamp-2 leading-relaxed">
                {heroHeadline}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">
                WhatsApp Penerima
              </span>
              <p className="text-xs font-bold text-emerald-600 mt-0.5">
                +{waNumber}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Paket Layanan Terdaftar
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {(formData.pricing || []).map((p) => (
                  <span
                    key={p.id}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700"
                  >
                    {typeof p.name === "string" ? p.name : p.name?.id || p.id}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent Portfolios Preview */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Portofolio Terbaru di Landing Page
            </h3>
            <button
              onClick={() => onNavigate("portfolios")}
              className="text-xs text-[#004F72] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Semua ({totalPortfolios})</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {latestPortfolios.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400">
              Belum ada portofolio yang ditambahkan.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {latestPortfolios.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate("portfolios")}
                  className="group rounded-xl border border-slate-200 overflow-hidden hover:border-[#004F72] transition-all cursor-pointer bg-slate-50 flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full bg-slate-200">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <div className="font-bold text-xs text-[#092734] truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {item.clientName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
