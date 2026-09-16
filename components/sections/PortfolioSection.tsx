"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { getWhatsAppUrl } from "@/lib/constants";
import { PortfolioItem } from "@/lib/types/content";
import { Button } from "@/components/ui/Button";
import {
  ExternalLink,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export function PortfolioSection() {
  const { t, language } = useLanguage();
  const { content } = useSiteContent();

  const portfolios: PortfolioItem[] = content?.portfolios || [];

  return (
    <section
      id="portofolio"
      className="py-20 lg:py-28 bg-white relative border-t border-slate-200/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-[36px] lg:text-[42px] font-extrabold text-[#092734] tracking-tight leading-snug">
            {t.portfolio.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Portfolios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {portfolios.map((item, index) => {
            const itemDesc = item.description[language] || item.description.id;
            const waMessage =
              language === "en"
                ? `Hello gaweb, I am interested in ordering a website like "${item.title}". Can we discuss the details?`
                : `Halo gaweb, saya tertarik membuat website dengan konsep seperti portofolio "${item.title}". Bisa info detailnya?`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-600/30 transition-all duration-300 flex flex-col"
              >
                {/* Image Showcase Preview */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-black/10 opacity-70 group-hover:opacity-60 transition-opacity" />
                </div>

                {/* Card Content Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-[#092734] group-hover:text-[#004F72] transition-colors leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-slate-500">
                      {item.clientName}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {itemDesc}
                    </p>
                  </div>

                  {/* Tech Stack / Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags?.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action CTA Buttons (Hidden until hover on desktop) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 sm:gap-2.5 opacity-100 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300">
                    {item.demoUrl && (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 rounded-xl text-[11px] sm:text-xs font-bold text-[#004F72] hover:bg-[#004F72]/5 border border-[#004F72]/30 transition-colors whitespace-nowrap"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{t.portfolio.viewLiveDemo}</span>
                      </a>
                    )}

                    <a
                      href={getWhatsAppUrl(waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 rounded-xl text-[11px] sm:text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-xs whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                      <span>{t.portfolio.orderSimilar}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {portfolios.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
            <p className="text-base font-bold text-slate-700">{t.portfolio.emptyTitle}</p>
            <p className="text-sm text-slate-500 mt-1">{t.portfolio.emptyDesc}</p>
          </div>
        )}

        {/* Bottom Callout */}
        <div className="mt-12 bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-[#092734] flex items-center justify-center sm:justify-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <span>Semua website di atas bisa kamu kelola sendiri dengan mudah</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Dikerjakan cepat, terima beres domain + hosting, dan bebas biaya plugin tahunan.
            </p>
          </div>

          <a
            href={getWhatsAppUrl(
              language === "en"
                ? "Hello gaweb, I want to discuss a custom website for my business."
                : "Halo gaweb, saya ingin konsultasi pembuatan website custom untuk usaha saya."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0"
          >
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto gap-2 font-bold px-6 py-2.5 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Konsultasi Proyek Gratis</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
