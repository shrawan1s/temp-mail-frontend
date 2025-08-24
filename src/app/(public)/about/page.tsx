import { Suspense } from "react";
import dynamic from "next/dynamic";

import {
  HeroSkeleton,
  StatisticsSkeleton,
  MissionSectionSkeleton,
  ValuesGridSkeleton,
  TechStackSkeleton,
  SecurityAndPrivacySkeleton,
} from "@/components/skeleton/about";

const {
  Statistics,
  MissionSection,
  ValuesGrid,
  TechStack,
  SecurityAndPrivacy,
} = {
  Statistics: dynamic(() => import("@/components/about/Statistics")),
  MissionSection: dynamic(() => import("@/components/about/MissionSection")),
  ValuesGrid: dynamic(() => import("@/components/about/ValuesGrid")),
  TechStack: dynamic(() => import("@/components/about/TechStack")),
  SecurityAndPrivacy: dynamic(() => import("@/components/about/SecurityAndPrivacy")),
};

import HeroSection from "@/components/about/HeroSection";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Statistics */}
      <Suspense fallback={<StatisticsSkeleton />}>
        <Statistics />
      </Suspense>

      {/* Mission Section */}
      <Suspense fallback={<MissionSectionSkeleton />}>
        <MissionSection />
      </Suspense>

      {/* Values Grid */}
      <Suspense fallback={<ValuesGridSkeleton />}>
        <ValuesGrid />
      </Suspense>

      {/* Tech Stack */}
      <Suspense fallback={<TechStackSkeleton />}>
        <TechStack />
      </Suspense>

      {/* Security & Privacy */}
      <Suspense fallback={<SecurityAndPrivacySkeleton />}>
        <SecurityAndPrivacy />
      </Suspense>
    </>
  )
}
