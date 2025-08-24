'use client'

import AuthCard from '@/components/shared/AuthCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const otpSchema = z.object({
    otp: z.string()
        .length(6, 'OTP must be exactly 6 digits')
        .regex(/^\d+$/, 'OTP must contain only numbers')
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function VerifyForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: '' }
    });

    const onSubmit = async (values: OtpFormValues) => {
        setLoading(true);
        try {
            console.log("Account verification request received!", values);

            toast.success('Account verified', { description: 'Welcome aboard!' });
            // router.push('/dashboard');
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

    return (
        <AuthCard imageSrc="/images/verify.png" imageAlt="Verify Account">
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Verify your account</h1>
                    <p className="text-sm text-muted-foreground">
                        We’ve sent a 6-digit verification code to your email. Enter it below to continue.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-2">
                        <Label htmlFor="otp">Verification Code</Label>
                        <Input
                            id="otp"
                            type="text"
                            placeholder="123456"
                            disabled={loading}
                            {...register('otp')}
                        />
                        {errors.otp && <p className="text-sm text-red-600">{errors.otp.message}</p>}
                    </div>

                    <Button className="w-full" disabled={loading}>
                        {loading ? 'Verifying…' : 'Verify'}
                    </Button>
                </form>

                <p className="text-sm text-center text-muted-foreground">
                    Didn’t get the code?{" "}
                    <Link href="/verify" className="underline hover:text-primary">
                        Resend
                    </Link>
                </p>
            </div>
        </AuthCard>
    )
}
