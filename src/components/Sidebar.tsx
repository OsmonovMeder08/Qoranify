import React, { useState } from 'react';
import {
  Home,
  Search,
  Library,
  BookOpen,
  Plus,
  Heart,
  Download,
  Moon,
  Menu,
  X
} from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
    { id: 'surahs', label: 'All Surahs', icon: BookOpen },
    { id: 'reciters', label: 'Reciters', icon: Moon },
  ];

  const renderSidebarContent = (isMobile: boolean = false) => (
    <div className={`bg-gradient-to-b from-gray-950 to-black flex flex-col h-full ${isMobile ? 'w-full' : 'w-full max-w-xs'} shadow-2xl border-r border-white/10`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <Moon className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent hidden md:block">
            Qoranify
          </h1>
        </div>
        <button onClick={() => setMobileOpen(false)} className="md:hidden text-gray-400 hover:text-white transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-emerald-400' : ''}`} />
                <span className="text-sm font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Playlists */}
        <div className="mt-8 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Playlists</h3>
            <button
              onClick={onCreatePlaylist}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-emerald-400 transition-all group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => {
                  setActiveSection('favorites');
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  activeSection === 'favorites'
                    ? 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Heart className="w-4 h-4" />
                My Favorites
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection('downloaded');
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  activeSection === 'downloaded'
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Download className="w-4 h-4" />
                Downloaded
              </button>
            </li>
            {playlists.map((playlist, index) => (
              <li key={index}>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                  {playlist}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-3 text-center backdrop-blur-sm">
          <p className="text-xs font-medium text-white">Listen to Quran</p>
          <p className="text-[10px] text-gray-400">World-renowned Qaris</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        {renderSidebarContent()}
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-xl text-white p-3 rounded-2xl shadow-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden flex animate-fadeIn">
          <div className="w-full max-w-xs">
            {renderSidebarContent(true)}
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Sidebar;