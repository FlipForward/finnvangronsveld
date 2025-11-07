import { useEffect, useRef, useState } from 'react';
import symphonyOfVenus from '@/assets/symphony-of-venus.wav';

export const useBackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.3);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(symphonyOfVenus);
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (isStarted && audioRef.current) {
      audioRef.current.play().catch(err => console.log('Background music autoplay failed:', err));
      
      // Fade in over 3 seconds
      let currentVolume = 0;
      fadeIntervalRef.current = setInterval(() => {
        if (audioRef.current && currentVolume < volume) {
          currentVolume = Math.min(currentVolume + 0.005, volume);
          audioRef.current.volume = currentVolume;
        } else if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
      }, 30);
    }
  }, [isStarted, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const startMusic = () => setIsStarted(true);

  return { volume, setVolume, startMusic };
};
