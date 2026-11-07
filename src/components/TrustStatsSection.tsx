import React from 'react';
import { STORE_STATS } from '../data/reviews';
import { 
  ShoppingBag, 
  RotateCcw, 
  Star, 
  Zap, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export const TrustStatsSection: React.FC = () => {
  return (
    <section className="py-6 max-w-4xl mx-auto px-4 sm:px-6">
      {/* 4 Metric Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Metric 1: Total Pembelian 867+ */}
        <div className="p-3.5 rounded-2xl border border-slate-800/90 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white light:border-slate-200 shadow-md text-left flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-black font-mono tracking-tight text-white dark:text-white light:text-slate-900">
              {STORE_STATS.totalOrders}
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              Total Pembelian
            </p>
          </div>
        </div>

        {/* Metric 2: Pembeli Kembali 456+ */}
        <div className="p-3.5 rounded-2xl border border-slate-800/90 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white light:border-slate-200 shadow-md text-left flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-black font-mono tracking-tight text-white dark:text-white light:text-slate-900">
              {STORE_STATS.repeatCustomers}
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              Pembeli Kembali
            </p>
          </div>
        </div>

        {/* Metric 3: Rating 4.9/5 dari 143 orang */}
        <div className="p-3.5 rounded-2xl border border-slate-800/90 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white light:border-slate-200 shadow-md text-left flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 shrink-0">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-black font-mono tracking-tight text-amber-400">
              {STORE_STATS.overallRating}
              <span className="text-xs text-slate-400 font-normal">/5</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              {STORE_STATS.totalReviews} Ulasan Gamer
            </p>
          </div>
        </div>

        {/* Metric 4: Kecepatan Proses 1-3 Menit */}
        <div className="p-3.5 rounded-2xl border border-slate-800/90 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white light:border-slate-200 shadow-md text-left flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-black font-mono tracking-tight text-emerald-400">
              {STORE_STATS.avgProcessingTime}
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              Proses Otomatis
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 py-2">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          100% Legal & Bergaransi
        </span>
        <span className="hidden sm:inline text-slate-700">&bull;</span>
        <span className="inline-flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          Tanpa Perlu Password
        </span>
        <span className="hidden sm:inline text-slate-700">&bull;</span>
        <span className="inline-flex items-center gap-1.5 font-medium">
          <Zap className="w-4 h-4 text-amber-400" />
          QRIS Instan Semua Bank/E-Wallet
        </span>
      </div>
    </section>
  );
};
