'use client'

import React from 'react'
import { cubicBezier, motion } from 'framer-motion'
import { Lock, ShieldCheck, Zap, Globe } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: cubicBezier(0.21, 0.47, 0.32, 0.98),
        },
    },
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const features = [
    {
        title: 'End-to-End Encryption',
        description: 'All data in transit is encrypted using HTTPS/TLS. Sensitive inbox content is securely handled and never stored longer than required.',
        icon: Lock,
    },
    {
        title: 'Zero Tracking & Analytics',
        description: 'We do not use any cookies or tracking scripts on inbox content. Your activity stays your own — always.',
        icon: ShieldCheck,
    },
    {
        title: 'Auto Data Expiry',
        description: 'Inbox contents are automatically purged after expiration. Nothing is retained or backed up.',
        icon: Zap,
    },
    {
        title: 'GDPR Compliant',
        description: 'Our infrastructure and data handling policies align with strict GDPR and global privacy regulations.',
        icon: Globe,
    },
]

export const SecurityAndPrivacy = () => {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                        Security & Privacy First
                    </h2>
                    <Separator className="my-6 w-16 mx-auto" />
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Your privacy is non-negotiable. We’ve built our platform to protect your data at every level — from storage to transmission.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    className="grid md:grid-cols-2 gap-8"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex items-start gap-5 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 shadow-sm hover:shadow-md transition"
                            variants={fadeInUp}
                        >
                            <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.p
                    className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    Designed with privacy in mind. Built for peace of mind.
                </motion.p>
            </div>
        </section>
    )
};
