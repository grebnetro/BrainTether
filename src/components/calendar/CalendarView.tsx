'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, RefreshCw, Check, Flame, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { tasks } = useApp();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [syncedGoogle, setSyncedGoogle] = useState(true);
  const [syncedICal, setSyncedICal] = useState(true);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Current Month Calculations
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-indexed
  const today = new Date();

  const monthTitle = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonthDays = Array.from(
    { length: firstDayOfWeek }, 
    (_, i) => daysInPrevMonth - firstDayOfWeek + 1 + i
  );
  
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const totalGridSlots = prevMonthDays.length + currentMonthDays.length;
  const trailingSlotCount = (7 - (totalGridSlots % 7)) % 7;
  const nextMonthDays = Array.from({ length: trailingSlotCount }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleTodayClick = () => {
    setCurrentMonth(new Date());
  };

  const formatDayISO = (d: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

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
      <div className="p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark space-y-4 shadow-xl">
        
        {/* Month Navigation Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h4 className="font-extrabold text-lg text-slate-800 dark:text-slate-100 tracking-tight">
              {monthTitle}
            </h4>
            <button
              onClick={handleTodayClick}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-teal-400 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 transition-all"
            >
              Today
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrevMonth}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNextMonth}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/60 pb-2">
          {daysOfWeek.map(d => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-7 gap-2">
          
          {/* Previous Month Disabled Slots */}
          {prevMonthDays.map((d) => (
            <div
              key={`prev-${d}`}
              className="min-h-[90px] p-2 rounded-xl border border-transparent bg-slate-950/20 text-slate-600 dark:text-slate-700 opacity-40 select-none"
            >
              <span className="text-xs font-semibold">{d}</span>
            </div>
          ))}

          {/* Current Month Active Days */}
          {currentMonthDays.map((dateNum) => {
            const dayISO = formatDayISO(dateNum);
            const isToday = 
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === dateNum;

            // Match tasks strictly by exact ISO date string (dueDate or createdAt date)
            const dayTasks = tasks.filter((t) => {
              const taskDate = (t.dueDate || t.createdAt || '').split('T')[0];
              return taskDate === dayISO;
            });

            return (
              <div
                key={`current-${dateNum}`}
                className={`min-h-[90px] p-2 rounded-xl border flex flex-col justify-between transition-all ${
                  isToday
                    ? 'bg-teal-500/10 border-teal-500/60 shadow-md shadow-teal-500/10'
                    : 'bg-slate-50/50 dark:bg-slate-900/40 border-zen-border-light dark:border-zen-border-dark/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isToday ? 'text-teal-400 font-extrabold' : 'text-slate-600 dark:text-slate-300'}`}>
                    {dateNum}
                  </span>
                  {isToday && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-teal-500 text-white font-bold">
                      Today
                    </span>
                  )}
                </div>

                <div className="space-y-1 my-1 flex-1 overflow-hidden">
                  {dayTasks.map((t) => (
                    <div
                      key={t.id}
                      className="px-1.5 py-1 rounded-lg text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-700/50 flex items-center justify-between shadow-sm"
                      title={`${t.title} (${t.stressPoints} stress pts)`}
                    >
                      <span className="truncate font-semibold">{t.title}</span>
                      <span className="text-[9px] font-bold text-amber-400 ml-1 shrink-0 px-1 rounded bg-amber-500/10 border border-amber-500/20">
                        {t.stressPoints}pt
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Next Month Disabled Slots */}
          {nextMonthDays.map((d) => (
            <div
              key={`next-${d}`}
              className="min-h-[90px] p-2 rounded-xl border border-transparent bg-slate-950/20 text-slate-600 dark:text-slate-700 opacity-40 select-none"
            >
              <span className="text-xs font-semibold">{d}</span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};
