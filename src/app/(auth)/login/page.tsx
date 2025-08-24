import { LoginForm } from "@/components/auth";
import LoginFormSkeleton from "@/components/skeleton/auth/LoginFormSkeleton";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginFormSkeleton />}>
            <LoginForm />
        </Suspense>
    );
}
