import Shimmer from '@/components/shared/Shimmer';
import SkeletonCard from '@/components/skeleton/shared/SkeletonCard';

export default function FeaturesGridSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading skeleton */}
                <div className="text-center mb-10 space-y-4">
                    <div className="w-64 h-8 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="w-96 h-4 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Grid skeleton */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
