import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import { ArrowLeft, ShieldCheck, Mail, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await AuthService.signInWithGoogle();
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#050505] text-white">

            {/* Left: Brand Art */}
            <div className="hidden lg:flex flex-col relative justify-center p-20 bg-zinc-900 border-r border-zinc-800 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 space-y-8">
                    <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-black" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-5xl font-display font-bold text-white tracking-tight leading-tight">
                            Secure your AI <br />
                            <span className="text-zinc-500">at the Source.</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                            The enterprise standard for EU AI Act compliance. Audit, patch, and monitor your models in one unified platform.
                        </p>
                    </div>

                    {/* Social Proof */}
                    <div className="pt-8 flex items-center gap-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800"></div>
                            ))}
                        </div>
                        <div className="text-sm font-medium text-zinc-300">
                            Trusted by 50+ Enterprises
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Login Form */}
            <div className="flex flex-col items-center justify-center p-8 relative">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-8 left-8 flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" /> Back
                </button>

                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center lg:text-left space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
                        <p className="text-zinc-500 text-sm">Enter the Sentinel-EU Platform</p>
                    </div>

                    <div className="space-y-4">
                        {/* Google Button */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-zinc-200 transition-colors py-3 rounded-lg font-bold text-sm"
                        >
                            {loading ? (
                                <span className="animate-pulse">Connecting...</span>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                    Continue with Google
                                </>
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-zinc-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#050505] px-2 text-zinc-500">Or continue with email</span>
                            </div>
                        </div>

                        {/* Email Form (Visual Only for now) */}
                        <div className="space-y-3 opacity-50 pointer-events-none">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                                <input type="email" placeholder="name@company.com" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-700" />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                                <input type="password" placeholder="••••••••" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-700" />
                            </div>
                            <button className="w-full bg-zinc-800 text-zinc-400 py-3 rounded-lg text-sm font-medium">
                                Sign In (Enterprise SSO Only)
                            </button>
                        </div>

                        <div className="text-center text-xs text-zinc-600 mt-6">
                            By clicking continue, you agree to our <span className="underline cursor-pointer hover:text-zinc-400">Terms of Service</span> and <span className="underline cursor-pointer hover:text-zinc-400">Privacy Policy</span>.
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};
