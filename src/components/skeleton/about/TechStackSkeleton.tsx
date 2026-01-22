import { Card, CardContent } from '@/components/ui/card';
import Shimmer from '@/components/shared/Shimmer';

export default function TechStackSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            {/* Header Skeleton */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <div className="h-8 w-64 mx-auto bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                    <Shimmer />
                </div>
                <div className="h-4 w-80 my-4 mx-auto bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden mt-4">
                    <Shimmer />
                </div>
            </div>

            {/* Cards Skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, idx) => (
                        <Card
                            key={idx}
                            className="h-full flex flex-col border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        >
                            <CardContent className="flex-1 flex items-start space-x-4 p-6">
                                {/* Icon Placeholder */}
                                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg relative overflow-hidden">
                                    <Shimmer />
                                </div>
                                {/* Text Placeholder */}
                                <div className="flex-1 space-y-3">
                                    <div className="h-5 w-28 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                        <Shimmer />
                                    </div>
                                    <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                        <Shimmer />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
