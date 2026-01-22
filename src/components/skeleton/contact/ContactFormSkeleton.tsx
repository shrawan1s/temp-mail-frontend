import Shimmer from "@/components/shared/Shimmer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ContactFormSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header Skeleton */}
                <div className="text-center mb-12">
                    <div className="h-10 w-56 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden mb-4">
                        <Shimmer />
                    </div>
                    <div className="h-6 w-3/4 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Card Skeleton */}
                <Card className="border border-slate-200 dark:border-slate-700 shadow-xl bg-white dark:bg-slate-800">
                    <CardHeader>
                        <div className="h-6 w-40 rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                            <Shimmer />
                        </div>
                    </CardHeader>
                    <CardContent className="px-8 space-y-6">
                        {/* Name & Email */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                        <Shimmer />
                                    </div>
                                    <div className="h-10 w-full rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                        <Shimmer />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                            <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                <Shimmer />
                            </div>
                            <div className="h-10 w-full rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                <Shimmer />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                <Shimmer />
                            </div>
                            <div className="h-28 w-full rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                <Shimmer />
                            </div>
                        </div>

                        {/* Button */}
                        <div className="h-12 w-full rounded-lg bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                            <Shimmer />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
