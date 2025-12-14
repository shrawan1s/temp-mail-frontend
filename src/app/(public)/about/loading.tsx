import {
    AboutHeroSkeleton,
    StatisticsSkeleton,
    MissionSectionSkeleton,
    ValuesGridSkeleton,
    TechStackSkeleton,
    SecurityAndPrivacySkeleton,
} from "@/components/skeleton";

export default function Loading() {
    return (
        <>
            {/* Hero Section */}
            <AboutHeroSkeleton />
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
