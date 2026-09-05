"use client";

import React from "react";
import { X, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ProblemSection() {
  const { t } = useLanguage();

  return (
    <section id="layanan" className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-[36px] lg:text-[40px] font-extrabold text-[#092734] tracking-tight leading-snug">
            {t.problem.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.problem.subtitle}
          </p>
        </div>

        {/* Clean Comparison Cards */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {t.problem.items.map((item, idx) => (
            <div
              key={idx}
              className="grid md:grid-cols-2 rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-100"
            >
              {/* Problem Side */}
              <div className="p-6 sm:p-7 space-y-2.5 bg-slate-50/50 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-rose-500 stroke-[2.5]" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                    {t.problem.problemLabel}
                  </div>
                  <h3 className="text-base font-bold text-[#092734] leading-snug">
                    {item.problemTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {item.problemDesc}
                  </p>
                </div>
              </div>

              {/* Solution Side */}
              <div className="p-6 sm:p-7 space-y-2.5 bg-white flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#004F72]/10 border border-[#004F72]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#004F72] stroke-[2.5]" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="text-[11px] font-bold text-[#004F72] uppercase tracking-wider">
                    {t.problem.solutionLabel}
                  </div>
                  <h3 className="text-base font-bold text-[#092734] leading-snug">
                    {item.solutionTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.solutionDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
