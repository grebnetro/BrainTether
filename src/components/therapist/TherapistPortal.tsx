'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Eye, Download, Key, CheckCircle, FileText, Activity } from 'lucide-react';

export const TherapistPortal: React.FC = () => {
  const { therapistPermission, toggleTherapistPermission, moodLogs, tasks, habits } = useApp();

  const totalStressRelieved = tasks.filter(t => t.status === 'COMPLETED').reduce((acc, curr) => acc + curr.stressPoints, 0);

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-100">Therapist & Care Coach Access Portal</h3>
            <p className="text-xs text-slate-300">
              Grant granular, read-only review access to designated clinical care providers (e.g. Dr. Evelyn Reed).
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-500/10 px-3.5 py-2 rounded-xl border border-indigo-500/30 text-xs font-mono text-indigo-300 shrink-0">
          <Key className="w-4 h-4 text-amber-400" />
          <span>Access Code: {therapistPermission.accessCode}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Permission Controls Box */}
        <div className="p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark space-y-5">
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-400" />
            Granular Permission Settings
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You maintain 100% control over what data your therapist or ADHD coach can view during session reviews.
          </p>

          <div className="space-y-3">
            
            {/* Toggle Mood */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
                  Allow Mood Logs Access
                </span>
                <span className="text-[10px] text-slate-400">Share 5-emoji daily check-in score trend</span>
              </div>
              <input
                type="checkbox"
                checked={therapistPermission.allowMoodView}
                onChange={() => toggleTherapistPermission('allowMoodView')}
                className="w-4 h-4 rounded text-indigo-600 border-slate-400 cursor-pointer"
              />
            </div>

            {/* Toggle Stress */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
                  Allow Stress Points Output Access
                </span>
                <span className="text-[10px] text-slate-400">Share task avoidance ratings & completed load</span>
              </div>
              <input
                type="checkbox"
                checked={therapistPermission.allowStressView}
                onChange={() => toggleTherapistPermission('allowStressView')}
                className="w-4 h-4 rounded text-indigo-600 border-slate-400 cursor-pointer"
              />
            </div>

            {/* Toggle Personal Notes */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
                  Allow Detailed Personal Notes
                </span>
                <span className="text-[10px] text-slate-400">Includes private reflection journal snippets</span>
              </div>
              <input
                type="checkbox"
                checked={therapistPermission.allowNotesView}
                onChange={() => toggleTherapistPermission('allowNotesView')}
                className="w-4 h-4 rounded text-indigo-600 border-slate-400 cursor-pointer"
              />
            </div>

          </div>

          <div className="pt-2">
            <button className="w-full py-2.5 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all">
              <Download className="w-4 h-4" />
              <span>Export PDF Clinical Summary Report</span>
            </button>
          </div>
        </div>

        {/* Live Therapist View Preview */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zen-border-light dark:border-zen-border-dark">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-indigo-400" />
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Therapist Read-Only View Summary
              </h4>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
              Authorized: {therapistPermission.therapistName}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark/60 text-center">
              <span className="text-[11px] text-slate-400 block font-semibold">Stress Points Relieved</span>
              <span className="text-xl font-bold text-teal-400 mt-1 block">+{totalStressRelieved} pts</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark/60 text-center">
              <span className="text-[11px] text-slate-400 block font-semibold">Habit Streaks Maintained</span>
              <span className="text-xl font-bold text-amber-400 mt-1 block">{habits.length} Habits</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark/60 text-center">
              <span className="text-[11px] text-slate-400 block font-semibold">7-Day Mood Average</span>
              <span className="text-xl font-bold text-indigo-400 mt-1 block">3.8 / 5.0</span>
            </div>
          </div>

          {/* Clinician Observations & Notes */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-2">
            <h5 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              Latest Session Note from {therapistPermission.therapistName}
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "Patient is making steady progress breaking high avoidance tasks (money & taxes) into 5-minute micro-steps. Recommend continuing body doubling sessions for administrative tasks."
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
