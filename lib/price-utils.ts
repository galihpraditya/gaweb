/**
 * price-utils.ts — Helper kalkulasi harga dan diskon otomatis
 */

export function parsePriceToNumber(priceStr?: string): number {
  if (!priceStr) return 0;
  const digitsOnly = priceStr.replace(/\D/g, "");
  return digitsOnly ? parseInt(digitsOnly, 10) : 0;
}

export function calculateDiscountPercent(
  originalPriceStr?: string,
  promoPriceStr?: string
): number | null {
  const original = parsePriceToNumber(originalPriceStr);
  const promo = parsePriceToNumber(promoPriceStr);

  if (!original || !promo || original <= promo) return null;

  const percent = Math.round(((original - promo) / original) * 100);
  return percent > 0 ? percent : null;
}

export function formatDiscountBadge(
  originalPriceStr?: string,
  promoPriceStr?: string,
  lang: "id" | "en" = "id",
  fallbackBadge?: string
): string | null {
  const percent = calculateDiscountPercent(originalPriceStr, promoPriceStr);

  if (percent !== null) {
    return lang === "en" ? `Save ${percent}%` : `Hemat ${percent}%`;
  }

  return fallbackBadge || null;
}

