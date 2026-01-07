'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, ShieldCheck, Server, Lock, Globe } from 'lucide-react';
import { LabRegistration } from '@/components/LabRegistration';
import { GlobalPreloader } from '@/components/GlobalPreloader';

export default function IronGradePage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return <GlobalPreloader onComplete={() => setIsLoading(false)} theme="yellow" />;
    }

    return (
        <div className="min-h-screen bg-black text-zinc-300 font-mono selection:bg-yellow-900 selection:text-white flex flex-col items-center">
            {/* Registration Modal */}
            {showRegistration && <LabRegistration onClose={() => setShowRegistration(false)} />}

            {/* HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="flex items-center gap-0.5 text-xl tracking-tighter text-white group-hover:text-brand-yellow transition-colors">
                            <span className="font-montserrat font-bold">M4</span>
                            <span className="italic text-zinc-500 text-3xl font-black leading-none pb-1">|</span>
                            <span className="font-montserrat ">LABS</span>
                        </div>
                        <div className="hidden md:block h-4 w-[1px] bg-zinc-800"></div>
                        <div className="hidden md:block text-xs text-zinc-500 tracking-widest group-hover:text-brand-yellow/70 transition-colors">
                            IRON GRADE UNIT
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest text-zinc-500">
                        <span className="hover:text-brand-yellow transition-colors cursor-pointer">INFRASTRUCTURE</span>
                        <span className="hover:text-brand-yellow transition-colors cursor-pointer">SECURITY</span>
                        <div className="flex items-center gap-2 pl-6 border-l border-zinc-800">
                            <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-pulse"></span>
                            <span className="text-brand-yellow">OPERATIONAL</span>
                        </div>
                    </div>
                </div>
            </header >

            <main className="w-full max-w-7xl border-x border-zinc-800 min-h-screen pt-32 pb-20 relative">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <div className="relative z-10 px-6 md:px-12">
                    {/* Hero Section */}
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <span className="block text-brand-yellow text-xs tracking-[0.2em] mb-6">INFRASTRUCTURE LEVEL 01</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
                            HEAVY <br />
                            <span className="text-zinc-800">INDUSTRY</span> <br />
                            COMPUTE.
                        </h1>
                        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                            Sovereign AI infrastructure for high-risk deployments.
                            Air-gapped runtimes, recursive oversight, and military-grade encryption.
                        </p>

                        <button
                            onClick={() => setShowRegistration(true)}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-700 hover:border-brand-yellow/50 rounded-lg overflow-hidden transition-all duration-300"
                        >
                            <span className="absolute inset-0 bg-brand-yellow/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative font-bold text-white group-hover:text-brand-yellow transition-colors tracking-wider text-sm">
                                REQUEST ACCESS ID
                            </span>
                            <ArrowUpRight className="relative w-4 h-4 text-zinc-500 group-hover:text-brand-yellow transition-colors" />
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {[
                            {
                                icon: <Server className="w-6 h-6" />,
                                title: "Sovereign Runtime",
                                desc: "Dedicated GPU clusters with physically isolated memory states."
                            },
                            {
                                icon: <Lock className="w-6 h-6" />,
                                title: "Zero-Trust Mesh",
                                desc: "Every API call runs through a recursive cryptographic verification loop."
                            },
                            {
                                icon: <Globe className="w-6 h-6" />,
                                title: "Global Edge",
                                desc: "Sub-50ms latency across 32 availability zones worldwide."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 border border-zinc-800 hover:border-brand-yellow/30 bg-black/50 transition-colors">
                                <div className="text-zinc-600 group-hover:text-brand-yellow mb-6 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-yellow transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Status Log */}
                    <div className="border-t border-zinc-800 pt-12">
                        <div className="font-mono text-[10px] text-zinc-600 space-y-2">
                            <div className="flex justify-between">
                                <span>SYSTEM_STATUS</span>
                                <span className="text-brand-yellow">ALL SYSTEMS NOMINAL</span>
                            </div>
                            <div className="flex justify-between">
                                <span>UPTIME_GUARANTEE</span>
                                <span>99.999%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>LAST_AUDIT</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full border-t border-zinc-800 bg-black py-8 text-center z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 tracking-widest uppercase">
                    <div>
                        IRON GRADE // INFRASTRUCTURE DIVISION
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="hover:text-brand-yellow transition-colors cursor-pointer">SLA</span>
                        <span className="hover:text-brand-yellow transition-colors cursor-pointer">COMPLIANCE</span>
                    </div>
                </div>
            </footer>
        </div >
    );
}
