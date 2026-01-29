'use client'

import React from 'react';
import { motion, MotionProps, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Zap, Shield, Clock, Mail, Star, Sparkles } from 'lucide-react';
import { IFeature } from '@/interfaces';

const features: IFeature[] = [
    {
        key: 'unlimited_emails',
        icon: Mail,
        title: 'Unlimited Emails',
        description: 'Create temporary addresses as needed',
        values: { free: '1 at a time', pro: true, business: true }
    },
    {
        key: 'retention',
        icon: Clock,
        title: 'Retention',
        description: 'How long messages are stored before deletion',
        values: { free: '24 hours', pro: '30 days', business: '30 days' }
    },
    {
        key: 'custom_domains',
        icon: Shield,
        title: 'Custom Domains',
        description: 'Bring your own domain for branded mailboxes',
        values: { free: false, pro: true, business: true }
    },
    {
        key: 'priority_processing',
        icon: Zap,
        title: 'Priority Processing',
        description: 'Faster ingestion and processing of incoming mail',
        values: { free: false, pro: true, business: true }
    },
    {
        key: 'ai_filtering',
        icon: Sparkles,
        title: 'Advanced (AI) Filtering',
        description: 'Spam and intent filtering powered by AI',
        beta: true,
        values: { free: false, pro: true, business: true }
    },
    {
        key: 'ad_free',
        icon: Star,
        title: 'Ad-free Experience',
        description: 'Remove display ads in the UI',
        values: { free: false, pro: true, business: true }
    }
]

export default function FeatureComparison() {
    const reduce = useReducedMotion()
    const fade: MotionProps = reduce
        ? {}
        : {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
        }

    // Helpers
    const renderCell = (value: string | boolean) => {
        if (typeof value === 'boolean') {
            return value ? (
                <div className="inline-flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                    <Check className="w-4 h-4" aria-hidden />
                    <span>Yes</span>
                </div>
            ) : (
                <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <X className="w-4 h-4" aria-hidden />
                    <span>No</span>
                </div>
            )
        }
        // string - textual value (like '30 days' or '1 at a time')
        return <span className="text-sm text-slate-700 dark:text-slate-200">{value}</span>
    }

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div {...fade} className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Feature comparison</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Quick glance at what each plan includes — Free, Pro, and Business.
                    </p>
                </motion.div>

                {/* Desktop: table for quick scanning */}
                <div className="hidden md:block">
                    <motion.div {...fade} className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm">
                        <table className="w-full table-fixed text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800">
                                    <th className="w-[38%] p-5 text-slate-900 dark:text-white font-semibold" scope="col">Feature</th>
                                    <th className="w-[20%] p-5 text-center text-slate-900 dark:text-white font-semibold" scope="col">Free</th>
                                    <th className="w-[21%] p-5 text-center text-slate-900 dark:text-white font-semibold" scope="col">Pro</th>
                                    <th className="w-[21%] p-5 text-center text-slate-900 dark:text-white font-semibold" scope="col">Business</th>
                                </tr>
                            </thead>

                            <tbody>
                                {features.map((f) => (
                                    <tr key={f.key} className="border-t border-slate-100 dark:border-slate-700">
                                        <td className="p-5 align-top">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/10 dark:to-orange-900/10">
                                                    <f.icon className="w-5 h-5 text-yellow-600 dark:text-yellow-300" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="text-base font-semibold text-slate-900 dark:text-white">{f.title}</div>
                                                        {f.beta && <Badge className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">Beta</Badge>}
                                                    </div>
                                                    {f.description && <div className="text-sm text-slate-600 dark:text-slate-400">{f.description}</div>}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-5 text-center align-top">{renderCell(f.values.free)}</td>
                                        <td className="p-5 text-center align-top">
                                            <div className="inline-flex flex-col items-center gap-1">
                                                <div>{renderCell(f.values.pro)}</div>
                                            </div>
                                        </td>
                                        <td className="p-5 text-center align-top">{renderCell(f.values.business)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>

                {/* Mobile: stacked cards */}
                <div className="md:hidden space-y-4">
                    {features.map((f) => (
                        <motion.div key={f.key} {...fade}>
                            <Card className="border border-slate-100 dark:border-slate-800">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/10 dark:to-orange-900/10">
                                            <f.icon className="w-5 h-5 text-yellow-600 dark:text-yellow-300" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-3 mb-1">
                                                <div className="font-semibold text-slate-900 dark:text-white">{f.title}</div>
                                                {f.beta && <Badge className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">Beta</Badge>}
                                            </div>

                                            {f.description && <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">{f.description}</div>}

                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="p-2 bg-slate-100 dark:bg-slate-800/60 rounded text-center">
                                                    <div className="text-xs text-slate-500">Free</div>
                                                    <div className="mt-1">{renderCell(f.values.free)}</div>
                                                </div>

                                                <div className="p-2 bg-white dark:bg-slate-900/60 rounded text-center border border-slate-100 dark:border-slate-800">
                                                    <div className="text-xs text-slate-500">Pro</div>
                                                    <div className="mt-1">{renderCell(f.values.pro)}</div>
                                                </div>

                                                <div className="p-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded text-center">
                                                    <div className="text-xs text-slate-500">Business</div>
                                                    <div className="mt-1">{renderCell(f.values.business)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
