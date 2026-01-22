"use client";

import { Footer, Header } from '@/components/layout';
import { FooterSkeleton, HeaderSkeleton } from '@/components/skeleton';
import { ReactNode, Suspense, useEffect } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <Suspense fallback={<HeaderSkeleton />}>
                <Header />
            </Suspense>
            <main>
                {children}
            </main>
            <Suspense fallback={<FooterSkeleton />}>
                <Footer />
            </Suspense >
        </div>
    )
}
                            