import React from 'react';
import { Sparkles, Flame, Clock, ShieldCheck, Zap } from 'lucide-react';

interface Promo1111BannerProps {
  gameName?: string;
  className?: string;
}

export const Promo1111Banner: React.FC<Promo1111BannerProps> = ({
  gameName,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 p-[1px] shadow-lg shadow-orange-500/10 mb-5 ${className}`}
    >
      <div className="relative rounded-[15px] bg-slate-950/95 dark:bg-slate-950/95 light:bg-slate-900 px-4 py-3 sm:px-5 sm:py-3.5 backdrop-blur-xl">
        {/* Glow ambient background */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left Title & Description */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/30 shrink-0">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-200 animate-pulse" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500 text-white shadow-sm flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  11.11 MEGA SALE
                </span>
                <span className="text-[11px] font-bold text-orange-300 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Periode: 1 - 30 November
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-black text-white mt-0.5 leading-snug">
                Diskon s/d 90% Khusus Pengguna Baru {gameName ? `pada ${gameName}` : 'Semua Game'}!
              </h3>
            </div>
          </div>

          {/* Right Highlights */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] text-slate-300 shrink-0 overflow-x-auto pb-1 md:pb-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/25 text-orange-300 font-semibold whitespace-nowrap">
              <Zap className="w-3 h-3 text-orange-400" />
              Proses 1-3 Menit
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold whitespace-nowrap">
              <ShieldCheck className="w-3 h-3" />
              Garansi 100% Legal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
