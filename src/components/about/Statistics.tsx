"use client";

import React from 'react';
import { cubicBezier, motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Card, CardContent } from '@/components/ui/card';

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

const stats = [
    {
        label: 'Active Users',
        end: 100_000,
        suffix: '+',
        gradient: 'from-blue-600 to-violet-600'
    },
    {
        label: 'Uptime',
        end: 99.9,
        decimals: 1,
        suffix: '%',
        gradient: 'from-green-600 to-emerald-600'
    },
    {
        label: 'Emails Processed',
        end: 5_000_000,
        suffix: '+',
        gradient: 'from-purple-600 to-pink-600'
    }
];

export const Statistics = () => {
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-violet-50/50 dark:from-blue-950/30 dark:to-violet-950/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="grid md:grid-cols-3 gap-8 text-center"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {stats.map((stat, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg">
                                <CardContent className="p-8">
                                    <div
                                        className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                                    >
                                        <CountUp
                                            end={stat.end}
                                            duration={2}
                                            separator=","
                                            decimals={stat.decimals || 0}
                                            suffix={stat.suffix}
                                        />
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 font-medium">
                                        {stat.label}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};