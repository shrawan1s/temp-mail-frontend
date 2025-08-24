import Shimmer from "@/components/shared/Shimmer";

export default function FAQSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading Skeleton */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="h-8 w-48 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden mb-4">
                        <Shimmer />
                    </div>
                    <div className="h-5 w-2/3 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* FAQ Items Skeleton */}
                <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="border border-slate-200 dark:border-slate-700 rounded-xl px-6 py-6 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden"
                        >
                            {/* Question placeholder */}
                            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-4 relative overflow-hidden">
                                <Shimmer />
                            </div>
                            {/* Answer placeholder */}
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                    <Shimmer />
                                </div>
                                <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                                    <Shimmer />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
