'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center bg-white dark:bg-slate-900">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-slate-700 dark:text-slate-300 text-sm">Loading content...</p>
            </div>
        </div>
    )
}
