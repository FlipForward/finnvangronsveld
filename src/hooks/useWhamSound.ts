import { useRef, useEffect } from 'react';
import whamSound from '@/assets/wham-sound.wav';

export const useWhamSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(whamSound);
    audioRef.current.preload = 'auto';
    audioRef.current.volume = 0.15; // Lower volume for hover sound
  }, []);

  const playWhamSound = () => {
    if (audioRef.current) {
      // Clear any existing fade
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.15;
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  const stopWhamSound = () => {
    if (audioRef.current && fadeIntervalRef.current === null) {
      // Fade out over 300ms
      let currentVolume = audioRef.current.volume;
      fadeIntervalRef.current = setInterval(() => {
        if (audioRef.current && currentVolume > 0) {
          currentVolume = Math.max(currentVolume - 0.02, 0);
          audioRef.current.volume = currentVolume;
        } else {
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.15; // Reset for next play
          }
        }
      }, 15);
    }
  };

  return { playWhamSound, stopWhamSound };
};
