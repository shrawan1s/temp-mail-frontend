'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { cubicBezier } from 'framer-motion';

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

export const MissionSection = () => {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">

                {/* Glassmorphic Mission Card */}
                <motion.div
                    className="
            relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg
            border border-white/30 dark:border-slate-800/50
            rounded-2xl p-8 shadow-lg
          "
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Our Mission
                    </h2>
                    <Separator className="mb-6" />
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        We democratize online privacy by delivering fast, secure, and reliable
                        disposable email. Everyone deserves control over their inbox without
                        sacrificing convenience.
                    </p>
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                        From developers testing workflows to privacy-minded individuals and QA
                        testers, TempMail Pro empowers you with one-click, throwaway addresses
                        so your personal email stays yours.
                    </p>
                </motion.div>

                {/* Illustration Panel with Picsum Placeholder */}
                <motion.div
                    className="
            w-full h-80 lg:h-[28rem] rounded-2xl overflow-hidden shadow-lg
            relative bg-slate-100 dark:bg-slate-800
          "
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    {/* Random placeholder image from Picsum */}
                    <Image
                        src="https://picsum.photos/800/600?email,technology"
                        alt="Abstract technology illustration"
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </div>
        </section>
    );
};