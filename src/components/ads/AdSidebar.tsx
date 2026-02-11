'use client';

import { useEffect, useRef } from 'react';
import { useAds } from '@/hooks/useAds';
import { AdSlotType } from '@/enums';
import { getSlotId, getAdSenseClientId, pushAdSenseAd } from '@/lib/ads';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AdSidebar = () => {
    const { shouldShowAds } = useAds();
    const adRef = useRef<HTMLDivElement>(null);
    const isAdPushed = useRef(false);

    useEffect(() => {
        if (!shouldShowAds || isAdPushed.current) return;

        if (adRef.current) {
            pushAdSenseAd();
            isAdPushed.current = true;
        }
    }, [shouldShowAds]);

    if (!shouldShowAds) return null;

    const slotId = getSlotId(AdSlotType.SIDEBAR);
    const clientId = getAdSenseClientId();

    return (
        <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800 overflow-hidden">
            <CardContent className="p-4">
                {/* Label */}
                <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 text-right">
                    Advertisement
                </span>

                <div ref={adRef} className="flex items-center justify-center min-h-[250px]">
                    {slotId ? (
                        <ins
                            className="adsbygoogle"
                            style={{ display: 'block' }}
                            data-ad-client={clientId}
                            data-ad-slot={slotId}
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                        />
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Support TempMail Pro
                            </p>
                        </div>
                    )}
                </div>

                {/* Upgrade CTA */}
                <div className="mt-3 text-center">
                    <Link href="/pricing">
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-xs dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
                        >
                            Remove ads with Premium
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdSidebar;
