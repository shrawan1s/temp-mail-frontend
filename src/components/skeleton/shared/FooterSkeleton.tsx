import Shimmer from "@/components/shared/Shimmer";

export default function FooterSkeleton() {
    const linkSections = ['Product', 'Company', 'Legal']

    return (
        <footer className="bg-slate-900 dark:bg-slate-950 text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Skeleton */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="relative w-8 h-8 rounded-lg bg-slate-800 overflow-hidden">
                                <Shimmer />
                            </div>
                            <div className="relative w-28 h-6 rounded-md bg-slate-800 overflow-hidden">
                                <Shimmer />
                            </div>
                        </div>

                        <div className="relative w-full h-12 rounded-md bg-slate-800 overflow-hidden max-w-md">
                            <Shimmer />
                        </div>

                        <div className="flex space-x-4">
                            <div className="relative w-8 h-8 rounded-md bg-slate-800 overflow-hidden">
                                <Shimmer />
                            </div>
                            <div className="relative w-8 h-8 rounded-md bg-slate-800 overflow-hidden">
                                <Shimmer />
                            </div>
                        </div>
                    </div>

                    {/* Links Skeleton */}
                    {linkSections.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                            <div className="relative w-20 h-5 rounded-md bg-slate-800 overflow-hidden">
                                <Shimmer />
                            </div>
                            <ul className="space-y-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <li key={i}>
                                        <div className="relative w-24 h-4 rounded-md bg-slate-800 overflow-hidden">
                                            <Shimmer />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-48 h-4 rounded-md bg-slate-800 overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="relative w-32 h-4 rounded-md bg-slate-800 overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </div>
        </footer>
    )
}
