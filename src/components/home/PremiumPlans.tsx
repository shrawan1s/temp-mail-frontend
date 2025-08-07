'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap, Star } from 'lucide-react'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
}

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
}

type PlanName = 'Free' | 'Pro' | 'Business';

interface plans {
  name: PlanName;
  description: string;
  features: string[];
  cta: string;
  href: string;
  variant: 'default' | 'outline';
  popular?: boolean;
}

export function PremiumPlans() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  // Base price lookup
  const priceMap = {
    Free: { monthly: 0, annual: 0 },
    Pro: { monthly: 9, annual: 90 },
    Business: { monthly: 29, annual: 290 }
  }

  const plans: plans[] = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      features: [
        '1 temporary email at a time',
        '24-hour email retention',
        'Basic inbox features',
        'Community support'
      ],
      cta: 'Get Started Free',
      href: '/inbox',
      variant: 'outline'
    },
    {
      name: 'Pro',
      description: 'Best for individuals & developers',
      popular: true,
      features: [
        'Unlimited temporary emails',
        '7-day email retention',
        'Custom domain support',
        'API access',
        'Priority support',
        'Advanced filtering',
        'No advertisements'
      ],
      cta: 'Start Pro Trial',
      href: '/premium',
      variant: 'default'
    },
    {
      name: 'Business',
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
      variant: 'outline'
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Billing Toggle */}
        <motion.div
          className="flex justify-center mb-12 space-x-4"
          initial="initial"
          whileInView="animate"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <Button
            variant={billing === 'monthly' ? 'default' : 'outline'}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={billing === 'annual' ? 'default' : 'outline'}
            onClick={() => setBilling('annual')}
          >
            Annual
          </Button>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          className="grid gap-8 lg:grid-cols-3"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {plans.map((plan) => {
            const isPopular = plan.popular
            const price = priceMap[plan.name][billing]
            return (
              <motion.div key={plan.name} variants={fadeInUp}>
                <Card
                  className={`relative h-full flex flex-col border-2 transition-all duration-300 
                    ${isPopular
                      ? 'border-blue-200 dark:border-blue-700 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50 shadow-2xl'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl'
                    }`}
                >
                  {/* Most Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-1 shadow-md">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pt-8 pb-4">
                    <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                        ${price}
                      </span>
                      <span className="text-base text-slate-500 dark:text-slate-400 ml-1">
                        /{billing === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="flex flex-col justify-between flex-1 p-6">
                    {/* Features List */}
                    <ul className="space-y-4 mb-6">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link href={plan.href}>
                      <Button
                        size="lg"
                        className={`w-full flex items-center justify-center gap-2 ${isPopular
                          ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white'
                          : ''
                          }`}
                        variant={plan.variant as 'default' | 'outline'}
                      >
                        {plan.name === 'Pro' && <Crown className="w-4 h-4" />}
                        {plan.name === 'Business' && <Zap className="w-4 h-4" />}
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="text-center mt-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-slate-600 dark:text-slate-400">
            All plans include our core privacy features, real-time updates, and a 99.9% uptime SLA.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
