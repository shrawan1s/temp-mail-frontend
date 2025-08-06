'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Shield, Code, Users, Globe, Zap, Heart, Database, Server, Cloud, Lock } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

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

export default function AboutPage() {
  const techStack = [
    { name: 'NestJS', description: 'Scalable Node.js server-side applications', icon: Server },
    { name: 'PostgreSQL', description: 'Robust relational database', icon: Database },
    { name: 'Redis', description: 'High-performance caching and sessions', icon: Zap },
    { name: 'Weaviate', description: 'Vector database for AI-powered features', icon: Code },
    { name: 'TypeScript', description: 'Type-safe development', icon: Code },
    { name: 'Docker', description: 'Containerized deployment', icon: Cloud }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your privacy is our top priority. We never track, store, or analyze your personal data.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Accessible to All',
      description: 'Our service should be available to everyone, regardless of technical expertise.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Performance Driven',
      description: 'Fast, reliable service with 99.9% uptime and global edge locations.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Heart,
      title: 'Community Focused',
      description: 'Built by developers, for developers. We listen to our community feedback.',
      color: 'from-red-500 to-pink-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-violet-600/10 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-700/50">
                <Shield className="w-4 h-4 mr-2" />
                Our Story
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8">
                About TempMail Pro
              </h1>

              <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
                We believe that privacy should be simple, accessible, and built into the tools we use every day.
                TempMail Pro was born from the frustration of having to share personal email addresses
                for temporary needs, exposing ourselves to spam and privacy violations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Mission</h2>
                <Separator className="mb-8" />

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                  Our mission is to democratize online privacy by providing fast, secure, and reliable
                  temporary email services. We believe everyone deserves the right to protect their
                  personal information while still being able to access the digital services they need.
                </p>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                  Whether you're a developer testing email workflows, a privacy-conscious individual
                  signing up for services, or a QA tester managing multiple accounts, we provide the
                  tools you need without compromising your personal data.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-16">Our Values</h2>
                <Separator className="mb-8" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {values.map((value, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-850 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className={`w-14 h-14 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                        <value.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        {value.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Technology Stack</h2>
              <Separator className="mb-8" />

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-12">
                We use modern, battle-tested technologies to ensure our service is fast, secure, and scalable.
                Our infrastructure is designed for high availability and global performance.
              </p>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {techStack.map((tech, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
                          <tech.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {tech.name}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300">
                            {tech.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-violet-50/50 dark:from-blue-950/30 dark:to-violet-950/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid md:grid-cols-3 gap-8 text-center"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-2">
                      100K+
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">Active Users</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      99.9%
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">Uptime</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      5M+
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">Emails Processed</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Security & Privacy */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Security & Privacy</h2>
              <Separator className="mb-8" />

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                We implement industry-leading security practices to protect your temporary emails:
              </p>

              <ul className="space-y-3 text-slate-600 dark:text-slate-300 mb-8">
                <li className="flex items-center">
                  <Lock className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  End-to-end encryption for all email communications
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  No tracking cookies or analytics on email content
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Automatic data purging after expiration
                </li>
                <li className="flex items-center">
                  <Globe className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  GDPR compliant data handling
                </li>
              </ul>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Our commitment to privacy means we never store more data than necessary,
                never share information with third parties, and give you complete control
                over your temporary email lifecycle.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
