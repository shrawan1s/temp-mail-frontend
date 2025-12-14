"use client";

import { Footer, Header } from '@/components/layout';
import { FooterSkeleton, HeaderSkeleton } from '@/components/skeleton';
import { ReactNode, Suspense, useEffect } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Suspense fallback={<HeaderSkeleton />}>
                <Header />
            </Suspense>
            <main>
                {children}
            </main>
            <Suspense fallback={<FooterSkeleton />}>
                <Footer />
            </Suspense >
        </>
    )
}
