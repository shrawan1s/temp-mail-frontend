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

export default function Loading() {
    return (
        <>
            {/* Hero Section */}
            <HeroSkeleton />

            {/* How It Works */}
            <HowItWorksSkeleton />

            {/* Features Grid */}
            <FeaturesGridSkeleton />

            {/* Use Cases */}
            <UseCasesSkeleton />

            {/* Premium Plans */}
            <PremiumPlansSkeleton />

            {/* About Preview */}
            <AboutPreviewSkeleton />

            {/* Contact Preview */}
            <ContactPreviewSkeleton />

            {/* FAQ */}
            <FAQSkeleton />
        </>
    )
}
