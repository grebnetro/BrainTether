'use client';

import React from 'react';
import versionData from '../../../version.json';
import { BrandLogo } from '../common/BrandLogo';
import { 
  BrainCircuit, 
  Flame, 
  Heart, 
  Users, 
  Repeat, 
  ShieldCheck, 
  Calendar, 
  User, 
  Sparkles, 
  BookOpen, 
  Volume2, 
  CheckCircle2, 
  HelpCircle,
  Clock
} from 'lucide-react';

interface FeatureGuide {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  colorBg: string;
  colorText: string;
  colorBorder: string;
  description: string;
  instructions: string[];
}

export const AboutView: React.FC = () => {
  const features: FeatureGuide[] = [
    {
      id: 'stress-points',
      title: '1-10 Avoidance Stress Points',
      category: 'Task Management',
      icon: Flame,
      colorBg: 'bg-amber-500/10',
      colorText: 'text-amber-400',
      colorBorder: 'border-amber-500/30',
      description: 'Replaces traditional Agile story points. Rated on task avoidance or anxiety level rather than hours or effort, helping you spot burnout bottlenecks at a glance.',
      instructions: [
        'Rate tasks from 1 (easy flow state) to 10 (intimidating avoidance).',
        'Tasks rated 7-10 trigger warm glow borders to highlight procrastination blocks.',
        'Keep your total daily stress load below your daily ceiling to avoid executive fatigue.',
      ],
    },
    {
      id: 'overwhelm-protocol',
      title: '2-Minute Overwhelm Protocol',
      category: 'Executive Function',
      icon: Heart,
      colorBg: 'bg-teal-500/10',
      colorText: 'text-teal-400',
      colorBorder: 'border-teal-500/30',
      description: 'A reset tool for task paralysis. When overwhelmed by a long backlog, it isolates a single micro-step and starts a low-pressure starter timer.',
      instructions: [
        'Click the "I\'m Overwhelmed" button in the top header anytime.',
        'The app hides all board clutter and picks 1 high-priority micro-step.',
        'A 120-second timer begins. Just focus on starting for 2 minutes - stopping is allowed when the timer ends!',
      ],
    },
    {
      id: 'body-doubling',
      title: 'Virtual Body Doubling & Focus Soundscapes',
      category: 'Accountability',
      icon: Users,
      colorBg: 'bg-emerald-500/10',
      colorText: 'text-emerald-400',
      colorBorder: 'border-emerald-500/30',
      description: 'Work alongside virtual focus partners in parallel sessions with real-time support pings and Web Audio focus noise generators.',
      instructions: [
        'Navigate to Body Doubling in the sidebar.',
        'Choose a focus partner (e.g. Sarah M. or Marcus K.) and start a focus session.',
        'Toggle ambient soundscapes (Soft Rain, Brown Focus Noise, Ocean Waves) to eliminate auditory distractions.',
      ],
    },
    {
      id: 'habit-streaks',
      title: '21-Day Habit Consistency Streaks',
      category: 'Habit Formation',
      icon: Repeat,
      colorBg: 'bg-purple-500/10',
      colorText: 'text-purple-400',
      colorBorder: 'border-purple-500/30',
      description: 'Form long-term neural pathways through 21-day behavioral milestones without all-or-nothing guilt.',
      instructions: [
        'Add daily habits like hydration, morning movement, or meds check.',
        'Click daily completion circles to build your 21-day streak milestone.',
        'Missed a day? No guilt reset - keep building your long-term consistency trend.',
      ],
    },
    {
      id: 'therapist-portal',
      title: 'Therapist & ADHD Coach Access Portal',
      category: 'Clinical Support',
      icon: ShieldCheck,
      colorBg: 'bg-indigo-500/10',
      colorText: 'text-indigo-400',
      colorBorder: 'border-indigo-500/30',
      description: 'Granular read-only sharing system allowing therapists and care providers to review mood and stress output trends.',
      instructions: [
        'Go to your Profile settings page to view your active access code (e.g. BT-772-MIND).',
        'Share your access URL with your therapist for read-only session reviews.',
        'Customize privacy permissions (toggle mood view, stress view, or notes view).',
      ],
    },
    {
      id: 'calendar-sync',
      title: 'Bi-Directional Calendar & iCal Export',
      category: 'Time Management',
      icon: Calendar,
      colorBg: 'bg-rose-500/10',
      colorText: 'text-rose-400',
      colorBorder: 'border-rose-500/30',
      description: 'Low-friction temporal overview synchronized with external calendars via iCal .ics live subscription feeds.',
      instructions: [
        'Switch to Calendar view to see tasks organized by due dates.',
        'Click "Export iCal Feed" to copy your unique calendar URL.',
        'Subscribe in Apple Calendar, Google Calendar, or Outlook.',
      ],
    },
    {
      id: 'user-profile',
      title: 'User Profile & ADHD Preferences',
      category: 'Personalization',
      icon: User,
      colorBg: 'bg-cyan-500/10',
      colorText: 'text-cyan-400',
      colorBorder: 'border-cyan-500/30',
      description: 'Customize your avatar picture, display name, default focus soundscape, and daily maximum stress ceiling.',
      instructions: [
        'Click your profile avatar in the header or sidebar to open /profile.',
        'Select avatar presets or paste a custom photo link.',
        'Adjust your daily stress points ceiling slider (10 to 50 pts) to match your cognitive capacity.',
      ],
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-zen-surface-dark border border-teal-500/40 shadow-2xl relative overflow-hidden space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <BrandLogo className="w-16 h-16 text-teal-400 shrink-0" />
            <div>
              <h2 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-3">
                About BrainTether
                <span className="text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  v{versionData.version}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Comprehensive Feature Guide & Executive Workflow Documentation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-teal-400 bg-teal-500/10 px-3.5 py-2 rounded-xl border border-teal-500/20">
            <Sparkles className="w-4 h-4" />
            <span>ADHD-Safe Architecture</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          BrainTether is a calmer, human-centered alternative to rigid corporate agile tools. It replaces high-pressure metrics with Stress Points, 2-minute overwhelm resets, body doubling, and habit streaks designed specifically for neurodivergent brains.
        </p>
      </div>

      {/* Feature Guide Cards List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
            Major Features & Usage Instructions
          </h3>
          <span className="text-xs font-medium text-slate-400">7 Core Modules</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`p-6 rounded-3xl bg-zen-surface-dark border ${feature.colorBorder} shadow-xl space-y-4 transition-all hover:border-teal-500/50`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zen-border-dark">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-2xl ${feature.colorBg} ${feature.colorText} border ${feature.colorBorder} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-100">{feature.title}</h4>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {feature.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {feature.description}
                </p>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-zen-border-dark space-y-2">
                  <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    How to Use / Instructions:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-400 pl-2">
                    {feature.instructions.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-teal-400 font-bold font-mono text-[11px]">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
