import Shimmer from "@/components/shared/Shimmer";

export default function HeroSkeleton() {
    return (
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-36 lg:pb-28">
            {/* decorative background skeleton effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/40 via-orange-50/30 to-red-50/10 dark:from-yellow-900/6 dark:via-orange-900/6 dark:to-red-900/4" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mx-auto max-w-4xl">
                    {/* Badge */}
                    <div className="mb-6 flex justify-center">
                        <div className="h-8 w-40 rounded-full bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>

                    {/* Headline */}
                    <div className="h-12 w-3/4 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden mb-6">
                        <Shimmer />
                    </div>
                    <div className="h-12 w-3/6 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden mb-6">
                        <Shimmer />
                    </div>

                    {/* Subhead */}
                    <div className="space-y-3 mb-8">
                        <div className="h-5 w-11/12 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="h-5 w-3/4 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                        <div className="h-12 w-40 rounded-lg bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="h-12 w-36 rounded-lg bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
