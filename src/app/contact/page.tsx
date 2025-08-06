'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Mail, MessageSquare, Phone, MapPin, Clock, Send, CheckCircle, Globe, Users } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useToast } from '@/hooks/use-toast'

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'General inquiries and support',
      contact: 'support@tempmail.pro',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Sales Team',
      description: 'Enterprise and custom solutions',
      contact: 'sales@tempmail.pro',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Instant support for Pro users',
      contact: 'Available 24/7',
      color: 'from-purple-500 to-violet-500'
    }
  ]

  const officeInfo = [
    {
      icon: MapPin,
      title: 'Headquarters',
      info: 'San Francisco, CA, USA'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      info: '24/7 for Pro users, 9 AM - 5 PM PST for Free users'
    },
    {
      icon: Globe,
      title: 'Global Presence',
      info: 'Servers in 15+ countries worldwide'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8">
                Get in Touch
              </h1>
              <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Have questions about our service? Need help with integration? We&apos;re here to help.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid md:grid-cols-3 gap-8 mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {contactMethods.map((method, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <method.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        {method.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {method.description}
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {method.contact}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                      Send us a Message
                    </CardTitle>
                    <p className="text-slate-600 dark:text-slate-300">
                      Fill out the form below and we&apos;ll get back to you as soon as possible.
                    </p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="What's this about?"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us more about your inquiry..."
                          rows={6}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Sending...
                          </div>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Office Info */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                    Office Information
                  </h3>
                  <div className="space-y-6">
                    {officeInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                            {info.title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-300">
                            {info.info}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                    Response Times
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-slate-600 dark:text-slate-300">
                        General inquiries: Within 24 hours
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-slate-600 dark:text-slate-300">
                        Pro support: Within 2 hours
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-slate-600 dark:text-slate-300">
                        Enterprise: Immediate response
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
