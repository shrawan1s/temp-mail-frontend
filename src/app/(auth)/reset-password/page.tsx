import { ResetPasswordForm } from "@/components/auth";
import { ResetPasswordFormSkeleton } from "@/components/skeleton";
import { Suspense } from "react";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<ResetPasswordFormSkeleton />}>
            <ResetPasswordForm />
        </Suspense>
    )
}
