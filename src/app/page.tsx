'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  CheckCircle2, 
  Volume2,
  Wand2,
  Calendar
} from 'lucide-react';

export default function LandingPage() {
  const [demoStressPoints, setDemoStressPoints] = useState<number>(8);

  const getStressBadge = (pts: number) => {
    if (pts >= 9) return { bg: 'bg-red-500/20 text-red-400 border-red-500', label: 'Severe Avoidance / Panic' };
    if (pts >= 7) return { bg: 'bg-rose-500/20 text-rose-400 border-rose-500/50', label: 'High Avoidance' };
    if (pts >= 4) return { bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40', label: 'Moderate Routine' };
    return { bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'Easy Flow State' };
  };

  const badge = getStressBadge(demoStressPoints);

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

          <div className="flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold text-white rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-xl shadow-teal-500/25 active:scale-95 transition-all flex items-center space-x-2"
            >
              <span>Try BrainTether Workspace Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth/signin"
              className="px-6 py-4 text-sm font-bold text-slate-300 hover:text-white rounded-2xl bg-slate-900 border border-zen-border-dark hover:bg-slate-800 transition-all"
            >
              Sign In to Account
            </Link>
          </div>
        </div>

        {/* Interactive Stress Points Preview Widget */}
        <div className="max-w-xl mx-auto mt-14 p-6 rounded-3xl bg-zen-surface-dark border border-teal-500/40 shadow-2xl text-left space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              Live Interactive Stress Rating Slider
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
              {demoStressPoints} / 10 Pts — {badge.label}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-zen-border-dark space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-200">
              <span>Open pile of unopened tax mail</span>
              <span className="text-amber-400 font-mono">{demoStressPoints} pts</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Adjust the slider to see how higher stress ratings trigger warm heat borders & micro-step breakers:
            </p>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            value={demoStressPoints}
            onChange={(e) => setDemoStressPoints(parseInt(e.target.value))}
            className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>1 - Low Avoidance</span>
            <span>5 - Routine Task</span>
            <span>10 - Dread / Blocked</span>
          </div>
        </div>
      </section>

      {/* Core Feature Grid */}
      <section className="py-16 px-6 bg-zen-surface-dark/50 border-t border-zen-border-dark">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100">
              Built Specifically for ADHD & Executive Dysfunction
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto">
              Calmer visual scannability without visual noise or corporate agile pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Stress Points */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-100">1–10 Stress Points</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Replaces traditional Agile story points. Rated on task avoidance or anxiety level so you can identify burnout risks at a glance.
              </p>
            </div>

            {/* Overwhelm Protocol */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-100">Overwhelm 2-Min Reset</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When paralysis hits, click "I'm Overwhelmed" to hide all task noise, isolate 1 micro-step, and launch a low-pressure 120-second timer.
              </p>
            </div>

            {/* Body Doubling */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-100">Virtual Body Doubling</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Parallel focus mode with accountability partners, live micro-reactions, and built-in Web Audio ambient rain & brown noise.
              </p>
            </div>

            {/* Habit Streaks */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                <Repeat className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-100">21-Day Habit Streaks</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build durable neural pathways without all-or-nothing guilt. Track behavioral milestones over 21-day streaks.
              </p>
            </div>

            {/* Therapist Sharing */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-100">Therapist Access Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Share read-only access codes with clinical care providers so they can review mood check-ins and stress output trends during sessions.
              </p>
            </div>

            {/* Calendar Sync */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-100">Bi-Directional Calendar</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Live iCal `.ics` subscription feed for Apple Calendar & Google Calendar so your schedule stays synchronized.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zen-border-dark text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-teal-400">BrainTether v{versionData.version} • ADHD-Safe Architecture</span>
          <Link href="/dashboard" className="text-slate-300 hover:text-white font-bold">
            Enter Workspace →
          </Link>
        </div>
      </footer>

    </div>
  );
}
