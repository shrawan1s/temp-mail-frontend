import { HeroSkeleton, PricingCardsSkeleton, FeatureComparisonSkeleton, FAQSkeleton } from '@/components/skeleton/pricing';

export default function Loading() {
    return (
        <>
            <HeroSkeleton />
            <PricingCardsSkeleton />
            <FeatureComparisonSkeleton />
            <FAQSkeleton />
        </>
    );
}
