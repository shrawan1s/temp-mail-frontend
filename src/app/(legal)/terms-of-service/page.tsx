import { Separator } from '@/components/ui/separator'
import { FileText } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            <Header />
            <main className="pt-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div
                        className="mb-12"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <FileText className="w-8 h-8 text-blue-600" />
                            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                                Terms of Service
                            </h1>
                        </div>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            Last updated: August 2025
                        </p>
                    </div>

                    <div
                        className="prose prose-lg dark:prose-invert max-w-none"
                    >
                        <Separator className="mb-8" />

                        <h2 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            1. Acceptance of Terms
                        </h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            By accessing or using TempMail Pro (“Service”), you agree to be bound by these Terms
                            of Service and our Privacy Policy. If you do not agree, please do not use the Service.
                        </p>

                        <h2 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            2. User Accounts
                        </h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            Certain features require creating an account. You are responsible for your account
                            credentials and all activity under your account. Notify us immediately of any unauthorized use.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Subscriptions & Payments</h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            Free tier is available without payment. Pro and Business tiers require payment via
                            Stripe. All fees are non-refundable except as required by law. We may change pricing
                            with 30 days’ notice.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4"> 4. Use of Service</h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            You agree not to abuse the Service (e.g., spamming, phishing). You will comply with all
                            applicable laws and not use Service for illegal activities.
                        </p>

                        <h2 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            5. Prohibited Conduct
                        </h2>

                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
                            <li>Sending unsolicited bulk emails (spam).</li>
                            <li>Hosting malicious content (phishing, malware).</li>
                            <li>Attempting to reverse-engineer or disrupt our systems.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Termination</h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            We reserve the right to suspend or terminate your access for violation of these Terms
                            or at our discretion, with or without notice.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4"> 7. Intellectual Property</h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-8">
                            All content, trademarks, and technology provided by TempMail Pro are our property or
                            licensors’. You may not use our trademarks without permission.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8. Modifications</h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-8">
                            We may modify these Terms at any time. We will notify you of material changes via email
                            or on our site. Continued use after changes constitutes acceptance.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9. Contact Information</h2>

                        <p>
                            For questions about these Terms, please contact us at{' '}
                            <a href="mailto:info@svinfocraft.com" className="text-blue-600 hover:underline">
                                info@svinfocraft.com
                            </a>.
                        </p>
                    </div>
                </div>
            </main >

            <Footer />
        </div >
    )
}
