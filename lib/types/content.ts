export type PortfolioCategory =
  | "all"
  | "landing-page"
  | "company-profile"
  | "travel"
  | "umkm";

export interface PortfolioItem {
  id: string;
  title: string;
  category?: "landing-page" | "company-profile" | "travel" | "umkm" | string;
  categoryLabel?: {
    id: string;
    en: string;
  };
  clientName: string;
  description: {
    id: string;
    en: string;
  };
  imageUrl: string;
  demoUrl?: string;
  tags: string[];
  metrics?: {
    pageSpeed?: string;
    loadTime?: string;
    highlight?: string;
  };
  featured?: boolean;
  order: number;
}

export interface SiteContact {
  whatsappNumber: string;
  email: string;
  instagram: string;
  location: string;
  city: string;
}

export interface SiteHero {
  h1Pre: { id: string; en: string };
  h1Highlight: { id: string; en: string };
  h1Post: { id: string; en: string };
  subtitle: { id: string; en: string };
  bgImageUrl: string;
  ctaPrimary: { id: string; en: string };
  ctaSecondary: { id: string; en: string };
}

export interface SitePricingPlan {
  id: string;
  name: string | { id: string; en: string };
  badge?: string | { id: string; en: string };
  isPopular?: boolean;
  target?: string | { id: string; en: string };
  originalPrice: string;
  discountBadge?: string | { id: string; en: string };
  priceDisplay: string;
  timeline?: string | { id: string; en: string };
  description?: string | { id: string; en: string };
  features?: string[] | { id: string[]; en: string[] };
}

export interface SiteFaqItem {
  id: string;
  question: { id: string; en: string };
  answer: { id: string; en: string };
}

export interface SiteSeoConfig {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

export interface SiteContentSchema {
  version: string;
  lastUpdated: string;
  hero: SiteHero;
  contact: SiteContact;
  seo?: SiteSeoConfig;
  portfolios: PortfolioItem[];
  pricing: SitePricingPlan[];
  faqs: SiteFaqItem[];
  mediaLibrary: {
    id: string;
    name: string;
    url: string;
    category: "hero" | "showcase" | "dashboard" | "logo" | "uploads";
    uploadedAt: string;
  }[];
}
