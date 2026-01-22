'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, ArrowRight } from 'lucide-react';
import type { Variants } from "framer-motion";

export default function HeroSection() {
    const reduce = useReducedMotion();

    const container: Variants = reduce
        ? { initial: {}, animate: {} }
        : {
            initial: { opacity: 0, y: 8 },
            animate: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.08, ease: [0.2, 0.8, 0.2, 1] },
            },
        };

    const fadeUp: Variants = reduce
        ? { initial: {}, animate: {} }
        : {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
        };


    return (
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-36 lg:pb-28 bg-white dark:bg-slate-900">
            {/* decorative background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/40 via-orange-50/30 to-red-50/10 dark:from-yellow-900/10 dark:via-orange-900/5 dark:to-transparent" />
                <motion.div
                    aria-hidden
                    className="absolute -left-12 -top-8 w-72 h-72 rounded-full bg-yellow-400/10 blur-3xl"
                    animate={reduce ? undefined : { y: [0, -8, 0] }}
                    transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    aria-hidden
                    className="absolute right-8 bottom-6 w-96 h-96 rounded-full bg-orange-400/8 blur-3xl"
                    animate={reduce ? undefined : { y: [0, 6, 0] }}
                    transition={reduce ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mx-auto max-w-4xl"
                    initial="initial"
                    animate="animate"
                    variants={container}
                >
                    {/* Badge */}
                    <motion.div variants={fadeUp} className="mb-6">
                        <Badge className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-yellow-50 text-yellow-700 border border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-900/40">
                            <Crown className="w-4 h-4" />
                            Premium Features
                        </Badge>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white mb-6"
                    >
                        Unlock the full
                        <br />
                        <span className="bg-gradient-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent">
                            Power
                        </span>
                    </motion.h1>

                    {/* Subhead */}
                    <motion.p
                        variants={fadeUp}
                        className="mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8"
                    >
                        Unlimited disposable addresses, extended retention, custom domains, and priority support — built for professionals and teams.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                        <Link href="#">
                            <Button
                                size="lg"
                                className="px-7 py-4 text-lg font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 shadow-lg transition-transform focus:outline-none focus:ring-4 focus:ring-yellow-300/30"
                                aria-label="Start Premium Trial"
                            >
                                Get Premium
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>

                        <Link href="/contact">
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-6 py-3 text-lg bg-transparent text-slate-700 dark:text-white border-slate-300 dark:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                                aria-label="Contact Sales"
                            >
                                Contact Sales
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
