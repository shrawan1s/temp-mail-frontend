import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import {
  PricingHeroSkeleton,
  PricingCardsSkeleton,
  PricingFeatureComparisonSkeleton,
  PricingFAQSkeleton
} from '@/components/skeleton';

const {
  PricingCards,
  FeatureComparison,
  FAQ
} = {
  PricingCards: dynamic(() => import('@/components/pricing/PricingCards')),
  FeatureComparison: dynamic(() => import('@/components/pricing/FeatureComparison')),
  FAQ: dynamic(() => import('@/components/pricing/FAQ')),
};

import HeroSection from '@/components/pricing/HeroSection';

export default function PremiumPage() {
  return (
    <>
      {/* Hero Section */}
      <Suspense fallback={<PricingHeroSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Pricing Cards */}
      <Suspense fallback={<PricingCardsSkeleton />}>
        <PricingCards />
      </Suspense>

      {/* Feature Comparison */}
      <Suspense fallback={<PricingFeatureComparisonSkeleton />}>
        <FeatureComparison />
      </Suspense>

      {/* FAQ Section */}
      <Suspense fallback={<PricingFAQSkeleton />}>
        <FAQ />
      </Suspense >
    </>
  )
}
