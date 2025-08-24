import Shimmer from "@/components/shared/Shimmer";
import AuthCardSkeleton from "@/components/skeleton/shared/AuthCardSkeleton";

export default function SignupFormSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 overflow-hidden">
            <AuthCardSkeleton>
                <div className="space-y-6">
                    {/* Header Skeleton */}
                    <div className="text-center space-y-2">
                        <div className="relative w-44 h-6 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                        <div className="relative w-64 h-4 mx-auto rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>

                    {/* Form Skeleton */}
                    <div className="space-y-4">
                        {["name", "email", "password", "confirmPassword"].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="relative w-24 h-4 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                    <Shimmer />
                                </div>
                                <div className="relative w-full h-10 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                    <Shimmer />
                                </div>
                            </div>
                        ))}

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
                    <div className="flex justify-center text-sm mt-2">
                        <div className="relative w-40 h-4 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <Shimmer />
                        </div>
                    </div>
                </div>
            </AuthCardSkeleton>
        </div>
    );
}
