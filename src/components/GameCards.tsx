import React, { useState, useMemo } from 'react';
import { ViewState } from '../types';
import { STORE_ASSETS } from '../data/products';
import { ArrowRight, Flame, Sparkles, Swords, Trophy, Zap, Crosshair, Search, X, ShieldCheck, Clock } from 'lucide-react';

interface GameCardsProps {
  onSelectGame: (view: ViewState) => void;
}

interface GameCardItem {
  id: ViewState;
  name: string;
  subtitle: string;
  tag: string;
  badge: string;
  badgeColor: string;
  image: string;
  startingPrice: string;
  category: 'popular' | 'mobile' | 'pc';
  icon: React.ReactNode;
  isAvailable: boolean;
}

export const GameCards: React.FC<GameCardsProps> = ({ onSelectGame }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'popular' | 'mobile'>('all');

  const games: GameCardItem[] = [
    {
      id: 'freefire',
      name: 'Free Fire',
      subtitle: 'Diamond, Member & Gift',
      tag: 'FF',
      badge: 'TERLARIS',
      badgeColor: 'bg-amber-500 text-slate-950',
      image: STORE_ASSETS.freefireCard,
      startingPrice: 'Rp 5.000',
      category: 'popular',
      icon: <Flame className="w-3 h-3 fill-current text-amber-400" />,
      isAvailable: true,
    },
    {
      id: 'roblox',
      name: 'Roblox',
      subtitle: 'Robux Instan & Cepat',
      tag: 'RBX',
      badge: 'POPULER',
      badgeColor: 'bg-rose-500 text-white',
      image: STORE_ASSETS.robloxCard,
      startingPrice: 'Rp 5.000',
      category: 'popular',
      icon: <Sparkles className="w-3 h-3 fill-current text-rose-400" />,
      isAvailable: true,
    },
    {
      id: 'mobilelegend',
      name: 'Mobile Legends',
      subtitle: 'Diamond & Weekly Pass',
      tag: 'MLBB',
      badge: 'BESTSELLER',
      badgeColor: 'bg-blue-600 text-white',
      image: STORE_ASSETS.mobilelegendCard,
      startingPrice: 'Rp 5.000',
      category: 'popular',
      icon: <Swords className="w-3 h-3 text-blue-400" />,
      isAvailable: true,
    },
    {
      id: 'fcmobile',
      name: 'EA SPORTS FC Mobile',
      subtitle: 'Silver & FC Points',
      tag: 'FCM',
      badge: 'RESMI',
      badgeColor: 'bg-emerald-600 text-white',
      image: STORE_ASSETS.fcmobileCard,
      startingPrice: 'Rp 5.000',
      category: 'mobile',
      icon: <Trophy className="w-3 h-3 text-emerald-400" />,
      isAvailable: true,
    },
    {
      id: 'pokemonunite',
      name: 'Pokemon Unite',
      subtitle: 'Aeos Gems Instan',
      tag: 'UNITE',
      badge: 'INSTAN',
      badgeColor: 'bg-purple-600 text-white',
      image: STORE_ASSETS.pokemonuniteCard,
      startingPrice: 'Rp 5.000',
      category: 'mobile',
      icon: <Zap className="w-3 h-3 text-purple-400" />,
      isAvailable: true,
    },
    {
      id: 'bloodstrike',
      name: 'Blood Strike',
      subtitle: 'Gold Battle Royale',
      tag: 'BS',
      badge: 'SEGERA',
      badgeColor: 'bg-slate-700 text-slate-300',
      image: STORE_ASSETS.bloodstrikeCard,
      startingPrice: 'Segera Hadir',
      category: 'mobile',
      icon: <Crosshair className="w-3 h-3 text-rose-400" />,
      isAvailable: false,
    },
  ];

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchSearch =
        game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tag.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat =
        activeCategory === 'all' ||
        (activeCategory === 'popular' && (game.category === 'popular' || game.badge === 'TERLARIS' || game.badge === 'BESTSELLER')) ||
        (activeCategory === 'mobile' && (game.category === 'mobile' || game.id !== 'roblox'));

      return matchSearch && matchCat;
    });
  }, [games, searchQuery, activeCategory]);

  return (
    <section className="pt-4 sm:pt-6 pb-8 max-w-5xl mx-auto px-4 sm:px-6">
      {/* 11.11 Mega Sale November Exclusive Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 p-[1px] shadow-2xl shadow-orange-500/15 mb-6 sm:mb-8">
        <div className="relative rounded-[23px] bg-slate-950/95 dark:bg-slate-950/95 light:bg-slate-900 px-4 py-4 sm:px-6 sm:py-5 backdrop-blur-2xl">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 right-1/4 w-80 h-32 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-60 h-24 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-red-500 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-xl shadow-orange-500/35 shrink-0">
                <Flame className="w-7 h-7 fill-amber-200 animate-pulse" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" />
                    11.11 MEGA SALE
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-amber-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Periode: 1 - 30 November
                  </span>
                </div>

                <h2 className="text-base sm:text-xl font-black text-white mt-1 tracking-tight">
                  Semua Produk Diskon Hingga 90% Untuk Pengguna Baru!
                </h2>
                <p className="text-xs text-slate-300 mt-0.5 hidden sm:block">
                  Nikmati harga termurah dengan potongan harga asli yang dicoret untuk semua game favorit kamu.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-amber-300 bg-amber-500/10 px-4 py-2 rounded-2xl border border-amber-500/25 shrink-0 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garansi 100% Legal & Cepat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="relative group">
          <Search className="w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari game favorit (Free Fire, Mobile Legends, Roblox, FC Mobile, Pokemon)..."
            className="w-full pl-12 pr-11 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder:text-slate-500 shadow-xl shadow-slate-950/30 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 w-fit mx-auto mt-4">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua Game ({games.length})
          </button>
          <button
            onClick={() => setActiveCategory('popular')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'popular'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Populer
          </button>
          <button
            onClick={() => setActiveCategory('mobile')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'mobile'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mobile Games
          </button>
        </div>
      </div>

      {/* Games Catalog Grid */}
      {filteredGames.length === 0 ? (
        <div className="py-16 text-center rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-md">
          <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-300">Game tidak ditemukan</p>
          <p className="text-xs text-slate-500 mt-1">Coba gunakan nama game atau kata kunci lainnya.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/90 shadow-lg hover:shadow-2xl hover:border-indigo-500/80 transition-all duration-300 flex flex-col hover:-translate-y-1.5"
            >
              {/* Card Poster with 4:5 Aspect Ratio */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
                {/* Gradient Overlay for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-slate-900/90 text-slate-200 border border-slate-700/80 backdrop-blur-md shadow flex items-center gap-1">
                    {game.icon}
                    {game.tag}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-md ${game.badgeColor}`}
                  >
                    {game.badge}
                  </span>
                </div>

                {/* Bottom Content Floating Over Poster */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 flex flex-col justify-end">
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                      {game.subtitle}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-1.5">
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-[9px] text-slate-400">Mulai dari</span>
                        {game.isAvailable && (
                          <span className="text-[8px] font-black px-1.5 py-0.2 rounded-full bg-red-600 text-white">
                            -90%
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-mono font-black ${
                          game.isAvailable ? 'text-cyan-400' : 'text-slate-400'
                        }`}
                      >
                        {game.startingPrice}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-black shadow-md transition-all ${
                        game.isAvailable
                          ? 'bg-indigo-600 group-hover:bg-indigo-500 text-white'
                          : 'bg-slate-800 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>{game.isAvailable ? 'Top Up' : 'Lihat'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
