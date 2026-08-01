'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ViewType } from '../../types';
import versionData from '../../../version.json';
import { signOut } from 'next-auth/react';
import { BrandLogo } from '../common/BrandLogo';
import { 
  LayoutDashboard, 
  Calendar, 
  Trophy, 
  Smile, 
  Users, 
  ShieldCheck, 
  Sparkles,
  Info,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarItem {
  id: ViewType;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'kanban', label: 'Task Workspace', icon: LayoutDashboard },
  { id: 'calendar', label: 'Calm Calendar', icon: Calendar },
  { id: 'habits', label: '21-Day Habits', icon: Trophy, badge: 'Milestones' },
  { id: 'mood', label: 'Mood & Energy', icon: Smile },
  { id: 'accountability', label: 'Body Doubling', icon: Users, badge: 'Co-Working' },
  { id: 'therapist', label: 'Therapist Portal', icon: ShieldCheck, badge: 'Share' },
  { id: 'about', label: 'About & Features', icon: Info, badge: 'Guide' },
];

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, bodyDoublingSession, totalDailyStressPoints } = useApp();

  const isBodyDoublingLive = bodyDoublingSession.active || bodyDoublingSession.status === 'ACTIVE';

  return (
    <aside className="w-64 h-full bg-zen-surface-light dark:bg-zen-surface-dark border-r border-zen-border-light dark:border-zen-border-dark flex flex-col justify-between p-4 selection:bg-teal-500/30">
      
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 px-2">
          <BrandLogo className="w-11 h-11 text-teal-400 shrink-0" />
          <div>
            <h1 className="font-black text-slate-900 dark:text-slate-100 text-base tracking-tight leading-none">
              BrainTether
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Calm Executive Function
            </p>
          </div>
        </div>

        {/* Avoidance Stress Capacity Badge */}
        <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-zen-border-light dark:border-zen-border-dark space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Active Stress Points
            </span>
            <span className="font-mono text-amber-500 font-bold">{totalDailyStressPoints} pts</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                totalDailyStressPoints > 30 ? 'bg-rose-500' : totalDailyStressPoints > 15 ? 'bg-amber-400' : 'bg-teal-400'
              }`} 
              style={{ width: `${Math.min(100, (totalDailyStressPoints / 30) * 100)}%` }}
            />
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-teal-500' : 'text-slate-400'
                  }`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="space-y-3 pt-4 border-t border-zen-border-light dark:border-zen-border-dark">
        {isBodyDoublingLive ? (
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
                <p className="text-[10px] opacity-80 truncate">
                  With {bodyDoublingSession.partnerName || bodyDoublingSession.partner?.name || 'Focus Partner'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </div>
        ) : null}

        {/* Sidebar Sign Out Button */}
        <button
          onClick={async () => {
            if (typeof window !== 'undefined') {
              document.cookie = 'braintether_demo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            }
            await signOut({ redirect: false });
            window.location.href = '/auth/signin';
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all group"
          title="Sign out of your BrainTether account"
        >
          <div className="flex items-center space-x-3">
            <LogOut className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
            <span>Sign Out</span>
          </div>
          <span className="text-[10px] text-rose-400/70 font-mono">Exit</span>
        </button>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
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
