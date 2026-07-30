'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Flame, CheckCircle2, Plus, Award } from 'lucide-react';

export const HabitsTracker: React.FC = () => {
  const { habits, logHabitCompletion, addHabit } = useApp();
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addHabit({
      title: newTitle.trim(),
      description: newDesc.trim() || undefined,
      frequency: 'DAILY',
      targetDays: 21,
    });
    setNewTitle('');
    setNewDesc('');
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900/40 via-emerald-900/30 to-slate-900 text-white border border-teal-500/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">Behavioral Habit Streaks (21-Day Milestones)</h3>
            <p className="text-xs text-slate-300">
              Micro-habits reduce friction. Form durable neural pathways without all-or-nothing guilt.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-semibold text-emerald-300 shrink-0">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Active Streaks Building</span>
        </div>
      </div>

      {/* Grid of Habit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => {
          const dates = habit.completedDates || habit.history || [];
          const isDoneToday = dates.includes(todayStr);
          const streak = habit.streakCount || habit.currentStreak || 0;
          const progressPercent = Math.min(100, (streak / (habit.targetDays || 21)) * 100);

          return (
            <div 
              key={habit.id}
              className={`p-5 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border transition-all ${
                isDoneToday 
                  ? 'border-emerald-500/40 shadow-stress-glow-low' 
                  : 'border-zen-border-light dark:border-zen-border-dark'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-teal-500/10 text-teal-500 border border-teal-500/20">
                  {habit.frequency || 'DAILY'}
                </span>

                {/* Streak Badge */}
                <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 fill-current animate-pulse-subtle" />
                  <span>{streak} Day Streak</span>
                </div>
              </div>

              <h4 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-1">
                {habit.title}
              </h4>
              {habit.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  {habit.description}
                </p>
              )}

              {/* Progress to 21-day milestone */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <span>Target: {habit.targetDays || 21} Days</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Toggle */}
              <button
                onClick={() => logHabitCompletion(habit.id)}
                disabled={isDoneToday}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                  isDoneToday
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                    : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-md shadow-teal-500/20 active:scale-95'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isDoneToday ? 'Completed Today! ✨' : 'Log Habit Completion'}</span>
              </button>
            </div>
          );
        })}

        {/* Quick Add Habit Form Card */}
        <div className="p-5 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800 flex flex-col justify-between">
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-teal-500" />
            Add New Consistency Habit
          </h4>
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Habit Title (e.g. 5-min room reset)..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100"
            />
            <input
              type="text"
              placeholder="Why this habit matters..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100"
            />
            <button
              type="submit"
              className="w-full py-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all"
            >
              Start 21-Day Track
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};
