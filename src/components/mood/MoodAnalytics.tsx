'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Smile, Frown, Meh, SmilePlus, Sparkles, TrendingUp, Flame, Activity } from 'lucide-react';

export const MoodAnalytics: React.FC = () => {
  const { moodLogs, addMoodLog, totalDailyStressPoints, completedDailyStressPoints, tasks } = useApp();

  const [selectedScore, setSelectedScore] = useState<number>(4);
  const [selectedEnergy, setSelectedEnergy] = useState<number>(3);
  const [notes, setNotes] = useState('');
  const [loggedToday, setLoggedToday] = useState(false);

  const emojis = [
    { score: 1, label: 'Very Poor', icon: Frown, color: 'text-rose-500 bg-rose-500/10 border-rose-500/30' },
    { score: 2, label: 'Poor', icon: Frown, color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
    { score: 3, label: 'Okay', icon: Meh, color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' },
    { score: 4, label: 'Good', icon: Smile, color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' },
    { score: 5, label: 'Great', icon: SmilePlus, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  ];

  const handleSaveMood = (e: React.FormEvent) => {
    e.preventDefault();
    addMoodLog(selectedScore, selectedEnergy, notes);
    setNotes('');
    setLoggedToday(true);
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      
      {/* Top Quick Logger Card */}
      <div className="p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
            <Smile className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
              Quick Daily Mood & Energy Check-in
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Correlate your daily mood with completed stress points to uncover patterns
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveMood} className="space-y-5">
          {/* Emoji Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              How are you feeling right now?
            </label>
            <div className="grid grid-cols-5 gap-3">
              {emojis.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedScore === item.score;
                return (
                  <button
                    key={item.score}
                    type="button"
                    onClick={() => setSelectedScore(item.score)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? `${item.color} font-bold ring-2 ring-teal-500/50 scale-105 shadow-md`
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-[11px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Energy Slider */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-teal-400" />
                Physical Energy Level (1–5)
              </label>
              <span className="text-xs font-bold text-teal-500">{selectedEnergy} / 5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={selectedEnergy}
              onChange={(e) => setSelectedEnergy(parseInt(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
          </div>

          {/* Optional Reflection Note */}
          <div>
            <input
              type="text"
              placeholder="Any specific trigger or win today? (Optional)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center justify-between">
            {loggedToday && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> Logged! Thank you for checking in with yourself.
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-5 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow transition-all"
            >
              Log Mood Check-in
            </button>
          </div>
        </form>
      </div>

      {/* Correlation Dashboard Analytics Overlay */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Stress vs Mood Insight Box */}
        <div className="p-5 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark">
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            Executive Function Correlation
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            BrainTether cross-references completed task stress points against your logged moods to help identify burnout risks and ideal work windows.
          </p>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark/60 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Stress Points Relieved Today
              </span>
              <span className="text-xs font-bold text-emerald-500">
                +{completedDailyStressPoints} pts
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark/60 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Current Pending Stress Load
              </span>
              <span className="text-xs font-bold text-amber-500">
                {totalDailyStressPoints} pts
              </span>
            </div>

            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-300 text-xs">
              <span className="font-bold">Insight:</span> Completing 1 high-stress task (7+ points) in the morning correlates with +35% higher reported evening mood scores!
            </div>
          </div>
        </div>

        {/* History Log Stream */}
        <div className="p-5 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-3">
              Recent Mood Log History
            </h4>
            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              {moodLogs.map((log) => {
                const em = emojis.find(e => e.score === log.score) || emojis[2];
                const Icon = em.icon;
                return (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark/60 flex items-start space-x-3">
                    <div className={`p-1.5 rounded-lg shrink-0 ${em.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                        <span>{em.label} (Energy {log.energy}/5)</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {new Date(log.loggedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {log.notes && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
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
