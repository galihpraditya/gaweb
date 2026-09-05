"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language Selector"
      className={`inline-flex items-center p-0.5 rounded-full bg-slate-200/80 border border-slate-300/80 shadow-2xs transition-all ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage("id")}
        aria-pressed={language === "id"}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
          language === "id"
            ? "bg-[#004F72] text-white shadow-xs"
            : "text-[#092734]/70 hover:text-[#004F72]"
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
          language === "en"
            ? "bg-[#004F72] text-white shadow-xs"
            : "text-[#092734]/70 hover:text-[#004F72]"
        }`}
      >
        EN
      </button>
    </div>
  );
}
