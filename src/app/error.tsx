'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorPageProps {
    error: Error
    reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    const router = useRouter()

    useEffect(() => {
        console.error('App Error:', error)
    }, [error])

    return (
        <div className="flex h-screen items-center justify-center bg-white dark:bg-slate-900">
            <div className="flex flex-col items-center space-y-4 text-center">
                <AlertTriangle className="w-10 h-10 text-red-500" />
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Something went wrong</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md">
                    An unexpected error occurred. Please try refreshing the page or go back to the homepage.
                </p>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => router.push('/')} className="bg-transparent dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600">
                        Go Home
                    </Button>
                    <Button onClick={() => reset()} className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white">
                        Try Again
                    </Button>
                </div>
            </div>
        </div>
    )
}
