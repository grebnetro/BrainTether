'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AmbientPlayer } from '../audio/AmbientPlayer';
import { Users, Play, Pause, Square, MessageCircle, Heart, ThumbsUp, Sparkles, Volume2, ShieldCheck } from 'lucide-react';

export const BodyDoubling: React.FC = () => {
  const { bodyDoublingSession, startBodyDoubling, endBodyDoubling, partners } = useApp();
  const [taskSummary, setTaskSummary] = useState('');
  const [sessionDuration, setSessionDuration] = useState(25);

  // Timer simulation state
  const [secondsLeft, setSecondsLeft] = useState(15 * 60); // 15 mins default remaining
  const [isTimerRunning, setIsTimerRunning] = useState(bodyDoublingSession.status === 'ACTIVE');
  const [reactions, setReactions] = useState<string[]>(['💪 You got this!', '🔥 High focus zone']);

  useEffect(() => {
    setIsTimerRunning(bodyDoublingSession.status === 'ACTIVE');
  }, [bodyDoublingSession.status]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskSummary.trim()) return;
    startBodyDoubling(taskSummary.trim(), sessionDuration);
    setSecondsLeft(sessionDuration * 60);
  };

  const handleSendReaction = (emojiNote: string) => {
    setReactions(prev => [emojiNote, ...prev]);
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      
      {/* Top Hero Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 border border-teal-500/30 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 text-xs font-bold">
            <Users className="w-3.5 h-3.5" />
            <span>Parallel Focus Mode</span>
          </div>
          <h3 className="text-xl font-bold">Virtual Body Doubling Session</h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Body doubling creates gentle social presence and accountability. Work alongside a partner on completely unrelated tasks to stay anchored and bypass executive inertia.
          </p>
        </div>

        {bodyDoublingSession.status === 'ACTIVE' && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/40 flex items-center space-x-4 shrink-0">
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400 font-mono">
                {formatTime(secondsLeft)}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Focus Window Remaining
              </div>
            </div>
            <button
              onClick={endBodyDoubling}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition-all shadow"
            >
              Complete Session
            </button>
          </div>
        )}
      </div>

      {/* Active Session Display OR Start Session Form */}
      {bodyDoublingSession.status === 'ACTIVE' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Focus Window */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-emerald-500/40 shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zen-border-light dark:border-zen-border-dark">
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                Live Parallel Focus Active
              </span>
              <span className="text-xs text-slate-400 font-mono">Session ID: #BD-9021</span>
            </div>

            {/* Two Connected Users */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* You */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-teal-500/30 space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={bodyDoublingSession.hostAvatar}
                    alt={bodyDoublingSession.hostName}
                    className="w-10 h-10 rounded-full border-2 border-teal-500 object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                      {bodyDoublingSession.hostName}
                    </h5>
                    <span className="text-[10px] text-teal-400 font-semibold uppercase">Host</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Committed Task:</span>
                  <p className="font-medium mt-0.5">{bodyDoublingSession.myTaskSummary}</p>
                </div>
              </div>

              {/* Partner */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={bodyDoublingSession.partnerAvatar}
                    alt={bodyDoublingSession.partnerName}
                    className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                      {bodyDoublingSession.partnerName}
                    </h5>
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase">Partner Connected</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Committed Task:</span>
                  <p className="font-medium mt-0.5">{bodyDoublingSession.partnerTaskSummary}</p>
                </div>
              </div>

            </div>

            {/* Embedded Native Web Audio Ambient Sound Player */}
            <AmbientPlayer />

            {/* Quick Reactions */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/40 border border-zen-border-light dark:border-zen-border-dark space-y-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Quick reaction to partner:</span>
              <div className="flex flex-wrap gap-2">
                {['💪 You got this!', '✨ Great pace', '🙌 High five', '☕ Take a sip of water'].map(note => (
                  <button
                    key={note}
                    onClick={() => handleSendReaction(note)}
                    className="px-3 py-1.5 text-xs rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-teal-500 hover:text-white transition-all text-slate-700 dark:text-slate-200 font-medium"
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reaction Stream */}
          <div className="p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-teal-400" />
                Live Encouragement Stream
              </h4>
              <div className="space-y-2">
                {reactions.map((r, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark text-xs text-slate-700 dark:text-slate-200 font-medium">
                    {r}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 text-center">
              Micro-reactions maintain connection without interrupting task flow.
            </p>
          </div>

        </div>
      ) : (
        /* Start Body Doubling Form */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark shadow-lg space-y-5">
            <div>
              <h4 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-1">
                Start a New Body Doubling Window
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select your goal task and set a focus timer window. Connected partners will be notified to join!
              </p>
            </div>

            <form onSubmit={handleStartSession} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  What specific task are you committing to?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Open tax mail / Write architectural spec..."
                  value={taskSummary}
                  onChange={(e) => setTaskSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Session Duration
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[15, 25, 45].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setSessionDuration(mins)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        sessionDuration === mins
                          ? 'bg-teal-500/20 text-teal-400 border-teal-500 font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {mins} Minutes
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
              >
                Launch Body Doubling Focus Session
              </button>
            </form>

            <AmbientPlayer />
          </div>

          {/* Connected Partners Directory */}
          <div className="p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-card-dark border border-zen-border-light dark:border-zen-border-dark">
            <h4 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-400" />
              Accountability Partners Network
            </h4>
            <div className="space-y-3">
              {partners.map(p => (
                <div key={p.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-zen-border-light dark:border-zen-border-dark flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover border border-teal-500/40" />
                    <div>
                      <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">{p.name}</h5>
                      <span className="text-[10px] text-slate-400">{p.email}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    p.status === 'IN_SESSION' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
