import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface PaymentExpiredModalProps {
  onRetry: () => void;
  onBackToHome: () => void;
}

export const PaymentExpiredModal: React.FC<PaymentExpiredModalProps> = ({
  onRetry,
  onBackToHome,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md rounded-3xl border border-rose-500/30 bg-slate-900/95 dark:bg-slate-900/95 light:bg-white p-6 sm:p-8 text-center shadow-2xl animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-rose-500/15 border-2 border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white dark:text-white light:text-slate-900">
          Waktu Pembayaran Habis
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          Batas waktu 10 menit untuk pembayaran QRIS telah kedaluwarsa. Silakan buat pesanan baru untuk mendapatkan kode pembayaran terbaru.
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <button
            onClick={onRetry}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Buat Pesanan Baru</span>
          </button>

          <button
            onClick={onBackToHome}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Halaman Utama</span>
          </button>
        </div>
      </div>
    </div>
  );
};
