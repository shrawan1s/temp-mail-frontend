import Shimmer from '@/components/shared/Shimmer';
import { Card, CardContent } from '@/components/ui/card';

export default function SkeletonCard() {
    return (
        <Card className="relative h-full border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-md overflow-hidden">
            <Shimmer />

            <CardContent className="p-6 space-y-4 relative">
                {/* Icon placeholder */}
                <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                    <Shimmer />
                </div>

                {/* Title placeholder */}
                <div className="w-32 h-4 rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                    <Shimmer />
                </div>

                {/* Description placeholder */}
                <div className="space-y-2">
                    <div className="w-full h-3 rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="w-5/6 h-3 rounded-md bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}