"use client";

import { ReactNode, Suspense, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import HeaderSkeleton from '@/components/skeleton/shared/HeaderSkeleton';
import FooterSkeleton from '@/components/skeleton/shared/FooterSkeleton';

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
