import React from 'react';
import { createPortal } from 'react-dom';
import { ProductItem } from '../types';
import { formatRupiah } from '../data/products';
import { ArrowRight, Sparkles, X, CheckCircle2 } from 'lucide-react';

interface StickySummaryBarProps {
  selectedProduct: ProductItem | null;
  onContinue: () => void;
  onClear?: () => void;
}

export const StickySummaryBar: React.FC<StickySummaryBarProps> = ({
  selectedProduct,
  onContinue,
  onClear,
}) => {
  if (!selectedProduct || typeof document === 'undefined') {
    return null;
  }

  const content = (
    <aside
      aria-label="Keranjang Belanja Mengambang"
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[92vw] sm:max-w-xl px-2 pointer-events-none animate-in fade-in zoom-in-95 slide-in-from-bottom-6 duration-300"
    >
      <div className="pointer-events-auto relative group overflow-hidden rounded-full bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-indigo-500/50 dark:border-indigo-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(99,102,241,0.3)] ring-1 ring-white/15 px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2.5 sm:gap-4 transition-all">
        {/* Ambient Glow inside bubble */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/15 via-blue-600/10 to-cyan-500/15 pointer-events-none" />

        {/* Left Side: Product Avatar & Title & Price */}
        <div className="relative z-10 flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
          {/* Avatar with glowing border */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 border-2 border-indigo-400/60 p-1 flex items-center justify-center shrink-0 shadow-md">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="max-h-full max-w-full object-contain filter drop-shadow"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center ring-2 ring-slate-900 shadow">
              <CheckCircle2 className="w-3 h-3 text-slate-950 stroke-[3]" />
            </div>
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-500/15 px-1.5 py-0.5 rounded-full border border-cyan-400/25 flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                11.11 Promo
              </span>
              <span className="text-[10px] text-slate-400 truncate hidden sm:inline">
                Siap Checkout
              </span>
            </div>

            <p className="text-xs sm:text-sm font-extrabold text-white truncate mt-1">
              {selectedProduct.name}
            </p>

            <div className="flex items-baseline gap-1.5 mt-0.5 font-mono">
              <span className="text-xs sm:text-sm font-black text-emerald-400 whitespace-nowrap">
                {formatRupiah(selectedProduct.price)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-[10px] sm:text-[11px] text-slate-400 line-through font-semibold whitespace-nowrap">
                  {formatRupiah(selectedProduct.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Continue Button & Deselect Option */}
        <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onContinue}
            className="group/btn px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm tracking-wide text-white bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 shadow-lg shadow-indigo-600/35 hover:shadow-indigo-500/50 flex items-center gap-1.5 sm:gap-2 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer whitespace-nowrap"
          >
            <span>Lanjutkan</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>

          {onClear && (
            <button
              onClick={onClear}
              className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-slate-700/90 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60 cursor-pointer shadow-sm"
              title="Batalkan pilihan"
              aria-label="Batalkan pilihan produk"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );

  return createPortal(content, document.body);
};
