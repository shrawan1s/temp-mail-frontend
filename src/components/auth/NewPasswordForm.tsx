'use client';

import AuthCard from '@/components/shared/AuthCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';

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
    const { token } = useParams<{ token: string }>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: '', confirmPassword: '' }
    })

    const onSubmit = async (values: PasswordFormValues) => {
        setLoading(true)
        try {
            console.log("Password updated successfully!", values);

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
                    <h1 className="text-2xl font-bold">Set a new password</h1>
                    <p className="text-sm text-muted-foreground">
                        Choose a strong password for your account.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-2">
                        <Label htmlFor="password">New password</Label>
                        <Input id="password" type="password" autoComplete="new-password" {...register('password')} />
                        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                        <p className="text-xs text-muted-foreground">
                            Use at least 8 characters with a mix of upper/lowercase and numbers.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <Input id="confirmPassword" type="password" autoComplete="new-password" {...register('confirmPassword')} />
                        {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
                    </div>

                    <Button className="w-full" disabled={loading}>
                        {loading ? 'Updating…' : 'Update password'}
                    </Button>
                </form>

                <p className="text-sm text-center text-muted-foreground">
                    Back to{' '}
                    <Link href="/login" className="underline hover:text-primary">
                        login
                    </Link>
                </p>

                {/* Hidden field just to show we have the token (optional) */}
                <input type="hidden" value={token} readOnly />
            </div>
        </AuthCard>
    )
}
