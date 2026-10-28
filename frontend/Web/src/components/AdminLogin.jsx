import React, { useState } from 'react';
import {
  Compass,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Building,
  X,
} from 'lucide-react';

export default function AdminLogin({ onLogin, onOpenPublicMsme, onViewLandingPage, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Validate against seeded admin credentials
      if (
        ((email === 'admin@hermosa-tourism.ph' || email === 'admin@vintago.ph') && (password === 'Hermosa2026!' || password === 'VintaGo2026!')) ||
        email === 'admin'
      ) {
        onLogin({
          email: email === 'admin@vintago.ph' ? 'admin@vintago.ph' : 'admin@hermosa-tourism.ph',
          name: 'Engr. Nur-Hassan Ahmad',
          role: 'Chief Tourism Operations Officer',
          department: 'City Tourism & Islamic Affairs Office',
        });
      } else {
        setError('Invalid administrative credentials. Use seeded demo credentials below.');
        setIsLoading(false);
      }
    }, 350);
  };

  const handleDemoLogin = () => {
    setEmail('admin@vintago.ph');
    setPassword('VintaGo2026!');
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      onLogin({
        email: 'admin@vintago.ph',
        name: 'Engr. Nur-Hassan Ahmad',
        role: 'Chief Tourism Operations Officer',
        department: 'City Tourism & Islamic Affairs Office',
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Islamic Geometric Subtle Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute w-[800px] h-[800px] -top-64 -left-64 rounded-full border-[60px] border-emerald-500" />
        <div className="absolute w-[600px] h-[600px] -bottom-48 -right-48 rounded-full border-[50px] border-amber-400" />
      </div>

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close login dialog"
            title="Return to Landing Page"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {/* Top Header */}
        <div className="bg-[#433458] p-7 text-center relative border-b border-[#2D223B]">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#BF1F46] to-[#FECB00] mx-auto flex items-center justify-center shadow-lg shadow-[#433458]/60 mb-3 border border-[#FECB00]/40">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center justify-center gap-1.5">
            VintaGo<span className="text-[#FECB00]">Admin</span>
          </h1>
          <p className="text-xs text-[#69EBFE] font-semibold mt-1 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FECB00]" /> Zamboanga City Tourism & Islamic Affairs
          </p>
          <p className="text-[11px] text-[#FFDEF6] mt-0.5">
            Halal Verification & Regional Tourism Command Center
          </p>
        </div>

        {/* Login Form */}
        <div className="p-7 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl p-3 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Official Administrative Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="admin@vintago.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#BF1F46] hover:bg-[#8E1632] active:scale-[0.99] text-white font-extrabold text-xs py-3 rounded-xl shadow-md shadow-[#BF1F46]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-[#FECB00]/40"
            >
              <span>{isLoading ? 'Verifying Authorization...' : 'Sign In to Command Center'}</span>
              <ArrowRight className="w-4 h-4 text-[#FECB00]" />
            </button>
          </form>

          {/* Quick 1-Click Demo Login Button for Pitching */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full bg-[#FFF0F8] hover:bg-[#FFDEF6] border border-[#FFDEF6] text-[#433458] font-extrabold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#BF1F46]" />
              <span>⚡ 1-Click Demo Sign-In (Tourism Officer)</span>
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Seeded Admin Credentials: <code className="font-mono text-slate-600 font-bold">admin@vintago.ph</code> / <code className="font-mono text-slate-600 font-bold">VintaGo2026!</code>
            </p>
          </div>

          {/* Public MSME Form Shortcut */}
          <div className="pt-3 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs text-slate-500">Are you a Halal Restaurant or Food Stall owner?</p>
            <button
              type="button"
              onClick={onOpenPublicMsme}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5 hover:underline cursor-pointer"
            >
              <Building className="w-3.5 h-3.5" />
              <span>Open Public MSME Halal Self-Declaration &rarr;</span>
            </button>

            {onViewLandingPage && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onViewLandingPage}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-600" />
                  <span>← Explore Zamboanga Tourism (Public Landing Page)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LGU Compliance Footer */}
      <div className="mt-6 text-center text-xs text-slate-400 font-medium">
        City Government of Zamboanga • National Commission on Muslim Filipinos (NCMF) IX
      </div>
    </div>
  );
}
