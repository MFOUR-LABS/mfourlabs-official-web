import React, { useState } from 'react';
import { ComplianceTestResult, ComplianceService } from '../../services/complianceService';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, XCircle, Wand2, Loader2, AlertTriangle } from 'lucide-react';

interface ComplianceMatrixProps {
    tests: ComplianceTestResult[];
}

export const ComplianceMatrix: React.FC<ComplianceMatrixProps> = ({ tests }) => {
    const [filter, setFilter] = useState<'ALL' | 'PASS' | 'FAIL' | 'WARN'>('ALL');

    const filteredTests = tests.filter(t => filter === 'ALL' || t.verdict === filter);

    return (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            {/* Header & Filter */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                    Compliance Matrix
                </h3>
                <div className="flex gap-1 bg-zinc-950/50 p-1 rounded-lg border border-zinc-800">
                    {(['ALL', 'PASS', 'FAIL', 'WARN'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${filter === f
                                ? 'bg-zinc-800 text-white shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-6 px-6 py-4 bg-zinc-950/30 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-800/50">
                <div className="col-span-1">Reg</div>
                <div className="col-span-3">Control</div>
                <div className="col-span-5">Vector Payload</div>
                <div className="col-span-2">Verdict</div>
                <div className="col-span-1 text-right">Action</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-zinc-800/40">
                {filteredTests.map(test => (
                    <MatrixRow key={test.id} test={test} />
                ))}
                {filteredTests.length === 0 && (
                    <div className="p-16 text-center text-zinc-500 text-sm flex flex-col items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 opacity-20" />
                        No records found matching this filter.
                    </div>
                )}
            </div>

        </div>
    );
};

const MatrixRow: React.FC<{ test: ComplianceTestResult }> = ({ test }) => {
    const [expanded, setExpanded] = useState(false);
    const [status, setStatus] = useState(test.verdict);
    const [patching, setPatching] = useState(false);

    const isFail = status === 'FAIL';


    const handlePatch = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setPatching(true);
        try {
            await ComplianceService.applyPatch(test.id);
            setStatus('PASS');
            setExpanded(false);
        } catch (err) {
            console.error(err);
        } finally {
            setPatching(false);
        }
    };

    return (
        <div className={`group transition-all duration-200 ${status === 'PASS' ? 'hover:bg-zinc-800/10' : isFail ? 'bg-red-500/[0.02] hover:bg-red-500/[0.04]' : 'bg-amber-500/[0.02] hover:bg-amber-500/[0.04]'}`}>
            <div
                className="grid grid-cols-12 gap-6 px-6 py-4 items-center cursor-pointer"
                onClick={() => isFail && setExpanded(!expanded)}
            >
                <div className="col-span-1">
                    <span className="px-2 py-1 rounded-md bg-zinc-800/50 text-zinc-400 text-[10px] font-mono font-medium border border-zinc-700/30">
                        {test.regulation}
                    </span>
                </div>
                <div className="col-span-3 text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">
                    {test.control}
                </div>
                <div className="col-span-5 text-sm text-zinc-500 font-mono truncate pr-4">
                    <span className="opacity-50 select-none mr-2">$</span>
                    {test.vector}
                </div>
                <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${status === 'PASS' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        status === 'FAIL' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }`}>
                        {status === 'PASS' && <CheckCircle2 className="w-3 h-3" />}
                        {status === 'FAIL' && <XCircle className="w-3 h-3" />}
                        {status === 'WARN' && <AlertCircle className="w-3 h-3" />}
                        {status}
                    </span>
                </div>
                <div className="col-span-1 text-right">
                    {status === 'FAIL' && (
                        <button
                            className={`p-1.5 rounded-lg transition-colors ${expanded ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/50'}`}
                        >
                            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                    )}
                </div>
            </div>

            {/* Expanded Remediation Panel */}
            {expanded && isFail && (
                <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 duration-300">
                    <div className="bg-[#0c0c0e] border border-red-500/20 rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden shadow-inner">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500/30"></div>

                        {/* Left: Evidence */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] text-red-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-3 h-3" /> Proof of Vulnerability
                            </h4>
                            <div className="bg-[#050505] border border-zinc-800 rounded-lg p-4 font-mono text-xs text-zinc-400 whitespace-pre-wrap h-40 overflow-y-auto custom-scrollbar shadow-inner">
                                <span className="text-zinc-600 block mb-2 select-none border-b border-zinc-900 pb-2">// Model Response Capture</span>
                                {test.response_proof}
                            </div>
                        </div>

                        {/* Right: Remediation */}
                        <div className="space-y-4 flex flex-col justify-between">
                            <div>
                                <h4 className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-3">
                                    <Wand2 className="w-3 h-3" /> Recommended Patch
                                </h4>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    This vulnerability allows prompt injection. The recommended fix is to apply the <code className="text-zinc-200 bg-zinc-800 px-1 py-0.5 rounded text-xs">Adversarial-Refusal-v4</code> middleware to the input pipeline.
                                </p>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-zinc-800/50">
                                <button
                                    onClick={handlePatch}
                                    disabled={patching}
                                    className="flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-lg shadow-white/5 active:scale-95"
                                >
                                    {patching ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Patching Kernel...
                                        </>
                                    ) : (
                                        <>
                                            Apply Auto-Patch
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};
