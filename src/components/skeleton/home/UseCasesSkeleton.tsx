import Shimmer from '@/components/shared/Shimmer';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';


const SkeletonBox = ({ className }: { className?: string }) => (
    <div className={cn("relative overflow-hidden bg-slate-200 dark:bg-slate-700 rounded-md", className)}>
        <Shimmer />
    </div>
)

export default function UseCasesSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <SkeletonBox className="h-8 w-64 mx-auto mb-4" />
                    <SkeletonBox className="h-5 w-96 mx-auto" />
                </div>

                {/* Cards Grid */}
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card
                            key={i}
                            className="h-full border-0 bg-white dark:bg-slate-800 shadow-xl"
                        >
                            <CardContent className="p-8 flex flex-col justify-between space-y-4 h-full">
                                {/* Top: Icon + Badge + Text */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <SkeletonBox className="w-14 h-14 rounded-2xl" />
                                        <SkeletonBox className="h-6 w-20 rounded-full" />
                                    </div>
                                    <SkeletonBox className="h-6 w-32 mb-4" />
                                    <SkeletonBox className="h-4 w-full mb-2" />
                                    <SkeletonBox className="h-4 w-5/6" />
                                </div>

                                {/* Bottom: Feature List + Button */}
                                <div>
                                    <div className="space-y-3 mb-6">
                                        {Array.from({ length: 4 }).map((_, idx) => (
                                            <SkeletonBox key={idx} className="h-4 w-40" />
                                        ))}
                                    </div>
                                    <SkeletonBox className="h-10 w-full rounded-lg" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
