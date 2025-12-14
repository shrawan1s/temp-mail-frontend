import { Suspense } from "react";
import dynamic from "next/dynamic";
import PublicLayout from "@/app/(public)/layout";
import {
  HeroSkeleton,
  HowItWorksSkeleton,
  FeaturesGridSkeleton,
  UseCasesSkeleton,
  PremiumPlansSkeleton,
  FAQSkeleton,
  ContactPreviewSkeleton,
  AboutPreviewSkeleton,
} from "@/components/skeleton";

const {
  HowItWorks,
  FeaturesGrid,
  UseCases,
  PremiumPlans,
  AboutPreview,
  ContactPreview,
  FAQ,
} = {
  HowItWorks: dynamic(() => import("@/components/home/HowItWorks")),
  FeaturesGrid: dynamic(() => import("@/components/home/FeaturesGrid")),
  UseCases: dynamic(() => import("@/components/home/UseCases")),
  PremiumPlans: dynamic(() => import("@/components/home/PremiumPlans")),
  AboutPreview: dynamic(() => import("@/components/home/AboutPreview")),
  ContactPreview: dynamic(() => import("@/components/home/ContactPreview")),
  FAQ: dynamic(() => import("@/components/home/FAQ")),
};

import HeroSection from "@/components/home/HeroSection";

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* How It Works */}
      <Suspense fallback={<HowItWorksSkeleton />}>
        <HowItWorks />
      </Suspense>

      {/* Features Grid */}
      <Suspense fallback={<FeaturesGridSkeleton />}>
        <FeaturesGrid />
      </Suspense>

      {/* Use Cases */}
      <Suspense fallback={<UseCasesSkeleton />}>
        <UseCases />
      </Suspense>

      {/* Premium Plans */}
      <Suspense fallback={<PremiumPlansSkeleton />}>
        <PremiumPlans />
      </Suspense>

      {/* About Preview */}
      <Suspense fallback={<AboutPreviewSkeleton />}>
        <AboutPreview />
      </Suspense>

      {/* Contact Preview */}
      <Suspense fallback={<ContactPreviewSkeleton />}>
        <ContactPreview />
      </Suspense>

      {/* FAQ */}
      <Suspense fallback={<FAQSkeleton />}>
        <FAQ />
      </Suspense>
    </PublicLayout>
  )
}
