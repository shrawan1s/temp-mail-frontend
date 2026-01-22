'use client';

import AuthCard from '@/components/shared/AuthCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { authApi } from '@/lib/auth';

const passwordSchema = z.object({
    password: z.string()
        .min(8, 'Minimum 8 characters')
        .regex(/[A-Z]/, 'Must include an uppercase letter')
        .regex(/[a-z]/, 'Must include a lowercase letter')
        .regex(/[0-9]/, 'Must include a number'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})

type PasswordFormValues = z.infer<typeof passwordSchema>

export default function NewPasswordForm() {
    const params = useParams<{ token: string }>()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    // Get token from URL params or query string
    const token = params?.token || searchParams.get('token') || ''

    const { register, handleSubmit, formState: { errors } } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: '', confirmPassword: '' }
    })

    const onSubmit = async (values: PasswordFormValues) => {
        if (!token) {
            toast.error('Invalid reset link');
            return;
        }

        setLoading(true)
        try {
            const response = await authApi.resetPassword({
                token: token,
                newPassword: values.password,
            });

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success('Password updated', { description: 'You can now log in with your new password.' })
            router.push('/login')
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Update failed, The link may be invalid or expired.");
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <AuthCard imageSrc="/images/new-password.png" imageAlt="Reset password">
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Set a new password</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Choose a strong password for your account.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-900 dark:text-white">New password</Label>
                        <Input id="password" type="password" autoComplete="new-password" className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400" {...register('password')} />
                        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Use at least 8 characters with a mix of upper/lowercase and numbers.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-slate-900 dark:text-white">Confirm password</Label>
                        <Input id="confirmPassword" type="password" autoComplete="new-password" className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400" {...register('confirmPassword')} />
                        {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white" disabled={loading}>
                        {loading ? 'Updating…' : 'Update password'}
                    </Button>
                </form>

                <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                    Back to{' '}
                    <Link href="/login" className="underline hover:text-blue-600 dark:hover:text-blue-400">
                        login
                    </Link>
                </p>
            </div>
        </AuthCard>
    )
}
