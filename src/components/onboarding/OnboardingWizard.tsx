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
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Plus, 
  Smile, 
  BookOpen, 
  Volume2
} from 'lucide-react';
import { TaskCategory } from '../../types';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profileData: { name: string; avatarUrl: string }) => void;
  onCreateFirstTask: (taskData: { title: string; stressPoints: number; category: TaskCategory }) => void;
}

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
  onCreateFirstTask,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 State: Profile & Avatar
  const [name, setName] = useState('Alex Morgan');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0]);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  // Step 3 State: First Task Starter
  const [taskTitle, setTaskTitle] = useState('');
  const [taskStressPoints, setTaskStressPoints] = useState<number>(6);
  const [taskCategory, setTaskCategory] = useState<TaskCategory>('Household');

  if (!isOpen) return null;

  const currentAvatar = customAvatarUrl || selectedAvatar;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({ name, avatarUrl: currentAvatar });
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
                  Customize your display name and avatar image to personalize your stress tracking workspace.
                </p>
              </div>

              <div className="space-y-4 max-w-lg mx-auto">
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>

                {/* Avatar Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Choose Your Avatar Preset
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
                        <img src={presetUrl} alt="Avatar Preset" className="w-full h-full object-cover" />
                        {selectedAvatar === presetUrl && !customAvatarUrl && (
                          <div className="absolute inset-0 bg-teal-500/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Avatar URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Or Enter Custom Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
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
