'use client';

import AuthCard from '@/components/shared/AuthCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { SSOButtons } from '@/components/shared';
import { authApi } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const signupSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "At least one uppercase letter")
            .regex(/[a-z]/, "At least one lowercase letter")
            .regex(/\d/, "At least one number"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    })

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: SignupFormValues) => {
        try {
            const response = await authApi.register({
                email: values.email,
                password: values.password,
                name: values.name,
            });

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success("Account created! Please verify your email.");
            
            // Redirect to verify page with userId
            if (response.data?.user_id) {
                router.push(`/verify?userId=${response.data?.user_id}&email=${encodeURIComponent(values.email)}`);
            } else {
                router.push('/verify');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Signup failed, please try again");
            }
        }
    }

    return (
        <AuthCard imageSrc="/images/signup.png" imageAlt="Signup">
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create an account</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Join thousands of users protecting their privacy
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-900 dark:text-white">Full name</Label>
                        <Input id="name" placeholder="John Doe" className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400" {...register("name")} />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
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

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-900 dark:text-white">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 pr-10"
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-slate-900 dark:text-white">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400 pr-10"
                                {...register("confirmPassword")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white" disabled={isSubmitting}>
                        {isSubmitting ? "Signing up..." : "Sign up"}
                    </Button>
                </form>

                <div className="flex items-center gap-2 my-4">
                    <div className="flex-1 h-px bg-muted" />
                    <span className="text-xs text-muted-foreground">or</span>
                    <div className="flex-1 h-px bg-muted" />
                </div>

                <SSOButtons />

                <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                    Already have an account?{" "}
                    <Link href="/login" className="underline hover:text-blue-600 dark:hover:text-blue-400">
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthCard>
    )
}
