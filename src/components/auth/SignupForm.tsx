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
import { SSOButtons } from '@/components/shared/SSOButtons';
import { authApi } from '@/lib/auth';
import { useRouter } from 'next/navigation';

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
            if (response.user_id) {
                router.push(`/verify?userId=${response.user_id}&email=${encodeURIComponent(values.email)}`);
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
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    <p className="text-sm text-muted-foreground">
                        Join thousands of users protecting their privacy
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" placeholder="John Doe" {...register("name")} />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
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

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Signing up..." : "Sign up"}
                    </Button>
                </form>

                <div className="flex items-center gap-2 my-4">
                    <div className="flex-1 h-px bg-muted" />
                    <span className="text-xs text-muted-foreground">or</span>
                    <div className="flex-1 h-px bg-muted" />
                </div>

                <SSOButtons />

                <p className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="underline hover:text-primary">
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthCard>
    )
}
