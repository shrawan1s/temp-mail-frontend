import Shimmer from "@/components/shared/Shimmer";
import AuthCardSkeleton from "@/components/skeleton/shared/AuthCardSkeleton";

export default function ResetPasswordFormSkeleton() {
    return (
        <AuthCardSkeleton>
            <div className="space-y-6">
                {/* Header Skeleton */}
                <div className="text-center space-y-2">
                    <div className="relative w-48 h-6 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="relative w-64 h-4 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
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

                    {/* Submit Button */}
                    <div className="relative w-full h-10 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                </div>

                {/* Links Skeleton */}
                <div className="flex justify-center text-sm mt-2">
                    <div className="relative w-56 h-4 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </div>
        </AuthCardSkeleton>
    );
}
