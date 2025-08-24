import Shimmer from "@/components/shared/Shimmer";
import AuthCardSkeleton from "@/components/skeleton/shared/AuthCardSkeleton";

export default function LoginFormSkeleton() {
    return (
        <AuthCardSkeleton>
            <div className="space-y-6">
                {/* Header Skeleton */}
                <div className="text-center space-y-2">
                    <div className="relative w-36 h-6 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="relative w-52 h-4 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Form Skeleton */}
                <div className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                        <div className="relative w-20 h-4 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="relative w-full h-10 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <div className="relative w-20 h-4 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="relative w-full h-10 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="relative w-full h-10 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Divider Skeleton */}
                <div className="flex items-center gap-2 my-4">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="relative w-8 h-4 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* SSO Buttons Skeleton */}
                <div className="space-y-2">
                    {[0, 1].map((_, i) => (
                        <div
                            key={i}
                            className="relative w-full h-10 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden"
                        >
                            <Shimmer />
                        </div>
                    ))}
                </div>

                {/* Links Skeleton */}
                <div className="flex items-center justify-between text-sm">
                    <div className="relative w-28 h-4 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="relative w-32 h-4 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </div>
        </AuthCardSkeleton>
    );
}
