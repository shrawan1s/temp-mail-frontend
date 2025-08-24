import Shimmer from "@/components/shared/Shimmer";

export default function HowItWorksSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-10 space-y-4">
                    <div className="relative w-64 h-10 sm:w-80 sm:h-12 lg:w-[500px] lg:h-14 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="relative w-full max-w-2xl h-6 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Steps Skeleton */}
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="relative h-full border-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-850 shadow-xl rounded-2xl p-8"
                        >
                            {/* Icon + Step Badge */}
                            <div className="relative mb-8">
                                <div className="relative w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-700 overflow-hidden mb-6">
                                    <Shimmer />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                    <Shimmer />
                                </div>
                            </div>

                            {/* Title */}
                            <div className="relative w-32 h-6 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden mb-4">
                                <Shimmer />
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <div className="relative w-full h-4 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                    <Shimmer />
                                </div>
                                <div className="relative w-5/6 h-4 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
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
