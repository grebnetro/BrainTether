'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '../../../components/common/BrandLogo';
import { Mail, ArrowRight, CheckCircle2, KeyRound, Sparkles } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsSubmitted(true);
      }, 1000);
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setResetSuccess(true);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-zen-bg-dark text-slate-100 flex items-center justify-center p-6 selection:bg-teal-500/30">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white shadow-xl shadow-teal-500/20 group-hover:scale-105 transition-transform p-2">
              <BrandLogo className="w-7 h-7 text-white" />
            </div>
          </Link>

          <div>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center justify-center gap-2">
              Password Recovery
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20">
                v{versionData.version}
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Reset your password and regain access to your workspace
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-zen-surface-dark border border-zen-border-dark shadow-2xl space-y-6">
          
          {resetSuccess ? (
            <div className="text-center space-y-4 py-4 animate-in fade-in">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-100">Password Reset Successful!</h3>
                <p className="text-xs text-slate-400">Your password has been updated. You can now sign in.</p>
              </div>
              <Link
                href="/auth/signin"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
              >
                <span>Back to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : isSubmitted ? (
            <form onSubmit={handleResetPassword} className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs flex items-center space-x-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Verification code confirmed for <strong>{email}</strong>. Enter your new password below:</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Create New Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
              >
                <span>{loading ? 'Updating Password...' : 'Confirm New Password'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.morgan@example.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
              >
                <span>{loading ? 'Verifying Account...' : 'Send Password Reset Link'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

        <div className="text-center text-xs text-slate-500">
          Remember your password?{' '}
          <Link href="/auth/signin" className="text-teal-400 hover:underline font-semibold">
            Return to Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
