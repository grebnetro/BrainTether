// Native Web Audio API Synthesizer for Ambient Focus Sounds (Zero External MP3 Downloads Required)

export type AmbientSoundPreset = 'RAIN' | 'BROWN_NOISE' | 'OCEAN_WAVES';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfoNode: OscillatorNode | null = null;
  private isPlaying: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(preset: AmbientSoundPreset, volume = 0.3) {
    this.stop();
    this.init();
    if (!this.ctx || !this.gainNode) return;

    this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    const bufferSize = this.ctx.sampleRate * 2; // 2 seconds buffer
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (preset === 'BROWN_NOISE') {
        // Brown noise filter algorithm
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      } else if (preset === 'RAIN') {
        // Pink noise generator for rain
        data[i] = white * 0.4;
      } else {
        // Ocean waves base
        data[i] = white * 0.3;
      }
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    this.filterNode = this.ctx.createBiquadFilter();

    if (preset === 'RAIN') {
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(1000, this.ctx.currentTime);
    } else if (preset === 'BROWN_NOISE') {
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(400, this.ctx.currentTime);
    } else if (preset === 'OCEAN_WAVES') {
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(600, this.ctx.currentTime);

      // LFO for wave modulation
      this.lfoNode = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.lfoNode.frequency.setValueAtTime(0.15, this.ctx.currentTime); // slow wave
      lfoGain.gain.setValueAtTime(300, this.ctx.currentTime);
      this.lfoNode.connect(lfoGain);
      lfoGain.connect(this.filterNode.frequency);
      this.lfoNode.start();
    }

    noiseSource.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    noiseSource.start();

    this.noiseNode = noiseSource;
    this.isPlaying = true;
  }

  public playPreset(preset: AmbientSoundPreset, volume = 0.3) {
    this.play(preset, volume);
  }

  public setVolume(volume: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    }
  }

  public stop() {
    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioBufferSourceNode).stop();
      } catch (e) {}
      this.noiseNode.disconnect();
      this.noiseNode = null;
    }
    if (this.lfoNode) {
      try {
        this.lfoNode.stop();
      } catch (e) {}
      this.lfoNode.disconnect();
      this.lfoNode = null;
    }
    this.isPlaying = false;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const audioEngine = new AudioEngine();
