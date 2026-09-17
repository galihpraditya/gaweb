"use client";

import React from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, HelpCircle } from "lucide-react";
import { SiteFaqItem } from "@/lib/types/content";

interface FaqTabProps {
  faqs: SiteFaqItem[];
  onUpdateFaqs: (faqs: SiteFaqItem[]) => void;
  editorLang: "id" | "en";
}

export function FaqTab({ faqs = [], onUpdateFaqs, editorLang }: FaqTabProps) {
  const handleUpdateFaq = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const next = faqs.map((f, i) => {
      if (i !== index) return f;
      return {
        ...f,
        [field]: {
          id: f[field]?.id ?? "",
          en: f[field]?.en ?? "",
          [editorLang]: value,
        },
      };
    });
    onUpdateFaqs(next);
  };

  const handleAddFaq = () => {
    const newFaq: SiteFaqItem = {
      id: `faq-${Date.now()}`,
      question: {
        id: "Pertanyaan baru...",
        en: "New question...",
      },
      answer: {
        id: "Jawaban penjelasan...",
        en: "Explanation answer...",
      },
    };
    onUpdateFaqs([...faqs, newFaq]);
  };

  const handleDeleteFaq = (index: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pertanyaan FAQ ini?")) return;
    const next = faqs.filter((_, i) => i !== index);
    onUpdateFaqs(next);
  };

  const handleMoveFaq = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= faqs.length) return;
    const next = [...faqs];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    onUpdateFaqs(next);
  };

  return (
    <div className="space-y-5">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-base font-bold text-[#092734]">
            Daftar Tanya Jawab / FAQ ({faqs.length} Butir)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pertanyaan yang sering diajukan untuk menjawab keraguan calon klien sebelum memesan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-[#004F72]/10 text-[#004F72] border border-[#004F72]/20">
            Bahasa: {editorLang === "id" ? "🇮🇩 Indonesia" : "🇬🇧 English"}
          </span>

          <button
            type="button"
            onClick={handleAddFaq}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#004F72] hover:bg-[#092734] text-white text-xs font-bold transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah FAQ</span>
          </button>
        </div>
      </div>

      {/* FAQ Items List */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === faqs.length - 1;
          const questionText = faq.question?.[editorLang] ?? faq.question?.id ?? "";
          const answerText = faq.answer?.[editorLang] ?? faq.answer?.id ?? "";

          return (
            <div
              key={faq.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3.5"
            >
              {/* Header with numbering & move/delete buttons */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#004F72]" />
                  <span className="text-xs font-bold text-slate-700">
                    Pertanyaan #{idx + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => handleMoveFaq(idx, "up")}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                    title="Geser ke atas"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => handleMoveFaq(idx, "down")}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                    title="Geser ke bawah"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(idx)}
                    className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                    title="Hapus pertanyaan ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Teks Pertanyaan
                </label>
                <input
                  type="text"
                  value={questionText}
                  onChange={(e) => handleUpdateFaq(idx, "question", e.target.value)}
                  placeholder="Contoh: Apakah saya benar-benar bisa mengedit isi website sendiri?"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#092734] outline-none focus:border-[#004F72] focus:ring-1 focus:ring-[#004F72]"
                />
              </div>

              {/* Answer Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Teks Jawaban Penjelasan
                </label>
                <textarea
                  rows={3}
                  value={answerText}
                  onChange={(e) => handleUpdateFaq(idx, "answer", e.target.value)}
                  placeholder="Jelaskan secara ramah, praktis, dan meyakinkan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed outline-none focus:border-[#004F72] focus:ring-1 focus:ring-[#004F72]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
