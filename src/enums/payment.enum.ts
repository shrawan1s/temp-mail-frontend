// Plan tier levels for comparison
export enum PlanTier {
    FREE = 0,
    PRO = 1,
    BUSINESS = 2,
}

// Plan keys matching backend
export enum PlanKey {
    FREE = 'free',
    PRO = 'pro',
    BUSINESS = 'business',
}

// Billing cycles
export enum BillingCycle {
    MONTHLY = 'monthly',
    ANNUAL = 'annual',
}

// Subscription status
export enum SubscriptionStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled',
    EXPIRED = 'expired',
    PENDING = 'pending',
}

// Payment status
export enum PaymentStatus {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILED = 'failed',
}

// Plan status (relative to current subscription)
export enum PlanStatus {
    CURRENT = 'current',
    UPGRADE = 'upgrade',
    DOWNGRADE = 'downgrade',
    SWITCH = 'switch',
}
