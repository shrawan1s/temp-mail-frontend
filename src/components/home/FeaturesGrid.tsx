'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  RefreshCw,
  Globe,
  Paperclip,
  Zap,
  Clock,
  Code,
  Crown,
  Lock,
  ShieldAlert,
  BrainCircuit,
  Tag,
  FileText
} from 'lucide-react';

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

const features = [
  {
    icon: RefreshCw,
    title: 'Auto Refresh',
    description: 'Real-time email updates without manual refresh',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: ShieldAlert,
    title: 'AI Spam Filter',
    description: 'Advanced AI filters out malicious and spam emails',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: BrainCircuit,
    title: 'Intent Detection',
    description: 'AI detects email intent: login, OTP, newsletter, etc.',
    color: 'from-purple-500 to-fuchsia-500',
    premium: true
  },
  {
    icon: Tag,
    title: 'Smart Labels',
    description: 'Auto-labels emails to keep your inbox organized',
    color: 'from-indigo-500 to-violet-500',
    premium: true,
    upcoming: true
  },
  {
    icon: FileText,
    title: 'AI Summarizer',
    description: 'Summarize long emails in seconds with AI',
    color: 'from-amber-500 to-orange-500',
    premium: true,
    upcoming: true
  },
  {
    icon: Globe,
    title: 'Custom Domain',
    description: 'Use your own domain for a professional appearance',
    color: 'from-green-500 to-emerald-500',
    premium: true
  },
  {
    icon: Paperclip,
    title: 'Attachment Support',
    description: 'Receive and view email attachments securely',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Lock,
    title: 'Secure Headers',
    description: 'Encrypted email headers for added security',
    color: 'from-slate-500 to-gray-500',
    premium: true
  },
  {
    icon: Code,
    title: 'API Access',
    description: 'Integrate inbox features with your own apps',
    color: 'from-pink-500 to-rose-500',
    premium: true
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Emails delivered in under 5 seconds worldwide',
    color: 'from-yellow-400 to-yellow-600'
  }
]

const FeaturesGrid = () => {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Everything you need for secure, smart, and private email management
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

                {/* Pro badge */}
                {feature.premium && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                      <Crown className="w-3 h-3" />
                      <span>Pro</span>
                    </div>
                  </div>
                )}

                {/* Coming Soon badge */}
                {feature.upcoming && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="flex items-center space-x-1 bg-slate-300/30 dark:bg-slate-700/40 text-slate-700 dark:text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur">
                      <Clock className="w-3 h-3" />
                      <span>Coming Soon</span>
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

export default FeaturesGrid;
