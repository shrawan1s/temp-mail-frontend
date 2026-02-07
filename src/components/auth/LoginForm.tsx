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
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    // Get return URL from query params
    const returnTo = searchParams.get('returnTo') || '/dashboard';

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const response = await authApi.login({
                email: values.email,
                password: values.password,
            });

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            if (response.data?.access_token && response.data?.refresh_token && response.data?.user) {
                login(response.data.access_token, response.data.refresh_token, response.data.user);
                toast.success("Logged in successfully!");
                // Redirect to returnTo URL or dashboard
                router.push(returnTo);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Login failed, please try again");
            }
        }
    }

    return (
        <AuthCard imageSrc="/images/login.png" imageAlt="Login">
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Sign in to continue to your inbox
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

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>

                </form>

                <div className="flex items-center gap-2 my-4">
                    <div className="flex-1 h-px bg-muted" />
                    <span className="text-xs text-muted-foreground">or</span>
                    <div className="flex-1 h-px bg-muted" />
                </div>

                <SSOButtons />

                <div className="flex items-center justify-between text-sm">
                    <Link href="/reset-password" className="text-slate-600 dark:text-slate-400 underline hover:text-blue-600 dark:hover:text-blue-400">
                        Forgot password?
                    </Link>
                    <Link href="/signup" className="text-slate-600 dark:text-slate-400 underline hover:text-blue-600 dark:hover:text-blue-400">
                        Create account
                    </Link>
                </div>
            </div>
        </AuthCard>
    )
}
