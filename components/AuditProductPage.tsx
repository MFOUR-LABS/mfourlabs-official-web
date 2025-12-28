import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Check, ArrowRight, Terminal } from 'lucide-react';
import { LandingPage } from './LandingPage'; // Using existing footer/nav structure or similar

export const AuditProductPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-brand-yellow/30">

            {/* Navigation (Simplified) */}
            <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
                        <ShieldCheck className="w-6 h-6 text-brand-yellow" />
                        Sentinel-EU
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/login')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Sign In</button>
                        <button onClick={() => navigate('/signup')} className="text-sm font-bold bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors">Get Started</button>
                    </div>
                </div>
            </nav>

            <main>
                {/* Hero */}
                <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                    <div className="absolute top-0 center w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                            Updated for Final AI Act Text (2025)
                        </div>
                        <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tighter leading-[1.1] mb-8">
                            Compliance is code. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-amber-600">Automate via API.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
                            The only compliance platform built for engineers. Scan your models against EU AI Act Annex IV requirements in the CI/CD pipeline.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <button onClick={() => navigate('/signup')} className="px-8 py-4 bg-brand-yellow text-black font-bold rounded-full hover:bg-brand-yellowDim transition-all flex items-center gap-2 text-lg">
                                Start Free Scan <ArrowRight className="w-5 h-5" />
                            </button>
                            <button onClick={() => navigate('/docs')} className="px-8 py-4 bg-zinc-900 text-white font-medium rounded-full border border-zinc-800 hover:bg-zinc-800 transition-all">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </section>

                {/* Social Proof */}
                <section className="py-12 border-y border-white/5 bg-zinc-900/20">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-sm font-mono text-zinc-600 mb-8 uppercase tracking-widest">Trusting the Standard</p>
                        <div className="flex justify-center flex-wrap gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Logo Placeholders */}
                            {['Acme Corp', 'GlobalBank', 'HealthAI', 'FinTech', 'DataCo'].map(n => (
                                <span key={n} className="text-xl font-bold font-display text-zinc-400">{n}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Feature Grid */}
                <section className="py-24 px-6 bg-[#09090b]">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<ShieldCheck />}
                                title="Annex IV Automation"
                                desc="Automatically technical documentation required for High-Risk AI systems."
                            />
                            <FeatureCard
                                icon={<Terminal />}
                                title="Adversarial Testing"
                                desc="Red-team your model against 50+ known jailbreak vectors and prompts."
                            />
                            <FeatureCard
                                icon={<Check />}
                                title="Continuous Monitoring"
                                desc="Monitor compliance drift over time with automated regression testing."
                            />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 border-t border-white/10 text-center text-zinc-500 text-sm">
                Sentinel-EU is a MFOUR LABS Product. © 2025.
            </footer>

        </div>
    );
};

const FeatureCard = ({ icon, title, desc }: any) => (
    <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
        <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 text-brand-yellow">
            {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-zinc-400 leading-relaxed">{desc}</p>
    </div>
);
