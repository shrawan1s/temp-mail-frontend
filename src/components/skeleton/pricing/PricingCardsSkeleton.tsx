import Shimmer from "@/components/shared/Shimmer";

export default function PricingCardsSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* header */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="h-8 w-48 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden mb-4">
                        <Shimmer />
                    </div>
                    <div className="h-5 w-2/3 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
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

                {/* plans grid */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <article key={i} className="flex">
                            <div className="flex-1 flex flex-col border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                                {/* title */}
                                <div className="h-6 w-24 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden mb-3">
                                    <Shimmer />
                                </div>
                                {/* description */}
                                <div className="h-4 w-32 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden mb-2">
                                    <Shimmer />
                                </div>

                                {/* price */}
                                <div className="h-10 w-20 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden mb-6">
                                    <Shimmer />
                                </div>
                                <div className="h-4 w-16 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden mb-4">
                                    <Shimmer />
                                </div>

                                {/* features list */}
                                <ul className="space-y-3 mb-6">
                                    {[1, 2, 3, 4, 5].map((j) => (
                                        <li key={j} className="flex items-center gap-3">
                                            <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                                <Shimmer />
                                            </div>
                                            <div className="h-4 flex-1 rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                                <Shimmer />
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA button */}
                                <div className="h-12 w-full rounded-lg bg-slate-200 dark:bg-slate-700 relative overflow-hidden mt-auto">
                                    <Shimmer />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* footer note */}
                <div className="text-center mt-10">
                    <div className="h-4 w-80 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </div>
        </section>
    );
}
