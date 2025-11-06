import { useRef } from 'react';

export const useWhamSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playWhamSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    
    // Resume audio context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    
    // Create multiple oscillators for a richer "WHAM" effect
    // Deep bass hit
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = 'sine';
    bass.frequency.setValueAtTime(80, now);
    bass.frequency.exponentialRampToValueAtTime(40, now + 0.1);
    bassGain.gain.setValueAtTime(0.8, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    bass.start(now);
    bass.stop(now + 0.3);

    // Mid-range punch
    const mid = ctx.createOscillator();
    const midGain = ctx.createGain();
    mid.type = 'triangle';
    mid.frequency.setValueAtTime(300, now);
    mid.frequency.exponentialRampToValueAtTime(150, now + 0.08);
    midGain.gain.setValueAtTime(0.4, now);
    midGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    mid.connect(midGain);
    midGain.connect(ctx.destination);
    mid.start(now);
    mid.stop(now + 0.15);

    // High-frequency "zap"
    const high = ctx.createOscillator();
    const highGain = ctx.createGain();
    high.type = 'square';
    high.frequency.setValueAtTime(1200, now);
    high.frequency.exponentialRampToValueAtTime(600, now + 0.05);
    highGain.gain.setValueAtTime(0.2, now);
    highGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    high.connect(highGain);
    highGain.connect(ctx.destination);
    high.start(now);
    high.stop(now + 0.1);

    // White noise burst for impact
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    noise.buffer = buffer;
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
  };

  return { playWhamSound };
};
