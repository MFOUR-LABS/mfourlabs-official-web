import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuditHeader } from './audit/AuditHeader';
import { ExecutiveScorecard } from './audit/ExecutiveScorecard';
import { ComplianceMatrix } from './audit/ComplianceMatrix';
import { ComplianceService, ComplianceReport } from '../services/complianceService';
import { ArrowLeft, Loader2, AlertTriangle } from 'lucide-react';

export const AuditReportView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [report, setReport] = useState<ComplianceReport | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        const fetchReport = async () => {
            if (!id) return;
            try {
                const data = await ComplianceService.getReport(id);
                setReport(data);
                setError(null);
            } catch (error) {
                console.error('Failed to fetch report:', error);
                setError('Failed to load compliance report. Please check the ID or try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    const handlePurchase = async () => {
        if (!report) return;
        setPurchasing(true);
        try {
            const url = await ComplianceService.initiateCheckout(report.id);

            if (url === '#mock-checkout') {
                // Simulate Logic for Demo: Optimistically unlock
                setTimeout(() => {
                    setReport(prev => prev ? { ...prev, is_paid: true } : null);
                    setPurchasing(false);
                    alert("Payment Verification Simulated! Report Unlocked.");
                }, 1500);
            } else {
                window.location.href = url;
            }
        } catch (err) {
            console.error(err);
            setPurchasing(false);
            alert("Failed to initiate checkout");
        }
    };

    const handleDownload = () => {
        // Mock Download
        alert("Downloading Annex_IV_Technical_Documentation.pdf...");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-zinc-600 animate-spin" />
            </div>
        );
    }

    if (error || !report) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-500 gap-4">
                <AlertTriangle className="w-12 h-12 text-red-500/50" />
                <p className="text-zinc-400">{error || 'Report not found.'}</p>
                <button
                    onClick={() => navigate('/')}
                    className="text-white hover:underline text-sm"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/20">

            {/* Navigation Back */}
            <div className="bg-[#09090b] border-b border-zinc-800/50">
                <div className="max-w-[1600px] mx-auto px-8 h-12 flex items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-[11px] font-medium text-zinc-500 hover:text-zinc-200 transition-colors uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-3 h-3" /> Platform Overview
                    </button>
                </div>
            </div>

            <AuditHeader
                kernelName={report.kernel_name}
                version={report.version}
                reportId={report.id}
                timestamp={report.timestamp}
                isPaid={report.is_paid}
                onPurchase={handlePurchase}
                onDownload={handleDownload}
                purchasing={purchasing}
            />

            <main className={`max-w-[1600px] mx-auto px-8 py-10 transition-all duration-700 ${purchasing ? 'opacity-50 scale-[0.99] blur-[2px] pointer-events-none' : 'opacity-100 scale-100 blur-0'}`}>
                <ExecutiveScorecard data={report} />

                {/* Blur Verification Matrix if not paid? User context says "gate Download", usually report is visible but download is gated.
            If they want "Pay wall", usually details are hidden? 
            "Integrate... to gate the Annex IV PDF Download behind a payment wall." 
            Okay, so just the download is gated. The dashboard is the "teaser". 
        */}
                <ComplianceMatrix tests={report.compliance_matrix} />
            </main>

        </div>
    );
};
