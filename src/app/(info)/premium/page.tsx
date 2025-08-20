import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import HeroSection from '@/components/premium/HeroSection';
import PricingCards from '@/components/premium/PricingCards';
import FeatureComparison from '@/components/premium/FeatureComparison';
import FAQ from '@/components/premium/FAQ';

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Pricing Cards */}
      <PricingCards />

      {/* Feature Comparison */}
      <FeatureComparison />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  )
}
