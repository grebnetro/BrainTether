import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flame, 
  Layers, 
  Sparkles,
  Grid,
  ListFilter,
  Move
} from 'lucide-react';
import { Task } from '../../types';

export type CalendarMode = 'month' | 'week' | 'workweek' | 'day' | 'annual';

export const CalendarView: React.FC = () => {
  const { tasks, updateTask } = useApp();
  const [calendarMode, setCalendarMode] = useState<CalendarMode>('month');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [syncedGoogle, setSyncedGoogle] = useState(true);
  const [syncedICal, setSyncedICal] = useState(true);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const workWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed
  const today = new Date();

  const monthTitle = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Navigation handlers
  const handlePrev = () => {
    if (calendarMode === 'month' || calendarMode === 'annual') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (calendarMode === 'week' || calendarMode === 'workweek') {
      const prevWeek = new Date(currentDate);
      prevWeek.setDate(currentDate.getDate() - 7);
      setCurrentDate(prevWeek);
    } else {
      const prevDay = new Date(currentDate);
      prevDay.setDate(currentDate.getDate() - 1);
      setCurrentDate(prevDay);
    }
  };

  const handleNext = () => {
    if (calendarMode === 'month' || calendarMode === 'annual') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (calendarMode === 'week' || calendarMode === 'workweek') {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(currentDate.getDate() + 7);
      setCurrentDate(nextWeek);
    } else {
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + 1);
      setCurrentDate(nextDay);
    }
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  // Drag & Drop Date Rescheduling Handler
  const handleDropOnDate = (targetISO: string) => {
    if (!draggedTaskId) return;
    updateTask(draggedTaskId, {
      dueDate: new Date(targetISO).toISOString(),
    });
    setDraggedTaskId(null);
  };

  // Format YYYY-MM-DD
  const formatISO = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  // Filter tasks for an exact date string
  const getTasksForDate = (dateISO: string) => {
    return tasks.filter((t) => {
      const tDate = (t.dueDate || t.createdAt || '').split('T')[0];
      return tDate === dateISO;
    });
  };

  // Month Math
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

  // Week Days Math
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  const weekDatesArray = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      
      {/* Sync Status & Depiction Explanation Banner */}
      <div className="p-5 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              Bi-Directional Drag-and-Drop Calendar
              <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                Drag cards to reschedule
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Depicting scheduled 🔴 <strong>Due Dates</strong> (or 📅 <strong>Creation Dates</strong> for unscheduled tasks).
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

      {/* Calendar Control Bar (View Mode Switcher + Month Nav) */}
      <div className="p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark space-y-5 shadow-xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
          
          {/* Month / Week Title & Today button */}
          <div className="flex items-center space-x-3">
            <h4 className="font-extrabold text-xl text-slate-800 dark:text-slate-100 tracking-tight">
              {calendarMode === 'day' 
                ? currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
                : monthTitle}
            </h4>
            <button
              onClick={handleTodayClick}
              className="px-3 py-1 rounded-xl text-xs font-bold text-teal-400 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 transition-all active:scale-95"
            >
              Today
            </button>
          </div>

          {/* View Mode Pills (Annual, Month, Week, 5-Day, Daily) */}
          <div className="flex items-center space-x-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setCalendarMode('month')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                calendarMode === 'month' ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setCalendarMode('week')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                calendarMode === 'week' ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              7-Day Week
            </button>
            <button
              onClick={() => setCalendarMode('workweek')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                calendarMode === 'workweek' ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              5-Day Work
            </button>
            <button
              onClick={() => setCalendarMode('day')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                calendarMode === 'day' ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setCalendarMode('annual')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                calendarMode === 'annual' ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Annual
            </button>
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
              title="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* 1. MONTH VIEW GRID */}
        {calendarMode === 'month' && (
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
              {daysOfWeek.map(d => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {prevMonthDays.map((d) => (
                <div
                  key={`prev-${d}`}
                  className="min-h-[100px] p-2 rounded-xl border border-transparent bg-slate-950/20 text-slate-600 dark:text-slate-700 opacity-40 select-none"
                >
                  <span className="text-xs font-semibold">{d}</span>
                </div>
              ))}

              {currentMonthDays.map((dateNum) => {
                const dayISO = formatISO(year, month, dateNum);
                const isToday = 
                  today.getFullYear() === year &&
                  today.getMonth() === month &&
                  today.getDate() === dateNum;

                const dayTasks = getTasksForDate(dayISO);

                return (
                  <div
                    key={`current-${dateNum}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDropOnDate(dayISO)}
                    className={`min-h-[100px] p-2 rounded-xl border flex flex-col justify-between transition-all ${
                      isToday
                        ? 'bg-teal-500/10 border-teal-500/60 shadow-md shadow-teal-500/10'
                        : 'bg-slate-50/50 dark:bg-slate-900/40 border-zen-border-light dark:border-zen-border-dark/60 hover:border-teal-500/40'
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
                          draggable
                          onDragStart={() => setDraggedTaskId(t.id)}
                          className="px-2 py-1 rounded-lg text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-700/60 flex items-center justify-between shadow-sm cursor-grab active:cursor-grabbing hover:border-teal-400/50 transition-all"
                          title={`[Draggable] ${t.title} (${t.stressPoints} pts)`}
                        >
                          <span className="truncate font-semibold flex items-center gap-1">
                            {t.dueDate ? '🔴' : '📅'} {t.title}
                          </span>
                          <span className="text-[9px] font-bold text-amber-400 ml-1 shrink-0 px-1 rounded bg-amber-500/10">
                            {t.stressPoints}pt
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {nextMonthDays.map((d) => (
                <div
                  key={`next-${d}`}
                  className="min-h-[100px] p-2 rounded-xl border border-transparent bg-slate-950/20 text-slate-600 dark:text-slate-700 opacity-40 select-none"
                >
                  <span className="text-xs font-semibold">{d}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. 7-DAY WEEK VIEW */}
        {calendarMode === 'week' && (
          <div className="grid grid-cols-7 gap-3">
            {weekDatesArray.map((dateObj) => {
              const dISO = formatISO(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
              const isToday = dateObj.toDateString() === today.toDateString();
              const dayTasks = getTasksForDate(dISO);

              return (
                <div
                  key={dISO}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropOnDate(dISO)}
                  className={`min-h-[320px] p-3 rounded-2xl border flex flex-col space-y-3 transition-all ${
                    isToday ? 'bg-teal-500/10 border-teal-500/60' : 'bg-slate-900/40 border-slate-800'
                  }`}
                >
                  <div className="text-center border-b border-slate-800 pb-2">
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <h5 className={`text-base font-extrabold ${isToday ? 'text-teal-400' : 'text-slate-200'}`}>
                      {dateObj.getDate()}
                    </h5>
                  </div>

                  <div className="space-y-2 flex-1">
                    {dayTasks.map((t) => (
                      <div
                        key={t.id}
                        draggable
                        onDragStart={() => setDraggedTaskId(t.id)}
                        className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 cursor-grab active:cursor-grabbing hover:border-teal-400/50 shadow-sm space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>{t.category}</span>
                          <span className="text-amber-400 font-bold">{t.stressPoints}pt</span>
                        </div>
                        <p className="font-bold line-clamp-2">{t.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. 5-DAY WORK WEEK VIEW */}
        {calendarMode === 'workweek' && (
          <div className="grid grid-cols-5 gap-3">
            {weekDatesArray.filter((_, idx) => idx >= 1 && idx <= 5).map((dateObj) => {
              const dISO = formatISO(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
              const isToday = dateObj.toDateString() === today.toDateString();
              const dayTasks = getTasksForDate(dISO);

              return (
                <div
                  key={dISO}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropOnDate(dISO)}
                  className={`min-h-[340px] p-4 rounded-2xl border flex flex-col space-y-3 transition-all ${
                    isToday ? 'bg-teal-500/10 border-teal-500/60' : 'bg-slate-900/40 border-slate-800'
                  }`}
                >
                  <div className="text-center border-b border-slate-800 pb-2">
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      {dateObj.toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                    <h5 className={`text-lg font-extrabold ${isToday ? 'text-teal-400' : 'text-slate-200'}`}>
                      {dateObj.getDate()}
                    </h5>
                  </div>

                  <div className="space-y-2 flex-1">
                    {dayTasks.map((t) => (
                      <div
                        key={t.id}
                        draggable
                        onDragStart={() => setDraggedTaskId(t.id)}
                        className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 cursor-grab active:cursor-grabbing hover:border-teal-400/50 shadow-sm space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>{t.category}</span>
                          <span className="text-amber-400 font-bold">{t.stressPoints} pts</span>
                        </div>
                        <p className="font-bold">{t.title}</p>
                        {t.estimatedMinutes && (
                          <p className="text-[10px] text-teal-400 font-mono">⏱️ {t.estimatedMinutes} mins</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. DAILY TIMELINE VIEW */}
        {calendarMode === 'day' && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <h5 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                24-Hour Focus Agenda Timeline
              </h5>
              <span className="text-xs text-slate-400">
                {getTasksForDate(formatISO(year, month, currentDate.getDate())).length} Tasks Scheduled Today
              </span>
            </div>

            <div className="space-y-2">
              {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((hour) => {
                const dayISO = formatISO(year, month, currentDate.getDate());
                const dayTasks = getTasksForDate(dayISO);
                const hourTasks = dayTasks.filter((_, idx) => (idx % 10) === (hour % 10));

                return (
                  <div key={hour} className="flex items-start space-x-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 min-h-[60px]">
                    <div className="w-16 text-xs font-mono font-bold text-slate-500 pt-1 shrink-0">
                      {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {hourTasks.map((t) => (
                        <div key={t.id} className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-xs text-slate-100 flex items-center justify-between">
                          <span className="font-bold">{t.title}</span>
                          <span className="text-[10px] font-bold text-amber-400">{t.stressPoints} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. ANNUAL OVERVIEW HEATMAP VIEW */}
        {calendarMode === 'annual' && (
          <div className="space-y-4">
            <h5 className="font-bold text-sm text-slate-200">12-Month Yearly Overview ({year})</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }, (_, mIdx) => {
                const mName = new Date(year, mIdx, 1).toLocaleDateString('en-US', { month: 'short' });
                const mDays = new Date(year, mIdx + 1, 0).getDate();

                return (
                  <div key={mIdx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <h6 className="font-bold text-xs text-slate-300 border-b border-slate-800 pb-1">{mName}</h6>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: mDays }, (_, dIdx) => {
                        const dISO = formatISO(year, mIdx, dIdx + 1);
                        const count = getTasksForDate(dISO).length;
                        return (
                          <div
                            key={dIdx}
                            className={`w-3 h-3 rounded-sm ${
                              count > 0 ? 'bg-teal-400' : 'bg-slate-800'
                            }`}
                            title={`${mName} ${dIdx + 1}: ${count} tasks`}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
