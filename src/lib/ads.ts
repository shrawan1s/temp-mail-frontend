import { AdSlotType } from '@/enums';

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? '';

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
const AD_SLOTS: Record<AdSlotType, string> = {
    [AdSlotType.SIDEBAR]: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT ?? '',
};
export const isAdsEnabled = ADS_ENABLED && !!ADSENSE_CLIENT_ID;

export const getAdSenseClientId = (): string => ADSENSE_CLIENT_ID;

export const getSlotId = (slotType: AdSlotType): string => AD_SLOTS[slotType];

/**
 * Injects the AdSense `<script>` tag into the document head.
 * Returns a promise that resolves to `true` on success.
 */
export const loadAdSenseScript = async (): Promise<boolean> => {
    if (typeof document === 'undefined') return false;

    const scriptSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;

    // Avoid duplicate injection
    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
        return true;
    }

    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;
        script.crossOrigin = 'anonymous';

        script.onload = () => {
            if (process.env.NODE_ENV === 'development') {
                console.log('[Ads] AdSense script loaded successfully');
            }
            resolve(true);
        };

        script.onerror = () => {
            if (process.env.NODE_ENV === 'development') {
                console.warn('[Ads] AdSense script failed to load');
            }
            resolve(false);
        };

        document.head.appendChild(script);
    });
};

/**
 * Pushes a new AdSense ad unit to render.
 * Must be called after the corresponding `<ins>` element is in the DOM.
 */
export const pushAdSenseAd = (): void => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adsbygoogle = (window as any).adsbygoogle;
        if (adsbygoogle) {
            adsbygoogle.push({});
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('[Ads] Failed to push AdSense ad:', error);
        }
    }
};
