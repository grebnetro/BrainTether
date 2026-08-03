'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import versionData from '../../../version.json';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { 
  Sun, 
  Moon, 
  Search, 
  Plus, 
  Filter, 
  Heart,
  BookOpen,
  LogOut,
  Zap,
  Smile
} from 'lucide-react';
import { StressLevelRange, TaskCategory } from '../../types';
import { ALL_MAIN_CATEGORIES, ALL_ENVIRONMENTS, LEGACY_CATEGORIES, getGroupedCategoryOptions } from '../../lib/categoriesData';

interface HeaderProps {
  onOpenNewTaskModal: () => void;
  onOpenOverwhelmModal: () => void;
  onOpenTutorial?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenNewTaskModal, 
  onOpenOverwhelmModal,
  onOpenTutorial 
}) => {
  const { 
    theme, 
    toggleTheme, 
    activeView, 
    searchQuery, 
    setSearchQuery,
    stressFilter,
    setStressFilter,
    categoryFilter,
    setCategoryFilter,
    userProfile,
    moodLogs,
    addMoodLog
  } = useApp();

  const [showFilters, setShowFilters] = useState(false);
  const [quickSaveFeedback, setQuickSaveFeedback] = useState('');

  const latestLog = moodLogs.length > 0 ? moodLogs[0] : null;
  const currentMoodScore = latestLog?.score || latestLog?.stressLevel || 3;
  const currentEnergyLevel = latestLog?.energy || latestLog?.energyLevel || 3;

  const handleQuickLog = (newScore: number, newEnergy: number) => {
    addMoodLog(newScore, newEnergy);
    setQuickSaveFeedback('✨ Saved!');
    setTimeout(() => setQuickSaveFeedback(''), 1800);
  };

  const viewTitles: Record<string, { title: string; subtitle: string }> = {
    kanban: {
      title: 'Kanban Task Board',
      subtitle: 'Organize tasks by avoidance stress points & anxiety impact',
    },
    calendar: {
      title: 'Calendar & Sync',
      subtitle: 'Low-friction temporal overview with bi-directional integration',
    },
    habits: {
      title: 'Habit Consistency Tracker',
      subtitle: 'Build long-term behavioral neural pathways with 21-day streaks',
    },
    mood: {
      title: 'Mood & Correlation Analytics',
      subtitle: 'Track how task stress output relates to your daily energy',
    },
    accountability: {
      title: 'Body Doubling & Accountability',
      subtitle: 'Real-time parallel focus sessions and supportive contact pings',
    },
    therapist: {
      title: 'Therapist & Coach Portal',
      subtitle: 'Granular read-only access for care provider check-ins',
    },
    about: {
      title: 'About BrainTether & Feature Guide',
      subtitle: 'Complete workflow documentation and usage instructions',
    },
  };

  const currentViewInfo = viewTitles[activeView] || viewTitles.kanban;

  const categories: (TaskCategory | 'ALL')[] = ['ALL', 'Household', 'Money', 'Self-Care', 'Work', 'Health', 'General'];

  return (
    <header className="sticky top-0 z-20 bg-zen-surface-light/90 dark:bg-zen-surface-dark/90 backdrop-blur-md border-b border-zen-border-light dark:border-zen-border-dark px-6 py-3 space-y-2.5 transition-colors duration-300">
      
      {/* ROW 1: View Title (Left) + Primary Action Controls (Right) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Title & Subtitle + Version Badge */}
        <div className="flex items-center space-x-3 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {currentViewInfo.title}
              </h2>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-teal-600 dark:text-teal-400 border border-teal-500/20 shadow-sm" title={`BrainTether App Version: v${versionData.version}`}>
                v{versionData.version}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {currentViewInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Global Action Controls in Single Clean Row */}
        <div className="flex flex-wrap items-center gap-2.5">

          {/* Quick Add Task Button */}
          <button
            onClick={onOpenNewTaskModal}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-md shadow-teal-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>

          {/* Overwhelm Protocol Button */}
          <button
            onClick={onOpenOverwhelmModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-amber-500 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 rounded-xl transition-all shadow-sm active:scale-95"
            title="Bypass executive dysfunction with 2-minute micro-starter"
          >
            <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
            <span>I'm Overwhelmed</span>
          </button>

          {/* Onboarding Tutorial Trigger */}
          {onOpenTutorial && (
            <button
              onClick={onOpenTutorial}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/30 hover:bg-teal-500/20 rounded-xl transition-all shadow-sm"
              title="Open Interactive ADHD Workflow Tutorial"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guide</span>
            </button>
          )}

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 w-36 sm:w-44 transition-all"
            />
          </div>

          {/* Filter Trigger Button */}
          {activeView === 'kanban' && (
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                  stressFilter !== 'ALL' || categoryFilter !== 'ALL'
                    ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-zen-border-light dark:border-zen-border-dark hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              {showFilters && (
                <div className="absolute right-0 mt-2 w-64 p-4 rounded-xl bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-zen-border-light dark:border-zen-border-dark">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Filter Tasks</span>
                    <button
                      onClick={() => {
                        setStressFilter('ALL');
                        setCategoryFilter('ALL');
                      }}
                      className="text-[11px] text-teal-500 hover:underline font-medium"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
                      Stress Level
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { label: 'All Levels', value: 'ALL' },
                        { label: 'Low (1-3)', value: 'LOW' },
                        { label: 'Mid (4-6)', value: 'MID' },
                        { label: 'High (7-10)', value: 'HIGH' },
                      ].map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setStressFilter(item.value as StressLevelRange)}
                          className={`px-2 py-1.5 text-[11px] rounded-lg text-left font-medium border transition-all ${
                            stressFilter === item.value
                              ? 'bg-teal-500/20 text-teal-600 dark:text-teal-400 border-teal-500/40 font-bold'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
                      Category & Environment Filter
                    </label>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {['ALL', ...ALL_ENVIRONMENTS, 'Household', 'Work', 'Self-Care', 'Money'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat as TaskCategory | 'ALL')}
                          className={`px-2 py-1 text-[10px] rounded-md border font-medium transition-all ${
                            categoryFilter === cat
                              ? 'bg-teal-500/20 text-teal-600 dark:text-teal-400 border-teal-500/40 font-bold'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as TaskCategory | 'ALL')}
                      className="w-full px-2 py-1.5 text-[11px] rounded-lg bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-700 dark:text-slate-200 focus:outline-none"
                    >
                      <option value="ALL">All Specific Subcategories...</option>
                      <optgroup label="Main Categories">
                        {ALL_MAIN_CATEGORIES.map((mainCat) => (
                          <option key={mainCat} value={mainCat}>
                            {mainCat}
                          </option>
                        ))}
                      </optgroup>
                      {getGroupedCategoryOptions().map((group) => (
                        <optgroup key={group.groupName} label={group.groupName}>
                          {group.items.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-zen-border-light dark:border-zen-border-dark hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* User Profile Link */}
          <Link
            href="/profile"
            className="flex items-center space-x-1.5 pl-1 border-l border-zen-border-light dark:border-zen-border-dark hover:opacity-80 transition-opacity"
            title="User Profile & Settings"
          >
            {userProfile?.avatarUrl ? (
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name || 'User Avatar'}
                className="w-7 h-7 rounded-full border-2 border-teal-500/40 object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full border-2 border-teal-500/40 bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">
                {(userProfile?.name || 'U').charAt(0)}
              </div>
            )}
          </Link>

          {/* Sign Out Button */}
          <button
            onClick={async () => {
              if (typeof window !== 'undefined') {
                document.cookie = 'braintether_demo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
              }
              await signOut({ redirect: false });
              window.location.href = '/auth/signin';
            }}
            title="Sign Out of BrainTether"
            className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-rose-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-rose-500/10 border border-zen-border-light dark:border-zen-border-dark hover:border-rose-500/30 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

      </div>

      {/* ROW 2: DEDICATED MOOD & ENERGY STRIP */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-teal-500/30 text-xs shadow-inner">
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[11px] font-bold text-teal-500 dark:text-teal-400 flex items-center gap-1.5">
            <Smile className="w-3.5 h-3.5 text-teal-400" />
            <span>Mood & Energy Check-in:</span>
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:inline font-medium">
            (1-click log)
          </span>
        </div>

        <div className="flex items-center space-x-3 overflow-x-auto py-0.5">
          {/* Mood Selector Emojis */}
          <div className="flex items-center space-x-1">
            {[
              { score: 1, emoji: '😭', label: 'L1: Burnout / Overwhelmed' },
              { score: 2, emoji: '😰', label: 'L2: High Avoidance' },
              { score: 3, emoji: '😐', label: 'L3: Neutral Focus' },
              { score: 4, emoji: '😎', label: 'L4: Active Flow' },
              { score: 5, emoji: '🥳', label: 'L5: Radiant Dopamine' },
            ].map((m) => (
              <button
                key={m.score}
                type="button"
                onClick={() => handleQuickLog(m.score, currentEnergyLevel)}
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm transition-all ${
                  currentMoodScore === m.score
                    ? 'bg-teal-500/30 border-2 border-teal-400 scale-110 shadow-sm'
                    : 'hover:bg-slate-200 dark:hover:bg-slate-800 opacity-70 hover:opacity-100'
                }`}
                title={`Set Mood: ${m.label}`}
              >
                {m.emoji}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-800"></div>

          {/* Energy Level Pills */}
          <div className="flex items-center space-x-1">
            <span className="text-[11px] font-bold text-amber-500 dark:text-amber-400 flex items-center gap-1 shrink-0 mr-1">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
              <span className="hidden sm:inline">Energy:</span>
            </span>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => handleQuickLog(currentMoodScore, lvl)}
                className={`px-1.5 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                  currentEnergyLevel === lvl
                    ? 'bg-amber-500/30 text-amber-500 dark:text-amber-300 border border-amber-400 scale-110 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
                title={`Set Energy Level: ${lvl} / 5`}
              >
                ⚡{lvl}
              </button>
            ))}
          </div>

          {quickSaveFeedback && (
            <span className="text-[10px] font-bold text-emerald-400 animate-in fade-in">
              {quickSaveFeedback}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
