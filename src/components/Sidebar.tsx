import React from 'react';
import { Home, Search, Library, BookOpen, Plus, Heart, Download, Moon } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  playlists: string[];
  onCreatePlaylist: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  playlists, 
  onCreatePlaylist 
}) => {
  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
    { id: 'surahs', label: 'All Surahs', icon: BookOpen },
    { id: 'reciters', label: 'Reciters', icon: Moon },
  ];

  return (
    <div className="w-64 bg-black/40 backdrop-blur-sm p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
          <Moon className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold">Meda-Coranify</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Playlists */}
        <div className="mt-8 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-300">Playlists</h3>
            <button 
              onClick={onCreatePlaylist}
              className="text-gray-400 hover:text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveSection('favorites')}
                className={`text-sm transition-colors ${
                  activeSection === 'favorites' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Heart className="w-4 h-4 inline mr-2" />
                My Favorites
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('downloaded')}
                className={`text-sm transition-colors ${
                  activeSection === 'downloaded' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Download className="w-4 h-4 inline mr-2" />
                Downloaded
              </button>
            </li>
            {playlists.map((playlist, index) => (
              <li key={index}>
                <button className="text-sm text-gray-300 hover:text-white">
                  {playlist}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;