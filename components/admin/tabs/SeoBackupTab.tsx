"use client";

import React, { useRef } from "react";
import {
  FileDown,
  Upload,
  RotateCcw,
  CheckCircle2,
  HardDrive,
  GitBranch,
} from "lucide-react";
import { SiteContentSchema } from "@/lib/types/content";

interface SeoBackupTabProps {
  formData: SiteContentSchema;
  onDownloadBackup: () => void;
  onImportBackup: (content: SiteContentSchema) => void;
  onResetToDefault: () => void;
}

export function SeoBackupTab({
  formData,
  onDownloadBackup,
  onImportBackup,
  onResetToDefault,
}: SeoBackupTabProps) {
  const jsonInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="space-y-6">
      {/* 1. VERCEL & GITHUB DEPLOYMENT GUIDE */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#004F72]/10 text-[#004F72]">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#092734]">
              Penyimpanan Permanen Vercel & Sinkronisasi Git
            </h2>
            <p className="text-xs text-slate-500">
              Panduan menyimpan data konten secara permanen ke repositori kode GitHub Anda.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Hosting Vercel bersifat <em>serverless read-only filesystem</em>. Perubahan konten yang Anda simpan di panel admin ini langsung aktif di sesi live browser Anda. Agar perubahan konten menjadi <strong>permanen selamanya</strong> pada server Vercel ketika dideploy ulang:
        </p>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#004F72]" />
            <span>3 Langkah Simpan Permanen ke Git:</span>
          </div>
          <ol className="list-decimal list-inside text-xs text-slate-600 space-y-2 leading-relaxed">
            <li>
              Klik tombol <strong>Download File site-content.json</strong> di bawah untuk mengunduh seluruh data terbaru.
            </li>
            <li>
              Pindahkan/replace file hasil unduhan tersebut ke dalam folder project Anda di:{" "}
              <code className="bg-slate-200 px-1.5 py-0.5 rounded text-[#092734] font-mono font-bold">
                data/site-content.json
              </code>
            </li>
            <li>
              Lakukan <strong>git commit &amp; git push</strong> ke repository GitHub Anda. Vercel akan otomatis melakukan redeploy dengan data terbaru!
            </li>
          </ol>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onDownloadBackup}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004F72] hover:bg-[#003d59] text-white text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <FileDown className="w-4 h-4" />
            <span>Download File data/site-content.json</span>
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
