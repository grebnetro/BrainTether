'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import versionData from '../../../version.json';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Flame, 
  Volume2, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  Save, 
  Camera, 
  Sliders, 
  Key,
  Copy,
  ExternalLink
} from 'lucide-react';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
];

export default function ProfilePage() {
  const { 
    userProfile, 
    updateUserProfile, 
    therapistPermission, 
    toggleTherapistPermission 
  } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatarUrl);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [dailyStressCeiling, setDailyStressCeiling] = useState(userProfile.dailyStressCeiling);
  const [defaultSoundscape, setDefaultSoundscape] = useState(userProfile.defaultSoundscape);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentAvatar = customAvatarUrl || selectedAvatar;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      avatarUrl: currentAvatar,
      dailyStressCeiling,
      defaultSoundscape,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopyAccessCode = () => {
    navigator.clipboard.writeText(userProfile.therapistAccessCode || 'BT-772-MIND');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="flex h-screen bg-zen-bg-light dark:bg-zen-bg-dark text-slate-800 dark:text-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header 
          onOpenNewTaskModal={() => {}}
          onOpenOverwhelmModal={() => {}}
        />

        <main className="p-6 max-w-4xl mx-auto w-full space-y-8">
          
          {/* Breadcrumb Back Link */}
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-teal-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Workspace</span>
            </Link>

            <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
              v{versionData.version} Settings
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-8">
            
            {/* Header Card */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-5">
                <div className="relative group">
                  <img
                    src={currentAvatar}
                    alt={name}
                    className="w-20 h-20 rounded-full border-4 border-teal-500/40 object-cover shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-100">{name}</h1>
                  <p className="text-xs text-slate-400">{email}</p>
                  <span className="inline-flex items-center space-x-1 mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>ADHD Zen Profile</span>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-xl shadow-teal-500/20 active:scale-95 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{savedSuccess ? 'Saved Preferences!' : 'Save Changes'}</span>
              </button>
            </div>

            {/* Profile Info & Avatar Selector */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark shadow-xl space-y-6">
              <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <User className="w-4 h-4 text-teal-400" />
                Personal Details & Avatar
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Choose Avatar Preset
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {AVATAR_PRESETS.map((presetUrl) => (
                    <button
                      type="button"
                      key={presetUrl}
                      onClick={() => {
                        setSelectedAvatar(presetUrl);
                        setCustomAvatarUrl('');
                      }}
                      className={`relative rounded-full overflow-hidden border-2 transition-all aspect-square ${
                        selectedAvatar === presetUrl && !customAvatarUrl
                          ? 'border-teal-400 ring-4 ring-teal-500/20 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={presetUrl} alt="Avatar" className="w-full h-full object-cover" />
                      {selectedAvatar === presetUrl && !customAvatarUrl && (
                        <div className="absolute inset-0 bg-teal-500/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cognitive & ADHD Preferences */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark shadow-xl space-y-6">
              <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                ADHD & Cognitive Threshold Preferences
              </h2>

              {/* Stress Ceiling Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-500" />
                    Daily Stress Point Capacity Ceiling
                  </label>
                  <span className="text-xs font-bold font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {dailyStressCeiling} Pts Max
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  When your active task stress total exceeds this limit, BrainTether displays warm warnings to prompt micro-breaks.
                </p>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={dailyStressCeiling}
                  onChange={(e) => setDailyStressCeiling(parseInt(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-900 rounded-lg"
                />
              </div>

              {/* Default Ambient Soundscape */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-teal-400" />
                  Default Focus Soundscape
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'rain', label: 'Soft Rain' },
                    { id: 'brown', label: 'Brown Focus Noise' },
                    { id: 'ocean', label: 'Ocean Waves' },
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setDefaultSoundscape(s.id)}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                        defaultSoundscape === s.id
                          ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-sm'
                          : 'bg-slate-900 text-slate-400 border-zen-border-dark hover:text-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Therapist & Coach Integration */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    Therapist Access Portal
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Share read-only access codes with clinical providers for session reviews.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleCopyAccessCode}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold hover:bg-indigo-500/20 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                  <Link
                    href={`/therapist/review/${userProfile.therapistAccessCode || 'BT-772-MIND'}`}
                    target="_blank"
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-300 text-xs font-semibold hover:text-white transition-all"
                  >
                    <span>Preview</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
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
                    Code: {userProfile.therapistAccessCode || 'BT-772-MIND'}
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
                    Mood Logs: {therapistPermission.allowMoodView ? 'Visible' : 'Hidden'}
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
                    Stress Metrics: {therapistPermission.allowStressView ? 'Visible' : 'Hidden'}
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
                    Journal Notes: {therapistPermission.allowNotesView ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              </div>
            </div>

          </form>

        </main>
      </div>

    </div>
  );
}
