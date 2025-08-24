import Shimmer from "@/components/shared/Shimmer";

export default function SecurityAndPrivacySkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="h-8 w-64 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-5 my-6 w-96 max-w-full mx-auto rounded bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="flex items-start gap-5 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 shadow-sm"
                        >
                            {/* Icon Placeholder */}
                            <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                <Shimmer />
                            </div>

                            {/* Text */}
                            <div className="flex-1 space-y-2">
                                <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                    <Shimmer />
                                </div>
                                <div className="h-4 w-64 max-w-full rounded bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                    <Shimmer />
                                </div>
                                <div className="h-4 w-48 max-w-full rounded bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                    <Shimmer />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-16 text-center">
                    <div className="h-4 w-72 mx-auto rounded bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </div>
        </section>
    );
};
