import { useEffect, useRef, useState } from 'react';
import symphonyOfVenus from '@/assets/symphony-of-venus.wav';

export const useBackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    audioRef.current = new Audio(symphonyOfVenus);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    audioRef.current.play().catch(err => console.log('Background music autoplay failed:', err));

    return () => {
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
