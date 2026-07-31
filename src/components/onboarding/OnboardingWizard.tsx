'use client';

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  User, 
  Sparkles, 
  Flame, 
  Heart, 
  Users, 
  Repeat, 
  Check, 
  ArrowRight, 
  BookOpen, 
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { TaskCategory } from '../../types';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profileData: { name: string; avatarUrl: string }) => void;
  onCreateFirstTask: (taskData: { title: string; stressPoints: number; category: TaskCategory }) => void;
}

export const MINDSTATE_AVATARS = [
  { level: 1, label: 'L1: Overwhelmed', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Level1-Sad' },
  { level: 2, label: 'L2: High Stress', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Level2-Stressed' },
  { level: 3, label: 'L3: Drained', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Level3-Drained' },
  { level: 4, label: 'L4: Seeking Focus', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Level4-Seeking' },
  { level: 5, label: 'L5: Neutral Calm', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Level5-Neutral' },
  { level: 6, label: 'L6: Gentle Spark', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Level6-Spark' },
  { level: 7, label: 'L7: Active Flow', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Level7-Focused' },
  { level: 8, label: 'L8: High Energy', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Level8-Stamina' },
  { level: 9, label: 'L9: Deep Mastery', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Level9-Flow' },
  { level: 10, label: 'L10: Radiant Joy', url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Level10-Joy' },
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
  onCreateFirstTask,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 State: Profile & Avatar
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(MINDSTATE_AVATARS[9].url);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [dragging, setDragging] = useState(false);

  // Step 3 State: First Task Starter
  const [taskTitle, setTaskTitle] = useState('');
  const [taskStressPoints, setTaskStressPoints] = useState<number>(6);
  const [taskCategory, setTaskCategory] = useState<TaskCategory>('Household');

  if (!isOpen) return null;

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

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({ name: name.trim() || 'Demo Guest', avatarUrl: currentAvatar });
    setStep(2);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onCreateFirstTask({
        title: taskTitle.trim(),
        stressPoints: taskStressPoints,
        category: taskCategory,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="w-full max-w-2xl bg-zen-surface-dark border border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Progress Bar */}
        <div className="px-6 pt-6 pb-4 border-b border-zen-border-dark flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-base">Welcome to BrainTether</h2>
              <p className="text-[11px] text-slate-400">Step {step} of 3 — Personalized Setup</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-8 bg-teal-400'
                    : s < step
                    ? 'w-3 bg-emerald-500'
                    : 'w-3 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* STEP 1: Profile & Avatar Selection Prompt */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-6 animate-in fade-in">
              <div className="text-center space-y-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold">
                  <User className="w-3.5 h-3.5" />
                  <span>Step 1: Set Up Your Profile</span>
                </span>
                <h3 className="text-xl font-extrabold text-slate-100">
                  Who is using this BrainTether workspace?
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Customize your display name and choose a 10-level Mind State avatar or drag & drop a photo.
                </p>
              </div>

              <div className="space-y-5 max-w-lg mx-auto">
                {/* Active Avatar Preview + Name Input */}
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-900 border border-zen-border-dark">
                  <img
                    src={currentAvatar}
                    alt={name}
                    className="w-16 h-16 rounded-2xl border-2 border-teal-400 object-cover bg-slate-950 p-1 shrink-0"
                  />
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-zen-border-dark text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    />
                  </div>
                </div>

                {/* 10 Levels of Mind State Cartoon Avatars */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                    <span>10 Levels of Mind State Avatars (Sad to Radiant Joy)</span>
                    <span className="text-[10px] text-teal-400 font-mono">Theme: Fun Emoji Cartoon</span>
                  </label>
                  <div className="grid grid-cols-5 gap-2.5">
                    {MINDSTATE_AVATARS.map((item) => {
                      const isSelected = selectedAvatar === item.url && !customAvatarUrl;
                      return (
                        <button
                          type="button"
                          key={item.level}
                          onClick={() => {
                            setSelectedAvatar(item.url);
                            setCustomAvatarUrl('');
                          }}
                          className={`relative p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                            isSelected
                              ? 'border-teal-400 bg-teal-500/10 ring-2 ring-teal-500/30 scale-105 shadow-md'
                              : 'border-zen-border-dark bg-slate-900/60 opacity-80 hover:opacity-100 hover:border-slate-600'
                          }`}
                        >
                          <img src={item.url} alt={item.label} className="w-9 h-9 object-contain" />
                          <span className="text-[9px] font-bold text-slate-300 mt-1 text-center line-clamp-1">{item.label}</span>
                          {isSelected && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-teal-500 text-white flex items-center justify-center shadow">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Drag and Drop Custom Photo Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
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
                    className={`p-4 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all ${
                      dragging 
                        ? 'border-teal-400 bg-teal-500/10' 
                        : 'border-zen-border-dark bg-slate-900/60 hover:border-slate-600'
                    }`}
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
                      className="hidden" 
                      id="onboarding-avatar-file"
                    />
                    <label htmlFor="onboarding-avatar-file" className="cursor-pointer space-y-1.5 block">
                      <Upload className="w-5 h-5 text-teal-400 mx-auto" />
                      <span className="text-xs font-bold text-slate-200 block">
                        Drag & Drop your photo here, or click to browse
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Supports JPG, PNG, GIF, WebP (Converted automatically)
                      </span>
                    </label>
                  </div>
                </div>

              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
                >
                  <span>Continue to Instruction Sheet</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Interactive ADHD Instruction Sheet / Guide */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center space-y-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Step 2: How BrainTether Works</span>
                </span>
                <h3 className="text-xl font-extrabold text-slate-100">
                  ADHD-Safe Productivity Workflow
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  A quick 1-minute breakdown of how BrainTether calms executive dysfunction.
                </p>
              </div>

              {/* 4 Feature Instruction Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                    <Flame className="w-4 h-4" />
                    <span>1. Avoidance Stress Points (1–10)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Unlike corporate story points, tasks are rated on <strong className="text-slate-200">avoidance / intimidation</strong>. Higher ratings trigger warm glow borders to highlight procrastination bottlenecks.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/30 space-y-2">
                  <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs">
                    <Heart className="w-4 h-4" />
                    <span>2. Overwhelm 2-Min Reset Protocol</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    When paralysis hits, click <strong className="text-slate-200">"I'm Overwhelmed"</strong> in the top header. It hides all background noise, breaks 1 task into a micro-step, and starts a 120s timer.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                    <Users className="w-4 h-4" />
                    <span>3. Virtual Body Doubling & Soundscapes</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Work alongside a virtual focus partner in real-time while listening to built-in Web Audio focus soundscapes (Rain, Brown Noise, Ocean Waves).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-2">
                  <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs">
                    <Repeat className="w-4 h-4" />
                    <span>4. 21-Day Habit Streaks</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Form neurodivergent habits through 21-day milestones without guilt or all-or-nothing pressure.
                  </p>
                </div>

              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  ← Back to Profile
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
                >
                  <span>Got it! Add My First Task</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: First Task Starter */}
          {step === 3 && (
            <form onSubmit={handleStep3Submit} className="space-y-6 animate-in fade-in">
              <div className="text-center space-y-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Step 3: Create Your First Task</span>
                </span>
                <h3 className="text-xl font-extrabold text-slate-100">
                  What is one thing on your mind right now?
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Add your first task and rate its avoidance stress level from 1 (easy) to 10 (intimidating).
                </p>
              </div>

              <div className="space-y-4 max-w-lg mx-auto p-5 rounded-2xl bg-slate-900 border border-zen-border-dark">
                {/* Task Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    required
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="e.g. Schedule dentist appointment, File taxes..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-zen-border-dark text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                {/* Avoidance Stress Points Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-500" />
                      Avoidance Stress Level
                    </label>
                    <span className="text-xs font-bold font-mono text-amber-400">
                      {taskStressPoints} / 10 pts
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={taskStressPoints}
                    onChange={(e) => setTaskStressPoints(parseInt(e.target.value))}
                    className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1 - Easy Flow</span>
                    <span>5 - Moderate</span>
                    <span>10 - Paralyzing Dread</span>
                  </div>
                </div>

                {/* Category Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value as TaskCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-zen-border-dark text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    {['Household', 'Money', 'Self-Care', 'Work', 'Health', 'General'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  ← Back to Guide
                </button>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Skip & Launch Board
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
                  >
                    <span>Launch Clean Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
