import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, Shuffle, Repeat, Volume2 } from 'lucide-react';
import { AudioState, Surah } from '../types';

interface AudioPlayerProps {
  audioState: AudioState;
  onTogglePlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioState,
  onTogglePlayPause,
  onSeek,
  onVolumeChange,
  onToggleFavorite,
  isFavorite
}) => {
  const { isPlaying, currentTime, duration, volume, currentSurah } = audioState;

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent * duration);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onVolumeChange(Math.max(0, Math.min(1, percent)));
  };

  if (!currentSurah) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-slate-800 backdrop-blur-sm border-t border-white/10 p-4">
      <div className="flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">{currentSurah.number}</span>
          </div>
          <div>
            <h4 className="font-medium text-sm">{currentSurah.name}</h4>
            <p className="text-xs text-gray-300">{currentSurah.arabicName}</p>
            <p className="text-xs text-gray-400">{currentSurah.reciter}</p>
          </div>
          <button 
            onClick={onToggleFavorite}
            className={`transition-colors ${
              isFavorite ? 'text-emerald-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-4 flex-1 justify-center">
          <button className="text-gray-400 hover:text-white">
            <Shuffle className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={onTogglePlayPause}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button className="text-gray-400 hover:text-white">
            <SkipForward className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="w-4 h-4" />
          <div 
            className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer"
            onClick={handleVolumeClick}
          >
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${volume * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;