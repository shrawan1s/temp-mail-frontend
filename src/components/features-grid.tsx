'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { RefreshCw, Globe, Paperclip, Shield, Zap, Mail, Clock, Users, Code, Star, Crown, Lock } from 'lucide-react'

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

export function FeaturesGrid() {
  const features = [
    {
      icon: RefreshCw,
      title: 'Auto Refresh',
      description: 'Real-time email updates without manual refresh',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'Custom Domain',
      description: 'Use your own domain for professional appearance',
      color: 'from-green-500 to-emerald-500',
      premium: true
    },
    {
      icon: Paperclip,
      title: 'Attachment Support',
      description: 'Receive and view email attachments securely',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'No tracking, no data collection, complete anonymity',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Flexible Expiry',
      description: 'Set custom expiration times for your emails',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Lock,
      title: 'Secure Headers',
      description: 'Advanced security with encrypted email headers',
      color: 'from-indigo-500 to-purple-500',
      premium: true
    },
    {
      icon: Code,
      title: 'API Access',
      description: 'Integrate with your apps using our REST API',
      color: 'from-slate-500 to-gray-500',
      premium: true
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Emails delivered in under 5 seconds worldwide',
      color: 'from-yellow-500 to-amber-500'
    }
  ]

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-blue-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Everything you need for secure, temporary email management
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="relative h-full border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                {feature.premium && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                      <Crown className="w-3 h-3" />
                      <span>Pro</span>
                    </div>
                  </div>
                )}

                <CardContent className="p-6 relative">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
