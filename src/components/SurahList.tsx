import React from 'react';
import { Play, Heart, Plus } from 'lucide-react';
import { Surah } from '../types';

interface SurahListProps {
  surahs: Surah[];
  onPlaySurah: (surah: Surah) => void;
  onToggleFavorite: (surahId: number) => void;
  onAddToPlaylist: (surahId: number) => void;
  favorites: number[];
  currentSurah: Surah | null;
  isPlaying: boolean;
}

const SurahList: React.FC<SurahListProps> = ({
  surahs,
  onPlaySurah,
  onToggleFavorite,
  onAddToPlaylist,
  favorites,
  currentSurah,
  isPlaying
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <div className="space-y-2">
        {surahs.map((surah, index) => (
          <div
            key={surah.id}
            className={`flex items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer group ${
              currentSurah?.id === surah.id ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center text-gray-400 group-hover:text-white">
              <span className="text-sm">{surah.number}</span>
            </div>
            <div className="flex-1" onClick={() => onPlaySurah(surah)}>
              <h4 className="font-medium">{surah.name}</h4>
              <p className="text-sm text-gray-300">{surah.arabicName}</p>
              <p className="text-xs text-gray-400">{surah.verses} verses • {surah.reciter}</p>
            </div>
            <div className="text-sm text-gray-400 mr-4">
              {surah.duration}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(surah.id)}
                className={`transition-colors ${
                  favorites.includes(surah.id) 
                    ? 'text-emerald-400' 
                    : 'opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(surah.id) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => onAddToPlaylist(surah.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => onPlaySurah(surah)}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-500 rounded-full p-1 hover:bg-emerald-600"
              >
                <Play className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahList;