'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BrainCircuit, Sparkles, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import versionData from '../../../../version.json';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('alex@braintether.app');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid login credentials');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await signIn('credentials', {
      email: 'alex@braintether.app',
      password: 'password123',
      redirect: false,
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-zen-bg-dark text-slate-100 flex items-center justify-center p-6 font-sans select-none">
      <div className="w-full max-w-md bg-zen-surface-dark border border-zen-border-dark rounded-3xl shadow-2xl p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-teal-500/20">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight flex items-center justify-center gap-2">
            BrainTether
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 font-mono font-semibold border border-teal-500/20">
              v{versionData.version}
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to your calmer, ADHD-friendly workspace
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-500/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-zen-border-dark space-y-3">
          <button
            onClick={handleDemoLogin}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-teal-400 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Instant Demo Login (One Click)</span>
          </button>

          <p className="text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-teal-400 font-bold hover:underline">
              Create One Free
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
