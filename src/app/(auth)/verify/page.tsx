import { VerifyForm } from "@/components/auth";
import { VerifyFormSkeleton } from "@/components/skeleton";
import { Suspense } from "react";

export default function VerifyPage() {
    return (
        <Suspense fallback={<VerifyFormSkeleton />}>
            <VerifyForm />
        </Suspense>
    )
}
