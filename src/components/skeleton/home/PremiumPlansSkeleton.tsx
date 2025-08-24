import Shimmer from '@/components/shared/Shimmer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const SkeletonBlock = ({ className }: { className?: string }) => (
    <div className={`relative overflow-hidden rounded-md bg-slate-200 dark:bg-slate-700 ${className}`}>
        <Shimmer />
    </div>
);

export default function PremiumPlansSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* header skeleton */}
                <div className="text-center mb-12 space-y-4">
                    <SkeletonBlock className="h-10 w-64 mx-auto" />
                    <SkeletonBlock className="h-6 w-96 mx-auto" />
                </div>

                {/* billing toggle skeleton */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex gap-2 p-1 rounded-full bg-slate-100 dark:bg-slate-800">
                        <div className="h-9 w-20 rounded-full bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="h-9 w-20 rounded-full bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>
                </div>

                {/* plans grid skeleton */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card
                            key={i}
                            className="flex-1 flex flex-col border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg"
                        >
                            <CardHeader className="pt-8 text-center space-y-4">
                                <SkeletonBlock className="h-7 w-32 mx-auto" />
                                <SkeletonBlock className="h-5 w-48 mx-auto" />
                                <SkeletonBlock className="h-12 w-24 mx-auto mt-4 rounded-lg" />
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col justify-between p-6">
                                <div className="space-y-3 mb-6">
                                    {[...Array(6)].map((_, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <SkeletonBlock className="h-5 w-5 rounded-full" />
                                            <SkeletonBlock className="h-4 w-48" />
                                        </div>
                                    ))}
                                </div>
                                <SkeletonBlock className="h-12 w-full rounded-lg" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* footer note skeleton */}
                <div className="text-center mt-10">
                    <SkeletonBlock className="h-4 w-80 mx-auto" />
                </div>
            </div>
        </section>
    );
};
