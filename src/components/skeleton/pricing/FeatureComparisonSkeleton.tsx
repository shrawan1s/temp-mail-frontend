import Shimmer from "@/components/shared/Shimmer";
import { Card, CardContent } from "@/components/ui/card";

export default function FeatureComparisonSkeleton() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* header */}
                <div className="text-center mb-8">
                    <div className="h-8 w-60 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden mb-4">
                        <Shimmer />
                    </div>
                    <div className="h-5 w-2/3 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Desktop skeleton table */}
                <div className="hidden md:block">
                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm">
                        <table className="w-full table-fixed text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/40">
                                    <th className="w-[38%] p-5">
                                        <div className="h-5 w-32 rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                    </th>
                                    <th className="w-[20%] p-5 text-center">
                                        <div className="h-5 w-20 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                    </th>
                                    <th className="w-[21%] p-5 text-center">
                                        <div className="h-5 w-20 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                    </th>
                                    <th className="w-[21%] p-5 text-center">
                                        <div className="h-5 w-20 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {[...Array(6)].map((_, i) => (
                                    <tr
                                        key={i}
                                        className="border-t border-slate-100 dark:border-slate-700"
                                    >
                                        {/* feature cell */}
                                        <td className="p-5 align-top">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                                    <Shimmer />
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-5 w-32 rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                                        <Shimmer />
                                                    </div>
                                                    <div className="h-4 w-48 rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                                        <Shimmer />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* value cells */}
                                        {[1, 2, 3].map((j) => (
                                            <td key={j} className="p-5 text-center align-top">
                                                <div className="h-5 w-16 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                                    <Shimmer />
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile skeleton cards */}
                <div className="md:hidden space-y-4">
                    {[...Array(6)].map((_, i) => (
                        <Card
                            key={i}
                            className="border border-slate-100 dark:border-slate-800"
                        >
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                        <Shimmer />
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <div className="h-5 w-32 rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                            <Shimmer />
                                        </div>
                                        <div className="h-4 w-40 rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                            <Shimmer />
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            {[1, 2, 3].map((j) => (
                                                <div
                                                    key={j}
                                                    className="p-3 rounded bg-slate-100 dark:bg-slate-800/60"
                                                >
                                                    <div className="h-4 w-12 mx-auto rounded bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                                        <Shimmer />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
