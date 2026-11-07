import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

interface TopBackButtonProps {
  onBack: () => void;
  gameName: string;
  badgeText?: string;
}

export const TopBackButton: React.FC<TopBackButtonProps> = ({
  onBack,
  gameName,
  badgeText = 'Proses Otomatis 1-3 Menit',
}) => {
  return (
    <div className="sticky top-16 z-30 mb-4 py-2 px-3 sm:px-4 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/95 backdrop-blur-md border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-md flex items-center justify-between gap-3 transition-colors">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shrink-0"
        aria-label="Kembali ke Pilihan Game"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </button>

      <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="hidden md:inline text-slate-400">Vrena Store</span>
        <span className="hidden md:inline text-slate-600">/</span>
        <span className="text-white dark:text-white light:text-slate-900 font-extrabold truncate">
          {gameName}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" />
          <span>{badgeText}</span>
        </span>
      </div>
    </div>
  );
};
