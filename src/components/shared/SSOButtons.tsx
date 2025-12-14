'use client'

import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || ''

export function SSOButtons() {
    const getOAuthUrl = (provider: "google" | "github") => {
        const redirectUri = `${window.location.origin}/auth/callback`

        if (provider === "google") {
            const params = new URLSearchParams({
                client_id: GOOGLE_CLIENT_ID,
                redirect_uri: redirectUri,
                response_type: 'code',
                scope: 'openid email profile',
                access_type: 'offline',
                prompt: 'consent',
                state: 'google',
            })
            return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
        }

        if (provider === "github") {
            const params = new URLSearchParams({
                client_id: GITHUB_CLIENT_ID,
                redirect_uri: redirectUri,
                scope: 'user:email read:user',
                state: 'github',
            })
            return `https://github.com/login/oauth/authorize?${params.toString()}`
        }

        return ''
    }

    const handleSSOLogin = (provider: "google" | "github") => {
        const url = getOAuthUrl(provider)
        if (url) {
            window.location.href = url
        }
    }

    return (
        <div className="space-y-3">
            <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleSSOLogin("google")}
                disabled={!GOOGLE_CLIENT_ID}
            >
                <FcGoogle className="w-5 h-5" /> Continue with Google
            </Button>

            <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleSSOLogin("github")}
                disabled={!GITHUB_CLIENT_ID}
            >
                <FaGithub className="w-5 h-5" /> Continue with GitHub
            </Button>
        </div>
    )
}

export default SSOButtons
