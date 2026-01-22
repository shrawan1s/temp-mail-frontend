import Shimmer from "@/components/shared/Shimmer";

export default function HeroSkeleton() {
    return (
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden bg-white dark:bg-slate-950">
            {/* Floating icons placeholders */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-6 h-6 rounded-full bg-neutral-300/40 dark:bg-neutral-700/40 animate-pulse"
                    style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + (i * 20) % 80}%`,
                    }}
                />
            ))}

            {/* Radial gradients placeholders */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-cyan-500/10" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto space-y-8">
                    {/* Badge */}
                    <div className="relative w-64 h-8 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden mx-auto">
                        <Shimmer />
                    </div>

                    {/* Headline */}
                    <div className="space-y-4">
                        <div className="relative w-80 h-10 sm:w-[500px] sm:h-14 lg:w-[650px] lg:h-16 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="relative w-72 h-10 sm:w-[400px] sm:h-14 lg:w-[500px] lg:h-16 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>

                    {/* Subtext */}
                    <div className="relative w-full h-20 sm:h-16 max-w-3xl mx-auto rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="relative w-48 h-12 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="relative w-40 h-12 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>

                    {/* Feature highlights */}
                    <div className="flex items-center justify-center gap-8">
                        <div className="relative w-28 h-6 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="relative w-28 h-6 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
