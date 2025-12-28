import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComplianceService } from '../services/complianceService';
import { ArrowLeft, Play, ShieldAlert, Cpu, Terminal, Loader2 } from 'lucide-react';

export const AuditInputView: React.FC = () => {
    const navigate = useNavigate();
    const [systemPrompt, setSystemPrompt] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);

    const steps = [
        "Initializing Adversarial Agents...",
        "Loading EU AI Act (Annex IV) Protocols...",
        "Injecting Probes into Model Latent Space...",
        "Analyzing Response Vectors...",
        "Generating Certification Report..."
    ];

    const handleRunAudit = async () => {
        if (!systemPrompt.trim()) return;

        setLoading(true);

        // Simulate steps visual
        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            if (currentStep < steps.length) {
                setLoadingStep(currentStep);
            }
        }, 800);

        try {
            const reportId = await ComplianceService.runAudit(systemPrompt);
            clearInterval(interval);
            navigate(`/compliance/report/${reportId}`);
        } catch (error) {
            clearInterval(interval);
            console.error(error);
            setLoading(false);
            alert('Failed to run audit. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Ambient */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[128px] pointer-events-none"></div>

            {/* Header */}
            <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" /> Back
                </button>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    SYSTEM ONLINE
                </div>
            </div>

            <div className="w-full max-w-2xl bg-zinc-900/50 border border-zinc-800 rounded-2xl p-1 backdrop-blur-xl shadow-2xl">
                <div className="bg-zinc-950/80 rounded-xl p-8 border border-zinc-800/50">

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,204,0,0.3)]">
                            <Terminal className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-display font-bold text-white tracking-tight">New Compliance Audit</h1>
                            <p className="text-zinc-500 text-sm">Target System Configuration</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="h-64 flex flex-col items-center justify-center gap-6">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-brand-yellow/20 border-t-brand-yellow rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Cpu className="w-6 h-6 text-brand-yellow/50 animate-pulse" />
                                </div>
                            </div>
                            <div className="text-center font-mono space-y-2">
                                <p className="text-brand-yellow text-sm font-bold tracking-widest uppercase">Processing</p>
                                <p className="text-zinc-500 text-xs">{steps[loadingStep]}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                                    System Prompt / Instructions
                                </label>
                                <div className="relative group">
                                    <textarea
                                        value={systemPrompt}
                                        onChange={(e) => setSystemPrompt(e.target.value)}
                                        placeholder="e.g. You are a helpful AI assistant for a financial institution..."
                                        className="w-full h-48 bg-black border border-zinc-800 rounded-lg p-4 font-mono text-sm text-zinc-300 focus:outline-none focus:border-brand-yellow/50 focus:ring-1 focus:ring-brand-yellow/50 transition-all resize-none placeholder:text-zinc-700"
                                    />
                                    <div className="absolute bottom-4 right-4 text-[10px] text-zinc-700 font-mono pointer-events-none">
                                        {systemPrompt.length} chars
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-zinc-600">
                                    This prompt will be subjected to adversarial testing against EU AI Act (Annex IV) requirements.
                                </p>
                            </div>

                            <button
                                onClick={handleRunAudit}
                                disabled={!systemPrompt.trim()}
                                className="w-full py-4 bg-brand-yellow text-black font-bold rounded-lg hover:bg-brand-yellowDim disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                            >
                                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                                Run Compliance Audit
                            </button>
                        </div>
                    )}

                </div>
            </div>

            {/* Footer info */}
            <div className="mt-8 flex items-center gap-6 text-xs text-zinc-600 font-mono">
                <span className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Confidential Environment
                </span>
                <span>|</span>
                <span>v2.1.0-RC1</span>
            </div>

        </div>
    );
};
