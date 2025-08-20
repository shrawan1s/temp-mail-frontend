import { Separator } from '@/components/ui/separator';
import { Cookie } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            <Header />
            <main className="pt-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="mb-12">
                        <div className="flex items-center space-x-3 mb-6">
                            <Cookie className="w-8 h-8 text-blue-600" />
                            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                                Cookie Policy
                            </h1>
                        </div>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            Last updated: August 2025
                        </p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <Separator className="mb-8" />

                        <h2 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            1. What Are Cookies
                        </h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            Cookies are small text files stored on your device by your browser. They help websites remember your preferences and improve your experience.
                        </p>

                        <h2 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            2. How We Use Cookies
                        </h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            We use cookies to:
                        </p>

                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
                            <li>Remember your session and preferences</li>
                            <li>Analyze site usage and performance</li>
                            <li>Deliver personalized content and ads</li>
                            <li>Enable essential security features</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Types of Cookies</h2>

                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
                            <li>
                                <strong>Essential Cookies:</strong> Required for core functionality, such as authentication.
                            </li>
                            <li>
                                <strong>Performance Cookies:</strong> Collect anonymous analytics to optimize performance.
                            </li>
                            <li>
                                <strong>Functional Cookies:</strong> Remember preferences like language or theme.
                            </li>
                            <li>
                                <strong>Advertising Cookies:</strong> Track user behavior to deliver relevant ads.
                            </li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Managing Cookies</h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            You can control or disable cookies via your browser settings. Note that blocking essential cookies may impact site functionality.
                        </p>

                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
                            <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
                            <li>Firefox: Preferences → Privacy & Security → Cookies and Site Data</li>
                            <li>Safari: Preferences → Privacy → Manage Website Data</li>
                            <li>Edge: Settings → Site permissions → Cookies and site data</li>
                        </ul>

                        <h2 className="flex items-center text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            5. Third-Party Cookies
                        </h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            We may allow third-party services (e.g., analytics, advertising) to set cookies via our site. These are governed by their respective policies.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Changes to This Policy</h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            We may update this Cookie Policy periodically. We’ll notify you of material changes via email or a banner on our site.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. Contact Us</h2>

                        <p className="text-slate-600 dark:text-slate-300 mb-8">
                            For questions about cookies, contact us at{' '}
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
