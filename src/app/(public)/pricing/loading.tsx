import { PricingHeroSkeleton, PricingCardsSkeleton, PricingFeatureComparisonSkeleton, PricingFAQSkeleton } from '@/components/skeleton';

export default function Loading() {
    return (
        <>
            <PricingHeroSkeleton />
            <PricingCardsSkeleton />
            <PricingFeatureComparisonSkeleton />
            <PricingFAQSkeleton />
        </>
    );
}
