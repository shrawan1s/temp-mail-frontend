import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import {
  HeroSkeleton,
  PricingCardsSkeleton,
  FeatureComparisonSkeleton,
  FAQSkeleton
} from '@/components/skeleton/pricing';

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
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Pricing Cards */}
      <Suspense fallback={<PricingCardsSkeleton />}>
        <PricingCards />
      </Suspense>

      {/* Feature Comparison */}
      <Suspense fallback={<FeatureComparisonSkeleton />}>
        <FeatureComparison />
      </Suspense>

      {/* FAQ Section */}
      <Suspense fallback={<FAQSkeleton />}>
        <FAQ />
      </Suspense >
    </>
  )
}
