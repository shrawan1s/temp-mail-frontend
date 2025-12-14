'use client'

import { ReactNode } from 'react'
import { GuestGuard } from '@/components/guards'

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <GuestGuard>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4">
                {children}
            </div>
        </GuestGuard>
    )
}
