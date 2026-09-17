"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { X, UploadCloud, Check, Search, ImageIcon } from "lucide-react";
import { SiteContentSchema } from "@/lib/types/content";
import { compressImage } from "@/lib/image-compress";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
  mediaLibrary: SiteContentSchema["mediaLibrary"];
  onUploadSuccess?: (newItem: SiteContentSchema["mediaLibrary"][0]) => void;
}

export function MediaPickerModal({
  isOpen,
  onClose,
  onSelectImage,
  mediaLibrary = [],
  onUploadSuccess,
}: MediaPickerModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const filtered = mediaLibrary.filter((m) => {
    const matchCategory =
      activeCategory === "all" ? true : m.category === activeCategory;
    const matchSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const processedFile = await compressImage(file);
      const bodyData = new FormData();
      bodyData.append("file", processedFile);
      bodyData.append("name", processedFile.name);
      bodyData.append(
        "category",
        activeCategory === "all" ? "uploads" : activeCategory
      );

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: bodyData,
      });

      if (res.status === 413) {
        alert("Ukuran gambar terlalu besar untuk serverless Vercel (Maksimal 4.5MB).");
        return;
      }

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        alert("Respon server tidak valid saat mengunggah.");
        return;
      }

      if (res.ok && data?.success && data?.item) {
        if (onUploadSuccess) {
          onUploadSuccess(data.item);
        }
        setSelectedUrl(data.item.url);
      } else {
        alert(data?.error || "Gagal mengunggah gambar.");
      }
    } catch {
      alert("Terjadi kesalahan saat mengunggah gambar.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleConfirmSelect = () => {
    if (selectedUrl) {
      onSelectImage(selectedUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-5 sm:p-6 space-y-4 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#004F72]" />
            <h3 className="text-base font-bold text-[#092734]">
              Pilih Gambar dari Pustaka Media
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Category filter + Search + Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama gambar..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#004F72]"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["all", "showcase", "hero", "uploads"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#004F72] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat === "all" ? "Semua" : cat}
              </button>
            ))}

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#004F72] hover:bg-[#092734] text-white text-[11px] font-bold shrink-0 cursor-pointer disabled:opacity-60 transition-colors"
            >
              {isUploading ? (
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <UploadCloud className="w-3.5 h-3.5" />
              )}
              <span>Upload</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto min-h-[220px] max-h-[380px] pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Tidak ada gambar ditemukan.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filtered.map((item) => {
                const isSelected = selectedUrl === item.url;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedUrl(item.url)}
                    className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all aspect-video group bg-slate-100 ${
                      isSelected
                        ? "border-[#004F72] ring-2 ring-[#004F72]/30 shadow-md"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 text-[10px] text-white font-medium truncate">
                      {item.name}
                    </div>
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#004F72] text-white flex items-center justify-center shadow">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-500 truncate max-w-[300px]">
            {selectedUrl ? selectedUrl : "Pilih salah satu gambar di atas"}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={!selectedUrl}
              onClick={handleConfirmSelect}
              className="px-4 py-1.5 rounded-xl bg-[#004F72] hover:bg-[#003d59] text-white text-xs font-bold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              Gunakan Gambar Ini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
