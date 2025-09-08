'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Zap, Mail } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
};

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.1 },
    },
};

const HeroSection = () => {
    return (
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
            {/* Subtle animated floating icons */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    custom={i}
                    initial="initial"
                    animate="animate"
                    className="absolute text-blue-200 dark:text-blue-700"
                    style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + (i * 20) % 80}%`,
                    }}
                >
                    <Mail className="w-6 h-6" />
                </motion.div>
            ))}

            {/* Radial gradients */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-violet-600/5 to-cyan-600/5" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center max-w-4xl mx-auto"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    {/* Lighter Badge */}
                    <motion.div variants={fadeInUp} className="mb-8">
                        <Badge className="px-4 py-2 text-sm font-medium bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-slate-700">
                            Trusted by 100 000+ developers worldwide
                        </Badge>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
                    >
                        <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
                            Temporary Email
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                            Made Effortless
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        Generate secure, disposable email addresses instantly. Perfect for developers,
                        testing, and protecting your real inbox from spam and unwanted emails.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                    >
                        <Link href="/login">
                            <Button
                                size="lg"
                                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                Get Started Free
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-4 text-lg border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Learn More
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Feature Highlights */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex items-center justify-center space-x-8 text-sm text-slate-500 dark:text-slate-400"
                    >
                        <div className="flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-blue-500" />
                            Instant Generation
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-amber-500" />
                            Auto Expiry
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
