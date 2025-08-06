'use client'

import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { Shield, Eye, Lock, Globe } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      <main className="pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="mb-12"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                Privacy Policy
              </h1>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Last updated: December 2024
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <Separator className="mb-8" />

            <h2 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white mb-4">
              <Eye className="w-6 h-6 mr-2 text-blue-600" />
              Information We Collect
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              TempMail Pro is designed with privacy as our core principle. We collect minimal information
              necessary to provide our service:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <li><strong>Temporary Email Addresses:</strong> We generate and temporarily store email addresses for the duration you specify</li>
              <li><strong>Email Content:</strong> We temporarily store incoming emails only until expiration</li>
              <li><strong>Usage Analytics:</strong> Basic anonymized usage statistics to improve our service</li>
              <li><strong>Account Information:</strong> For Pro users, we store email and payment information securely</li>
            </ul>

            <h2 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white mb-4">
              <Lock className="w-6 h-6 mr-2 text-blue-600" />
              How We Use Your Information
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We use the collected information solely to:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <li>Provide temporary email services</li>
              <li>Process and deliver incoming emails</li>
              <li>Maintain service quality and performance</li>
              <li>Handle customer support requests</li>
              <li>Process payments for Pro subscriptions</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Data Retention</h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We automatically delete data based on your selected retention period:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <li><strong>Free Users:</strong> Emails are deleted after 24 hours</li>
              <li><strong>Pro Users:</strong> Emails are deleted after your chosen retention period (up to 7 days)</li>
              <li><strong>Account Data:</strong> Deleted within 30 days of account closure</li>
              <li><strong>Payment Information:</strong> Retained as required by law and payment processors</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Data Sharing</h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We do not sell, trade, or share your personal information with third parties, except:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <li>When required by law or legal process</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who help us operate our platform (under strict privacy agreements)</li>
              <li>In case of business transfer (users will be notified)</li>
            </ul>

            <h2 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white mb-4">
              <Globe className="w-6 h-6 mr-2 text-blue-600" />
              International Data Transfers
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Our services are hosted globally to provide fast access worldwide. We ensure all
              international transfers comply with applicable privacy laws including GDPR and CCPA.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Your Rights</h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              You have the right to:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with supervisory authorities</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Security Measures</h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              We implement industry-standard security measures including encryption in transit and at rest,
              regular security audits, access controls, and secure data centers. However, no method of
              transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Changes to This Policy</h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              We may update this privacy policy from time to time. We will notify users of significant
              changes via email or through our service. Continued use of our service after changes
              constitutes acceptance of the new policy.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>

            <p className="text-slate-600 dark:text-slate-300 mb-4">
              If you have questions about this privacy policy or our privacy practices, please contact us:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>Email: privacy@tempmail.pro</li>
              <li>Address: Privacy Officer, TempMail Pro, San Francisco, CA</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
