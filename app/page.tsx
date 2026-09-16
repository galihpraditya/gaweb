import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { DifferentiatorSection } from "@/components/sections/DifferentiatorSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { DashboardDemoSection } from "@/components/sections/DashboardDemoSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuickInquirySection } from "@/components/sections/QuickInquirySection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 1. Sticky Navigation Header */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section with Value Prop & Mockup Showcase */}
        <HeroSection />

        {/* 3. Problem vs Solution Comparison */}
        <ProblemSection />

        {/* 4. Kenapa Tanpa WordPress (Differentiators) */}
        <DifferentiatorSection />

        {/* 5. Portofolio Hasil Website Nyata */}
        <PortfolioSection />

        {/* 6. Demo Dashboard Admin (Buktikan Gampang Kelola Sendiri) */}
        <DashboardDemoSection />

        {/* 7. Paket Layanan & Harga (Pricing Cards) */}
        <PricingSection />

        {/* 8. Proses Kerja 4 Langkah Transparan */}
        <ProcessSection />

        {/* 9. FAQ (Pertanyaan yang Sering Diajukan) */}
        <FaqSection />

        {/* 10. CTA Akhir & Fast Inquiry WhatsApp Form */}
        <QuickInquirySection />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}
