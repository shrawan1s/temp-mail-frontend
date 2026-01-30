'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authApi } from '@/lib/auth'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export default function OAuthCallbackPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login } = useAuth()
    const [error, setError] = useState<string | null>(null)
    const hasProcessed = useRef(false)

    useEffect(() => {
        const handleOAuthCallback = async () => {
            if (hasProcessed.current) return
            hasProcessed.current = true

            const code = searchParams.get('code')
            const state = searchParams.get('state')
            const errorParam = searchParams.get('error')

            if (errorParam) {
                setError('OAuth login was cancelled or failed')
                toast.error('OAuth login failed')
                setTimeout(() => router.push('/login'), 2000)
                return
            }

            if (!code || !state) {
                setError('Invalid OAuth callback')
                toast.error('Invalid OAuth callback')
                setTimeout(() => router.push('/login'), 2000)
                return
            }

            try {
                const redirectUri = `${window.location.origin}/auth/callback`
                const response = await authApi.oauthLogin({
                    provider: state,
                    code: code,
                    redirectUri: redirectUri,
                })

                if (response.success && response.data?.access_token && response.data?.refresh_token && response.data?.user) {
                    login(response.data.access_token, response.data.refresh_token, response.data.user)
                    toast.success('Logged in successfully!')
                    router.push('/dashboard')
                } else {
                    setError(response.message || 'OAuth login failed')
                    toast.error(response.message || 'OAuth login failed')
                    setTimeout(() => router.push('/login'), 2000)
                }
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'OAuth login failed'
                setError(message)
                toast.error(message)
                setTimeout(() => router.push('/login'), 2000)
            }
        }

        handleOAuthCallback()
    }, [searchParams, router, login])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
            <div className="text-center">
                {error ? (
                    <>
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="text-red-600 text-xl">✕</span>
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                            Authentication Failed
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">{error}</p>
                        <p className="text-sm text-slate-500 mt-2">Redirecting to login...</p>
                    </>
                ) : (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                            Completing sign in...
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Please wait while we authenticate you.
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
