'use client';

import React from 'react';
import { cubicBezier, motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Users, MessageSquare, Crown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
};

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.15 },
    },
};

const contactMethods = [
    {
        icon: Mail,
        title: 'Email Support',
        description: 'General inquiries and support',
        link: 'mailto:support@svinfocraft.com',
        label: 'support@svinfocraft.com',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Users,
        title: 'Sales Team',
        description: 'Enterprise and custom solutions',
        link: 'mailto:info@svinfocraft.com',
        label: 'info@svinfocraft.com',
        color: 'from-green-500 to-emerald-500',
    },
    {
        icon: MessageSquare,
        title: 'Live Chat',
        description: 'Instant support for Pro and Business users',
        link: '/chat',
        label: 'Start Chat',
        color: 'from-purple-500 to-violet-500',
        isPro: true,
    },
];

export const ContactMethods = () => {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    Get in Touch
                </motion.h2>
                <motion.div
                    className="mx-auto my-4 w-24"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <Separator />
                </motion.div>
                <motion.p
                    className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    Whether you have questions, feedback, or need assistance — choose your preferred method below and we’ll get back to you right away.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {contactMethods.map((method, idx) => {
                        const Icon = method.icon;
                        return (
                            <motion.div key={idx} variants={fadeInUp} whileHover={{ scale: 1.02 }}>
                                {/* Inside the map loop */}
                                <Card className="h-full flex flex-col border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardContent className="flex-1 p-8 flex flex-col justify-between relative">
                                        {method.isPro && (
                                            <div className="absolute top-3 right-3 z-10">
                                                <div className="flex items-center space-x-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                    <Crown className="w-3 h-3" />
                                                    <span>Pro</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-4 text-center mt-4">
                                            <div
                                                className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto`}
                                            >
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                {method.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-300">
                                                {method.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 text-center">
                                            <Link href={method.link}>
                                                <Button className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-lg shadow hover:shadow-md transition">
                                                    {method.label}
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>

                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};