"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ImageIcon, ExternalLink } from "lucide-react";
import { PortfolioItem, SiteContentSchema } from "@/lib/types/content";
import { MediaPickerModal } from "./MediaPickerModal";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: PortfolioItem) => void;
  initialData: PortfolioItem | null;
  mediaLibrary: SiteContentSchema["mediaLibrary"];
  editorLang: "id" | "en";
  totalCount: number;
}

export function PortfolioModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  mediaLibrary = [],
  editorLang = "id",
  totalCount = 0,
}: PortfolioModalProps) {
  const [formData, setFormData] = useState<PortfolioItem>({
    id: `project-${Date.now()}`,
    title: "",
    clientName: "",
    description: { id: "", en: "" },
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=520&fit=crop&q=80",
    demoUrl: "https://gaweb.website/#demo",
    tags: ["Next.js", "Tailwind CSS", "SEO Ready"],
    order: totalCount + 1,
  });

  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [activeDescLang, setActiveDescLang] = useState<"id" | "en">(editorLang);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
      setTagInput(initialData.tags?.join(", ") || "");
    } else {
      setFormData({
        id: `project-${Date.now()}`,
        title: "",
        clientName: "",
        description: { id: "", en: "" },
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=520&fit=crop&q=80",
        demoUrl: "https://gaweb.website/#demo",
        tags: ["Next.js", "Tailwind CSS", "SEO Ready"],
        order: totalCount + 1,
      });
      setTagInput("Next.js, Tailwind CSS, SEO Ready");
    }
    setActiveDescLang(editorLang);
  }, [initialData, isOpen, editorLang, totalCount]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Nama proyek harus diisi.");
      return;
    }
    if (!formData.imageUrl.trim()) {
      alert("URL gambar mockup harus diisi.");
      return;
    }

    const processedTags = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      ...formData,
      tags: processedTags.length > 0 ? processedTags : ["Custom Web"],
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-5 my-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#092734]">
                {initialData ? "Edit Proyek Portofolio" : "Tambah Proyek Baru"}
              </h3>
              <p className="text-xs text-slate-500">
                Atur informasi proyek, gambar mockup, dan tautan demo
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {/* Title & Client */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama Proyek *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Bromo Highland Adventure"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72] focus:ring-1 focus:ring-[#004F72]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama Klien / Brand</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Contoh: PT Bromo Wisata Nusantara"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72]"
                />
              </div>
            </div>

            {/* Order */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Urutan Tampil (Order)</label>
              <input
                type="number"
                min={1}
                value={formData.order || 1}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) || 1 })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72]"
              />
            </div>

            {/* Image URL & Media Picker */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  URL Gambar Mockup Preview *
                </label>
                <button
                  type="button"
                  onClick={() => setIsMediaPickerOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#004F72] hover:underline cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Pilih dari Pustaka Media</span>
                </button>
              </div>

              <input
                type="text"
                required
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="/images/... atau https://..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72]"
              />

              {formData.imageUrl && (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 mt-2 bg-slate-100">
                  <Image
                    src={formData.imageUrl}
                    alt="Preview mockup"
                    fill
                    className="object-cover"
                    sizes="450px"
                  />
                </div>
              )}
            </div>

            {/* Demo URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Link Live Demo Website (Opsional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.demoUrl || ""}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full pl-3 pr-8 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72]"
                />
                {formData.demoUrl && (
                  <a
                    href={formData.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-[#004F72]"
                    title="Buka link demo di tab baru"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Description with Bilingual Tabs */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Deskripsi Singkat Proyek</label>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveDescLang("id")}
                    className={`px-2 py-0.5 rounded ${
                      activeDescLang === "id" ? "bg-white text-[#004F72] shadow-2xs" : "text-slate-500"
                    }`}
                  >
                    🇮🇩 ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDescLang("en")}
                    className={`px-2 py-0.5 rounded ${
                      activeDescLang === "en" ? "bg-white text-[#004F72] shadow-2xs" : "text-slate-500"
                    }`}
                  >
                    🇬🇧 EN
                  </button>
                </div>
              </div>

              {activeDescLang === "id" ? (
                <textarea
                  rows={2}
                  value={formData.description?.id || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: {
                        id: e.target.value,
                        en: formData.description?.en || "",
                      },
                    })
                  }
                  placeholder="Deskripsi singkat dalam bahasa Indonesia..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72] leading-relaxed"
                />
              ) : (
                <textarea
                  rows={2}
                  value={formData.description?.en || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: {
                        id: formData.description?.id || "",
                        en: e.target.value,
                      },
                    })
                  }
                  placeholder="Short description in English..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72] leading-relaxed"
                />
              )}
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Fitur Kunci / Tags (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Next.js, Katalog Trip, WhatsApp Checkout"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72]"
              />
            </div>

            {/* Submit Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#004F72] hover:bg-[#092734] text-white text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                Simpan Proyek
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Embedded Media Picker */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        mediaLibrary={mediaLibrary}
        onSelectImage={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
      />
    </>
  );
}
