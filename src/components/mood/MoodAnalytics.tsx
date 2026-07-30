'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, Smile, Frown, Meh, Sparkles, HeartHandshake, Flame, TrendingUp } from 'lucide-react';

export const MoodAnalytics: React.FC = () => {
  const { moodLogs, addMoodLog } = useApp();
  const [selectedScore, setSelectedScore] = useState<number>(3);
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [notes, setNotes] = useState<string>('');
  const [loggedSuccess, setLoggedSuccess] = useState<boolean>(false);

  const emojis = [
    { score: 1, label: 'Deep Burnout / Paralyzed', icon: Frown, color: 'text-rose-500 bg-rose-500/10 border-rose-500/30' },
    { score: 2, label: 'High Avoidance', icon: Frown, color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
    { score: 3, label: 'Neutral Focus', icon: Meh, color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' },
    { score: 4, label: 'Flowing Flow', icon: Smile, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { score: 5, label: 'High Dopamine Surge', icon: Smile, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
  ];

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMoodLog(selectedScore, energyLevel, notes.trim() || undefined);
    setNotes('');
    setLoggedSuccess(true);
    setTimeout(() => setLoggedSuccess(false), 3000);
  };

  const avgEnergy = moodLogs.length > 0
    ? (moodLogs.reduce((acc, curr) => acc + (curr.energyLevel || curr.energy || 3), 0) / moodLogs.length).toFixed(1)
    : '3.0';

  const avgStress = moodLogs.length > 0
    ? (moodLogs.reduce((acc, curr) => acc + (curr.stressLevel || curr.score || 3), 0) / moodLogs.length).toFixed(1)
    : '4.5';

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900/40 via-emerald-900/30 to-slate-900 text-white border border-teal-500/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">ADHD Energy & Mood Journaling</h3>
            <p className="text-xs text-slate-300">
              Track executive stamina trends & identify cognitive burnout warning signs early.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-semibold text-emerald-300 shrink-0">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Self-Compassion Mode Active</span>
        </div>
      </div>

      {/* Metrics Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avg Daily Energy</span>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-0.5">{avgEnergy} / 5</h4>
          </div>
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avg Stress Load</span>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-0.5">{avgStress} / 10</h4>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Logged Entries</span>
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-0.5">{moodLogs.length} Check-ins</h4>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <HeartHandshake className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Form + History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mood Check-in Form Card */}
        <div className="p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark space-y-5">
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Smile className="w-4 h-4 text-teal-400" />
            Quick Mood & Energy Check-in
          </h4>

          <form onSubmit={handleLogSubmit} className="space-y-4">
            
            {/* Mood Emoji Selectors */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                How does your brain feel right now?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {emojis.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedScore === item.score;
                  return (
                    <button
                      key={item.score}
                      type="button"
                      onClick={() => setSelectedScore(item.score)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                        isSelected 
                          ? `${item.color} shadow-md scale-105` 
                          : 'bg-slate-50 dark:bg-slate-900 border-zen-border-light dark:border-zen-border-dark text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[10px] font-bold">{item.score}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Energy Slider */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Stamina / Physical Energy Level</span>
                <span className="font-mono text-teal-400 font-bold">{energyLevel} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
              />
            </div>

            {/* Notes Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Reflective Journal Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What triggered your focus or overwhelm today?..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-500/20 active:scale-95 transition-all"
            >
              {loggedSuccess ? 'Log Saved Successfully! ✨' : 'Save Check-in Log'}
            </button>

          </form>
        </div>

        {/* History Log Stream */}
        <div className="p-5 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-3">
              Recent Mood Log History
            </h4>
            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              {moodLogs.map((log) => {
                const scoreVal = log.stressLevel || log.score || 3;
                const energyVal = log.energyLevel || log.energy || 3;
                const em = emojis.find(e => e.score === scoreVal) || emojis[2];
                const Icon = em.icon;
                return (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark/60 flex items-start space-x-3">
                    <div className={`p-1.5 rounded-lg shrink-0 ${em.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                        <span>{em.label} (Energy {energyVal}/5)</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : 'Today'}
                        </span>
                      </div>
                      {log.notes && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                          "{log.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
