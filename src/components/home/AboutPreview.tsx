'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Code, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Framer variants
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
}

const techStack = ['NextJS', 'TypeScript', 'TailwindCSS', 'ShadCN UI', 'PostgreSQL', 'Docker']

const AboutPreview = () => {
  return (
    <section className="relative py-16 lg:py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge
              className="
                mb-6 px-3 py-1 text-sm font-medium
                bg-blue-50 dark:bg-blue-900
                text-blue-700 dark:text-blue-200
                border border-blue-100 dark:border-blue-800
              "
            >
              <Shield className="w-4 h-4 mr-2 inline" />
              Privacy by Design
            </Badge>

            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Built for Privacy,
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Designed for You
              </span>
            </h2>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              We believe privacy should be simple and accessible. Our platform is built with modern
              technologies and security best practices to ensure your temporary emails are completely
              private and secure.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">100K+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Active Users</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">99.9%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Uptime</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Built with modern technologies:
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map(tech => (
                  <Badge
                    key={tech}
                    className="
                      text-xs px-2 py-1
                      bg-slate-100 dark:bg-slate-800
                      text-slate-800 dark:text-slate-200
                      border border-slate-200 dark:border-slate-700
                    "
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <Link href="/about">
              <Button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg hover:from-blue-700 hover:to-violet-700 transition-all">
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative"
          >
            <Card className="border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 shadow-2xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">Zero Tracking</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        No cookies, no analytics, complete privacy
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">Open Source</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Transparent code, community-driven development
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">Global CDN</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Fast delivery worldwide with edge locations
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-violet-400/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview;
