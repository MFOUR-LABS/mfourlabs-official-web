import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const handleGoogleSignup = async () => {
        setLoading(true);
        try {
            await AuthService.signInWithGoogle();
            navigate('/dashboard'); // or onboarding
        } catch (error) {
            console.error(error);
            alert('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#050505] text-white">

            {/* Right: Signup Form (Swapped for Signup Page) */}
            <div className="order-2 lg:order-1 flex flex-col items-center justify-center p-8 relative">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-8 left-8 flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" /> Back
                </button>

                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center lg:text-left space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-white">Create your account</h2>
                        <p className="text-zinc-500 text-sm">Start your 14-day free trial of Sentinel-EU Pro.</p>
                    </div>

                    <div className="space-y-4">
                        {/* Google Button */}
                        <button
                            onClick={handleGoogleSignup}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-zinc-200 transition-colors py-3 rounded-lg font-bold text-sm"
                        >
                            {loading ? (
                                <span className="animate-pulse">Connecting...</span>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                    Sign up with Google
                                </>
                            )}
                        </button>
                    </div>

                    <p className="text-center text-zinc-600 text-xs">
                        Already have an account? <button onClick={() => navigate('/login')} className="text-brand-yellow hover:underline">Log in</button>
                    </p>
                </div>
            </div>

            {/* Left: Brand Art */}
            <div className="order-1 lg:order-2 hidden lg:flex flex-col relative justify-center p-20 bg-[#0A0A0C] border-l border-zinc-800 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 space-y-8">
                    <div className="space-y-4">
                        <div className="inline-block px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700 text-xs font-mono text-zinc-300 mb-4">
                            New Feature
                        </div>
                        <h1 className="text-4xl font-display font-bold text-white tracking-tight leading-tight">
                            Collaborative <br />
                            <span className="text-indigo-400">Red Teaming</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                            Invite your team to collaborate on compliance audits. Share reports, assign patches, and track remediation progress together.
                        </p>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm max-w-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700"></div>
                            <div>
                                <div className="h-2 w-24 bg-zinc-800 rounded mb-1.5"></div>
                                <div className="h-2 w-16 bg-zinc-800 rounded"></div>
                            </div>
                        </div>
                        <div className="h-2 w-full bg-zinc-800 rounded mb-2"></div>
                        <div className="h-2 w-3/4 bg-zinc-800 rounded"></div>
                    </div>

                </div>
            </div>

        </div>
    );
};
