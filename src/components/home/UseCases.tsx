'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, UserCheck, TestTube, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export function UseCases() {
  const useCases = [
    {
      icon: Code,
      title: 'Developers',
      description:
        'Test email flows, API integrations, and user registration without cluttering your inbox',
      badge: 'API Ready',
      color: 'from-blue-500 to-cyan-500',
      features: ['API Integration', 'Webhook Support', 'Bulk Generation', 'Custom Domains']
    },
    {
      icon: UserCheck,
      title: 'Secure Sign-ups',
      description:
        'Protect your real email when signing up for services, newsletters, or one-time verifications',
      badge: 'Privacy First',
      color: 'from-green-500 to-emerald-500',
      features: ['No Tracking', 'Auto Expiry', 'Spam Protection', 'Anonymous']
    },
    {
      icon: TestTube,
      title: 'QA & Testers',
      description:
        'Create multiple test accounts, verify email workflows, and test user journeys efficiently',
      badge: 'Team Ready',
      color: 'from-purple-500 to-violet-500',
      features: ['Multiple Emails', 'Team Sharing', 'Test Automation', 'Bulk Actions']
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Perfect for Every Use Case
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Whether you&apos;re a developer, privacy-conscious user, or QA tester, we&apos;ve got you covered
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 lg:gap-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {useCases.map((useCase, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full border-0 bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                  {/* Top: Icon + Badge + Text */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${useCase.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <useCase.icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs font-medium">
                        {useCase.badge}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {useCase.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>

                  {/* Bottom: Feature List + Button */}
                  <div>
                    <div className="space-y-3 mb-6">
                      {useCase.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-slate-600 dark:text-slate-300"
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mr-3" />
                          {feat}
                        </div>
                      ))}
                    </div>
                    <Link href="/inbox">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white transition-all duration-300">
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
