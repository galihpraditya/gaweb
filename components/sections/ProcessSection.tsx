"use client";

import React from "react";
import { MessageSquare, CreditCard, Code, Rocket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ProcessSection() {
  const { t } = useLanguage();

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <MessageSquare className="w-5 h-5 text-[#004F72]" />;
      case 1:
        return <CreditCard className="w-5 h-5 text-[#092734]" />;
      case 2:
        return <Code className="w-5 h-5 text-[#004F72]" />;
      case 3:
        return <Rocket className="w-5 h-5 text-amber-600" />;
      default:
        return <MessageSquare className="w-5 h-5 text-[#004F72]" />;
    }
  };

  return (
    <section id="proses" className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-[36px] lg:text-[40px] font-extrabold text-[#092734] tracking-tight leading-snug">
            {t.process.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.process.subtitle}
          </p>
        </div>

        {/* 4 Cards Timeline */}
        <div className="relative">
          {/* Subtle Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[1px] bg-slate-200 z-0 pointer-events-none" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 relative z-10">
            {t.process.steps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                      {getStepIcon(idx)}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#004F72] font-mono">
                      0{step.stepNumber}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-[#092734] leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-100 text-[11px] font-semibold text-[#004F72] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#004F72]" />
                  <span>{step.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
