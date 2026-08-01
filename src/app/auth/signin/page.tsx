'use client';

import React, { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import versionData from '../../../../version.json';
import { BrandLogo } from '../../../components/common/BrandLogo';
import { useApp } from '../../../context/AppContext';
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const { updateUserProfile } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    updateUserProfile({
      name: 'Michael Ortenberg',
      email: 'Michael.Ortenberg@gmail.com',
      avatarUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f60e.svg',
      dailyStressCeiling: 30,
    });

    if (typeof window !== 'undefined') {
      localStorage.removeItem('braintether_onboarding_completed');
      window.location.href = '/dashboard';
    } else {
      router.push('/dashboard');
    }
  };

  const handleDemoSignIn = () => {
    const targetEmail = email.trim() || 'alex@braintether.app';
    const guestName = targetEmail.split('@')[0].replace('.', ' ');
    const formattedName = guestName.charAt(0).toUpperCase() + guestName.slice(1);

    updateUserProfile({
      name: formattedName || 'Alex Morgan',
      email: targetEmail,
      avatarUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f973.svg',
      dailyStressCeiling: 25,
    });

    if (typeof window !== 'undefined') {
      localStorage.removeItem('braintether_onboarding_completed');
      window.location.href = '/dashboard';
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-zen-bg-dark text-slate-100 flex items-center justify-center p-6 selection:bg-teal-500/30">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Logo & Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <BrandLogo className="w-16 h-16 text-teal-400 group-hover:scale-105 transition-transform" />
          </Link>

          <div>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center justify-center gap-2">
              Sign In to BrainTether
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20">
                v{versionData.version}
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Calm Executive Dysfunction & Stress Tracking Workspace
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-zen-surface-dark border border-zen-border-dark shadow-2xl space-y-6">
          
          {/* Prominent Instant Access / Bypass Button */}
          <button
            type="button"
            onClick={handleDemoSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-2xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-teal-300 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 shadow-xl shadow-teal-500/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>⚡ Instant 1-Click Workspace Access (Demo)</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-zen-border-dark w-full"></div>
            <span className="bg-zen-surface-dark px-3 text-[10px] uppercase font-bold text-slate-500">Or Continue With</span>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-200 text-xs font-bold hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[11px] font-semibold text-teal-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
            >
              <span>{loading ? 'Entering Workspace...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-teal-400 hover:underline font-semibold">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zen-bg-dark flex items-center justify-center text-slate-400 text-xs">Loading sign in...</div>}>
      <SignInContent />
    </Suspense>
  );
}
