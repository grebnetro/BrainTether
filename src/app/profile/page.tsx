'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { AVATAR_THEMES, MINDSTATE_LEVELS, getAvatarUrl } from '../../components/onboarding/OnboardingWizard';
import versionData from '../../../version.json';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { 
  User, 
  Flame, 
  Volume2, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  Save, 
  Camera, 
  Sliders, 
  Copy,
  ExternalLink,
  Upload,
  LogOut
} from 'lucide-react';

export default function ProfilePage() {
  const { 
    userProfile, 
    updateUserProfile, 
    therapistPermission, 
    toggleTherapistPermission 
  } = useApp();

  const [name, setName] = useState(userProfile.name || 'Demo User');
  const [email, setEmail] = useState(userProfile.email || 'guest@braintether.app');
  const [selectedTheme, setSelectedTheme] = useState<'twemoji' | 'bottts' | 'adventurer' | 'lorelei' | 'pixel-art'>('twemoji');
  const [selectedLevel, setSelectedLevel] = useState<number>(10);
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatarUrl);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [dailyStressCeiling, setDailyStressCeiling] = useState(userProfile.dailyStressCeiling || 30);
  const [defaultSoundscape, setDefaultSoundscape] = useState(userProfile.defaultSoundscape || 'rain');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [dragging, setDragging] = useState(false);

  const currentAvatar = customAvatarUrl || selectedAvatar;

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setCustomAvatarUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

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
                    className="w-20 h-20 rounded-full border-4 border-teal-500/40 object-cover bg-slate-950 p-1 shadow-xl"
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

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-xl shadow-teal-500/20 active:scale-95 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{savedSuccess ? 'Saved Preferences!' : 'Save Changes'}</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await signOut({ redirect: false });
                    window.location.href = '/auth/signin';
                  }}
                  className="flex items-center space-x-2 px-4 py-3 rounded-2xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-all shadow-md active:scale-95"
                  title="Sign Out of BrainTether"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Personal Details & Avatar Selector */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark shadow-xl space-y-6">
              <h2 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                <User className="w-4 h-4 text-teal-400" />
                <span>Personal Details & Avatar Theme</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-1 block">Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-1 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
              </div>

              {/* 10-Level Mind-State Avatars Grid with Themes */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Avatar Theme & Mind State Level
                  </label>
                  <span className="text-[10px] text-teal-400 font-mono">5 Themes Available</span>
                </div>

                {/* Theme Switcher Pills */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {AVATAR_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        setSelectedTheme(theme.id as any);
                        const lvlObj = MINDSTATE_LEVELS.find(l => l.level === selectedLevel) || MINDSTATE_LEVELS[9];
                        setSelectedAvatar(getAvatarUrl(theme.id, lvlObj));
                        setCustomAvatarUrl('');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border whitespace-nowrap transition-all ${
                        selectedTheme === theme.id && !customAvatarUrl
                          ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-sm'
                          : 'bg-slate-900/60 text-slate-400 border-zen-border-dark hover:bg-slate-800'
                      }`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>

                {/* Active Level Description Banner */}
                {(() => {
                  const lvlObj = MINDSTATE_LEVELS.find(l => l.level === selectedLevel) || MINDSTATE_LEVELS[9];
                  const currentGenUrl = getAvatarUrl(selectedTheme, lvlObj);
                  return (
                    <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center space-x-3">
                      <img src={currentGenUrl} alt={lvlObj.label} className="w-10 h-10 object-contain bg-slate-950 p-1 rounded-xl border border-teal-500/40" />
                      <div>
                        <h4 className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                          <span>{lvlObj.label}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 font-mono">Level {lvlObj.level} / 10</span>
                        </h4>
                        <p className="text-[11px] text-slate-300 mt-0.5">{lvlObj.desc}</p>
                      </div>
                    </div>
                  );
                })()}

                {/* 10 Mind State Levels Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {MINDSTATE_LEVELS.map((lvl) => {
                    const avUrl = getAvatarUrl(selectedTheme, lvl);
                    const isSelected = selectedLevel === lvl.level && !customAvatarUrl;
                    return (
                      <button
                        key={lvl.level}
                        type="button"
                        onClick={() => {
                          setSelectedLevel(lvl.level);
                          setSelectedAvatar(avUrl);
                          setCustomAvatarUrl('');
                        }}
                        className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          isSelected
                            ? 'bg-teal-500/20 border-teal-400 scale-105 ring-2 ring-teal-500/40 font-bold'
                            : 'bg-slate-900 border-zen-border-dark hover:border-slate-600 opacity-70 hover:opacity-100'
                        }`}
                        title={`${lvl.label}: ${lvl.desc}`}
                      >
                        <img src={avUrl} alt={lvl.label} className="w-8 h-8 rounded-lg object-contain" />
                        <span className="text-[9px] font-mono text-slate-300 truncate max-w-full">
                          L{lvl.level}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Drag & Drop Custom Photo Upload */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-400">
                  Or Upload Custom Photo (Drag & Drop or Click)
                </label>
                
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleImageFile(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`p-6 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${
                    dragging
                      ? 'border-teal-400 bg-teal-500/10'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e: any) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageFile(e.target.files[0]);
                      }
                    };
                    input.click();
                  }}
                >
                  <Upload className="w-6 h-6 mx-auto text-teal-400 mb-2" />
                  <p className="text-xs font-bold text-slate-200">
                    Drag & Drop your photo here, or click to browse
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Supports JPG, PNG, GIF, WebP (Converted automatically)
                  </p>
                </div>
              </div>
            </div>

            {/* Executive Function Threshold Settings */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark shadow-xl space-y-6">
              <h2 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>ADHD & Cognitive Threshold Preferences</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Daily Stress Point Capacity Ceiling
                    </label>
                    <span className="text-xs font-mono font-bold text-amber-400">{dailyStressCeiling} Pts Max</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={dailyStressCeiling}
                    onChange={(e) => setDailyStressCeiling(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    When your active task stress total exceeds this limit, BrainTether displays warm warnings to prompt micro-breaks.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-2 block">
                    Default Focus Soundscape
                  </label>
                  <select
                    value={defaultSoundscape}
                    onChange={(e) => setDefaultSoundscape(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option value="rain">Gentle Rain & Soft Thunder</option>
                    <option value="pink_noise">Warm Pink Noise (High-Focus Hz)</option>
                    <option value="brown_noise">Deep Brown Noise (ADHD Quiet Mind)</option>
                    <option value="forest">Pine Forest & Soft Wind</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Therapist & Care Provider Access */}
            <div className="p-6 rounded-3xl bg-zen-surface-dark border border-zen-border-dark shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Therapist & Coach Read-Only Sharing</span>
                </h2>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                  HIPAA & Privacy Safe
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Generate a temporary 8-character access code for your therapist to review your stress trends without granting edit permissions.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900 border border-zen-border-dark flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Your Therapist Access Code</span>
                  <p className="text-lg font-mono font-black text-teal-400 tracking-wider">
                    {userProfile.therapistAccessCode || 'BT-772-MIND'}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleCopyAccessCode}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 hover:bg-teal-500/20 text-xs font-semibold transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode ? 'Copied Code!' : 'Copy Code'}</span>
                  </button>

                  <Link
                    href={`/therapist/review/${userProfile.therapistAccessCode || 'BT-772-MIND'}`}
                    target="_blank"
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Preview Portal</span>
                  </Link>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-slate-300">Granular Permissions</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'allowMoodView', label: 'Allow Mood & Energy Log View' },
                    { key: 'allowStressView', label: 'Allow Avoidance Stress Output View' },
                    { key: 'allowNotesView', label: 'Allow Journal Notes View' },
                  ].map((perm) => {
                    const isChecked = therapistPermission[perm.key as keyof typeof therapistPermission];
                    return (
                      <button
                        key={perm.key}
                        type="button"
                        onClick={() => toggleTherapistPermission(perm.key as any)}
                        className={`p-3 rounded-xl border text-left flex items-start space-x-2.5 transition-all ${
                          isChecked
                            ? 'bg-teal-500/10 border-teal-500/40 text-slate-200'
                            : 'bg-slate-900 border-zen-border-dark text-slate-500'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-teal-500 border-teal-400 text-white' : 'border-slate-700'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{perm.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </form>

        </main>
      </div>

    </div>
  );
}
