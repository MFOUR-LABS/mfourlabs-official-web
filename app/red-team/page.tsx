'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, ShieldAlert, Bug, Siren, Crosshair } from 'lucide-react';
import { GlobalPreloader } from '@/components/GlobalPreloader';

export default function RedTeamPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return <GlobalPreloader onComplete={() => setIsLoading(false)} theme="red" />;
    }

    return (
        <div className="min-h-screen bg-black text-zinc-300 font-mono selection:bg-red-900 selection:text-white flex flex-col items-center">

            {/* HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="flex items-center gap-0.5 text-xl tracking-tighter text-white group-hover:text-red-500 transition-colors">
                            <span className="font-montserrat font-bold">M4</span>
                            <span className="italic text-zinc-500 text-3xl font-black leading-none pb-1">|</span>
                            <span className="font-montserrat ">LABS</span>
                        </div>
                        <div className="hidden md:block h-4 w-[1px] bg-zinc-800"></div>
                        <div className="hidden md:block text-xs text-zinc-500 tracking-widest group-hover:text-red-500/70 transition-colors">
                            RED TEAM UNIT
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest text-zinc-500">
                        <span className="hover:text-red-500 transition-colors cursor-pointer">SERVICES</span>
                        <span className="hover:text-red-500 transition-colors cursor-pointer">ADVERSARIAL</span>
                        <div className="flex items-center gap-2 pl-6 border-l border-zinc-800">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="text-red-500">ACTIVE</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="w-full max-w-7xl border-x border-zinc-800 min-h-screen pt-32 pb-20 relative">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <div className="relative z-10 px-6 md:px-12">
                    {/* Hero Section */}
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <span className="block text-red-500 text-xs tracking-[0.2em] mb-6">ADVERSARIAL SERVICES LEVEL 02</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
                            BREAK <br />
                            <span className="text-zinc-800">YOUR OWN</span> <br />
                            MODELS.
                        </h1>
                        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                            Advanced Red Teaming as a Service. We stress-test your AI systems against
                            jailbreaks, prompt injections, and logic bombs before the public does.
                        </p>

                        <button
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-700 hover:border-red-500/50 rounded-lg overflow-hidden transition-all duration-300"
                        >
                            <span className="absolute inset-0 bg-red-900/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative font-bold text-white group-hover:text-red-500 transition-colors tracking-wider text-sm">
                                INITIATE AUDIT
                            </span>
                            <ShieldAlert className="relative w-4 h-4 text-zinc-500 group-hover:text-red-500 transition-colors" />
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {[
                            {
                                icon: <Bug className="w-6 h-6" />,
                                title: "Vulnerability Scanning",
                                desc: "Automated probing for known CVEs and framework-specific weaknesses."
                            },
                            {
                                icon: <Siren className="w-6 h-6" />,
                                title: "Stress Testing",
                                desc: "High-load logic floods designed to trigger hallucinations and failures."
                            },
                            {
                                icon: <Crosshair className="w-6 h-6" />,
                                title: "Compliance Audits",
                                desc: "Verification against EU AI Act Article 15 (Accuracy, Robustness)."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 border border-zinc-800 hover:border-red-500/30 bg-black/50 transition-colors">
                                <div className="text-zinc-600 group-hover:text-red-500 mb-6 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">
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
                                <span>UNIT_STATUS</span>
                                <span className="text-red-500">ENGAGEMENT READY</span>
                            </div>
                            <div className="flex justify-between">
                                <span>ACTIVE_THREATS</span>
                                <span>0</span>
                            </div>
                            <div className="flex justify-between">
                                <span>LAST_SWEEP</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full border-t border-zinc-800 bg-black py-8 text-center z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 tracking-widest uppercase">
                    <div>
                        RED TEAM // ADVERSARIAL UNIT
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="hover:text-red-500 transition-colors cursor-pointer">METHODOLOGY</span>
                        <span className="hover:text-red-500 transition-colors cursor-pointer">ETHICS</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
