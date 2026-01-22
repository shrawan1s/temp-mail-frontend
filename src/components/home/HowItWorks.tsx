'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Mail, MousePointer, Clock } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const steps = [
  {
    step: 1,
    icon: Mail,
    title: 'Generate',
    description: 'Get an instant temporary email address with one click',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    step: 2,
    icon: MousePointer,
    title: 'Use',
    description: 'Copy and use it anywhere you need a disposable email',
    color: 'from-violet-500 to-purple-500'
  },
  {
    step: 3,
    icon: Clock,
    title: 'Expire',
    description: 'It automatically expires and cleans up after set time',
    color: 'from-amber-500 to-orange-500'
  }
]

const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Three simple steps to protect your privacy and keep your inbox clean
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div key={step.step} variants={fadeInUp} className="relative">
                <Card className="relative h-full border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 shadow-xl hover:shadow-2xl transition-transform duration-300 group hover:scale-[1.02]">
                  <CardContent className="p-8">
                    <div className="relative mb-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white dark:text-slate-900">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl tracking-wide uppercase font-semibold text-slate-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Arrow between steps - hidden on mobile */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700">
                      <ArrowRight className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks;
