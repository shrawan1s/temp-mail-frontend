'use client'

import { AuthCard } from '@/components/auth/AuthCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { SSOButtons } from '@/components/shared/SSOButtons'

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
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
            console.log("Login values:", values)
            toast.success("Logged in successfully!")
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
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-sm text-muted-foreground">
                        Sign in to continue to your inbox
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

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
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
                    <Link href="/reset-password" className="underline hover:text-primary">
                        Forgot password?
                    </Link>
                    <Link href="/signup" className="underline hover:text-primary">
                        Create account
                    </Link>
                </div>
            </div>
        </AuthCard>
    )
}
