'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MessageSquare, Send, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
}

export function ContactPreview() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Have questions about our service? Need help with integration?
              Want to provide feedback? We&apos;d love to hear from you.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Email Support</div>
                  <div className="text-slate-600 dark:text-slate-300">support@tempmail.pro</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Live Chat</div>
                  <div className="text-slate-600 dark:text-slate-300">Available 24/7 for Pro users</div>
                </div>
              </div>
            </div>

            <Link href="/contact" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
              <MessageSquare className="w-5 h-5 mr-2" />
              View Full Contact Page
            </Link>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Quick Message
                </h3>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Your name" />
                    <Input placeholder="Your email" type="email" />
                  </div>
                  <Textarea
                    placeholder="Your message..."
                    rows={4}
                    className="resize-none"
                  />
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
                  We&apos;ll get back to you within 24 hours
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
