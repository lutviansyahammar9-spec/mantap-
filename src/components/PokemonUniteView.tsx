import React from 'react';
import { ProductItem } from '../types';
import {
  STORE_ASSETS,
  POKEMON_UNITE_PRODUCTS,
  formatRupiah,
  getDiscountPercentage,
} from '../data/products';
import { TopBackButton } from './TopBackButton';
import { Promo1111Banner } from './Promo1111Banner';
import { Check, ShieldCheck, Gem, Flame } from 'lucide-react';

interface PokemonUniteViewProps {
  selectedProduct: ProductItem | null;
  onSelectProduct: (product: ProductItem) => void;
  onBackToHome: () => void;
}

export const PokemonUniteView: React.FC<PokemonUniteViewProps> = ({
  selectedProduct,
  onSelectProduct,
  onBackToHome,
}) => {
  return (
    <div className="pb-36 pt-3 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Prominent Top Back Bar */}
      <TopBackButton onBack={onBackToHome} gameName="Pokemon Unite" />

      {/* 11.11 Mega Sale Banner */}
      <Promo1111Banner gameName="Pokemon Unite" />

      {/* Top Banner & Header (2.4:1 Aspect Ratio) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl mb-6">
        <div className="relative aspect-[1942/809] w-full overflow-hidden bg-slate-950">
          <img
            src={STORE_ASSETS.pokemonuniteBanner}
            alt="Pokemon Unite Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>

        <div className="p-4 sm:p-5 relative z-10 -mt-10 sm:-mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Pokemon Unite Top Up
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-red-600 to-purple-600 text-white shadow-sm">
                  <Flame className="w-3 h-3 fill-amber-200" />
                  11.11 DISKON SPESIAL
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Resmi & Legal
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Top up Aeos Gems Pokemon Unite resmi dan instan. Cukup masukkan 7 digit Trainer ID.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
          1
        </div>
        <h2 className="text-lg font-black text-white dark:text-white light:text-slate-900 tracking-tight">
          Pilih Nominal Aeos Gems
        </h2>
      </div>

      {/* Grid of AeosGems */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2.5">
          <Gem className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-800">
            AeosGems (ID)
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {POKEMON_UNITE_PRODUCTS.map((product) => {
            const isSelected = selectedProduct?.id === product.id;
            const discount = getDiscountPercentage(product.price, product.originalPrice);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className={`relative cursor-pointer rounded-2xl p-3.5 border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-purple-500 bg-purple-500/15 ring-2 ring-purple-500/80 shadow-xl shadow-purple-500/20'
                    : 'border-slate-800 bg-slate-900/90 hover:border-slate-700 hover:bg-slate-800/80'
                }`}
              >
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
                    <div className="text-xs sm:text-sm font-black text-purple-400">
                      {formatRupiah(product.price)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-[10px] sm:text-[11px] text-slate-400 line-through font-semibold">
                        {formatRupiah(product.originalPrice)}
                      </div>
                    )}
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shadow">
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
