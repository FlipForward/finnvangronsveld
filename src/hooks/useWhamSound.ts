import { useRef, useEffect } from 'react';
import whamSound from '@/assets/wham-sound.wav';

export const useWhamSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(whamSound);
    audioRef.current.preload = 'auto';
  }, []);

  const playWhamSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  return { playWhamSound };
};
