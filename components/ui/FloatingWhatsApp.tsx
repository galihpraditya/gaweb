"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

export function FloatingWhatsApp() {
  const { language } = useLanguage();
  const { content } = useSiteContent();

  const whatsappNumber = content?.contact?.whatsappNumber;
  const message =
    language === "en"
      ? "Hello gaweb, I would like to consult about creating a custom website."
      : "Halo gaweb, saya ingin konsultasi pembuatan website custom.";

  return (
    <div className="fixed bottom-5 right-5 sm:hidden z-40 flex items-center">
      <a
        href={getWhatsAppUrl(message, whatsappNumber)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="group flex items-center gap-2 bg-[#004F72] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:bg-[#092734] active:scale-95 transition-all duration-200 border border-white/20"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-emerald-300" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span className="text-xs font-bold tracking-tight">
          {language === "en" ? "Chat WhatsApp" : "Konsultasi WA"}
        </span>
      </a>
    </div>
  );
}

