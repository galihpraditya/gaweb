"use client";

import React from "react";
import { Zap, ShieldCheck, Sparkles, BadgePercent } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function DifferentiatorSection() {
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-5 h-5 text-amber-500" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[#004F72]" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-cyan-600" />;
      case "BadgePercent":
        return <BadgePercent className="w-5 h-5 text-emerald-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#004F72]" />;
    }
  };

  return (
    <section id="keunggulan" className="py-20 lg:py-24 bg-[#F9F9F9] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-[36px] lg:text-[40px] font-extrabold text-[#092734] tracking-tight leading-snug">
            {t.differentiator.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.differentiator.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {t.differentiator.items.map((diff, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-3 shadow-xs hover:border-[#004F72]/40 transition-colors duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                    {getIcon(diff.icon)}
                  </div>
                  <span className="text-[11px] font-bold text-[#004F72] bg-[#004F72]/10 px-2.5 py-0.5 rounded-full">
                    {diff.metric}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#092734] leading-snug">
                  {diff.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs sm:text-sm text-slate-500 font-medium mt-10">
          {t.differentiator.footerText}
        </p>
      </div>
    </section>
  );
}
