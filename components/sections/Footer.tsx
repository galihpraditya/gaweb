"use client";

import React from "react";
import { BRAND, CONTACT, getWhatsAppUrl } from "@/lib/constants";
import { MessageCircle, Instagram, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#092734] text-slate-400 text-xs sm:text-sm border-t border-[#004F72]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col (2 cols on large) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-logo text-2xl sm:text-[32px] font-extrabold tracking-tight leading-none select-none text-white">
                gaweb
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {t.footer.description}
            </p>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <div className="text-sm font-bold text-white uppercase tracking-wider">
              {t.footer.navTitle}
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              {t.navbar.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Outreach */}
          <div className="space-y-3">
            <div className="text-sm font-bold text-white uppercase tracking-wider">
              {t.footer.contactTitle}
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href={getWhatsAppUrl(
                    language === "en"
                      ? "Hello admin, I would like to get information about your custom website services."
                      : "Halo admin, saya ingin tanya info pembuatan website."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 shrink-0 transition-colors" />
                  <span>{t.footer.waText}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${CONTACT.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <Instagram className="w-4 h-4 text-slate-400 group-hover:text-pink-400 shrink-0 transition-colors" />
                  <span>{CONTACT.instagram}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-sky-400 shrink-0 transition-colors" />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{CONTACT.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {BRAND.name} | {BRAND.fullName}. {t.footer.rights}
          </div>
          <div className="flex items-center gap-4">
            <span>{t.footer.tagline}</span>
            <span>•</span>
            <span className="text-white/90 font-semibold">{t.footer.subtagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
