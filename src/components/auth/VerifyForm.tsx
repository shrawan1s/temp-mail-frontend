'use client'

import AuthCard from '@/components/shared/AuthCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';

const otpSchema = z.object({
    otp: z.string()
        .length(6, 'OTP must be exactly 6 digits')
        .regex(/^\d+$/, 'OTP must contain only numbers')
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function VerifyForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const userId = searchParams.get('userId');
    const email = searchParams.get('email');

    const { register, handleSubmit, formState: { errors } } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: '' }
    });

    const onSubmit = async (values: OtpFormValues) => {
        if (!userId) {
            toast.error('Missing user ID. Please sign up again.');
            router.push('/signup');
            return;
        }

        setLoading(true);
        try {
            const response = await authApi.verifyEmail({
                userId: userId,
                code: values.otp,
            });

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            if (response.data?.access_token && response.data?.refresh_token && response.data?.user) {
                login(response.data?.access_token, response.data?.refresh_token, response.data?.user);
                toast.success('Account verified!', { description: 'Welcome aboard!' });
                router.push('/dashboard');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Verification failed, Invalid or expired code.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email) {
            toast.error('Missing email. Please sign up again.');
            return;
        }

        setResending(true);
        try {
            const response = await authApi.resendVerification({ email });
            if (response.success) {
                toast.success('Verification code resent!');
            } else {
                toast.error(response.message);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed to resend code");
            }
        } finally {
            setResending(false);
        }
    };

    return (
        <AuthCard imageSrc="/images/verify.png" imageAlt="Verify Account">
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Verify your account</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        We&apos;ve sent a 6-digit verification code to {email || 'your email'}. Enter it below to continue.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-2">
                        <Label htmlFor="otp" className="text-slate-900 dark:text-white">Verification Code</Label>
                        <Input
                            id="otp"
                            type="text"
                            placeholder="123456"
                            disabled={loading}
                            className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400"
                            {...register('otp')}
                        />
                        {errors.otp && <p className="text-sm text-red-600">{errors.otp.message}</p>}
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white" disabled={loading}>
                        {loading ? 'Verifying…' : 'Verify'}
                    </Button>
                </form>

                <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                    Didn&apos;t get the code?{" "}
                    <button 
                        onClick={handleResend} 
                        disabled={resending}
                        className="underline hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50"
                    >
                        {resending ? 'Resending...' : 'Resend'}
                    </button>
                </p>
            </div>
        </AuthCard>
    )
}
