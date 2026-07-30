'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Flame, CheckCircle2, Plus } from 'lucide-react';

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
      category: 'Self-Care',
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
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950/60 via-zen-surface-dark to-slate-900 border border-teal-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Neurodivergent Habit Building</span>
          </span>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">
            21-Day Habit Milestone Tracker
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Form habits with low cognitive pressure. Track consecutive milestones without all-or-nothing guilt.
          </p>
        </div>
      </div>

      {/* Habit Builder Form */}
      <form onSubmit={handleCreate} className="p-5 rounded-2xl bg-zen-surface-dark border border-zen-border-dark flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New Habit (e.g. 5-Min Morning Stretch, Drink Water)..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        />
        <input
          type="text"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          placeholder="Optional notes or cues..."
          className="sm:w-64 px-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 active:scale-95 transition-all flex items-center justify-center space-x-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Habit</span>
        </button>
      </form>

      {/* Habit Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((habit) => {
          const isDoneToday = habit.completedDates?.includes(todayStr);
          return (
            <div
              key={habit.id}
              className="p-5 rounded-2xl bg-zen-surface-dark border border-zen-border-dark shadow-xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-100">{habit.title}</h3>
                  {habit.description && (
                    <p className="text-xs text-slate-400 mt-0.5">{habit.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => logHabitCompletion(habit.id)}
                  disabled={isDoneToday}
                  className={`p-2.5 rounded-xl border font-bold text-xs transition-all flex items-center space-x-1.5 ${
                    isDoneToday
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 opacity-80'
                      : 'bg-teal-500 text-white border-teal-400 hover:bg-teal-600 shadow-md active:scale-95'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDoneToday ? 'Done Today' : 'Mark Done'}</span>
                </button>
              </div>

              {/* Progress & Milestone */}
              <div className="space-y-1.5 pt-2 border-t border-zen-border-dark">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    Streak: <strong className="text-amber-400">{habit.currentStreak || 0} Days</strong>
                  </span>
                  <span className="text-teal-400 font-bold">
                    Milestone: {habit.streakCount || 0} / 21 Days
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, ((habit.streakCount || 0) / 21) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
