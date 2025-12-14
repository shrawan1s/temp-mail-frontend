import { NewPasswordForm } from "@/components/auth";
import { NewPasswordFormSkeleton } from "@/components/skeleton";
import { Suspense } from "react";

export default function NewPasswordPage() {
    return (
        <Suspense fallback={<NewPasswordFormSkeleton />}>
            <NewPasswordForm />
        </Suspense>
    )
}
