import React from 'react';
import {
  STORE_ASSETS,
  BLOOD_STRIKE_PRODUCTS,
  formatRupiah,
} from '../data/products';
import { TopBackButton } from './TopBackButton';
import { Clock, AlertCircle, Lock } from 'lucide-react';

interface BloodStrikeViewProps {
  onBackToHome: () => void;
}

export const BloodStrikeView: React.FC<BloodStrikeViewProps> = ({
  onBackToHome,
}) => {
  return (
    <div className="pb-32 pt-3 max-w-4xl mx-auto px-4 sm:px-6 animate-in fade-in duration-200">
      {/* Prominent Top Back Bar */}
      <TopBackButton onBack={onBackToHome} gameName="Blood Strike" badgeText="Segera Hadir" />

      {/* Top Banner & Header (2.4:1 Aspect Ratio) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl mb-6">
        <div className="relative aspect-[1942/809] w-full overflow-hidden bg-slate-950">
          <img
            src={STORE_ASSETS.bloodstrikeBanner}
            alt="Blood Strike Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        <div className="p-4 sm:p-5 relative z-10 -mt-10 sm:-mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Blood Strike Top Up
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Clock className="w-3 h-3 mr-1" />
                  Segera Hadir
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Katalog resmi Blood Strike Gold Vrena Store.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent "Belum Tersedia" Warning Box */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-200 flex items-start gap-3 shadow-lg">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-black text-amber-300">
            Top Up Belum Tersedia
          </h4>
          <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
            Layanan top up untuk Blood Strike saat ini belum tersedia. Seluruh pricelist di bawah ini merupakan pratinjau katalog sistem dan belum dapat dipesan atau dipilih. Nantikan kehadirannya segera di Kenos Store!
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md bg-rose-600 text-white font-black text-xs flex items-center justify-center">
          1
        </div>
        <h2 className="text-lg font-black text-white dark:text-white light:text-slate-900 tracking-tight">
          Pricelist Blood Strike Gold (Belum Tersedia)
        </h2>
      </div>

      {/* Unclickable Pricelist Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {BLOOD_STRIKE_PRODUCTS.map((product) => {
          return (
            <div
              key={product.id}
              className="relative rounded-2xl p-3.5 border border-slate-800 bg-slate-900/50 opacity-60 cursor-not-allowed select-none flex flex-col justify-between"
            >
              <div className="mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                  <Lock className="w-2.5 h-2.5" />
                  Belum Tersedia
                </span>
              </div>

              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-slate-950 p-1 flex items-center justify-center border border-slate-800 shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain grayscale"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-400 leading-tight">
                    {product.name}
                  </h4>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>{formatRupiah(product.price)}</span>
                <span className="text-[10px] text-rose-400/80 font-bold">Terkunci</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
