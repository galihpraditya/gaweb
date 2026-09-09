/**
 * constants.ts — Brand, Contact & WhatsApp helper untuk gaweb (Gawe Website)
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gaweb.website";

export const BRAND = {
  name: "gaweb",
  fullName: "Gawe Website",
  tagline: "Jasa Pembuatan Website Custom & Cepat",
  description:
    "Jasa pembuatan website custom, landing page & company profile super cepat (PageSpeed 90+), aman & terima beres domain + hosting + dashboard admin mandiri. Bukan WordPress! Mulai Rp 999rb.",
  badge: "100% Custom Code • Bukan WordPress",
};

export const CONTACT = {
  whatsappNumber: process.env.NEXT_PUBLIC_WA_NUMBER || "62881036657944",
  email: "gaweb.website@gmail.com",
  instagram: "@gaweb.website",
  location: "Malang, Jawa Timur, Indonesia",
  city: "Malang",
  region: "Jawa Timur",
  country: "ID",
  postalCode: "65141",
};

export const SEO_CONFIG = {
  defaultTitle:
    "Jasa Pembuatan Website Custom, Landing Page & Company Profile | gaweb",
  titleTemplate: "%s | gaweb - Jasa Pembuatan Website Custom",
  defaultDescription:
    "Jasa pembuatan website custom, landing page & company profile cepat & terima beres domain + hosting + dashboard admin mandiri. Bukan WordPress, PageSpeed 90+, garansi 7 hari!",
  keywords: [
    // Primary High Intent Commercial
    "jasa pembuatan website",
    "jasa pembuatan website custom",
    "jasa bikin website",
    "jasa buat landing page",
    "jasa pembuatan landing page",
    "jasa pembuatan company profile",
    "jasa bikin web cepat",
    "jasa website bukan wordpress",
    "jasa web development indonesia",
    // Target Audience & Niche
    "jasa website umkm",
    "jasa website travel",
    "jasa website tour and travel",
    "jasa website bisnis",
    "jasa website toko online",
    "jasa website portofolio profesional",
    // Cost & Feature Keywords
    "jasa pembuatan website murah dan profesional",
    "bikin website terima beres",
    "website dashboard admin mandiri",
    "website loading cepat pagespeed 90",
    "website tanpa plugin ribet",
    // Local SEO Intent
    "jasa pembuatan website malang",
    "jasa pembuatan website surabaya",
    "jasa pembuatan website jakarta",
    "jasa website indonesia",
    "gaweb",
    "gawe website",
  ],
  priceRange: "IDR 999.000 - 2.800.000",
  aggregateRating: {
    ratingValue: "4.9",
    reviewCount: "28",
    bestRating: "5",
    worstRating: "1",
  },
  services: [
    {
      name: "Paket Promo Starter (Landing Page Custom)",
      description:
        "1 Halaman Landing Page konversi tinggi, domain & cloud hosting 1 tahun, garansi 7 hari, dashboard CMS mandiri.",
      price: "999000",
      currency: "IDR",
    },
    {
      name: "Paket Promo Bisnis (Company Profile Custom)",
      description:
        "3-5 Halaman website profesional, optimasi SEO on-page, domain .com & cloud hosting 1 tahun, dashboard CMS mandiri.",
      price: "1999000",
      currency: "IDR",
    },
    {
      name: "Paket Promo Custom Plus (Katalog & Fitur Wisata)",
      description:
        "Website custom multi-halaman dengan katalog produk/paket wisata interaktif, filter kategori, domain & hosting 1 tahun.",
      price: "2800000",
      currency: "IDR",
    },
  ],
};

/**
 * Helper untuk membuat URL WhatsApp dengan prefilled text
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const phone = (CONTACT.whatsappNumber || "62881036657944").replace(/[^0-9]/g, "");
  const defaultText =
    "Halo admin gaweb, saya tertarik memesan pembuatan website custom untuk usaha saya.";
  const text = encodeURIComponent(customMessage || defaultText);
  return `https://wa.me/${phone}?text=${text}`;
}
