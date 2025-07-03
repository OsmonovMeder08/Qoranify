import React, { useState, useEffect } from 'react';
import { Search, Download, Plus, Play } from 'lucide-react';
import { Surah, Reciter } from './types';
import { surahs as initialSurahs } from './data/surahs';
import { reciters } from './data/reciters';
import { useAudio } from './hooks/useAudio';
import Sidebar from './components/Sidebar';
import AudioPlayer from './components/AudioPlayer';
import SurahList from './components/SurahList';
import ReciterCard from './components/ReciterCard';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [playlists, setPlaylists] = useState<string[]>(['My Favorites', 'Recently Added']);
  const [surahs, setSurahs] = useState<Surah[]>(initialSurahs);
  const [selectedReciter, setSelectedReciter] = useState<Reciter | null>(null);
  
  const { audioState, playSurah, togglePlayPause, seekTo, setVolume } = useAudio();

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (surahId: number) => {
    setFavorites(prev => 
      prev.includes(surahId) 
        ? prev.filter(id => id !== surahId)
        : [...prev, surahId]
    );
  };

  const handleCreatePlaylist = () => {
    const name = prompt('Enter playlist name:');
    if (name && name.trim()) {
      setPlaylists(prev => [...prev, name.trim()]);
    }
  };

  const handleAddToPlaylist = (surahId: number) => {
    // For now, just add to favorites
    handleToggleFavorite(surahId);
  };

  const handleSelectReciter = (reciter: Reciter) => {
    setSelectedReciter(reciter);
    setActiveSection('reciter-detail');
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.arabicName.includes(searchQuery) ||
    surah.reciter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteSurahs = surahs.filter(surah => favorites.includes(surah.id));
  const recentlyPlayed = surahs.slice(0, 4);

  const renderContent = () => {
    switch (activeSection) {
      case 'search':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Search</h2>
            <div className="mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 max-w-md">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for surahs, reciters..."
                  className="bg-transparent outline-none text-sm flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            {searchQuery && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Search Results</h3>
                <SurahList
                  surahs={filteredSurahs}
                  onPlaySurah={playSurah}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToPlaylist={handleAddToPlaylist}
                  favorites={favorites}
                  currentSurah={audioState.currentSurah}
                  isPlaying={audioState.isPlaying}
                />
              </div>
            )}
          </div>
        );

      case 'library':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recently Played</h3>
                <div className="space-y-3">
                  {recentlyPlayed.map(surah => (
                    <div key={surah.id} className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{surah.number}</span>
                      </div>
                      <div onClick={() => playSurah(surah)}>
                        <p className="font-medium text-sm">{surah.name}</p>
                        <p className="text-xs text-gray-400">{surah.arabicName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Favorite Surahs</h3>
                <div className="space-y-3">
                  {favoriteSurahs.slice(0, 5).map(surah => (
                    <div key={surah.id} className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{surah.number}</span>
                      </div>
                      <div onClick={() => playSurah(surah)}>
                        <p className="font-medium text-sm">{surah.name}</p>
                        <p className="text-xs text-gray-400">{surah.arabicName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'surahs':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Surahs</h2>
              <button 
                onClick={() => {
                  const name = prompt('Enter Surah name:');
                  const arabicName = prompt('Enter Arabic name:');
                  const audioUrl = prompt('Enter audio URL:');
                  if (name && arabicName && audioUrl) {
                    const newSurah: Surah = {
                      id: surahs.length + 1,
                      name,
                      arabicName,
                      number: surahs.length + 1,
                      verses: 0,
                      duration: '0:00',
                      audioUrl,
                      reciter: 'Custom',
                      reciterId: 0
                    };
                    setSurahs(prev => [...prev, newSurah]);
                  }
                }}
                className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Surah
              </button>
            </div>
            <SurahList
              surahs={surahs}
              onPlaySurah={playSurah}
              onToggleFavorite={handleToggleFavorite}
              onAddToPlaylist={handleAddToPlaylist}
              favorites={favorites}
              currentSurah={audioState.currentSurah}
              isPlaying={audioState.isPlaying}
            />
          </div>
        );

      case 'reciters':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Featured Reciters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {reciters.map((reciter) => (
                <ReciterCard
                  key={reciter.id}
                  reciter={reciter}
                  onSelectReciter={handleSelectReciter}
                />
              ))}
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
            {favoriteSurahs.length > 0 ? (
              <SurahList
                surahs={favoriteSurahs}
                onPlaySurah={playSurah}
                onToggleFavorite={handleToggleFavorite}
                onAddToPlaylist={handleAddToPlaylist}
                favorites={favorites}
                currentSurah={audioState.currentSurah}
                isPlaying={audioState.isPlaying}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No favorite surahs yet. Start adding some!</p>
              </div>
            )}
          </div>
        );

      case 'reciter-detail':
        if (!selectedReciter) return null;
        return (
          <div>
            <div className="flex items-center gap-6 mb-8">
              <img 
                src={selectedReciter.image} 
                alt={selectedReciter.name} 
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedReciter.name}</h2>
                <p className="text-xl text-gray-300 mb-2">{selectedReciter.arabicName}</p>
                <p className="text-gray-400 mb-2">{selectedReciter.description}</p>
                <p className="text-gray-400">{selectedReciter.followers} followers • {selectedReciter.country}</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">Surahs by {selectedReciter.name}</h3>
            <SurahList
              surahs={surahs.filter(s => s.reciterId === selectedReciter.id)}
              onPlaySurah={playSurah}
              onToggleFavorite={handleToggleFavorite}
              onAddToPlaylist={handleAddToPlaylist}
              favorites={favorites}
              currentSurah={audioState.currentSurah}
              isPlaying={audioState.isPlaying}
            />
          </div>
        );

      default: // home
        return (
          <div>
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-2">السلام عليكم</h2>
              <p className="text-gray-300">Listen to the beautiful recitation of the Holy Quran</p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Recently Played</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentlyPlayed.map((surah) => (
                  <div
                    key={surah.id}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{surah.number}</span>
                      </div>
                      <div className="flex-1" onClick={() => playSurah(surah)}>
                        <h4 className="font-medium">{surah.name}</h4>
                        <p className="text-sm text-gray-300">{surah.arabicName}</p>
                        <p className="text-xs text-gray-400">{surah.reciter}</p>
                      </div>
                      <button 
                        onClick={() => playSurah(surah)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-500 rounded-full p-2 hover:bg-emerald-600"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Featured Reciters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {reciters.slice(0, 5).map((reciter) => (
                  <ReciterCard
                    key={reciter.id}
                    reciter={reciter}
                    onSelectReciter={handleSelectReciter}
                  />
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">Popular Surahs</h3>
              <SurahList
                surahs={surahs.slice(0, 6)}
                onPlaySurah={playSurah}
                onToggleFavorite={handleToggleFavorite}
                onAddToPlaylist={handleAddToPlaylist}
                favorites={favorites}
                currentSurah={audioState.currentSurah}
                isPlaying={audioState.isPlaying}
              />
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="flex h-screen">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          playlists={playlists}
          onCreatePlaylist={handleCreatePlaylist}
        />

        <div className="flex-1 flex flex-col">
          <header className="bg-gradient-to-r from-black/40 to-transparent backdrop-blur-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 max-w-md">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for reciters, surahs..."
                  className="bg-transparent outline-none text-sm flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full"></div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 pb-32">
            {renderContent()}
          </main>
        </div>
      </div>

      <AudioPlayer
        audioState={audioState}
        onTogglePlayPause={togglePlayPause}
        onSeek={seekTo}
        onVolumeChange={setVolume}
        onToggleFavorite={() => audioState.currentSurah && handleToggleFavorite(audioState.currentSurah.id)}
        isFavorite={audioState.currentSurah ? favorites.includes(audioState.currentSurah.id) : false}
      />
    </div>
  );
}

export default App;