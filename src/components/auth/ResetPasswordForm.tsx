'use client';

import AuthCard from '@/components/shared/AuthCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { authApi } from '@/lib/auth';

const resetPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email"),
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (values: ResetPasswordFormValues) => {
        try {
            const response = await authApi.requestPasswordReset({
                email: values.email,
            });

            toast.success("Reset link sent! Check your inbox.")
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed to send reset link");
            }
        }
    }

    return (
        <AuthCard imageSrc="/images/reset-password.png" imageAlt="Forgot Password">
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Reset your password</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send reset link"}
                    </Button>
                </form>

                <p className="text-sm text-center text-muted-foreground">
                    Remembered your password?{" "}
                    <Link href="/login" className="underline hover:text-primary">
                        Go back to login
                    </Link>
                </p>
            </div>
        </AuthCard>
    )
}
