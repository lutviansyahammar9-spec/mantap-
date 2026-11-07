import React from 'react';
import { ProductItem } from '../types';
import { STORE_ASSETS, ROBLOX_PRODUCTS, formatRupiah, getDiscountPercentage } from '../data/products';
import { TopBackButton } from './TopBackButton';
import { Promo1111Banner } from './Promo1111Banner';
import { Check, Sparkles, ShieldCheck, Flame } from 'lucide-react';

interface RobloxViewProps {
  selectedProduct: ProductItem | null;
  onSelectProduct: (product: ProductItem) => void;
  onBackToHome: () => void;
}

export const RobloxView: React.FC<RobloxViewProps> = ({
  selectedProduct,
  onSelectProduct,
  onBackToHome,
}) => {
  return (
    <div className="pb-36 pt-3 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Prominent Top Back Bar */}
      <TopBackButton onBack={onBackToHome} gameName="Roblox" />

      {/* 11.11 Mega Sale Banner */}
      <Promo1111Banner gameName="Roblox" />

      {/* Top Banner & Header (2.4:1 Aspect Ratio) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl mb-6">
        <div className="relative aspect-[1942/809] w-full overflow-hidden bg-slate-950">
          <img
            src={STORE_ASSETS.robloxBanner}
            alt="Roblox Top Up Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>

        <div className="p-4 sm:p-5 relative z-10 -mt-10 sm:-mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Roblox Top Up
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm">
                  <Flame className="w-3 h-3 fill-amber-200" />
                  11.11 SALE
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                  <Sparkles className="w-3 h-3 mr-1 fill-current" />
                  Instan Tanpa Password
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Top up Robux dengan harga promo 11.11 termurah di Vrena Store. Cukup masukkan Username Roblox!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-rose-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
          1
        </div>
        <h2 className="text-lg font-black text-white dark:text-white light:text-slate-900 tracking-tight">
          Pilih Nominal Robux
        </h2>
      </div>

      {/* Robux Grid - Compact & Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {ROBLOX_PRODUCTS.map((product) => {
          const isSelected = selectedProduct?.id === product.id;
          const discount = getDiscountPercentage(product.price, product.originalPrice);

          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelectProduct(product)}
              className={`relative group p-3.5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-rose-950/60 border-rose-500 shadow-xl shadow-rose-950/40 ring-1 ring-rose-500 scale-[1.02]'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {discount && (
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-[9px] font-black bg-red-600 text-white shadow-sm">
                  -{discount}%
                </div>
              )}

              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              <div className="w-12 h-12 mb-2 flex items-center justify-center mt-2 group-hover:scale-105 transition-transform">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow"
                />
              </div>

              <div className="w-full">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {product.name}
                </h4>
                <div className="text-xs sm:text-sm font-black text-rose-400 mt-0.5 font-mono">
                  {formatRupiah(product.price)}
                </div>
                {product.originalPrice && (
                  <div className="text-[10px] sm:text-[11px] text-slate-400 line-through font-semibold font-mono">
                    {formatRupiah(product.originalPrice)}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-xs text-slate-300">
          <p className="font-bold text-white">100% Legal & Aman Tanpa Akun Password</p>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Top up Robux hanya membutuhkan username Roblox kamu saja.
          </p>
        </div>
      </div>
    </div>
  );
};
