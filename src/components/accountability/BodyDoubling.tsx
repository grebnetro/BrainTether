'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Play, 
  Square, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';
import { audioEngine, AmbientSoundPreset } from '../../lib/audioEngine';

export const BodyDoubling: React.FC = () => {
  const { 
    bodyDoublingSession, 
    startBodyDoubling, 
    endBodyDoubling, 
    partners, 
    tasks 
  } = useApp();

  const [selectedTask, setSelectedTask] = useState('');
  const [activeSound, setActiveSound] = useState<'rain' | 'brown' | 'ocean' | 'none'>('none');
  const [volume, setVolume] = useState(0.4);
  const [reactionSent, setReactionSent] = useState(false);
  const [myReaction, setMyReaction] = useState('');

  // Audio Synth Controls
  const toggleSound = (soundType: 'rain' | 'brown' | 'ocean') => {
    if (activeSound === soundType) {
      audioEngine.stop();
      setActiveSound('none');
    } else {
      let preset: AmbientSoundPreset = 'RAIN';
      if (soundType === 'brown') preset = 'BROWN_NOISE';
      if (soundType === 'ocean') preset = 'OCEAN_WAVES';

      audioEngine.play(preset, volume);
      setActiveSound(soundType);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioEngine.setVolume(newVol);
  };

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTask) {
      startBodyDoubling(selectedTask);
    }
  };

  const handleSendReaction = (emoji: string) => {
    setMyReaction(emoji);
    setReactionSent(true);
    setTimeout(() => setReactionSent(false), 3000);
  };

  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark shadow-2xl relative overflow-hidden space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
                Virtual Body Doubling
                <span className="text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Parallel Focus
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Work side by side with focus partners to maintain flow and overcome executive procrastination.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/20">
            <Sparkles className="w-4 h-4" />
            <span>Supportive Accountability</span>
          </div>
        </div>
      </div>

      {/* Main Focus Room / Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Focus Room Status */}
        <div className="md:col-span-2 p-6 rounded-3xl bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" />
              Focus Room Status
            </h3>
            {bodyDoublingSession.status === 'ACTIVE' && (
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>Session Live</span>
              </span>
            )}
          </div>

          {bodyDoublingSession.status === 'ACTIVE' ? (
            <div className="space-y-6">
              {/* Parallel Partners Video / Avatar Cards */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Host (You) */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/40 text-center space-y-3 relative overflow-hidden">
                  <div className="w-16 h-16 mx-auto rounded-full border-2 border-teal-400 p-0.5 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                      alt="You"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-100">Alex Morgan (You)</h4>
                    <p className="text-[10px] text-teal-400 font-semibold truncate mt-0.5">
                      {bodyDoublingSession.myTaskSummary || 'Active Deep Work'}
                    </p>
                  </div>
                </div>

                {/* Focus Partner */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-3 relative overflow-hidden">
                  <div className="w-16 h-16 mx-auto rounded-full border-2 border-emerald-400 p-0.5 overflow-hidden">
                    <img
                      src={bodyDoublingSession.partnerAvatar}
                      alt={bodyDoublingSession.partnerName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-100">{bodyDoublingSession.partnerName}</h4>
                    <p className="text-[10px] text-emerald-400 font-semibold truncate mt-0.5">
                      Parallel Focus Session
                    </p>
                  </div>
                </div>

              </div>

              {/* Reactions Bar */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-zen-border-dark flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Send Supportive Reaction:</span>
                <div className="flex items-center space-x-2">
                  {['👏', '🔥', '💪', '🧠', '☕'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleSendReaction(emoji)}
                      className="p-2 text-base rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-125 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {reactionSent && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs text-center font-bold animate-in fade-in">
                  Sent {myReaction} support ping to {bodyDoublingSession.partnerName}!
                </div>
              )}

              {/* End Session Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={endBodyDoubling}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-all active:scale-95"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>End Body Doubling Session</span>
                </button>
              </div>

            </div>
          ) : (
            /* Start Session Form */
            <form onSubmit={handleStartSession} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Select Task for Body Doubling Focus
                </label>
                <select
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-zen-border-light dark:border-zen-border-dark text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="">-- Choose a task to focus on --</option>
                  {tasks.filter(t => t.status !== 'COMPLETED').map(t => (
                    <option key={t.id} value={t.title}>
                      [{t.stressPoints} Pts] {t.title} ({t.category})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Parallel Body Doubling Room</span>
              </button>
            </form>
          )}

        </div>

        {/* Ambient Web Audio Focus Generator */}
        <div className="p-6 rounded-3xl bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark shadow-xl space-y-6">
          <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-teal-500" />
            Ambient Focus Synthesizer
          </h3>

          <div className="space-y-3">
            {[
              { id: 'rain', label: 'Soft Rain', desc: 'Gentle raindrops for steady focus' },
              { id: 'brown', label: 'Brown Focus Noise', desc: 'Deeper frequency for ADHD calm' },
              { id: 'ocean', label: 'Ocean Waves', desc: 'Rhythmic water tide flow' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => toggleSound(s.id as any)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  activeSound === s.id
                    ? 'bg-teal-500/10 text-teal-600 dark:text-teal-300 border-teal-500/40 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-zen-border-light dark:border-zen-border-dark hover:border-teal-500/30'
                }`}
              >
                <div>
                  <div className="font-bold text-xs">{s.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{s.desc}</div>
                </div>
                {activeSound === s.id ? (
                  <span className="w-3 h-3 rounded-full bg-teal-400 animate-pulse"></span>
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
              </button>
            ))}
          </div>

          {/* Volume Control */}
          <div className="space-y-1.5 pt-2 border-t border-zen-border-light dark:border-zen-border-dark">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
              <span>Volume</span>
              <span className="font-mono text-teal-400">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
          </div>

        </div>

      </div>

      {/* Connected Partners Directory */}
      <div className="p-6 rounded-2xl bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark">
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
                  <span className="text-[10px] text-slate-400">{p.currentTask || p.bio || 'Focus Partner'}</span>
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
  );
};
