'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap, Shield, Clock, Mail, Star, ArrowRight, Sparkles } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function PremiumPage() {
  const features = [
    {
      icon: Mail,
      title: "Unlimited Emails",
      description: "Create as many temporary emails as you need",
      free: "1 at a time",
      premium: "Unlimited"
    },
    {
      icon: Clock,
      title: "Extended Retention",
      description: "Keep emails longer for important verifications",
      free: "24 hours",
      premium: "Up to 30 days"
    },
    {
      icon: Shield,
      title: "Custom Domains",
      description: "Use your own domain for professional appearance",
      free: "Standard domains",
      premium: "Custom domains"
    },
    {
      icon: Zap,
      title: "Priority Processing",
      description: "Faster email delivery and processing",
      free: "Standard speed",
      premium: "Priority processing"
    },
    {
      icon: Star,
      title: "Advanced Filtering",
      description: "Smart spam detection and email categorization",
      free: "Basic filtering",
      premium: "AI-powered filtering"
    },
    {
      icon: Sparkles,
      title: "Ad-free Experience",
      description: "Clean interface without any advertisements",
      free: "With ads",
      premium: "Ad-free"
    }
  ]

  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your Premium subscription at any time. You'll continue to have access to Premium features until the end of your billing period."
    },
    {
      question: "What happens to my emails if I downgrade?",
      answer: "Your emails will be retained according to the free plan limits (24 hours). We recommend downloading important emails before downgrading."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with Premium, contact us within 30 days for a full refund."
    },
    {
      question: "Can I use custom domains immediately?",
      answer: "Yes, once you upgrade to Premium, you can add and verify custom domains immediately through your settings panel."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-orange-600/10 to-red-600/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                <Crown className="w-4 h-4 mr-2" />
                Premium Features
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-yellow-900 to-slate-900 dark:from-white dark:via-yellow-100 dark:to-white bg-clip-text text-transparent mb-6"
            >
              Unlock the Full
              <br />
              <span className="text-yellow-600 dark:text-yellow-400">Power</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Get unlimited temporary emails, extended retention, custom domains, and priority support.
              Perfect for professionals and power users.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 group">
                Start Premium Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Compare Plans
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="relative h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <CardDescription>Perfect for casual use</CardDescription>
                  <div className="text-4xl font-bold">$0<span className="text-lg text-slate-500">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "1 temporary email at a time",
                      "24-hour email retention",
                      "Basic inbox features",
                      "Standard domains only",
                      "Community support",
                      "With advertisements"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Current Plan
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="relative h-full border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    Premium
                    <Sparkles className="w-6 h-6 ml-2 text-yellow-600" />
                  </CardTitle>
                  <CardDescription>For power users and professionals</CardDescription>
                  <div className="text-4xl font-bold">$9<span className="text-lg text-slate-500">/month</span></div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    or $90/year (save 17%)
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Unlimited temporary emails",
                      "Up to 30-day retention",
                      "Custom domain support",
                      "Priority processing",
                      "Advanced AI filtering",
                      "Ad-free experience",
                      "Priority support",
                      "API access"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                    Upgrade to Premium
                  </Button>
                  <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                    30-day money-back guarantee
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Feature Comparison
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              See what you get with Premium
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-4">{feature.description}</p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                              <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">Free</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{feature.free}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-lg">
                              <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">Premium</p>
                              <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">{feature.premium}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Everything you need to know about Premium
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
