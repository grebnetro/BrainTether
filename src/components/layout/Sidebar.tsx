'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ViewType } from '../../types';
import versionData from '../../../version.json';
import Link from 'next/link';
import { 
  Kanban, 
  Calendar, 
  Repeat, 
  Smile, 
  Users, 
  ShieldCheck, 
  BrainCircuit, 
  Flame, 
  Sparkles,
  ChevronRight,
  User,
  Info
} from 'lucide-react';

interface NavItem {
  id: ViewType;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  description: string;
}

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, totalDailyStressPoints, bodyDoublingSession, tasks } = useApp();

  const navItems: NavItem[] = [
    {
      id: 'kanban',
      label: 'Kanban Board',
      icon: Kanban,
      badge: tasks.filter(t => t.status !== 'COMPLETED').length,
      description: 'Stress-rated task organization',
    },
    {
      id: 'calendar',
      label: 'Calendar Sync',
      icon: Calendar,
      description: 'Bi-directional schedule view',
    },
    {
      id: 'habits',
      label: 'Habit Streaks',
      icon: Repeat,
      badge: '21-day',
      description: 'Consistency milestones',
    },
    {
      id: 'mood',
      label: 'Mood & Correlation',
      icon: Smile,
      description: 'Energy & stress insights',
    },
    {
      id: 'accountability',
      label: 'Body Doubling',
      icon: Users,
      badge: bodyDoublingSession.status === 'ACTIVE' ? 'LIVE' : undefined,
      description: 'Parallel focus sessions & partners',
    },
    {
      id: 'therapist',
      label: 'Therapist Portal',
      icon: ShieldCheck,
      description: 'Granular read-only access',
    },
    {
      id: 'about',
      label: 'About & Features',
      icon: Info,
      badge: 'Guide',
      description: 'Feature docs & instructions',
    },
  ];

  return (
    <aside className="w-72 bg-zen-surface-light dark:bg-zen-surface-dark border-r border-zen-border-light dark:border-zen-border-dark flex flex-col justify-between h-screen sticky top-0 transition-colors duration-300 z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center justify-between border-b border-zen-border-light dark:border-zen-border-dark">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
                BrainTether
                <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold border border-teal-500/20">
                  Zen
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Calmer ADHD Workspace
              </p>
            </div>
          </Link>
        </div>

        {/* Daily Mental Load Card */}
        <div className="m-4 p-4 rounded-xl bg-slate-100 dark:bg-zen-card-dark/80 border border-zen-border-light dark:border-zen-border-dark relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500 animate-pulse-subtle" />
              Daily Stress Load
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              totalDailyStressPoints > 20 
                ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                : totalDailyStressPoints > 10
                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
            }`}>
              {totalDailyStressPoints} pts
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                totalDailyStressPoints > 20 
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500' 
                  : totalDailyStressPoints > 10 
                  ? 'bg-gradient-to-r from-emerald-400 to-amber-500' 
                  : 'bg-gradient-to-r from-teal-400 to-emerald-400'
              }`}
              style={{ width: `${Math.min(100, (totalDailyStressPoints / 30) * 100)}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
            {totalDailyStressPoints > 20 
              ? 'High cognitive load! Consider breaking tasks down.'
              : totalDailyStressPoints > 10
              ? 'Moderate pace. Take micro-breathers.'
              : 'Calm stress state. Optimal for flow.'}
          </p>
        </div>

        {/* View Switcher Menu */}
        <nav className="px-3 space-y-1.5">
          <div className="px-3 pt-2 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Navigation Views
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-left group ${
                  isActive
                    ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold border border-teal-500/20 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-teal-500' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                  }`} />
                  <div className="truncate">
                    <div className="text-sm truncate">{item.label}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal truncate">
                      {item.description}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full shrink-0 ${
                    item.badge === 'LIVE'
                      ? 'bg-emerald-500 text-white animate-pulse'
                      : isActive 
                      ? 'bg-teal-500/20 text-teal-600 dark:text-teal-300' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <Link
            href="/profile"
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200 transition-all text-left group"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <User className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-teal-400 transition-colors" />
              <div className="truncate">
                <div className="text-sm truncate">User Profile & Settings</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal truncate">
                  ADHD preferences & avatar
                </div>
              </div>
            </div>
          </Link>
        </nav>
      </div>

      {/* Footer / Active Body Doubling Status & Live Version Badge */}
      <div className="p-4 border-t border-zen-border-light dark:border-zen-border-dark space-y-2">
        {bodyDoublingSession.status === 'ACTIVE' ? (
          <div 
            onClick={() => setActiveView('accountability')}
            className="cursor-pointer p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-between group hover:bg-emerald-500/20 transition-all"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="truncate">
                <p className="text-xs font-bold truncate">Body Doubling Active</p>
                <p className="text-[10px] opacity-80 truncate">With {bodyDoublingSession.partnerName}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </div>
        ) : null}

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 font-mono font-semibold text-teal-400">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            v{versionData.version}
          </span>
          <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 font-medium">
            ADHD-Safe
          </span>
        </div>
      </div>
    </aside>
  );
};
