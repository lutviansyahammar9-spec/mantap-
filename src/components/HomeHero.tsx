import React from 'react';
import { Flame } from 'lucide-react';

export const HomeHero: React.FC = () => {
  return (
    <section className="relative pt-6 pb-2">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-3xl h-36 bg-gradient-to-r from-blue-600/15 via-indigo-600/20 to-cyan-500/15 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Sleek Brand Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm mb-3">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-current" />
          <span>Platform Top Up Game Resmi & Terpercaya</span>
        </div>

        {/* Clean, Impactful Store Title */}
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white dark:text-white light:text-slate-900">
          Selamat Datang di <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Vrena Store</span>
        </h1>

        <p className="mt-2 max-w-lg mx-auto text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed font-normal">
          Top up diamond & item game favoritmu dengan harga termurah, proses kilat otomatis 1-3 menit, dan metode pembayaran lengkap QRIS, DANA, serta GoPay.
        </p>
      </div>
    </section>
  );
};
