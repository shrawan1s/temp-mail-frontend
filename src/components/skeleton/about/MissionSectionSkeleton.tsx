import Shimmer from "@/components/shared/Shimmer";

export default function MissionSectionSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">

                {/* Skeleton Glassmorphic Card */}
                <div
                    className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg border border-white/30 dark:border-slate-800/50 rounded-2xl p-8 shadow-lg"
                >
                    {/* Title */}
                    <div className="h-8 w-40 mb-4 rounded bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                        <Shimmer />
                    </div>

                    {/* Paragraph lines */}
                    <div className="space-y-3 mb-4">
                        <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>
                </div>

                {/* Skeleton Illustration Panel */}
                <div
                    className="w-full h-80 lg:h-[28rem] rounded-2xl overflow-hidden shadow-lg relative bg-slate-200 dark:bg-slate-700/60"
                >
                    <Shimmer />
                </div>
            </div>
        </section>
    );
};
