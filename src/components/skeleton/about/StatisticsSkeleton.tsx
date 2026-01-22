import Shimmer from "@/components/shared/Shimmer";
import { Card, CardContent } from "@/components/ui/card";

export default function StatisticsSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-violet-50/50 dark:bg-slate-900 dark:from-slate-900 dark:to-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {[...Array(3)].map((_, index) => (
                        <Card
                            key={index}
                            className="relative border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg overflow-hidden"
                        >
                            <CardContent className="p-8">
                                {/* Number placeholder */}
                                <div className="h-10 w-32 mx-auto mb-4 rounded-lg bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                                    <Shimmer />
                                </div>
                                {/* Label placeholder */}
                                <div className="h-5 w-24 mx-auto rounded bg-slate-200 dark:bg-slate-700/60 relative overflow-hidden">
                                    <Shimmer />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
