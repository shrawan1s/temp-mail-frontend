'use client'

import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import Image, { StaticImageData } from 'next/image'

interface AuthCardProps {
    children: ReactNode
    imageSrc?: string | StaticImageData
    imageAlt?: string
}

export function AuthCard({ children, imageSrc = "/auth-illustration.svg", imageAlt = "Authentication" }: AuthCardProps) {
    return (
        <Card className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl border-0 rounded-2xl">
            {/* Left: Form */}
            <div className="p-8 flex flex-col justify-center bg-white dark:bg-slate-900">
                {children}
            </div>

            {/* Right: Image */}
            <div className="hidden md:block relative bg-gradient-to-br from-blue-600 to-purple-600">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    priority
                    className="object-cover opacity-90"
                />
            </div>
        </Card>
    )
}
