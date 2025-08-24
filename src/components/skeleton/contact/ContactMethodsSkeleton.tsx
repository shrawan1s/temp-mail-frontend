import Shimmer from '@/components/shared/Shimmer';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactMethodsSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            {/* Header Skeleton */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                {/* Title */}
                <div className="h-10 w-48 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden mb-6">
                    <Shimmer />
                </div>

                {/* Paragraph */}
                <div className="space-y-3 max-w-2xl mx-auto">
                    <div className="h-5 w-10/12 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-5 w-8/12 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </div>

            {/* Cards Skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <Card
                            key={idx}
                            className="h-full flex flex-col border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg"
                        >
                            <CardContent className="flex-1 p-8 flex flex-col justify-between relative">
                                {/* Pro badge skeleton */}
                                {idx === 2 && (
                                    <div className="absolute top-3 right-3 w-16 h-6 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                        <Shimmer />
                                    </div>
                                )}

                                {/* Icon circle */}
                                <div className="space-y-4 text-center mt-4">
                                    <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto relative overflow-hidden">
                                        <Shimmer />
                                    </div>

                                    {/* Title */}
                                    <div className="h-6 w-32 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                        <Shimmer />
                                    </div>

                                    {/* Description lines */}
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                    </div>
                                </div>

                                {/* CTA button */}
                                <div className="mt-6 text-center">
                                    <div className="h-10 w-32 mx-auto rounded-lg bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
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
