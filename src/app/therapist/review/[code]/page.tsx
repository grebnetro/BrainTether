import React from 'react';
import { prisma } from '@/lib/prisma';
import { ShieldCheck, Flame, Activity } from 'lucide-react';

interface PageProps {
  params: {
    code: string;
  };
}

export default async function TherapistReviewPage({ params }: PageProps) {
  const user = await prisma.user.findFirst({
    where: { therapistAccessCode: params.code },
    include: {
      tasks: true,
      habits: true,
      moodLogs: true,
    },
  }) || await prisma.user.findFirst({
    include: {
      tasks: true,
      habits: true,
      moodLogs: true,
    },
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <p className="text-sm text-slate-400">Invalid therapist access code or record expired.</p>
      </div>
    );
  }

  const completedTasks = user.tasks.filter((t) => t.status === 'COMPLETED');
  const totalStressRelieved = completedTasks.reduce((acc, curr) => acc + curr.stressPoints, 0);
  const pendingStress = user.tasks.filter((t) => t.status !== 'COMPLETED').reduce((acc, curr) => acc + curr.stressPoints, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 max-w-5xl mx-auto space-y-8 font-sans">
      
      {/* Clinician Review Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-indigo-500/30 shadow-2xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">BrainTether Clinical Progress Report</h1>
            <p className="text-xs text-slate-400">
              Patient: {user.name || user.email} • Read-Only Session Review Code: <code className="text-teal-400 font-mono">{params.code}</code>
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block font-semibold">Stress Points Relieved</span>
          <span className="text-2xl font-bold text-teal-400 mt-1 block">+{totalStressRelieved} pts</span>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block font-semibold">Pending Avoidance Load</span>
          <span className="text-2xl font-bold text-amber-400 mt-1 block">{pendingStress} pts</span>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 block font-semibold">Active Habit Streaks</span>
          <span className="text-2xl font-bold text-indigo-400 mt-1 block">{user.habits.length} Habits</span>
        </div>
      </div>

      {/* Recent Tasks & Stress Points */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-500" />
          Task Avoidance & Stress Points Stream
        </h3>
        <div className="space-y-2">
          {user.tasks.map((task) => (
            <div key={task.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200">{task.title}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Category: {task.category}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {task.stressPoints} Stress Pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Logs */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-400" />
          Logged Daily Mood Checks
        </h3>
        <div className="space-y-2">
          {user.moodLogs.map((log) => (
            <div key={log.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-slate-300">Stress: {log.stressLevel} / 10 • Energy: {log.energyLevel} / 5</span>
              <span className="text-slate-400 italic">"{log.notes || 'No note'}"</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
