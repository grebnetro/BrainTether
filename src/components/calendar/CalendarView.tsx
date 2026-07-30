'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, RefreshCw, Check, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { tasks } = useApp();
  const [syncedGoogle, setSyncedGoogle] = useState(true);
  const [syncedICal, setSyncedICal] = useState(true);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      
      {/* Sync Status Header Card */}
      <div className="p-5 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Bi-Directional Calendar Integration
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Avoid calendar debt. Tasks automatically sync with Google Calendar & iCal.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSyncedGoogle(!syncedGoogle)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border flex items-center space-x-1.5 transition-all ${
              syncedGoogle
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Google Calendar</span>
          </button>

          <button
            onClick={() => setSyncedICal(!syncedICal)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border flex items-center space-x-1.5 transition-all ${
              syncedICal
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apple iCal</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark space-y-4">
        
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-base text-slate-800 dark:text-slate-100">
            July / August 2026
          </h4>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
          {daysOfWeek.map(d => (
            <div key={d} className="py-2">{d}</div>
          ))}
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-7 gap-2">
          {dates.map((date) => {
            const isToday = date === 30;
            // Map tasks to dates demo
            const dayTasks = tasks.filter((_, idx) => (idx % 7) === (date % 7));

            return (
              <div
                key={date}
                className={`min-h-[90px] p-2 rounded-xl border flex flex-col justify-between transition-all ${
                  isToday
                    ? 'bg-teal-500/10 border-teal-500/50 shadow-sm'
                    : 'bg-slate-50/50 dark:bg-slate-900/40 border-zen-border-light dark:border-zen-border-dark/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isToday ? 'text-teal-400 font-extrabold' : 'text-slate-600 dark:text-slate-300'}`}>
                    {date}
                  </span>
                  {isToday && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-teal-500 text-white font-bold">
                      Today
                    </span>
                  )}
                </div>

                <div className="space-y-1 my-1">
                  {dayTasks.slice(0, 2).map((t) => (
                    <div
                      key={t.id}
                      className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 truncate flex items-center justify-between"
                    >
                      <span className="truncate">{t.title}</span>
                      <span className="text-[9px] font-bold text-amber-500 ml-1 shrink-0">
                        {t.stressPoints}pt
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
