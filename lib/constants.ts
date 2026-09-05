/**
 * constants.ts — Brand, Contact & WhatsApp helper untuk gaweb (Gawe Website)
 */

export const BRAND = {
  name: "gaweb",
  fullName: "Gawe Website",
  tagline: "Jasa Pembuatan Website",
  description:
    "Jasa pembuatan website landing page & company profile untuk berbagai bisnis & profesional. Super cepat, aman, terima beres domain + hosting + dashboard admin mandiri.",
  badge: "100% Custom Code • Bukan WordPress",
};

export const CONTACT = {
  whatsappNumber: process.env.NEXT_PUBLIC_WA_NUMBER || "62881036657944",
  email: "gaweb.website@gmail.com",
  instagram: "@gaweb.site",
  location: "Malang, Indonesia",
};

/**
 * Helper untuk membuat URL WhatsApp dengan prefilled text
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const phone = (CONTACT.whatsappNumber || "62881036657944").replace(/[^0-9]/g, "");
  const defaultText =
    "Halo admin, saya tertarik memesan pembuatan website custom untuk usaha saya.";
  const text = encodeURIComponent(customMessage || defaultText);
  return `https://wa.me/${phone}?text=${text}`;
}
