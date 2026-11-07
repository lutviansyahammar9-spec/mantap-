import React, { useState } from 'react';
import { ViewState } from '../types';
import {
  Sun,
  Moon,
  Gamepad2,
  Home,
  Receipt,
  Menu,
  X,
  ChevronDown,
  Flame,
  Sparkles,
  Swords,
  Trophy,
  Zap,
  Crosshair,
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  orderCount: number;
  onOpenHistory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  isDark,
  onToggleTheme,
  orderCount,
  onOpenHistory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gamesDropdownOpen, setGamesDropdownOpen] = useState(false);

  const handleNav = (view: ViewState) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setGamesDropdownOpen(false);
  };

  const navGames = [
    { id: 'freefire' as ViewState, name: 'Free Fire', tag: 'FF', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'roblox' as ViewState, name: 'Roblox', tag: 'RBX', icon: <Sparkles className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'mobilelegend' as ViewState, name: 'Mobile Legends', tag: 'MLBB', icon: <Swords className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'fcmobile' as ViewState, name: 'FC Mobile', tag: 'FCM', icon: <Trophy className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'pokemonunite' as ViewState, name: 'Pokemon Unite', tag: 'UNITE', icon: <Zap className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'bloodstrike' as ViewState, name: 'Blood Strike', tag: 'BS', icon: <Crosshair className="w-3.5 h-3.5 text-red-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl border-b transition-colors duration-300 bg-slate-950/85 border-slate-800/80 text-slate-100 dark:bg-slate-950/85 dark:border-slate-800/80 light:bg-white/95 light:border-slate-200 light:text-slate-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 group focus:outline-none cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-600/25 group-hover:scale-105 transition-transform duration-200 shrink-0">
                <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-black text-lg sm:text-xl tracking-wider text-white dark:text-white light:text-slate-900">
                    VRENA
                  </span>
                  <span className="text-[10px] font-black tracking-widest uppercase text-cyan-400 px-1 py-0.2 rounded bg-cyan-500/10 border border-cyan-400/20">
                    STORE
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-tight mt-0.5">
                  Top Up Game Resmi & Terpercaya
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-slate-800/80">
              <button
                onClick={() => handleNav('home')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentView === 'home'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Beranda</span>
              </button>

              {/* Games Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setGamesDropdownOpen(!gamesDropdownOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    navGames.some((g) => g.id === currentView)
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Katalog Game</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {gamesDropdownOpen && (
                  <div
                    onMouseLeave={() => setGamesDropdownOpen(false)}
                    className="absolute left-0 mt-2 w-56 rounded-2xl bg-slate-900/98 dark:bg-slate-900/98 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl"
                  >
                    <div className="text-[10px] uppercase font-black text-slate-400 px-3 py-1 tracking-wider">
                      Pilihan Game
                    </div>
                    {navGames.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => handleNav(game.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          currentView === game.id
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/80 dark:text-slate-300 dark:hover:text-white light:text-slate-700 light:hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {game.icon}
                          <span>{game.name}</span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800/90 text-slate-300">
                          {game.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right: Actions (Order History & Theme Switch) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Order History Button */}
            <button
              onClick={onOpenHistory}
              className="relative flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer shadow-sm"
              title="Cek Riwayat Pesanan"
            >
              <Receipt className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Riwayat</span>
              {orderCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-black bg-indigo-600 text-white rounded-full">
                  {orderCount}
                </span>
              )}
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Theme"
              className="p-2 sm:p-2.5 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-amber-400 transition-colors shadow-sm cursor-pointer"
              title={isDark ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-200 lg:hidden cursor-pointer"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNav('home')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
              currentView === 'home'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </button>

          <div className="text-[10px] uppercase font-black tracking-wider text-slate-500 px-3 pt-2">
            Pilihan Game Top Up
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navGames.map((game) => (
              <button
                key={game.id}
                onClick={() => handleNav(game.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  currentView === game.id
                    ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40'
                    : 'text-slate-300 bg-slate-900/70 border border-slate-800/80 hover:bg-slate-800'
                }`}
              >
                {game.icon}
                <span className="truncate">{game.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onOpenHistory();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-900/60 border border-slate-800/80 mt-3"
          >
            <div className="flex items-center gap-2.5">
              <Receipt className="w-4 h-4 text-cyan-400" />
              <span>Cek Riwayat Pesanan</span>
            </div>
            {orderCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-black bg-indigo-600 text-white rounded-full">
                {orderCount} Pesanan
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
