'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import versionData from '../../../version.json';
import Link from 'next/link';
import { 
  User, 
  ArrowLeft, 
  Flame, 
  Volume2, 
  ShieldCheck, 
  Users, 
  Save, 
  Sparkles, 
  Key, 
  Lock,
  CheckCircle2
} from 'lucide-react';

export default function ProfilePage() {
  const { therapistPermission, toggleTherapistPermission, partners } = useApp();

  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex@braintether.app');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');
  const [stressCeiling, setStressCeiling] = useState<number>(25);
  const [defaultSoundscape, setDefaultSoundscape] = useState<'RAIN' | 'BROWN_NOISE' | 'OCEAN_WAVES'>('RAIN');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-zen-bg-dark text-slate-100 p-6 md:p-12 font-sans select-none">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation & Title Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zen-border-dark">
          <div className="flex items-center space-x-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                User Profile & ADHD Preferences
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-teal-400 border border-teal-500/20">
                  v{versionData.version}
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Customize your stress thresholds, avatar, and therapist review settings
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 rounded-xl shadow-md active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Preferences saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Avatar & Personal Info */}
          <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark space-y-5">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <User className="w-4 h-4 text-teal-400" />
              Personal Profile
            </h3>

            {/* Avatar Preview */}
            <div className="text-center space-y-3">
              <img
                src={avatarUrl}
                alt="Profile Avatar"
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-teal-500/40 shadow-lg"
              />
              <span className="text-[11px] text-slate-400 block">Choose Avatar Preset:</span>
              <div className="flex justify-center space-x-2">
                {avatars.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarUrl(av)}
                    className={`w-8 h-8 rounded-full border-2 overflow-hidden transition-all ${
                      avatarUrl === av ? 'border-teal-400 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={av} alt="Preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* ADHD Workspace Preferences */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark space-y-6">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              ADHD Cognitive Load Preferences
            </h3>

            {/* Stress Ceiling Slider */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-zen-border-dark space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  Max Daily Stress Load Ceiling
                </label>
                <span className="text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                  {stressCeiling} Points Max
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                When your pending daily task stress points exceed this number, BrainTether alerts you to pause and use Overwhelm Mode.
              </p>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={stressCeiling}
                onChange={(e) => setStressCeiling(parseInt(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Default Focus Soundscape */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-zen-border-dark space-y-2">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-teal-400" />
                Default Ambient Focus Soundscape
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'RAIN', label: 'Soft Rain' },
                  { id: 'BROWN_NOISE', label: 'Deep Focus' },
                  { id: 'OCEAN_WAVES', label: 'Gentle Waves' },
                ].map((sound) => (
                  <button
                    key={sound.id}
                    type="button"
                    onClick={() => setDefaultSoundscape(sound.id as any)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      defaultSoundscape === sound.id
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500'
                        : 'bg-slate-800/60 text-slate-400 border-transparent hover:bg-slate-800'
                    }`}
                  >
                    {sound.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Therapist Permissions Quick Controls */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-zen-border-dark space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  Therapist Portal Review Permissions
                </label>
                <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
                  Code: {therapistPermission.accessCode}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => toggleTherapistPermission('allowMoodView')}
                  className={`p-2.5 rounded-xl border text-[11px] font-bold text-left transition-all ${
                    therapistPermission.allowMoodView
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-transparent'
                  }`}
                >
                  Mood Logs: {therapistPermission.allowMoodView ? 'Shared' : 'Private'}
                </button>
                <button
                  type="button"
                  onClick={() => toggleTherapistPermission('allowStressView')}
                  className={`p-2.5 rounded-xl border text-[11px] font-bold text-left transition-all ${
                    therapistPermission.allowStressView
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-transparent'
                  }`}
                >
                  Stress Points: {therapistPermission.allowStressView ? 'Shared' : 'Private'}
                </button>
                <button
                  type="button"
                  onClick={() => toggleTherapistPermission('allowNotesView')}
                  className={`p-2.5 rounded-xl border text-[11px] font-bold text-left transition-all ${
                    therapistPermission.allowNotesView
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-transparent'
                  }`}
                >
                  Notes: {therapistPermission.allowNotesView ? 'Shared' : 'Private'}
                </button>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
