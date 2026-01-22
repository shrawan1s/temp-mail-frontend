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
            await authApi.requestPasswordReset({
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
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reset your password</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Enter your email and we&apos;ll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-900 dark:text-white">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send reset link"}
                    </Button>
                </form>

                <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                    Remembered your password?{" "}
                    <Link href="/login" className="underline hover:text-blue-600 dark:hover:text-blue-400">
                        Go back to login
                    </Link>
                </p>
            </div>
        </AuthCard>
    )
}
