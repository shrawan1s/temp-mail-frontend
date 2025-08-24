import Shimmer from "@/components/shared/Shimmer";

export default function HeaderSkeleton() {
    const navItems = Array.from({ length: 4 })

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/20 dark:border-slate-700/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo skeleton */}
                    <div className="flex items-center space-x-3">
                        <div className="relative w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="relative w-28 h-5 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>

                    {/* Desktop Navigation skeleton */}
                    <nav className="hidden lg:flex items-center space-x-2">
                        {navItems.map((_, i) => (
                            <div
                                key={i}
                                className="relative w-16 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden"
                            >
                                <Shimmer />
                            </div>
                        ))}
                    </nav>

                    {/* Desktop Actions skeleton */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <div className="relative w-32 h-9 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>

                    {/* Mobile Menu Button skeleton */}
                    <div className="lg:hidden relative w-9 h-9 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </div>
        </header>
    )
}
