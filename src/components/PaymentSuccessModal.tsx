import React from 'react';
import { OrderRecord } from '../types';
import { formatRupiah, formatAccountDisplay } from '../data/products';
import { Check, Clock, Home, History, Sparkles, Image as ImageIcon } from 'lucide-react';

interface PaymentSuccessModalProps {
  order: OrderRecord;
  onBackToHome: () => void;
  onOpenHistory: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  order,
  onBackToHome,
  onOpenHistory,
}) => {
  const isFreeFire = order.gameId === 'freefire';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl my-8 rounded-3xl border border-slate-700/80 bg-slate-900/95 dark:bg-slate-900/95 light:bg-white light:border-slate-200 shadow-2xl p-6 sm:p-8 text-center animate-in zoom-in-95 duration-300">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Success Checkmark */}
        <div className="relative mx-auto mb-5 w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center shadow-xl shadow-emerald-500/25">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-inner">
            <Check className="w-8 h-8 text-white stroke-[3] animate-in zoom-in-75 duration-300" />
          </div>
          <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-400 text-slate-950">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white dark:text-white light:text-slate-900 tracking-tight">
          Pembayaran Berhasil!
        </h2>

        {/* Game delivery notice */}
        <p className="mt-2 text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 font-medium">
          Pesanan sedang diproses dan item akan langsung masuk ke akun kamu (estimasi 1x24 jam).
        </p>

        {/* Order Status Badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400">
          <Clock className="w-4 h-4 animate-spin" />
          <span>Status: {order.status}</span>
        </div>

        {/* Order Summary Receipt Box */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-left space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
            <span className="text-slate-400 font-medium">Nomor Pesanan</span>
            <span className="font-mono font-bold text-white dark:text-white light:text-slate-900">
              {order.orderId}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Nama Game</span>
            <span className="font-bold text-white dark:text-white light:text-slate-900">
              {order.gameName}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Produk</span>
            <span className="font-bold text-indigo-400 dark:text-indigo-400 light:text-indigo-600">
              {order.productName}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Akun Tujuan</span>
            <span className="font-bold text-white dark:text-white light:text-slate-900">
              {formatAccountDisplay(order.accountData)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Metode Pembayaran</span>
            <span className="font-bold text-white dark:text-white light:text-slate-900">
              {order.paymentMethodName}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Waktu Transaksi</span>
            <span className="text-slate-300 dark:text-slate-300 light:text-slate-600">
              {order.createdAt}
            </span>
          </div>

          <div className="pt-2.5 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex justify-between items-center text-base">
            <span className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
              Total Pembayaran
            </span>
            <span className="font-black text-emerald-400 dark:text-emerald-400 light:text-emerald-600 text-lg">
              {formatRupiah(order.price)}
            </span>
          </div>

          {/* Proof thumbnail preview */}
          {order.paymentProofUrl && (
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                Bukti Transfer:
              </span>
              <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shrink-0">
                <img
                  src={order.paymentProofUrl}
                  alt="Bukti Transfer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onBackToHome}
            className="flex-1 py-3.5 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Halaman Utama</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="py-3.5 px-5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span>Lihat Riwayat</span>
          </button>
        </div>
      </div>
    </div>
  );
};
