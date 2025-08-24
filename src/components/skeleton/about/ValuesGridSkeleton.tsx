import Shimmer from "@/components/shared/Shimmer";

export default function ValuesGridSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                {/* Title */}
                <div className="h-8 w-48 mx-auto rounded bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                    <Shimmer />
                </div>

                {/* Subtitle */}
                <div className="h-4 w-80 my-4 mx-auto rounded bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                    <Shimmer />
                </div>
            </div>

            {/* Skeleton Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-full border-0 rounded-2xl bg-white/60 dark:bg-slate-800 shadow-lg p-8 space-y-6 relative overflow-hidden"
                        >
                            {/* Icon placeholder */}
                            <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                                <Shimmer />
                            </div>

                            {/* Title */}
                            <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                                <Shimmer />
                            </div>

                            {/* Paragraph lines */}
                            <div className="space-y-3">
                                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                                    <Shimmer />
                                </div>
                                <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                                    <Shimmer />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
