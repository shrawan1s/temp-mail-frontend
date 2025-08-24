import Shimmer from "@/components/shared/Shimmer";

export default function HeroSkeleton() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
            {/* Radial gradient backplate (lighter for skeleton) */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-100/40 via-slate-200/40 to-slate-100/40 dark:from-slate-800/40 dark:via-slate-700/40 dark:to-slate-800/40" />
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-slate-200/20 dark:bg-slate-700/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-200/20 dark:bg-slate-700/20 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge skeleton */}
                <div className="mb-8 flex justify-center">
                    <div className="h-8 w-28 rounded-full bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Headline skeleton */}
                <div className="space-y-4 mb-6">
                    <div className="h-10 w-3/4 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Subtext skeleton */}
                <div className="space-y-3 mb-12">
                    <div className="h-6 w-11/12 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-6 w-10/12 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* CTA skeleton */}
                <div className="flex justify-center">
                    <div className="h-12 w-40 rounded-lg bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </div>
        </section>
    )
}
