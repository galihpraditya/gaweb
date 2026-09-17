"use client";

import React, { useRef, useState } from "react";
import {
  FileDown,
  Upload,
  RotateCcw,
  CheckCircle2,
  HardDrive,
  Cloud,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { SiteContentSchema } from "@/lib/types/content";

interface SeoBackupTabProps {
  formData: SiteContentSchema;
  storageInfo?: {
    isR2Configured: boolean;
    engine: "r2" | "local" | "ephemeral";
  } | null;
  onDownloadBackup: () => void;
  onImportBackup: (content: SiteContentSchema) => void;
  onResetToDefault: () => void;
}

export function SeoBackupTab({
  formData,
  storageInfo,
  onDownloadBackup,
  onImportBackup,
  onResetToDefault,
}: SeoBackupTabProps) {
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const [testingR2, setTestingR2] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    bucket?: string;
  } | null>(null);

  const handleTestR2 = async () => {
    setTestingR2(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/storage");
      const data = await res.json();
      setTestResult({
        success: Boolean(data.success),
        message: data.message || "Uji koneksi selesai.",
        bucket: data.bucket,
      });
    } catch {
      setTestResult({
        success: false,
        message: "Gagal menghubungi endpoint storage server.",
      });
    } finally {
      setTestingR2(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as SiteContentSchema;
        if (parsed.hero && parsed.portfolios) {
          onImportBackup(parsed);
          alert("Data backup JSON berhasil dimuat ke formulir editor!");
        } else {
          alert("Format file JSON tidak valid. Pastikan file berisi data gaweb site content.");
        }
      } catch {
        alert("Gagal membaca file JSON.");
      }
    };
    reader.readAsText(file);
    if (jsonInputRef.current) jsonInputRef.current.value = "";
  };

  const totalPortfolios = formData.portfolios?.length || 0;
  const totalMedia = formData.mediaLibrary?.length || 0;
  const totalPricing = formData.pricing?.length || 0;
  const totalFaqs = formData.faqs?.length || 0;

  const isR2Active = storageInfo?.isR2Configured;

  return (
    <div className="space-y-6">
      {/* 1. CLOUDFLARE R2 PERSISTENT STORAGE STATUS & HEALTH */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#004F72]/10 text-[#004F72]">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#092734]">
                Penyimpanan Permanen Cloudflare R2
              </h2>
              <p className="text-xs text-slate-500">
                Penyimpanan dokumen data website secara cloud-native, persisten, dan instan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isR2Active ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Cloudflare R2 Aktif</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Mode Penyimpanan Lokal</span>
              </span>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Setiap kali Anda menekan tombol <strong>Simpan Perubahan</strong> atau shortcut{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[11px] text-slate-700">Ctrl + S</kbd>,
          data langsung disimpan secara permanen ke bucket Cloudflare R2 dan cache halaman utama Next.js dibersihkan seketika. Seluruh pengunjung web dan admin langsung melihat data terbaru tanpa perlu git commit/push manual.
        </p>

        {/* Live Test Result Banner */}
        {testResult && (
          <div
            className={`p-4 rounded-xl text-xs flex items-start gap-2.5 border ${
              testResult.success
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <span className="font-bold block">
                {testResult.success ? "Koneksi Berhasil!" : "Pemeriksaan Koneksi Gagal"}
              </span>
              <p className="leading-relaxed">{testResult.message}</p>
              {testResult.bucket && (
                <p className="font-mono text-[11px] opacity-85">Target Bucket: {testResult.bucket}</p>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleTestR2}
            disabled={testingR2}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testingR2 ? "animate-spin text-[#004F72]" : ""}`} />
            <span>{testingR2 ? "Menguji Koneksi..." : "Uji Koneksi Cloudflare R2"}</span>
          </button>

          <button
            type="button"
            onClick={onDownloadBackup}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#004F72] hover:bg-[#003d59] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Cadangan File JSON</span>
          </button>
        </div>
      </div>

      {/* 2. RESTORE & RESET DEFAULTS */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#092734]">
              Restore Data dari File Backup JSON & Reset Template
            </h3>
            <p className="text-xs text-slate-500">
              Unggah file backup JSON untuk memulihkan konten, atau kembalikan seluruh konten ke template bawaan.
            </p>
          </div>
        </div>

        {/* Data summary pill */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Portofolio</span>
            <span className="text-base font-black text-[#092734]">{totalPortfolios} Item</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Aset Media</span>
            <span className="text-base font-black text-[#092734]">{totalMedia} File</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Paket Harga</span>
            <span className="text-base font-black text-[#092734]">{totalPricing} Paket</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Tanya Jawab</span>
            <span className="text-base font-black text-[#092734]">{totalFaqs} FAQ</span>
          </div>
        </div>

        <input
          ref={jsonInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => jsonInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Pilih & Muat File Backup JSON</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  "Apakah Anda yakin ingin mengembalikan seluruh konten ke data template bawaan? Perubahan yang belum dicadangkan akan hilang."
                )
              ) {
                onResetToDefault();
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset ke Template Bawaan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
