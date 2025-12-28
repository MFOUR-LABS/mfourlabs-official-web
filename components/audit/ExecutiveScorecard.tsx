import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { AlertTriangle, ShieldAlert, BadgeInfo, FileWarning } from 'lucide-react';
import { ComplianceReport } from '../../services/complianceService';

interface ExecutiveScorecardProps {
    data: ComplianceReport;
}

export const ExecutiveScorecard: React.FC<ExecutiveScorecardProps> = ({ data }) => {
    const score = data.resilience_score;

    // Determine color based on score
    let scoreColor = '#10b981'; // Green
    if (score < 70) scoreColor = '#ef4444'; // Red
    else if (score < 90) scoreColor = '#f59e0b'; // Yellow

    const chartData = [{ name: 'Score', value: score, fill: scoreColor }];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">

            {/* 1. Left: The Score (Radial) - Spans 4 Cols */}
            <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/10 to-transparent pointer-events-none"></div>
                <div className="w-full flex justify-between items-start mb-4">
                    <h3 className="text-zinc-500 text-[11px] font-semibold uppercase tracking-widest">Resilience Score</h3>
                    <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">
                        v{data.version}
                    </div>
                </div>

                <div className="w-full h-56 relative my-auto">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            innerRadius="85%"
                            outerRadius="100%"
                            barSize={12}
                            data={chartData}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                            <RadialBar
                                background={{ fill: '#27272a' }}
                                dataKey="value"
                                cornerRadius={100}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-5xl font-bold text-zinc-100 tracking-tighter shadow-black drop-shadow-lg">{score}</span>
                        <span className="text-xs text-zinc-600 font-medium mt-1">OUT OF 100</span>
                    </div>
                </div>
            </div>

            {/* 2. Center: The Verdict - Spans 4 Cols */}
            <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 flex flex-col relative backdrop-blur-sm">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-zinc-500 text-[11px] font-semibold uppercase tracking-widest">Risk Classification</h3>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold border tracking-wide uppercase shadow-sm ${score < 70 ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-red-500/10' :
                            score < 90 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/10' :
                                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10'
                        }`}>
                        {data.risk_classification}
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                    <h4 className="text-zinc-400 text-xs font-mono mb-3 uppercase tracking-wider">Executive Summary</h4>
                    <p className="text-zinc-300 text-sm leading-7 font-light">
                        {data.executive_summary}
                    </p>
                </div>
            </div>

            {/* 3. Right: The Stats - Spans 4 Cols */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                <div className="flex flex-col p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
                        <BadgeInfo className="w-3.5 h-3.5" /> Tests Run
                    </span>
                    <span className="text-3xl font-semibold text-zinc-100">{data.stats.total_tests}</span>
                </div>
                <div className="flex flex-col p-6 bg-red-500/5 rounded-2xl border border-red-500/10 hover:bg-red-500/10 transition-colors">
                    <span className="text-red-400/80 text-[10px] uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5" /> Art-5 Critical
                    </span>
                    <span className="text-3xl font-semibold text-red-500">{data.stats.critical_violations}</span>
                </div>
                <div className="flex flex-col p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 hover:bg-amber-500/10 transition-colors">
                    <span className="text-amber-400/80 text-[10px] uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
                        <ShieldAlert className="w-3.5 h-3.5" /> Art-15 Flaws
                    </span>
                    <span className="text-3xl font-semibold text-amber-500">{data.stats.robustness_flaws}</span>
                </div>
                <div className="flex flex-col p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
                        <FileWarning className="w-3.5 h-3.5" /> Art-50 Gaps
                    </span>
                    <span className="text-3xl font-semibold text-zinc-100">{data.stats.transparency_gaps}</span>
                </div>
            </div>

        </div>
    );
};
