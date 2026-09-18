import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { DifferentiatorSection } from "@/components/sections/DifferentiatorSection";
import { DashboardDemoSection } from "@/components/sections/DashboardDemoSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuickInquirySection } from "@/components/sections/QuickInquirySection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 1. Sticky Navigation Header */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section with Value Prop & Direct WhatsApp CTA */}
        <HeroSection />

        {/* 3. Portofolio Hasil Website Nyata (Visual Proof First) */}
        <PortfolioSection />

        {/* 4. Kenapa Tanpa WordPress (Differentiators & Tangible Metrics) */}
        <DifferentiatorSection />

        {/* 5. Demo Dashboard Admin (Buktikan Gampang Kelola Sendiri) */}
        <DashboardDemoSection />

        {/* 6. Paket Layanan & Harga (Pricing Cards) */}
        <PricingSection />

        {/* 7. FAQ (Pertanyaan yang Sering Diajukan) */}
        <FaqSection />

        {/* 8. CTA Akhir & Fast Inquiry WhatsApp Form */}
        <QuickInquirySection />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
