import React from 'react';
import { ProductItem, OrderAccountData, PaymentMethodId } from '../types';
import { PAYMENT_METHODS, formatRupiah, getGameName, formatAccountDisplay } from '../data/products';
import { ArrowLeft, ArrowRight, Check, CreditCard, Sparkles } from 'lucide-react';

interface PaymentSelectViewProps {
  product: ProductItem;
  accountData: OrderAccountData;
  selectedPayment: PaymentMethodId | null;
  onSelectPayment: (method: PaymentMethodId) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const PaymentSelectView: React.FC<PaymentSelectViewProps> = ({
  product,
  accountData,
  selectedPayment,
  onSelectPayment,
  onContinue,
  onBack,
}) => {
  return (
    <div className="py-6 max-w-xl mx-auto px-4 sm:px-6 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 backdrop-blur-md mb-4 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Ubah Data Akun</span>
      </button>

      {/* Order Summary Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 mb-5 shadow-xl">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
          <span>Ringkasan Pesanan</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Game & Produk</span>
            <span className="font-extrabold text-white">
              {getGameName(product.gameId)} &bull; {product.name}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Akun Tujuan</span>
            <span className="font-extrabold text-cyan-400">
              {formatAccountDisplay(accountData)}
            </span>
          </div>
        </div>

        <div className="pt-3 flex items-center justify-between text-xs sm:text-sm">
          <span className="font-semibold text-slate-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Total Pembayaran (Diskon 11.11)
          </span>
          <div className="flex items-baseline gap-2 font-mono">
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through font-semibold">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
            <span className="text-lg font-black text-emerald-400">
              {formatRupiah(product.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
          3
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
            Pilih Metode Pembayaran
          </h2>
        </div>
      </div>

      {/* Payment Options */}
      <div className="grid grid-cols-1 gap-2.5 mb-5">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedPayment === method.id;

          return (
            <div
              key={method.id}
              onClick={() => onSelectPayment(method.id)}
              className={`cursor-pointer rounded-2xl border p-3.5 transition-all duration-200 flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-indigo-950/70 border-indigo-500 shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shadow shrink-0 border border-slate-200">
                  <img
                    src={method.image}
                    alt={method.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-black text-white">
                      {method.name}
                    </h4>
                    {method.id === 'qris' && (
                      <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        SEMUA E-WALLET
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 truncate">
                    {method.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-[10px] font-bold text-emerald-400 hidden sm:inline">
                  Bebas Biaya Admin
                </span>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow'
                    : 'border-slate-700 bg-slate-800'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2">
        <button
          onClick={onContinue}
          disabled={!selectedPayment}
          className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer ${
            selectedPayment
              ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50 shadow-none'
          }`}
        >
          <span>Lanjutkan ke Pembayaran</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
