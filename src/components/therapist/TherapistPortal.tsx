'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Eye, Key, CheckCircle, FileText, Activity } from 'lucide-react';

export const TherapistPortal: React.FC = () => {
  const { therapistPermission, toggleTherapistPermission, userProfile, moodLogs, tasks, habits } = useApp();

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
              Grant granular, read-only review access to designated clinical care providers.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-500/10 px-3.5 py-2 rounded-xl border border-indigo-500/30 text-xs font-mono text-indigo-300 shrink-0">
          <Key className="w-4 h-4 text-amber-400" />
          <span>Access Code: {userProfile?.therapistAccessCode || 'BT-772-MIND'}</span>
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
            {[
              { id: 'allowMoodView', label: 'Share Mood & Energy Logs', desc: 'Allows clinician to track energy drop trends' },
              { id: 'allowStressView', label: 'Share Stress Avoidance Metrics', desc: 'Allows clinician to view active task stress points' },
              { id: 'allowNotesView', label: 'Share Journal & Reflection Notes', desc: 'Allows clinician to review private reflections' },
            ].map((p) => {
              const isEnabled = (therapistPermission as any)[p.id];
              return (
                <button
                  key={p.id}
                  onClick={() => toggleTherapistPermission(p.id as any)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isEnabled
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900/60 text-slate-400 border-zen-border-light dark:border-zen-border-dark'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{p.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{p.desc}</div>
                  </div>
                  <CheckCircle className={`w-4 h-4 shrink-0 ${isEnabled ? 'text-emerald-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Clinical Progress Preview */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-400" />
              Live Read-Only Clinical View Preview
            </h4>
            <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              HIPAA Compliant Structure
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Stress Relieved</span>
              <span className="text-lg font-bold text-teal-400 mt-1 block">+{totalStressRelieved} pts</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Habits Building</span>
              <span className="text-lg font-bold text-indigo-400 mt-1 block">{habits.length} Active</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Mood Logged</span>
              <span className="text-lg font-bold text-emerald-400 mt-1 block">{moodLogs.length} Entries</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                Session Sharing Link for Clinician
              </span>
            </div>
            <code className="block p-2.5 rounded-lg bg-slate-950 text-teal-400 font-mono text-xs overflow-x-auto border border-slate-800">
              https://braintether.vercel.app/therapist/review/{userProfile?.therapistAccessCode || 'BT-772-MIND'}
            </code>
          </div>
        </div>

      </div>

    </div>
  );
};
