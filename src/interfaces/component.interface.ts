import { SVGProps, ComponentType } from 'react';

/**
 * Icon type for components using Lucide or similar icon libraries
 */
export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Feature item for feature comparison grids
 * Used in FeatureComparison.tsx and similar components
 */
export interface IFeature {
    key: string;
    icon: IconType;
    title: string;
    description?: string;
    beta?: boolean;
    values: {
        free: string | boolean;
        pro: string | boolean;
        business: string | boolean;
    };
}

/**
 * CTA button configuration for pricing components
 */
export interface ICtaConfig {
    text: string;
    disabled: boolean;
    variant?: 'default' | 'secondary' | 'outline';
}
