"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { PortfolioItem } from "@/lib/types/content";

interface PortfolioTabProps {
  portfolios: PortfolioItem[];
  onOpenAddModal: () => void;
  onOpenEditModal: (item: PortfolioItem) => void;
  onDeletePortfolio: (id: string) => void;
  onMovePortfolio: (id: string, direction: "up" | "down") => void;
  editorLang: "id" | "en";
}

export function PortfolioTab({
  portfolios = [],
  onOpenAddModal,
  onOpenEditModal,
  onDeletePortfolio,
  onMovePortfolio,
  editorLang,
}: PortfolioTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filtered = portfolios.filter((item) => {
    if (!query) return true;
    return (
      (item.title || "").toLowerCase().includes(query) ||
      (item.clientName || "").toLowerCase().includes(query) ||
      (item.tags || []).some((t) => (t || "").toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-5">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-base font-bold text-[#092734]">
            Showcase Portofolio ({portfolios.length} Proyek)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar karya website nyata yang meyakinkan calon klien di landing page.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#004F72] hover:bg-[#092734] text-white text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul proyek, klien, atau tags..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#004F72]"
          />
        </div>
        <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
          Menampilkan {filtered.length} dari {portfolios.length} proyek
        </span>
      </div>

      {/* Portfolios Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
          <p className="text-sm font-bold text-slate-700">
            Tidak ada portofolio yang cocok dengan pencarian.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs text-[#004F72] font-semibold hover:underline"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === filtered.length - 1;
            const desc =
              item.description?.[editorLang] ||
              item.description?.id ||
              "Tanpa deskripsi.";

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                {/* Image Showcase Container */}
                <div className="relative aspect-[16/10] w-full bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Details */}
                <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-base text-[#092734] leading-snug">
                        {item.title}
                      </h3>
                      <span className="text-[11px] font-bold text-slate-400 shrink-0">
                        #{idx + 1}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold">
                      {item.clientName}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags?.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {item.demoUrl ? (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#004F72] font-bold hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Link Demo</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">Tanpa link demo</span>
                    )}

                    {/* Order & Edit Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={isFirst}
                        onClick={() => onMovePortfolio(item.id, "up")}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                        title="Geser ke atas"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={isLast}
                        onClick={() => onMovePortfolio(item.id, "down")}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                        title="Geser ke bawah"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenEditModal(item)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-[#004F72] hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Edit detail proyek"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeletePortfolio(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus proyek"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
