import {
    HeroSkeleton,
    StatisticsSkeleton,
    MissionSectionSkeleton,
    ValuesGridSkeleton,
    TechStackSkeleton,
    SecurityAndPrivacySkeleton,
} from "@/components/skeleton/about";

export default function Loading() {
    return (
        <>
            {/* Hero Section */}
            <HeroSkeleton />
            {/* Statistics */}
            <StatisticsSkeleton />

            {/* Mission Section */}
            <MissionSectionSkeleton />

            {/* Values Grid */}
            <ValuesGridSkeleton />

            {/* Tech Stack */}
            <TechStackSkeleton />

            {/* Security & Privacy */}
            <SecurityAndPrivacySkeleton />
        </>
    )
}
