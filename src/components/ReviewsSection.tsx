import React, { useState } from 'react';
import { STORE_STATS, REVIEWS_DATA } from '../data/reviews';
import { Star, ShieldCheck, CheckCircle2, ThumbsUp, MessageSquare } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [selectedGameFilter, setSelectedGameFilter] = useState<string>('all');

  const filteredReviews = selectedGameFilter === 'all'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => r.game.toLowerCase().includes(selectedGameFilter.toLowerCase()));

  const gameFilters = [
    { id: 'all', label: 'Semua Ulasan', count: STORE_STATS.totalReviews },
    { id: 'free fire', label: 'Free Fire', count: 58 },
    { id: 'mobile legends', label: 'Mobile Legends', count: 46 },
    { id: 'roblox', label: 'Roblox', count: 24 },
    { id: 'fc mobile', label: 'FC Mobile', count: 15 },
  ];

  return (
    <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Testimoni & Kepuasan Pelanggan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white dark:text-white light:text-slate-900 tracking-tight">
            Ulasan Dari Gamers Vrena Store
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mt-1">
            Transparansi nyata dari total <span className="font-bold text-white dark:text-white light:text-slate-900">{STORE_STATS.totalReviews} orang</span> yang telah memberikan penilaian.
          </p>
        </div>

        {/* Big Overall Rating Card */}
        <div className="flex items-center gap-3.5 p-3 px-4 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-lg shrink-0">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-400">
              {STORE_STATS.overallRating}
              <span className="text-sm text-slate-400 font-normal">/{STORE_STATS.maxRating}</span>
            </div>
            <div className="flex items-center justify-center gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <div className="h-10 w-px bg-slate-800 dark:bg-slate-800 light:bg-slate-200" />
          <div className="text-xs">
            <p className="font-bold text-white dark:text-white light:text-slate-900">
              {STORE_STATS.totalReviews} Ulasan
            </p>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3" />
              {STORE_STATS.satisfactionRate} Puas
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {gameFilters.map((tab) => {
          const isActive = selectedGameFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedGameFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-slate-900/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-indigo-500/50 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 rounded-2xl border border-slate-800/90 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white light:border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-tr ${rev.avatarColor} text-white font-extrabold text-xs flex items-center justify-center shadow-sm shrink-0`}
                  >
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white dark:text-white light:text-slate-900 leading-none">
                        {rev.name}
                      </h4>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-400">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>Terverifikasi</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 leading-none mt-1 block">
                      {rev.game} &bull; <span className="text-indigo-400">{rev.item}</span>
                    </span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              {/* Comment text */}
              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                "{rev.comment}"
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>{rev.timeAgo}</span>
              <span className="flex items-center gap-1 text-slate-400">
                <ThumbsUp className="w-2.5 h-2.5 text-indigo-400" />
                <span>Membantu</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
