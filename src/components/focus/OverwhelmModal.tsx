'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Task } from '../../types';
import { ShieldAlert, Play, CheckCircle2, Sparkles, X, Flame, Heart, RefreshCw } from 'lucide-react';

interface OverwhelmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OverwhelmModal: React.FC<OverwhelmModalProps> = ({ isOpen, onClose }) => {
  const { tasks, moveTask } = useApp();

  // Find the easiest/lowest friction pending task to start with
  const pendingTasks = tasks.filter(t => t.status !== 'COMPLETED');
  const easiestTask = pendingTasks.length > 0 
    ? [...pendingTasks].sort((a, b) => a.stressPoints - b.stressPoints)[0]
    : null;

  const [selectedTask, setSelectedTask] = useState<Task | null>(easiestTask);
  const [secondsRemaining, setSecondsRemaining] = useState(120); // 2-minute starter timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (easiestTask && !selectedTask) {
      setSelectedTask(easiestTask);
    }
  }, [easiestTask, selectedTask]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  if (!isOpen) return null;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handleCompleteTask = () => {
    if (selectedTask) {
      moveTask(selectedTask.id, 'COMPLETED');
      setIsCompleted(true);
      setIsTimerRunning(false);
    }
  };

  const handleShuffle = () => {
    if (pendingTasks.length > 1) {
      const randomIndex = Math.floor(Math.random() * pendingTasks.length);
      setSelectedTask(pendingTasks[randomIndex]);
      setSecondsRemaining(120);
      setIsTimerRunning(false);
      setIsCompleted(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-zen-surface-light dark:bg-zen-surface-dark border border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100 flex items-center gap-2">
              Overwhelm Protocol
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30">
                2-Min Reset
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Close all tabs. Forget the full list. Just do 120 seconds of setup.
            </p>
          </div>
        </div>

        {isCompleted ? (
          <div className="p-8 text-center space-y-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/30">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-100">Executive Paralysis Broken! ✨</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              You took the first action. Dopamine released! Take a deep breath and give yourself credit.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow"
            >
              Return to Calm Workspace
            </button>
          </div>
        ) : selectedTask ? (
          <div className="space-y-6">
            
            {/* Single Isolated Task Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border-2 border-teal-500/50 shadow-xl space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {selectedTask.category}
                </span>
                <span className="flex items-center space-x-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{selectedTask.stressPoints} Stress Pts</span>
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-100 leading-snug">
                {selectedTask.title}
              </h4>
              {selectedTask.description && (
                <p className="text-xs text-slate-400">
                  {selectedTask.description}
                </p>
              )}
            </div>

            {/* 2-Minute Starter Timer Box */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-zen-border-dark flex flex-col items-center justify-center space-y-3 text-center">
              <div className="text-4xl font-black text-teal-400 font-mono tracking-widest">
                {formatSeconds(secondsRemaining)}
              </div>
              <p className="text-xs text-slate-400">
                {isTimerRunning 
                  ? 'Focus on starting the first action. You do NOT have to finish!'
                  : 'Ready? Press Start for a low-pressure 2-minute push.'}
              </p>

              <div className="flex items-center space-x-3 w-full pt-2">
                {!isTimerRunning ? (
                  <button
                    onClick={handleStartTimer}
                    className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start 2-Minute Push</span>
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteTask}
                    className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Done! Mark Completed</span>
                  </button>
                )}

                <button
                  onClick={handleShuffle}
                  className="px-3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center justify-center transition-colors"
                  title="Pick a different task"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-xs text-slate-400">All tasks are currently completed! Great job!</p>
          </div>
        )}

      </div>
    </div>
  );
};
