import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { UseCases } from '@/components/home/UseCases';
import { PremiumPlans } from '@/components/home/PremiumPlans';
import { AboutPreview } from '@/components/home/AboutPreview';
import { ContactPreview } from '@/components/home/ContactPreview';
import { FAQ } from '@/components/home/FAQ';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Use Cases */}
      <UseCases />

      {/* Premium Plans */}
      <PremiumPlans />

      {/* About Preview */}
      <AboutPreview />

      {/* Contact Preview */}
      <ContactPreview />

      {/* FAQ */}
      <FAQ />

      <Footer />
    </div>
  )
}
