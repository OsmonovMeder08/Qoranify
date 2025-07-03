import { useState, useRef, useEffect } from 'react';
import { AudioState, Surah } from '../types';

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    currentSurah: null
  });

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const updateTime = () => {
      setAudioState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0
      }));
    };

    const handleLoadedMetadata = () => {
      setAudioState(prev => ({
        ...prev,
        duration: audio.duration || 0
      }));
    };

    const handleEnded = () => {
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
        currentTime: 0
      }));
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const playSurah = (surah: Surah) => {
    if (!audioRef.current) return;

    if (audioState.currentSurah?.id !== surah.id) {
      audioRef.current.src = surah.audioUrl;
      setAudioState(prev => ({
        ...prev,
        currentSurah: surah,
        currentTime: 0
      }));
    }

    audioRef.current.play();
    setAudioState(prev => ({ ...prev, isPlaying: true }));
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setAudioState(prev => ({ ...prev, isPlaying: false }));
  };

  const togglePlayPause = () => {
    if (audioState.isPlaying) {
      pauseAudio();
    } else if (audioState.currentSurah) {
      playSurah(audioState.currentSurah);
    }
  };

  const seekTo = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setAudioState(prev => ({ ...prev, currentTime: time }));
  };

  const setVolume = (volume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    setAudioState(prev => ({ ...prev, volume }));
  };

  return {
    audioState,
    playSurah,
    pauseAudio,
    togglePlayPause,
    seekTo,
    setVolume
  };
};