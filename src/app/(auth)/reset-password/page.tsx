import { ResetPasswordForm } from "@/components/auth";
import ResetPasswordFormSkeleton from "@/components/skeleton/auth/ResetPasswordFormSkeleton";
import { Suspense } from "react";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<ResetPasswordFormSkeleton />}>
            <ResetPasswordForm />
        </Suspense>
    )
}
