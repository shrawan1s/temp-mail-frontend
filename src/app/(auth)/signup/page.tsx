import { SignupForm } from "@/components/auth";
import SignupFormSkeleton from "@/components/skeleton/auth/SignupFormSkeleton";
import { Suspense } from "react";

export default function SignupPage() {
    return (
        <Suspense fallback={<SignupFormSkeleton />}>
            <SignupForm />
        </Suspense>
    )
}
