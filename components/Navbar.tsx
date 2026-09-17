"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { MessageCircle, Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, t } = useLanguage();
  const { content } = useSiteContent();
  const whatsappNumber = content?.contact?.whatsappNumber;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-[#F9F9F9]/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-2.5 sm:py-3"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Text without Icon Logo */}
        <Link
          href="/"
          className="flex items-center group cursor-pointer focus:outline-none"
          aria-label="gaweb"
        >
          <span className="font-logo text-2xl sm:text-[30px] font-extrabold tracking-tight leading-none select-none transition-colors duration-200">
            <span className="text-[#092734]">ga</span>
            <span className="text-[#004F72]">web</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {t.navbar.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold transition-colors py-1 cursor-pointer text-[#092734]/80 hover:text-[#004F72]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button & Language Toggle (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <a
            href={getWhatsAppUrl(
              language === "en"
                ? "Hello gaweb, I want to order a custom website."
                : "Halo gaweb, saya ingin pesan pembuatan website custom untuk usaha saya.",
              whatsappNumber
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="md"
              className="gap-2 group font-bold shadow-xs hover:shadow-md transition-shadow"
            >
              <span>{t.navbar.cta}</span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button & Language Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <a
            href={getWhatsAppUrl(
              language === "en"
                ? "Hello gaweb, I want to order a custom website."
                : "Halo gaweb, saya ingin pesan pembuatan website custom untuk usaha saya.",
              whatsappNumber
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full transition-colors text-[#004F72] bg-white hover:bg-slate-100 border border-[#004F72]/20 shadow-2xs"
            aria-label="Hubungi WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg transition-colors cursor-pointer text-[#092734] hover:text-[#004F72] hover:bg-black/5"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F9F9F9]/95 backdrop-blur-lg border-b border-slate-200 px-6 py-5 mt-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3.5">
            {t.navbar.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-[#092734] hover:text-[#004F72] py-1.5 border-b border-slate-200/60"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href={getWhatsAppUrl(
                  language === "en"
                    ? "Hello gaweb, I want to consult about custom website development."
                    : "Halo gaweb, saya ingin konsultasi pembuatan website custom."
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block"
              >
                <Button variant="primary" size="lg" className="w-full gap-2 font-bold">
                  <MessageCircle className="w-5 h-5 text-emerald-300" />
                  <span>{t.navbar.whatsappDrawer}</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
