'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
}

const faqs = [
  {
    question: "How long do temporary emails last?",
    answer: "Free accounts get 24-hour retention, while Pro accounts can keep emails for up to 7 days. You can also set custom expiry times for individual emails."
  },
  {
    question: "Is it really free with no hidden costs?",
    answer: "Yes! Our free plan is completely free with no hidden costs. You get 1 temporary email at a time with 24-hour retention. Upgrade to Pro for unlimited emails and advanced features."
  },
  {
    question: "Can I use this for important verifications?",
    answer: "Our service is perfect for account verifications, password resets, and any situation where you need a reliable temporary email address."
  },
  {
    question: "Do you store or read my emails?",
    answer: "We prioritize your privacy. Emails are automatically deleted after expiry, and we never read or store your email contents beyond the retention period."
  },
  {
    question: "Can I integrate this with my application?",
    answer: "Yes! Pro users get access to our REST API for seamless integration with your applications, allowing you to generate and manage temporary emails programmatically."
  },
  {
    question: "What about spam and malicious emails?",
    answer: "We have advanced AI-powered spam detection and filtering. Malicious emails are automatically blocked, and suspected spam is clearly marked."
  }
]

const FAQ = () => {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Everything you need to know about temporary emails
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-slate-200 dark:border-slate-700 rounded-xl px-6 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 dark:text-white py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-300 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ;
