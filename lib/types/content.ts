export type PortfolioCategory =
  | "all"
  | "landing-page"
  | "company-profile"
  | "travel"
  | "umkm";

export interface PortfolioItem {
  id: string;
  title: string;
  category: "landing-page" | "company-profile" | "travel" | "umkm";
  categoryLabel: {
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
  metrics: {
    pageSpeed: string; // e.g. "99/100"
    loadTime: string;  // e.g. "0.7s"
    highlight: string; // e.g. "Konversi +42%" or "Mobile-First"
  };
  featured: boolean;
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
  name: string;
  badge?: string;
  isPopular?: boolean;
  target: string;
  originalPrice: string;
  discountBadge: string;
  priceDisplay: string;
  timeline: string;
  description: string;
  features: string[];
}

export interface SiteFaqItem {
  id: string;
  question: { id: string; en: string };
  answer: { id: string; en: string };
}

export interface SiteContentSchema {
  version: string;
  lastUpdated: string;
  hero: SiteHero;
  contact: SiteContact;
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
