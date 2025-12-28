import React from 'react';
import { Share2, Download, ShieldCheck, Lock, CreditCard } from 'lucide-react';

interface AuditHeaderProps {
    kernelName: string;
    version: string;
    reportId: string;
    timestamp: string;
    isPaid: boolean;
    onPurchase: () => void;
    onDownload: () => void;
    purchasing: boolean;
}

export const AuditHeader: React.FC<AuditHeaderProps> = ({
    kernelName, version, reportId, timestamp, isPaid, onPurchase, onDownload, purchasing
}) => {
    return (
        <div className="border-b border-zinc-800/60 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-40 transition-all duration-300 supports-[backdrop-filter]:bg-[#09090b]/60">
            <div className="max-w-[1600px] mx-auto px-8 py-5 flex items-center justify-between">

                {/* Left: Branding & Context */}
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center border border-zinc-700/50 shadow-inner">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-zinc-100 font-sans font-semibold tracking-tight text-sm">
                                EU AI ACT COMPLIANCE REPORT
                            </h1>
                            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest">
                                Annex IV
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1 font-medium">
                            <span className="text-zinc-400">{kernelName}</span>
                            <span className="text-zinc-700">/</span>
                            <span className="font-mono text-zinc-500">{version}</span>
                            <div className="w-px h-3 bg-zinc-800 mx-1"></div>
                            <span className="font-mono">{reportId}</span>
                            <div className="w-px h-3 bg-zinc-800 mx-1"></div>
                            <span>{new Date(timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-medium hover:text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 transition-all">
                        <Share2 className="w-3.5 h-3.5" />
                        Share
                    </button>

                    {isPaid ? (
                        <button
                            onClick={onDownload}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all"
                            title="Download Annex IV PDF"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Download PDF
                        </button>
                    ) : (
                        <button
                            onClick={onPurchase}
                            disabled={purchasing}
                            className="group flex items-center gap-2 px-5 py-2 rounded-lg bg-zinc-100 text-black text-xs font-semibold hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-wait"
                        >
                            {purchasing ? (
                                <>Connecting...</>
                            ) : (
                                <>
                                    <Lock className="w-3.5 h-3.5 text-zinc-500 group-hover:text-black transition-colors" />
                                    Unlock Report <span className="opacity-40 mx-1">|</span> $49
                                </>
                            )}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};
