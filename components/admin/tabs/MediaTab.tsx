"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Copy,
  Check,
  Trash2,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { SiteContentSchema } from "@/lib/types/content";

interface MediaTabProps {
  mediaLibrary: SiteContentSchema["mediaLibrary"];
  onUploadImage: (file: File, category: string) => Promise<void>;
  onDeleteMedia: (id: string) => void;
  onSetHeroBg: (url: string) => void;
  isUploading: boolean;
}

export function MediaTab({
  mediaLibrary = [],
  onUploadImage,
  onDeleteMedia,
  onSetHeroBg,
  isUploading,
}: MediaTabProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [uploadCategory, setUploadCategory] = useState<string>("uploads");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered =
    activeFilter === "all"
      ? mediaLibrary
      : mediaLibrary.filter((m) => m.category === activeFilter);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onUploadImage(file, uploadCategory);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-5">
      {/* Upload Box */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#092734]">
              Unggah Media Gambar Baru
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Aset akan disimpan di pustaka dan dapat dipakai untuk portofolio atau hero.
            </p>
          </div>

          {/* Upload Category Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 shrink-0">
              Kategori Aset:
            </span>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white outline-none focus:border-[#004F72]"
            >
              <option value="uploads">Uploads (Umum)</option>
              <option value="showcase">Showcase Mockup</option>
              <option value="hero">Hero Background</option>
            </select>
          </div>
        </div>

        {/* Dropzone Container */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-[#004F72] rounded-2xl p-8 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-slate-50"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <div className="max-w-xs mx-auto space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#004F72] flex items-center justify-center mx-auto shadow-2xs">
              {isUploading ? (
                <span className="w-5 h-5 border-2 border-[#004F72] border-t-transparent rounded-full animate-spin" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>
            <p className="text-xs font-bold text-slate-700">
              {isUploading
                ? "Sedang memproses & mengunggah gambar..."
                : "Klik di sini untuk memilih file dari komputer / HP"}
            </p>
            <p className="text-[11px] text-slate-400">
              Format: PNG, JPG, WebP, SVG (Otomatis dikompresi ke WebP sebelum disimpan ke Cloudflare R2)
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#004F72]" />
            <h3 className="text-sm font-bold text-slate-800">
              Aset Media Terdaftar ({filtered.length} File)
            </h3>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {["all", "showcase", "hero", "uploads"].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors cursor-pointer ${
                    activeFilter === cat
                      ? "bg-[#004F72] text-white font-bold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat === "all" ? "Semua" : cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            Belum ada gambar dalam kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((media) => (
              <div
                key={media.id}
                className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                {/* Media Image */}
                <div className="relative aspect-video w-full bg-slate-200">
                  <Image
                    src={media.url}
                    alt={media.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs capitalize">
                    {media.category}
                  </span>
                </div>

                {/* Media Details & Actions */}
                <div className="p-2.5 space-y-2">
                  <p
                    className="text-[11px] font-bold text-slate-700 truncate"
                    title={media.name}
                  >
                    {media.name}
                  </p>

                  <div className="flex items-center gap-1.5">
                    {/* Copy URL */}
                    <button
                      type="button"
                      onClick={() => handleCopy(media.url, media.id)}
                      className="flex-1 py-1 px-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      title="Salin path URL gambar"
                    >
                      {copiedId === media.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Disalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>

                    {/* Set Hero Button */}
                    <button
                      type="button"
                      onClick={() => onSetHeroBg(media.url)}
                      className="py-1 px-2 rounded-lg bg-[#004F72]/10 hover:bg-[#004F72]/20 text-[#004F72] text-[10px] font-bold cursor-pointer transition-colors"
                      title="Gunakan sebagai background hero utama"
                    >
                      Hero
                    </button>

                    {/* Delete Media Button */}
                    <button
                      type="button"
                      onClick={() => onDeleteMedia(media.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                      title="Hapus aset gambar ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
