'use client'

import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

export default function SSOButtons() {
    const handleSSOLogin = (provider: "google" | "github") => {
        // Replace with your real API call (NextAuth, custom endpoint, etc.)
        console.log(`Signing in with ${provider}`)
        window.location.href = `/api/auth/${provider}`
    }

    return (
        <div className="space-y-3">
            <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleSSOLogin("google")}
            >
                <FcGoogle className="w-5 h-5" /> Continue with Google
            </Button>

            <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleSSOLogin("github")}
            >
                <FaGithub className="w-5 h-5" /> Continue with GitHub
            </Button>
        </div>
    )
}
