import Shimmer from "@/components/shared/Shimmer";
import { ReactNode } from "react";

interface AuthCardSkeletonProps {
    children?: ReactNode;
}

export default function AuthCardSkeleton({ children }: AuthCardSkeletonProps) {
    return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl border-0 rounded-2xl">
            {/* Left: Form Skeleton */}
            <div className="p-8 flex flex-col justify-center space-y-6 bg-white dark:bg-slate-900">
                {children}
            </div>

            {/* Right: Image Skeleton */}
            <div className="hidden md:block relative bg-slate-200 dark:bg-slate-700/60 overflow-hidden">
                <div className="absolute inset-0">
                    <Shimmer />
                </div>
            </div>
        </div>
    );
}
