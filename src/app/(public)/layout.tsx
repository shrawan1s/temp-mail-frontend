import { ReactNode, Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import HeaderSkeleton from '@/components/skeleton/shared/HeaderSkeleton';
import FooterSkeleton from '@/components/skeleton/shared/FooterSkeleton';

export default function PublicLayout({ children }: { children: ReactNode }) {
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
