import { Separator } from '@/components/ui/separator';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white dark:bg-slate-900">
      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div
            className="mb-12"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                Privacy Policy
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
              1. Information We Collect
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
              2. How We Use Your Information
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

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Data Retention</h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We automatically delete data based on your selected retention period:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <li><strong>Free Users:</strong> Emails are deleted after 24 hours</li>
              <li><strong>Pro Users:</strong> Emails are deleted after your chosen retention period (up to 7 days)</li>
              <li><strong>Account Data:</strong> Deleted within 30 days of account closure</li>
              <li><strong>Payment Information:</strong> Retained as required by law and payment processors</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Data Sharing</h2>

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
              5. International Data Transfers
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Our services are hosted globally to provide fast access worldwide. We ensure all
              international transfers comply with applicable privacy laws including GDPR and CCPA.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Your Rights</h2>

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

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. Security Measures</h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              We implement industry-standard security measures including encryption in transit and at rest,
              regular security audits, access controls, and secure data centers. However, no method of
              transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8. Changes to This Policy</h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              We may update this privacy policy from time to time. We will notify users of significant
              changes via email or through our service. Continued use of our service after changes
              constitutes acceptance of the new policy.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9. Contact Us</h2>

            <p className="text-slate-600 dark:text-slate-300 mb-4">
              If you have questions about this privacy policy or our privacy practices, please contact us:
              {" "}<a href="mailto:info@svinfocraft.com" className="text-blue-600 hover:underline">
                info@svinfocraft.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
