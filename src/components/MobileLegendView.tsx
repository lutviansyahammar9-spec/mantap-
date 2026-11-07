import React from 'react';
import { ProductItem } from '../types';
import {
  STORE_ASSETS,
  MOBILE_LEGEND_DIAMOND_PRODUCTS,
  MOBILE_LEGEND_PASS_PRODUCTS,
  formatRupiah,
  getDiscountPercentage,
} from '../data/products';
import { TopBackButton } from './TopBackButton';
import { Promo1111Banner } from './Promo1111Banner';
import { Check, Sparkles, Gem, ShieldCheck, Flame } from 'lucide-react';

interface MobileLegendViewProps {
  selectedProduct: ProductItem | null;
  onSelectProduct: (product: ProductItem) => void;
  onBackToHome: () => void;
}

export const MobileLegendView: React.FC<MobileLegendViewProps> = ({
  selectedProduct,
  onSelectProduct,
  onBackToHome,
}) => {
  return (
    <div className="pb-36 pt-3 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Prominent Top Back Bar */}
      <TopBackButton onBack={onBackToHome} gameName="Mobile Legends" />

      {/* 11.11 Mega Sale Banner */}
      <Promo1111Banner gameName="Mobile Legends" />

      {/* Top Banner & Header (2.4:1 Aspect Ratio) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl mb-6">
        <div className="relative aspect-[1942/809] w-full overflow-hidden bg-slate-950">
          <img
            src={STORE_ASSETS.mobilelegendBanner}
            alt="Mobile Legends Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>

        <div className="p-4 sm:p-5 relative z-10 -mt-10 sm:-mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Mobile Legends Top Up
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-sm">
                  <Flame className="w-3 h-3 fill-amber-200" />
                  11.11 SALE
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Resmi Moonton
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Top up Diamond dan Weekly Diamond Pass Mobile Legends resmi dengan diskon November.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
          1
        </div>
        <h2 className="text-lg font-black text-white dark:text-white light:text-slate-900 tracking-tight">
          Pilih Nominal Top Up
        </h2>
      </div>

      {/* SECTION A: Weekly Pass */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-800">
            A. Weekly Pass
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {MOBILE_LEGEND_PASS_PRODUCTS.map((product) => {
            const isSelected = selectedProduct?.id === product.id;
            const discount = getDiscountPercentage(product.price, product.originalPrice);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className={`relative cursor-pointer rounded-2xl p-3.5 border transition-all duration-200 flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/15 ring-2 ring-blue-500/80 shadow-xl shadow-blue-500/20'
                    : 'border-slate-800 bg-slate-900/90 hover:border-slate-700 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-950 p-1 flex items-center justify-center border border-slate-800 shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white">
                      {product.name}
                    </h4>
                    <div className="flex items-baseline gap-1.5 mt-0.5 font-mono">
                      <span className="text-xs sm:text-sm font-black text-blue-400">
                        {formatRupiah(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] sm:text-[11px] text-slate-400 line-through font-semibold">
                          {formatRupiah(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {discount && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-red-600 text-white">
                      -{discount}%
                    </span>
                  )}
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION B: Diamond */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2.5">
          <Gem className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-800">
            B. Diamond Mobile Legends
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {MOBILE_LEGEND_DIAMOND_PRODUCTS.map((product) => {
            const isSelected = selectedProduct?.id === product.id;
            const discount = getDiscountPercentage(product.price, product.originalPrice);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className={`relative cursor-pointer rounded-2xl p-3.5 border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/15 ring-2 ring-blue-500/80 shadow-xl shadow-blue-500/20'
                    : 'border-slate-800 bg-slate-900/90 hover:border-slate-700 hover:bg-slate-800/80'
                }`}
              >
                {/* 11.11 Discount Badge */}
                {discount && (
                  <div className="absolute top-2 right-2">
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-red-600 text-white shadow-sm">
                      -{discount}%
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-950 p-1 flex items-center justify-center border border-slate-800 shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow"
                    />
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                    {product.name}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-end justify-between font-mono">
                  <div>
                    <div className="text-xs sm:text-sm font-black text-blue-400">
                      {formatRupiah(product.price)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-[10px] sm:text-[11px] text-slate-400 line-through font-semibold">
                        {formatRupiah(product.originalPrice)}
                      </div>
                    )}
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
