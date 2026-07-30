'use client';

import React, { useState } from 'react';
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
    tasks,
    userProfile
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

      audioEngine.playPreset(preset, volume);
      setActiveSound(soundType);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioEngine.setVolume(newVol);
  };

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    const taskTitle = selectedTask || 'Deep Focus Working Session';
    startBodyDoubling(taskTitle, 25);
  };

  const handleSendReaction = (emoji: string) => {
    setMyReaction(emoji);
    setReactionSent(true);
    setTimeout(() => setReactionSent(false), 2500);
  };

  const isSessionActive = bodyDoublingSession.active || bodyDoublingSession.status === 'ACTIVE';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-zen-surface-dark to-slate-900 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Virtual Co-Working & Soundscapes</span>
          </span>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">
            ADHD Body Doubling & Focus Room
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Work alongside virtual focus partners in quiet parallel work sessions. Reduces isolation, calms executive dysfunction, and keeps you anchored.
          </p>
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
            {isSessionActive && (
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>Session Live</span>
              </span>
            )}
          </div>

          {isSessionActive ? (
            <div className="space-y-6">
              {/* Parallel Partners Video / Avatar Cards */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Host (You) */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/40 text-center space-y-3 relative overflow-hidden">
                  <div className="w-16 h-16 mx-auto rounded-full border-2 border-teal-400 p-0.5 overflow-hidden">
                    <img
                      src={userProfile.avatarUrl || 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Level10-Joy'}
                      alt={userProfile.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-200">{userProfile.name} (You)</h4>
                    <p className="text-[10px] text-teal-400 font-mono mt-0.5">
                      {bodyDoublingSession.taskSummary || 'Deep Focus'}
                    </p>
                  </div>

                  {reactionSent && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-teal-500 text-white text-xs font-extrabold animate-bounce">
                      {myReaction}
                    </div>
                  )}
                </div>

                {/* Partner */}
                {bodyDoublingSession.partner && (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-3 relative overflow-hidden">
                    <div className="w-16 h-16 mx-auto rounded-full border-2 border-emerald-400 p-0.5 overflow-hidden">
                      <img
                        src={bodyDoublingSession.partner.avatarUrl}
                        alt={bodyDoublingSession.partner.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-200">{bodyDoublingSession.partner.name}</h4>
                      <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
                        {bodyDoublingSession.partner.activeTask || 'Coding Sprint'}
                      </p>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">
                      Co-Working Live
                    </span>
                  </div>
                )}

              </div>

              {/* Silent Cheer & Reactions */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-zen-border-dark space-y-3">
                <span className="text-xs font-bold text-slate-300 block text-center">
                  Send Silent Co-Working Cheer / High Five
                </span>
                <div className="flex justify-center space-x-3">
                  {['👏', '🔥', '💪', '☕', '🧠', '✨'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleSendReaction(emoji)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-base active:scale-95 transition-all shadow-sm"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* End Session Button */}
              <button
                onClick={() => {
                  endBodyDoubling();
                  audioEngine.stop();
                  setActiveSound('none');
                }}
                className="w-full py-3 px-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-xs hover:bg-rose-500/30 transition-all flex items-center justify-center space-x-2"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>End Body Doubling Session</span>
              </button>

            </div>
          ) : (
            /* Start Session Form */
            <form onSubmit={handleStartSession} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Select Active Focus Task
                </label>
                <select
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-zen-border-dark text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="">Select a task to anchor on...</option>
                  {tasks
                    .filter((t) => t.status !== 'COMPLETED')
                    .map((t) => (
                      <option key={t.id} value={t.title}>
                        [{t.stressPoints} pts] {t.title}
                      </option>
                    ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Join Virtual Focus Room (25 Mins)</span>
              </button>
            </form>
          )}

        </div>

        {/* Ambient Web Audio Focus Soundscapes */}
        <div className="p-6 rounded-3xl bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark shadow-xl space-y-6">
          <div>
            <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-teal-400" />
              Focus Soundscapes
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Built-in procedural audio generator for masking background noise.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'rain', label: '🌧️ Soft Rain', desc: 'Calming pink noise drops' },
              { id: 'brown', label: '🌊 Brown Focus Noise', desc: 'Deep rumbling focus filter' },
              { id: 'ocean', label: '⛵ Ocean Waves', desc: 'Low frequency rhythmic tide' },
            ].map((sound) => {
              const isActive = activeSound === sound.id;
              return (
                <button
                  key={sound.id}
                  type="button"
                  onClick={() => toggleSound(sound.id as 'rain' | 'brown' | 'ocean')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-teal-500/20 border-teal-500/50 shadow-md shadow-teal-500/10'
                      : 'bg-slate-900/60 border-zen-border-dark hover:border-slate-700'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs text-slate-200 block">{sound.label}</span>
                    <span className="text-[10px] text-slate-400 block">{sound.desc}</span>
                  </div>
                  {isActive ? (
                    <span className="p-2 rounded-xl bg-teal-500 text-white animate-pulse">
                      <Volume2 className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="p-2 rounded-xl bg-slate-800 text-slate-500">
                      <VolumeX className="w-4 h-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          {activeSound !== 'none' && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-zen-border-dark space-y-2 animate-in fade-in">
              <div className="flex justify-between items-center text-xs text-slate-300 font-semibold">
                <span>Soundscape Volume</span>
                <span className="font-mono text-teal-400">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>
          )}

        </div>

      </div>

      {/* Active Co-Working Community Roster */}
      <div className="p-6 rounded-3xl bg-zen-surface-light dark:bg-zen-surface-dark border border-zen-border-light dark:border-zen-border-dark shadow-xl space-y-4">
        <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Available Virtual Co-Working Partners
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="p-4 rounded-2xl bg-slate-900 border border-zen-border-dark flex items-center space-x-4"
            >
              <div className="relative">
                <img
                  src={partner.avatarUrl}
                  alt={partner.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-700"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                    partner.status === 'IN_SESSION'
                      ? 'bg-emerald-500'
                      : partner.status === 'ONLINE'
                      ? 'bg-teal-400'
                      : 'bg-slate-500'
                  }`}
                />
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-200">{partner.name}</h4>
                <p className="text-[10px] text-slate-400">{partner.role}</p>
                <span className="inline-block mt-1 text-[9px] font-mono text-teal-400">
                  {partner.activeTask ? `Anchored: ${partner.activeTask}` : 'Ready to co-work'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
