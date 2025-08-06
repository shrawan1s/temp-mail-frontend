'use client'

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
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function PremiumPlans() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
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
      price: '$9',
      period: '/month',
      description: 'Best for individuals and developers',
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
      name: 'Team',
      price: '$29',
      period: '/month',
      description: 'Perfect for teams and organizations',
      features: [
        'Everything in Pro',
        'Team management',
        'Shared domains',
        'Bulk operations',
        'Advanced analytics',
        'SSO integration',
        'Dedicated support'
      ],
      cta: 'Contact Sales',
      href: '/contact',
      variant: 'outline'
    }
  ]

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-violet-50/50 dark:from-blue-950/30 dark:to-violet-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Start free and upgrade when you need more features and capacity
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className={`relative h-full ${plan.popular
                ? 'border-2 border-blue-200 dark:border-blue-700 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50 shadow-xl'
                : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg'
                } hover:shadow-xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                    <span className="text-slate-500 dark:text-slate-400">{plan.period}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.href}>
                    <Button
                      className={`w-full ${plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700'
                        : ''
                        }`}
                      variant={plan.variant as 'default' | 'outline'}
                      size="lg"
                    >
                      {plan.name === 'Pro' && <Crown className="w-4 h-4 mr-2" />}
                      {plan.name === 'Team' && <Zap className="w-4 h-4 mr-2" />}
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            All plans include our core privacy features and 99.9% uptime guarantee
          </p>
          <Link href="/premium">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Compare all features →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
