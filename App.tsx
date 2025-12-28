import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { AuditReportView } from './components/AuditReportView';
import { AuditInputView } from './components/AuditInputView';
import { AdminDashboard } from './components/AdminDashboard'; // Assuming you might want to route this too, or leave it as is if it was conditionally rendered. 
// Note: Previous App.tsx didn't import AdminDashboard, but I see it in file list. I'll stick to Landing and Audit for now as per plan.
import { AuditProductPage } from './components/AuditProductPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { UserDashboard } from './components/dashboard/UserDashboard';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState("Initializing Core Systems...");

  useEffect(() => {
    const logs = [
      "Loading Architectural Patterns...",
      "Deconstructing Legacy Modules...",
      "Optimizing Neural Pathways...",
      "Verifying Mirror Protocol...",
      "Establishing Secure Connection...",
      "Welcome to mfourlabs."
    ];

    let step = 0;
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.floor(Math.random() * 15), 100));
      if (Math.random() > 0.6 && step < logs.length) {
        setLog(logs[step]);
        step++;
      }
    }, 150);

    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(onComplete, 800);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center font-mono text-xs text-brand-gray">
      <div className="w-64 mb-4 flex justify-between">
        <span>SYS.BOOT</span>
        <span className="text-brand-yellow">{progress}%</span>
      </div>
      <div className="w-64 h-0.5 bg-brand-surfaceHighlight overflow-hidden relative">
        <div
          className="absolute top-0 left-0 h-full bg-brand-yellow transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-4 h-6 text-brand-sub uppercase tracking-widest text-[10px] animate-pulse">
        {log}
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Platform Routes */}
        <Route path="/audit" element={<AuditProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Protected Audit Routes */}
        <Route path="/audit/new" element={<UserDashboard />} />
        <Route path="/compliance/report/:id" element={<AuditReportView />} />

        {/* Admin */}
        {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;