import React from 'react';
import { Play } from 'lucide-react';
import { Reciter } from '../types';

interface ReciterCardProps {
  reciter: Reciter;
  onSelectReciter: (reciter: Reciter) => void;
}

const ReciterCard: React.FC<ReciterCardProps> = ({ reciter, onSelectReciter }) => {
  return (
    <div
      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer group"
      onClick={() => onSelectReciter(reciter)}
    >
      <div className="relative mb-4">
        <img 
          src={reciter.image} 
          alt={reciter.name} 
          className="w-full h-32 object-cover rounded-lg" 
        />
        <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-500 rounded-full p-2 hover:bg-emerald-600">
          <Play className="w-4 h-4" />
        </button>
      </div>
      <h4 className="font-medium text-sm mb-1">{reciter.name}</h4>
      <p className="text-xs text-gray-300 mb-1">{reciter.arabicName}</p>
      <p className="text-xs text-gray-400 mb-1">{reciter.description}</p>
      <p className="text-xs text-gray-400">{reciter.followers} followers</p>
    </div>
  );
};

export default ReciterCard;