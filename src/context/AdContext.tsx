'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { loadAdSenseScript, isAdsEnabled } from '@/lib/ads';
import { useAuth } from '@/context/AuthContext';
import { IAdContextType } from '@/interfaces';

const AdContext = createContext<IAdContextType | undefined>(undefined);

export const AdProvider = ({ children }: { children: ReactNode }) => {
    const [isAdSenseReady, setIsAdSenseReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    const isPremium = !!user && user.plan !== 'free';

    useEffect(() => {
        const initAds = async () => {
            if (!isAdsEnabled || isPremium) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            const loaded = await loadAdSenseScript();
            setIsAdSenseReady(loaded);
            setIsLoading(false);
        };

        initAds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const contextValue = useMemo<IAdContextType>(() => ({
        isLoading,
        isAdSenseReady,
        shouldShowAds: isAdSenseReady && !isPremium,
    }), [isAdSenseReady, isLoading, isPremium]);

    return (
        <AdContext.Provider value={contextValue}>
            {children}
        </AdContext.Provider>
    );
};

export const useAds = (): IAdContextType => {
    const context = useContext(AdContext);
    if (context === undefined) {
        throw new Error('useAds must be used within an AdProvider');
    }
    return context;
};
