import Shimmer from '@/components/shared/Shimmer';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactPreviewSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content Skeleton */}
                    <div className="space-y-6">
                        <div className="h-10 w-2/3 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="h-5 w-full bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="h-5 w-5/6 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>

                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-slate-300 dark:bg-slate-700 rounded-lg relative overflow-hidden">
                                        <Shimmer />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>

                    {/* Right Form Skeleton */}
                    <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-2xl">
                        <CardContent className="p-8 space-y-6">
                            <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                <Shimmer />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                    <Shimmer />
                                </div>
                                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                    <Shimmer />
                                </div>
                            </div>

                            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                <Shimmer />
                            </div>

                            <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                <Shimmer />
                            </div>

                            <div className="h-3 w-40 mx-auto bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                <Shimmer />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
