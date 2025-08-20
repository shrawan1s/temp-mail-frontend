'use client'

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap, Star } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
}

type Billing = 'monthly' | 'annual'

const plansData = [
  {
    key: 'Free',
    title: 'Free',
    description: 'Perfect for casual use',
    features: [
      '1 temporary email at a time',
      '24-hour email retention',
      'Basic inbox features',
      'Standard domains only',
      'Community support',
      'With advertisements'
    ],
    cta: 'Current Plan',
    href: '/inbox',
    variant: 'outline' as const,
    popular: false,
    prices: { monthly: 0, annual: 0 }
  },
  {
    key: 'Pro',
    title: 'Pro',
    description: 'Best for individuals & developers',
    features: [
      'Unlimited temporary emails',
      'Up to 30-day retention',
      'Custom domain support',
      'Priority processing',
      'Advanced AI filtering',
      'Ad-free experience',
      'Priority support',
      'API access'
    ],
    cta: 'Upgrade to Pro',
    href: '/premium/checkout',
    variant: 'default' as const,
    popular: true,
    prices: { monthly: 9, annual: 90 } // 90 = 2 months free
  },
  {
    key: 'Business',
    title: 'Business',
    description: 'Ideal for teams & enterprises',
    features: [
      'All Pro features',
      '30-day email retention',
      'Team seats & collaboration',
      'Analytics dashboard',
      'Dedicated support',
      'SLA & uptime guarantees'
    ],
    cta: 'Contact Sales',
    href: '/contact',
    variant: 'outline' as const,
    popular: false,
    prices: { monthly: 29, annual: 290 }
  }
]
export function PremiumPlans() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const reduce = useReducedMotion()

  // helper to format price
  const formatPrice = (n: number) => {
    if (n === 0) return '$0'
    return `$${n.toString()}`
  }

  // motion variants for price swap
  const priceVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  }

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Start free and upgrade when you need more features and capacity
          </p>
        </motion.div>

        {/* billing toggle (accessible segmented control) */}
        <div className="flex items-center justify-center mb-8">
          <div role="tablist" aria-label="Billing period" className="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 p-1">
            <button
              aria-pressed={billing === 'monthly'}
              onClick={() => setBilling('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition ${billing === 'monthly'
                ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-300'
                }`}
            >
              Monthly
            </button>

            <button
              aria-pressed={billing === 'annual'}
              onClick={() => setBilling('annual')}
              className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition ${billing === 'annual'
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
          {plansData.map((plan) => {
            const price = plan.prices[billing === 'annual' ? 'annual' : 'monthly']
            const isPopular = plan.popular

            return (
              <article key={plan.key} aria-labelledby={`plan-${plan.key}`} className="flex">
                <Card
                  className={`flex-1 flex flex-col border transition-shadow duration-200 ${isPopular
                    ? 'border-blue-100 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/30 shadow-2xl transform scale-[1.01]'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg'
                    }`}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute -mt-6 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md px-3 py-1">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pt-8 text-center">
                    <CardTitle id={`plan-${plan.key}`} className="text-2xl font-bold">
                      {plan.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-slate-600 dark:text-slate-300">
                      {plan.description}
                    </CardDescription>

                    <div className="mt-6 flex items-end justify-center gap-2">
                      <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-none">
                        {/* price with motion */}
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
                        /{billing === 'monthly' ? 'mo' : 'yr'}
                      </div>
                    </div>

                    {/* savings microcopy */}
                    {billing === 'annual' && price > 0 && (
                      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Save {(plan.prices.monthly * 12 - plan.prices.annual) > 0 ? Math.round(((plan.prices.monthly * 12 - plan.prices.annual) / (plan.prices.monthly * 12)) * 100) : 0}% with annual billing
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between p-6">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-200">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4">
                      <Link href={plan.href}>
                        <Button
                          aria-label={`${plan.cta} — ${plan.title}`}
                          size="lg"
                          className={`w-full ${isPopular ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white' : ''}`}
                          variant={plan.variant}
                        >
                          {plan.title === 'Pro' && <Crown className="w-4 h-4 mr-2" />}
                          {plan.title === 'Business' && <Zap className="w-4 h-4 mr-2" />}
                          {plan.cta}
                        </Button>
                      </Link>
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
            All plans include our core privacy features and real-time updates. Prices shown in USD.
          </p>
        </div>
      </div>
    </section>
  )
}
