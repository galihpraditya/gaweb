"use client";

import React, { useState } from "react";
import { getWhatsAppUrl } from "@/lib/constants";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

export function FaqSection() {
  const { t, language } = useLanguage();
  const { content } = useSiteContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems =
    content?.faqs && content.faqs.length > 0 && language === "id"
      ? content.faqs.map((f) => ({
          question: f.question[language] || f.question.id,
          answer: f.answer[language] || f.answer.id,
        }))
      : t.faq.items;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-24 bg-white relative border-t border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-[36px] lg:text-[40px] font-extrabold text-[#092734] tracking-tight leading-snug">
            {t.faq.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[#004F72] bg-white shadow-xs"
                    : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004F72] rounded-2xl cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-bold flex items-center gap-3 transition-colors duration-200 ${isOpen ? "text-[#004F72]" : "text-[#092734] group-hover:text-[#004F72]"}`}>
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-200 ${isOpen ? "text-[#004F72]" : "text-slate-400 group-hover:text-[#004F72]"}`} />
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 shrink-0 ${isOpen ? "bg-[#004F72]/10 text-[#004F72]" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"}`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#004F72]" : ""
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Unanswered Question Prompt */}
        <div className="mt-12 max-w-3xl mx-auto bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-[#092734]">
              {t.faq.unansweredTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.faq.unansweredSub}
            </p>
          </div>
          <a
            href={getWhatsAppUrl(
              language === "en"
                ? "Hello gaweb, I would like to ask questions about your custom website services."
                : "Halo gaweb, saya mau tanya-tanya lebih lanjut seputar paket website."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 group"
          >
            <span className="inline-flex items-center gap-2 bg-[#004F72] hover:bg-[#092734] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-colors duration-200">
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>{t.faq.ctaWa}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
