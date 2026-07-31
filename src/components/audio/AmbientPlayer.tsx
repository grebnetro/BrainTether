'use client';

import React, { useState, useEffect } from 'react';
import { audioEngine, AmbientSoundPreset } from '../../lib/audioEngine';
import { Volume2, VolumeX, Play, Pause, CloudRain, Waves, Radio, ChevronDown, ChevronUp } from 'lucide-react';

export const AmbientPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [preset, setPreset] = useState<AmbientSoundPreset>('RAIN');
  const [volume, setVolume] = useState(0.3);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const presets: { id: AmbientSoundPreset; label: string; icon: React.ElementType }[] = [
    { id: 'RAIN', label: 'Soft Rain', icon: CloudRain },
    { id: 'BROWN_NOISE', label: 'Deep Focus', icon: Radio },
    { id: 'OCEAN_WAVES', label: 'Gentle Waves', icon: Waves },
  ];

  const currentPresetLabel = presets.find(p => p.id === preset)?.label || 'Soft Rain';

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      audioEngine.play(preset, volume);
      setIsPlaying(true);
    }
  };

  const handleSelectPreset = (newPreset: AmbientSoundPreset) => {
    setPreset(newPreset);
    if (isPlaying) {
      audioEngine.play(newPreset, volume);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioEngine.setVolume(newVol);
  };

  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  return (
    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-teal-500/30 text-white shadow-lg transition-all duration-300">
      
      {/* Header Bar */}
      <div 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center space-x-2">
          <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-teal-400 animate-pulse' : 'text-slate-400'}`} />
          <span className="text-xs font-bold text-slate-200">Ambient Soundscape Synth</span>
          {isPlaying && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30">
              {currentPresetLabel}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              isPlaying
                ? 'bg-teal-500 text-slate-900 shadow-md shadow-teal-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
            title={isCollapsed ? 'Expand Soundscape Controls' : 'Collapse Soundscape Controls'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Body (Presets & Volume) */}
      {!isCollapsed && (
        <div className="space-y-3 pt-3 mt-2 border-t border-slate-800/80 animate-in fade-in duration-200">
          {/* Preset Selectors */}
          <div className="grid grid-cols-3 gap-2">
            {presets.map((p) => {
              const Icon = p.icon;
              const isSelected = preset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p.id)}
                  className={`p-2 rounded-xl text-left border flex items-center space-x-1.5 transition-all ${
                    isSelected
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold'
                      : 'bg-slate-800/60 text-slate-400 border-transparent hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[11px] truncate">{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Volume Slider */}
          <div className="flex items-center space-x-3 pt-1">
            <VolumeX className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="flex-1 accent-teal-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <Volume2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>
        </div>
      )}
    </div>
  );
};
