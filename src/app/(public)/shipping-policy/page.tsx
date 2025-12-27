import { Separator } from '@/components/ui/separator';
import { Package } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <section className="bg-white dark:bg-slate-900">
      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Package className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                Shipping & Delivery Policy
              </h1>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Last updated: December 2024
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Separator className="mb-8" />

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              1. Digital Service Delivery
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              TempMail Pro is a <strong>digital service</strong> that does not involve any physical
              goods or shipping. All services are delivered electronically and are accessible
              immediately upon successful payment and account activation.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              2. Service Activation
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Upon successful payment:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <li>
                <strong>Instant Access:</strong> Your Pro subscription is activated immediately
              </li>
              <li>
                <strong>Confirmation Email:</strong> You will receive a confirmation email with your
                subscription details
              </li>
              <li>
                <strong>Account Dashboard:</strong> All Pro features become available in your account
                dashboard instantly
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              3. No Physical Shipping
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              As TempMail Pro is entirely a digital/online service, there are no physical products
              to be shipped. Therefore, traditional shipping policies regarding delivery times,
              shipping charges, or physical delivery addresses do not apply to our service.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              4. Service Availability
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Our service is available 24/7 globally. You can access TempMail Pro from anywhere in
              the world with an internet connection. We strive to maintain 99.9% uptime, though
              occasional maintenance windows may be scheduled with advance notice.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              5. Delivery Issues
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              If you experience any issues with service activation after payment:
            </p>

            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <li>Check your email inbox and spam folder for the confirmation email</li>
              <li>Try logging out and logging back into your account</li>
              <li>Clear your browser cache and refresh the page</li>
              <li>
                Contact our support team at{' '}
                <a href="mailto:info@svinfocraft.com" className="text-blue-600 hover:underline">
                  info@svinfocraft.com
                </a>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              6. Contact Us
            </h2>

            <p className="text-slate-600 dark:text-slate-300 mb-4">
              For any questions regarding service delivery, please contact us at{' '}
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
