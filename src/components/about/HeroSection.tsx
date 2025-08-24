'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Mail, Shield } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
};

const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
};

const HeroSection = () => (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Radial gradient backplate */}
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-violet-600/5 to-cyan-600/5" />
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Floating email icons */}
        {[...Array(4)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute text-blue-200 dark:text-blue-700"
                style={{
                    top: `${15 + i * 20}%`,
                    left: `${10 + (i * 30) % 80}%`,
                }}
                animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 6 + i, ease: 'easeInOut', repeat: Infinity }}
            >
                <Mail className="w-6 h-6" />
            </motion.div>
        ))}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="initial" animate="animate" variants={stagger}>
                {/* Badge */}
                <motion.div variants={fadeInUp} className="mb-8">
                    <Badge className="px-4 py-2 bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-slate-700">
                        <Shield className="w-4 h-4 mr-2 inline" />
                        Our Story
                    </Badge>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={fadeInUp}
                    className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white"
                >
                    About TempMail Pro
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    variants={fadeInUp}
                    className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed"
                >
                    We build privacy-first, disposable email so you never have to compromise your real inbox again.
                    Born from frustration with spam, TempMail Pro gives you secure, throwaway addresses in one click.
                </motion.p>

                {/* CTAs */}
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                    <Link href="/inbox">
                        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg hover:from-blue-700 hover:to-violet-700">
                            Try It Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    </section>
);

export default HeroSection;
