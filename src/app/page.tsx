'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import versionData from '../../version.json';
import { 
  BrainCircuit, 
  Flame, 
  Heart, 
  Users, 
  Repeat, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Calendar,
  LogOut
} from 'lucide-react';

export default function LandingPage() {
  const { data: session } = useSession();
  const [demoStressPoints, setDemoStressPoints] = useState<number>(8);

  const getStressBadge = (pts: number) => {
    if (pts >= 9) return { bg: 'bg-red-500/20 text-red-400 border-red-500', label: 'Severe Avoidance / Panic' };
    if (pts >= 7) return { bg: 'bg-rose-500/20 text-rose-400 border-rose-500/50', label: 'High Avoidance' };
    if (pts >= 4) return { bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40', label: 'Moderate Routine' };
    return { bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'Easy Flow State' };
  };

  const badge = getStressBadge(demoStressPoints);
  const targetDestination = session ? '/dashboard' : '/auth/signin';

  return (
    <div className="min-h-screen bg-zen-bg-dark text-slate-100 font-sans selection:bg-teal-500/30">
      
      {/* Public Zen Navigation Header */}
      <header className="sticky top-0 z-30 bg-zen-surface-dark/80 backdrop-blur-md border-b border-zen-border-dark px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-2">
                BrainTether
                <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20">
                  v{versionData.version}
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Calmer ADHD Workspace</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {session ? (
              <>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Signed in as {session.user?.name || session.user?.email || 'Michael Ortenberg'}
                </span>

                <Link
                  href={targetDestination}
                  className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
                >
                  <span>Go to Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                  className="flex items-center space-x-1.5 px-3 py-2 text-xs font-bold text-slate-300 bg-slate-800/80 hover:bg-rose-950/50 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 rounded-xl transition-all shadow-sm active:scale-95"
                  title="Sign Out of BrainTether"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-xs font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2"
                >
                  Sign In
                </Link>

                <Link
                  href={targetDestination}
                  className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
                >
                  <span>Sign In to Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Human-Centered Alternative to Rigid Corporate Tools</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-100 tracking-tight leading-tight">
            Productivity Without the Panic.{' '}
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent block mt-2">
              Designed for Neurodivergent Brains.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Replace overwhelming backlogs with Stress Points (1–10 avoidance ratings), 2-minute executive overwhelm protocols, virtual body doubling focus rooms, and therapist check-in sharing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href={targetDestination}
              className="flex items-center space-x-2 px-6 py-3.5 text-sm font-bold text-white rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-xl shadow-teal-500/25 active:scale-95 transition-all"
            >
              <span>Enter Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Interactive Stress Slider Demo */}
        <div className="max-w-2xl mx-auto mt-16 p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark shadow-2xl space-y-6 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> Live Interactive Stress Rating Slider
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${badge.bg}`}>
              {demoStressPoints} / 10 Pts — {badge.label}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-zen-border-dark space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-200 text-sm">Open pile of unopened tax mail</h4>
              <span className="text-xs font-mono font-bold text-amber-400">{demoStressPoints} pts</span>
            </div>
            <p className="text-xs text-slate-400">
              Adjust the slider to see how higher stress ratings trigger warm heat borders & micro-step breakers:
            </p>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="10"
              value={demoStressPoints}
              onChange={(e) => setDemoStressPoints(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>1 - Low Avoidance</span>
              <span>5 - Routine Task</span>
              <span>10 - Dread / Blocked</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillar Features */}
      <section className="py-16 px-6 bg-slate-900/50 border-t border-zen-border-dark">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100">
              Built Specifically for ADHD & Executive Dysfunction
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto">
              Every feature is engineered to lower cognitive barrier-to-entry and eliminate task paralysis guilt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-zen-surface-dark border border-zen-border-dark space-y-4 hover:border-teal-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-200 text-base">Stress Capacity Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rate tasks 1–10 by emotional avoidance stress points instead of rigid time estimates. Know when your daily ceiling is reached before burnout strikes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-zen-surface-dark border border-zen-border-dark space-y-4 hover:border-teal-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-200 text-base">2-Minute Overwhelm Protocol</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When paralysis sets in, hit "I'm Overwhelmed" to launch guided 2-minute micro-break routines and automated subtask breakers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-zen-surface-dark border border-zen-border-dark space-y-4 hover:border-teal-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-200 text-base">Parallel Focus Body Doubling</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Work alongside virtual focus partners in low-pressure body doubling sessions to mirror productivity without social anxiety.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zen-border-dark text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-4 h-4 text-teal-400" />
            <span className="font-bold text-slate-300">BrainTether v{versionData.version}</span>
            <span>— Calmer ADHD Executive Workspace</span>
          </div>
          <p>© 2026 BrainTether. Built with care for neurodivergent focus.</p>
        </div>
      </footer>

    </div>
  );
}
