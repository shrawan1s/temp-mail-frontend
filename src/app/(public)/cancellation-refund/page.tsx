import { Separator } from '@/components/ui/separator';
import { RotateCcw } from 'lucide-react';

export default function CancellationRefundPage() {
  return (
    <section className="bg-white dark:bg-slate-900">
      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <RotateCcw className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                Cancellation & Refund Policy
              </h1>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Last updated: December 2024
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Separator className="mb-8" />

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              1. Subscription Cancellation
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              You may cancel your TempMail Pro subscription at any time from your account settings.
              Upon cancellation:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <li>Your subscription will remain active until the end of your current billing period</li>
              <li>You will not be charged for any subsequent billing periods</li>
              <li>You will retain access to Pro features until the subscription expires</li>
              <li>Your account will automatically revert to the Free plan after expiration</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              2. Refund Policy
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We offer refunds under the following conditions:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <li>
                <strong>Full Refund:</strong> If you request a refund within 7 days of your initial
                subscription purchase and have not extensively used the Pro features
              </li>
              <li>
                <strong>Prorated Refund:</strong> In cases of service outages or technical issues on
                our end that significantly impact your use of the service
              </li>
              <li>
                <strong>No Refund:</strong> After 7 days from purchase, or if the subscription has
                been used extensively, refunds will not be provided
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              3. How to Request a Refund
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              To request a refund, please contact our support team:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <li>
                Email us at{' '}
                <a href="mailto:info@svinfocraft.com" className="text-blue-600 hover:underline">
                  info@svinfocraft.com
                </a>{' '}
                with your account email and reason for the refund request
              </li>
              <li>Include your transaction ID or payment receipt if available</li>
              <li>We will process your request within 5-7 business days</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              4. Refund Processing
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Approved refunds will be processed to the original payment method. Please note that
              it may take 5-10 business days for the refund to reflect in your account, depending
              on your bank or payment provider. We use Razorpay for payment processing, and refunds
              are subject to their processing timelines.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              5. Exceptional Circumstances
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              We reserve the right to offer full or partial refunds in exceptional circumstances
              at our sole discretion. This includes but is not limited to extended service outages,
              billing errors, or other situations where we believe a refund is warranted.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              6. Contact Us
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-4">
              If you have any questions about our cancellation or refund policy, please contact us
              at{' '}
              <a href="mailto:info@svinfocraft.com" className="text-blue-600 hover:underline">
                info@svinfocraft.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
