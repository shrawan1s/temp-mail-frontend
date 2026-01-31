'use client'

import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap, Star, Loader2 } from 'lucide-react'
import { paymentApi } from '@/lib/payment'
import { IPlan, ISubscription } from '@/interfaces'
import { PlanTier, PlanStatus, BillingCycle } from '@/enums'
import { useRazorpay } from '@/hooks/useRazorpay'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/context/AuthContext'

// Get plan tier from key using enum
const getPlanTier = (key: string): number => {
    switch (key) {
        case 'free': return PlanTier.FREE
        case 'pro': return PlanTier.PRO
        case 'business': return PlanTier.BUSINESS
        default: return PlanTier.FREE
    }
}

// Fallback plans in case API fails (prices in paise, same as backend)
const fallbackPlans: IPlan[] = [
    {
        id: 'free',
        key: 'free',
        name: 'Free',
        description: 'Perfect for getting started with temporary emails',
        features: [
            '1 temporary email at a time',
            '24-hour email retention',
            'Basic spam protection',
            'Web access only'
        ],
        priceMonthly: 0,
        priceAnnual: 0,
        isPopular: false,
    },
    {
        id: 'pro',
        key: 'pro',
        name: 'Pro',
        description: 'For power users who need more flexibility',
        features: [
            '10 temporary emails at a time',
            '7-day email retention',
            'Advanced spam protection',
            'Custom email aliases',
            'API access',
            'Email forwarding',
            'Priority support'
        ],
        priceMonthly: 49900,
        priceAnnual: 499900,
        isPopular: true,
    },
    {
        id: 'business',
        key: 'business',
        name: 'Business',
        description: 'For teams and businesses with advanced needs',
        features: [
            'Unlimited temporary emails',
            '30-day email retention',
            'Enterprise spam protection',
            'Custom domain support',
            'Full API access',
            'Email forwarding & webhooks',
            'Team collaboration',
            'Dedicated support'
        ],
        priceMonthly: 149900,
        priceAnnual: 1499900,
        isPopular: false,
    }
]

export default function PricingCards() {
    const [billing, setBilling] = useState<BillingCycle>(BillingCycle.MONTHLY)
    const [plans, setPlans] = useState<IPlan[]>(fallbackPlans)
    const [subscription, setSubscription] = useState<ISubscription | null>(null)
    const [loadingPlans, setLoadingPlans] = useState(true)
    const [loadingSubscription, setLoadingSubscription] = useState(false)
    const [processingPlanId, setProcessingPlanId] = useState<string | null>(null)
    const reduce = useReducedMotion()
    const { toast } = useToast()
    const { user, isAuthenticated, refreshUser } = useAuth()
    const router = useRouter()

    // Current user's plan key and billing cycle
    const currentPlanKey = user?.plan || subscription?.planKey || 'free'
    const currentBillingCycle = subscription?.billingCycle || BillingCycle.MONTHLY

    const { initiatePayment, isLoading: paymentLoading } = useRazorpay({
        onSuccess: async (result) => {
            setProcessingPlanId(null)
            
            // Refresh user data to update plan
            await refreshUser()
            
            // Update local subscription state
            if (result.planKey && result.expiresAt) {
                setSubscription({
                    planKey: result.planKey,
                    planName: result.planKey.charAt(0).toUpperCase() + result.planKey.slice(1),
                    status: 'active',
                    billingCycle: billing, // Use the current billing selection
                    expiresAt: result.expiresAt,
                })
            }
            
            toast({
                title: '🎉 Payment Successful!',
                description: `You've been upgraded to ${result.planKey?.toUpperCase()} plan. Expires: ${new Date(result.expiresAt || '').toLocaleDateString()}`,
            })
        },
        onError: (error) => {
            setProcessingPlanId(null)
            toast({
                title: 'Payment Failed',
                description: error.message,
                variant: 'destructive',
            })
        },
        onCancel: () => {
            setProcessingPlanId(null)
        },
    })

    // Fetch plans from API
    useEffect(() => {
        async function fetchPlans() {
            try {
                const apiPlans = await paymentApi.getPlans()
                if (apiPlans && apiPlans.length > 0) {
                    setPlans(apiPlans)
                }
            } catch (error) {
                console.error('Failed to fetch plans:', error)
            } finally {
                setLoadingPlans(false)
            }
        }
        fetchPlans()
    }, [])

    // Fetch subscription if authenticated
    useEffect(() => {
        async function fetchSubscription() {
            if (!isAuthenticated) {
                setSubscription(null)
                setLoadingSubscription(false)
                return
            }
            setLoadingSubscription(true)
            try {
                const sub = await paymentApi.getSubscription()
                setSubscription(sub)
            } catch (error) {
                console.error('Failed to fetch subscription:', error)
            } finally {
                setLoadingSubscription(false)
            }
        }
        fetchSubscription()
    }, [isAuthenticated])

    // Format price in INR (paise to rupees)
    const formatPrice = (priceInPaise: number) => {
        if (priceInPaise === 0) return '₹0'
        return `₹${(priceInPaise / 100).toLocaleString('en-IN')}`
    }

    // Check if plan is current, upgrade, or downgrade
    // Only show as "current" if plan key matches AND billing cycle matches
    const getPlanStatus = (planKey: string): PlanStatus => {
        const currentTier = getPlanTier(currentPlanKey)
        const planTier = getPlanTier(planKey)
        
        // Check if this is the exact current plan (same key AND same billing cycle)
        const isExactCurrentPlan = planKey === currentPlanKey && billing === currentBillingCycle
        
        if (isExactCurrentPlan) return PlanStatus.CURRENT
        if (planTier > currentTier) return PlanStatus.UPGRADE
        if (planTier < currentTier) return PlanStatus.DOWNGRADE
        // Same tier but different billing cycle - allow switch
        return PlanStatus.SWITCH
    }

    // Handle plan selection
    const handleSelectPlan = async (plan: IPlan) => {
        const status = getPlanStatus(plan.key)

        // Current plan - do nothing
        if (status === PlanStatus.CURRENT) {
            toast({
                title: 'Current Plan',
                description: 'You are already on this plan.',
            })
            return
        }

        // Downgrade - not supported yet
        if (status === PlanStatus.DOWNGRADE) {
            toast({
                title: 'Downgrade Not Available',
                description: 'Please contact support to downgrade your plan.',
                variant: 'destructive',
            })
            return
        }

        // Check if user is authenticated - redirect to login if not
        if (!isAuthenticated || !user?.id) {
            toast({
                title: 'Login Required',
                description: 'Please login to upgrade your plan. Redirecting...',
            })
            // Redirect to login with return URL
            router.push(`/login?returnTo=${encodeURIComponent(`/pricing?plan=${plan.key}&billing=${billing}`)}`)
            return
        }

        const price = billing === BillingCycle.ANNUAL ? plan.priceAnnual : plan.priceMonthly
        if (price === 0) {
            return
        }

        setProcessingPlanId(plan.id)
        await initiatePayment(plan.id, billing, plan.name)
    }

    // Motion variants for price swap
    const priceVariants = {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.35 } }
    }

    // Get CTA text based on plan status
    const getCtaConfig = (plan: IPlan) => {
        const status = getPlanStatus(plan.key)
        
        if (status === PlanStatus.CURRENT) {
            return { text: 'Current Plan', disabled: true, variant: 'secondary' as const }
        }
        if (status === PlanStatus.DOWNGRADE) {
            return { text: 'Contact Support', disabled: true, variant: 'outline' as const }
        }
        if (status === PlanStatus.SWITCH) {
            // Same plan, different billing cycle
            return { 
                text: `Switch to ${billing === BillingCycle.ANNUAL ? 'Annual' : 'Monthly'}`, 
                disabled: false, 
                variant: 'outline' as const 
            }
        }
        // Upgrade
        return { 
            text: `Upgrade to ${plan.name}`, 
            disabled: false, 
            variant: plan.isPopular ? 'default' as const : 'outline' as const 
        }
    }

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Choose your plan</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Start free and upgrade when you need more features, retention, or team capabilities.
                    </p>
                    {/* Show current subscription info */}
                    {subscription && subscription.planKey !== 'free' && (
                        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                            You&apos;re on the <strong>{subscription.planName}</strong> plan
                            {subscription.expiresAt && ` (expires ${new Date(subscription.expiresAt).toLocaleDateString()})`}
                        </p>
                    )}
                </div>

                {/* billing toggle */}
                <div className="flex items-center justify-center mb-8">
                    <div role="tablist" aria-label="Billing period" className="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 p-1">
                        <button
                            role="tab"
                            id="monthly-tab"
                            aria-selected={billing === BillingCycle.MONTHLY}
                            onClick={() => setBilling(BillingCycle.MONTHLY)}
                            className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition ${billing === BillingCycle.MONTHLY
                                ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white'
                                : 'text-slate-600 dark:text-slate-300'
                                }`}
                        >
                            Monthly
                        </button>

                        <button
                            role="tab"
                            id="annual-tab"
                            aria-selected={billing === BillingCycle.ANNUAL}
                            onClick={() => setBilling(BillingCycle.ANNUAL)}
                            className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition ${billing === BillingCycle.ANNUAL
                                ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white'
                                : 'text-slate-600 dark:text-slate-300'
                                }`}
                        >
                            Annual
                        </button>
                    </div>
                </div>

                {/* plans grid */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {plans.map((plan) => {
                        const price = billing === BillingCycle.ANNUAL ? plan.priceAnnual : plan.priceMonthly
                        const isPopular = plan.isPopular
                        const isProcessing = processingPlanId === plan.id
                        const status = getPlanStatus(plan.key)
                        const ctaConfig = getCtaConfig(plan)
                        const isCurrentPlan = status === PlanStatus.CURRENT

                        return (
                            <article key={plan.id} aria-labelledby={`plan-${plan.key}`} className="flex">
                                <Card
                                    className={`flex-1 flex flex-col border transition-shadow duration-200 relative ${isCurrentPlan
                                        ? 'border-green-400 dark:border-green-500 ring-2 ring-green-200 dark:ring-green-800 bg-white dark:bg-slate-800'
                                        : isPopular
                                            ? 'border-blue-300 dark:border-blue-600 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-slate-800 dark:to-slate-900 shadow-2xl'
                                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg'
                                        }`}
                                >
                                    {/* Current Plan badge */}
                                    {isCurrentPlan && (
                                        <div className="absolute -mt-6 left-1/2 transform -translate-x-1/2 z-10">
                                            <Badge className="bg-green-500 text-white shadow-md px-3 py-1">
                                                <Check className="w-4 h-4 mr-1" />
                                                Current Plan
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Popular badge */}
                                    {isPopular && !isCurrentPlan && (
                                        <div className="absolute -mt-6 left-1/2 transform -translate-x-1/2 z-10">
                                            <Badge className="bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md px-3 py-1">
                                                <Star className="w-4 h-4 mr-1" />
                                                Most Popular
                                            </Badge>
                                        </div>
                                    )}

                                    <CardHeader className="pt-8 text-center">
                                        <CardTitle id={`plan-${plan.key}`} className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {plan.name}
                                        </CardTitle>
                                        <CardDescription className="mt-2 text-slate-600 dark:text-slate-300">
                                            {plan.description}
                                        </CardDescription>

                                        <div className="mt-6 flex items-end justify-center gap-2">
                                            <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-none">
                                                <span aria-live="polite" className="inline-block align-bottom">
                                                    {!reduce ? (
                                                        <motion.span key={`${plan.key}-${billing}`} variants={priceVariants} initial="initial" animate="animate">
                                                            {formatPrice(price)}
                                                        </motion.span>
                                                    ) : (
                                                        <span>{formatPrice(price)}</span>
                                                    )}
                                                </span>
                                            </div>

                                            <div className="text-base text-slate-500 dark:text-slate-400 ml-2 mb-1">
                                                /{billing === BillingCycle.MONTHLY ? 'mo' : 'yr'}
                                            </div>
                                        </div>

                                        {/* savings microcopy */}
                                        {billing === BillingCycle.ANNUAL && price > 0 && (
                                            <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                                Save {Math.round(((plan.priceMonthly * 12 - plan.priceAnnual) / (plan.priceMonthly * 12)) * 100)}% with annual billing
                                            </div>
                                        )}
                                    </CardHeader>

                                    <CardContent className="flex-1 flex flex-col justify-between p-6">
                                        <ul className="space-y-3 mb-6">
                                            {plan.features.map((f: string, i: number) => (
                                                <li key={i} className="flex items-start">
                                                    <Check className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                                                    <span className="text-slate-700 dark:text-slate-200">{f}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="pt-4">
                                            <Button
                                                aria-label={`${ctaConfig.text} — ${plan.name}`}
                                                size="lg"
                                                className={`w-full ${isPopular && !isCurrentPlan ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white' : ''}`}
                                                variant={ctaConfig.variant}
                                                onClick={() => handleSelectPlan(plan)}
                                                disabled={ctaConfig.disabled || isProcessing || paymentLoading || loadingSubscription}
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        {!isCurrentPlan && plan.key === 'pro' && <Crown className="w-4 h-4 mr-2" />}
                                                        {!isCurrentPlan && plan.key === 'business' && <Zap className="w-4 h-4 mr-2" />}
                                                        {isCurrentPlan && <Check className="w-4 h-4 mr-2" />}
                                                        {ctaConfig.text}
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </article>
                        )
                    })}
                </div>

                {/* footer note */}
                <div className="text-center mt-10">
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        All plans include our core privacy features and real-time updates. Prices shown in INR.
                    </p>
                </div>
            </div>
        </section>
    )
}
