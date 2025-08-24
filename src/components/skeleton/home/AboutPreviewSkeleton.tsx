import Shimmer from '@/components/shared/Shimmer';
import { Card, CardContent } from '@/components/ui/card';

const AboutPreviewSkeleton = () => {
    return (
        <section className="relative py-16 lg:py-24 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Skeleton */}
                    <div className="space-y-6">
                        <div className="h-6 w-40 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>

                        <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>

                        <div className="h-6 w-full bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                            <Shimmer />
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-6">
                            {[...Array(2)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center space-x-3"
                                >
                                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg relative overflow-hidden">
                                        <Shimmer />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 mt-6 flex-wrap">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden"
                                >
                                    <Shimmer />
                                </div>
                            ))}
                        </div>

                        <div className="h-10 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg relative overflow-hidden mt-6">
                            <Shimmer />
                        </div>
                    </div>

                    {/* Right Skeleton Card */}
                    <Card className="border-0 shadow-2xl">
                        <CardContent className="p-8 space-y-6">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center space-x-4"
                                >
                                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl relative overflow-hidden">
                                        <Shimmer />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                        <div className="h-3 w-40 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default AboutPreviewSkeleton;
