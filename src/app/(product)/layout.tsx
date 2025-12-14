'use client'

import { ReactNode } from 'react'
import { AuthGuard } from '@/components/guards'

export default function ProductLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            {children}
        </AuthGuard>
    )
}
