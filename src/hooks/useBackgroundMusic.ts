import { useEffect, useRef, useState } from 'react';
import symphonyOfVenus from '@/assets/symphony-of-venus.wav';

export const useBackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.3);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(symphonyOfVenus);
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

    // Start music after enter screen with fade in
    const delay = 800;

    const timer = setTimeout(() => {
      if (audioRef.current) {
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
    }, delay);

    return () => {
      clearTimeout(timer);
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return { volume, setVolume };
};
