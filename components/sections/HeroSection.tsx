"use client";

import React from "react";
import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MessageCircle, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center pt-24 pb-28 lg:pt-32 lg:pb-36 overflow-hidden bg-[#F9F9F9] hero-bg">
      {/* Background Architectural/Workspace Texture - Clean, No Cut-Off People */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&auto=format&fit=crop&q=80"
          alt="gaweb - Jasa Pembuatan Website Custom Modern, Cepat & Aman"
          fill
          className="object-cover photo-natural opacity-[0.08]"
          priority
          sizes="100vw"
        />
        {/* Soft radial highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F9F9]/60 via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-6 sm:space-y-8 my-auto">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-[36px] sm:text-[50px] lg:text-[60px] font-extrabold text-[#092734] leading-[1.14] tracking-tight">
            {t.hero.h1Pre}
            <span className="text-[#004F72] block sm:inline">{t.hero.h1Highlight}</span>
            {t.hero.h1Post}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {t.hero.subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <a
            href={getWhatsAppUrl(
              language === "en"
                ? "Hello gaweb, I would like to order a custom website."
                : "Halo gaweb, saya ingin pesan pembuatan website custom."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto group"
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto gap-2.5 text-base font-bold px-8 py-3.5 shadow-md shadow-[#004F72]/20 hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5 text-emerald-300 group-hover:scale-105 transition-transform duration-200" />
              <span>{t.hero.ctaPrimary}</span>
            </Button>
          </a>
          <a href="#harga" className="w-full sm:w-auto group">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 border-slate-300 text-[#092734] gap-2 text-base font-bold px-7 py-3.5 shadow-2xs"
            >
              <span>{t.hero.ctaSecondary}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </a>
        </div>

        {/* Under-CTA Natural Reassurance Points */}
        {t.hero.trustPoints && t.hero.trustPoints.length > 0 && (
          <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 font-medium">
            {t.hero.trustPoints.map((point, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                <span>{point}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Seamless bottom gradient transition to white */}
      <div className="absolute bottom-0 left-0 right-0 h-36 lg:h-52 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}
