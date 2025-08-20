import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/about/HeroSection';
import { MissionSection } from '@/components/about/MissionSection';
import { ValuesGrid } from '@/components/about/ValuesGrid';
import { TechStack } from '@/components/about/TechStack';
import { Statistics } from '@/components/about/Statistics';
import { SecurityAndPrivacy } from '@/components/about/SecurityAndPrivacy';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Statistics */}
      <Statistics />

      {/* Mission Section */}
      <MissionSection />

      {/* Values Grid */}
      <ValuesGrid />

      {/* Tech Stack */}
      <TechStack />

      {/* Security & Privacy */}
      <SecurityAndPrivacy />

      {/* Footer */}
      <Footer />
    </div >
  )
}
