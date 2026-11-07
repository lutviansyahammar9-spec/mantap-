import React, { useState, useEffect } from 'react';
import { ProductItem, OrderAccountData } from '../types';
import { STORE_ASSETS, formatRupiah, getGameName, formatAccountDisplay } from '../data/products';
import { ProofUpload } from './ProofUpload';
import { 
  ArrowLeft, 
  Clock, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  HelpCircle, 
  Loader2, 
  Server, 
  ShieldCheck 
} from 'lucide-react';

interface PaymentQrisViewProps {
  product: ProductItem;
  accountData: OrderAccountData;
  onConfirmPayment: (proofUrl: string, proofName: string) => void;
  onBack: () => void;
  onExpired: () => void;
}

export const PaymentQrisView: React.FC<PaymentQrisViewProps> = ({
  product,
  accountData,
  onConfirmPayment,
  onBack,
  onExpired,
}) => {
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [proofName, setProofName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Server gimmick state
  const [isVerifyingServer, setIsVerifyingServer] = useState(false);
  const [serverStep, setServerStep] = useState(1);
  const [serverProgress, setServerProgress] = useState(0);

  // 10-Minute Countdown Timer with localStorage timestamp persistence
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const storageKey = 'vrena_qris_expiry';
    const savedExpiry = localStorage.getItem(storageKey) || localStorage.getItem('kenos_qris_expiry');
    const now = Date.now();

    if (savedExpiry) {
      const remaining = Math.floor((parseInt(savedExpiry, 10) - now) / 1000);
      if (remaining > 0) return remaining;
    }

    const newExpiry = now + 10 * 60 * 1000;
    localStorage.setItem(storageKey, newExpiry.toString());
    return 10 * 60;
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.removeItem('vrena_qris_expiry');
      localStorage.removeItem('kenos_qris_expiry');
      onExpired();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.removeItem('vrena_qris_expiry');
      localStorage.removeItem('kenos_qris_expiry');
          onExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpired]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isFreeFire = product.gameId === 'freefire';

  // Download QR Code Handler
  const handleDownloadQR = async () => {
    try {
      const response = await fetch(STORE_ASSETS.qrCodeImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'QRIS_Vrena_Store.jpeg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      // Fallback direct link
      const a = document.createElement('a');
      a.href = STORE_ASSETS.qrCodeImage;
      a.download = 'QRIS_Vrena_Store.jpeg';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Start realistic multi-step server verification gimmick
  const handleStartVerification = () => {
    if (!proofUrl) {
      setUploadError('Silakan unggah bukti pembayaran terlebih dahulu sebelum melanjutkan.');
      return;
    }

    setIsVerifyingServer(true);
    setServerStep(1);
    setServerProgress(25);

    setTimeout(() => {
      setServerStep(2);
      setServerProgress(65);
    }, 1000);

    setTimeout(() => {
      setServerStep(3);
      setServerProgress(90);
    }, 2000);

    setTimeout(() => {
      setServerProgress(100);
      localStorage.removeItem('vrena_qris_expiry');
      localStorage.removeItem('kenos_qris_expiry');
      onConfirmPayment(proofUrl, proofName || 'bukti_qris.jpg');
    }, 2800);
  };

  return (
    <div className="py-6 max-w-xl mx-auto px-4 sm:px-6 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        disabled={isVerifyingServer}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 backdrop-blur-md mb-4 transition-colors disabled:opacity-50"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Ganti Metode</span>
      </button>

      {/* Main Payment Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/95 dark:bg-slate-900/95 light:bg-white light:border-slate-200 shadow-xl p-5 sm:p-6">
        {/* Header & Countdown Timer */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base sm:text-lg font-black text-white dark:text-white light:text-slate-900">
                Pembayaran QRIS
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Pindai QR code di bawah dengan BCA, Mandiri, BRI, GoPay, DANA, dll.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
            <Clock className="w-4 h-4 animate-pulse" />
            <div className="text-right">
              <span className="text-[9px] font-bold uppercase tracking-wider block leading-none">
                Sisa Waktu
              </span>
              <span className="text-sm font-black font-mono tracking-wider">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>

        {/* Order Details Mini-Card */}
        <div className="my-4 p-3 rounded-xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Produk</span>
            <span className="font-bold text-white dark:text-white light:text-slate-900">
              {getGameName(product.gameId)} — {product.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Akun Tujuan</span>
            <span className="font-bold text-indigo-400 dark:text-indigo-400 light:text-indigo-600">
              {formatAccountDisplay(accountData)}
            </span>
          </div>

          <div className="pt-1.5 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300 dark:text-slate-300 light:text-slate-700">
              Total Pembayaran (Diskon 11.11)
            </span>
            <div className="flex items-baseline gap-2">
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-semibold">
                  {formatRupiah(product.originalPrice)}
                </span>
              )}
              <span className="text-base font-black text-indigo-400 dark:text-indigo-400 light:text-indigo-600">
                {formatRupiah(product.price)}
              </span>
            </div>
          </div>
        </div>

        {/* QR Code Section with Download Button */}
        <div className="my-4 text-center">
          <div className="inline-block p-3 rounded-2xl bg-white border-2 border-indigo-500/30 shadow-lg max-w-[210px] sm:max-w-[230px] mx-auto">
            <img
              src={STORE_ASSETS.qrCodeImage}
              alt="QRIS Vrena Store"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleDownloadQR}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Gambar QRIS</span>
            </button>

            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
              NMID: ID1020021183293
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">
            Bisa scan langsung atau simpan QR ke galeri lalu buka via aplikasi e-wallet.
          </p>
        </div>

        {/* Upload Proof */}
        <div className="mt-5">
          <ProofUpload
            proofUrl={proofUrl}
            proofName={proofName}
            onUpload={(url, name) => {
              setProofUrl(url);
              setProofName(name);
              setUploadError(null);
            }}
            onRemove={() => {
              setProofUrl(null);
              setProofName(null);
            }}
            onError={(msg) => setUploadError(msg)}
          />

          {uploadError && (
            <div className="mt-2.5 p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>

        {/* Multi-step Server Verification Gimmick Modal/Overlay */}
        {isVerifyingServer && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-indigo-500/40 shadow-inner animate-in fade-in space-y-3">
            <div className="flex items-center gap-2.5 text-xs font-bold text-indigo-400">
              <Server className="w-4 h-4 animate-pulse" />
              <span>
                {serverStep === 1 && 'Mengunggah & mengenkripsi bukti pembayaran...'}
                {serverStep === 2 && 'Menghubungkan ke server payment gateway Kenos...'}
                {serverStep === 3 && 'Memvalidasi transaksi & menerbitkan invoice pesanan...'}
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${serverProgress}%` }}
              />
            </div>

            <p className="text-[10px] text-slate-400 text-right">
              Proses sinkronisasi server ({serverProgress}%)
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-5">
          <button
            onClick={handleStartVerification}
            disabled={!proofUrl || isVerifyingServer}
            className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              proofUrl && !isVerifyingServer
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white shadow-emerald-600/25 hover:scale-[1.01] active:scale-[0.99]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50 shadow-none'
            }`}
          >
            {isVerifyingServer ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses ke Server...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Saya Sudah Transfer</span>
              </>
            )}
          </button>
          {!proofUrl && !isVerifyingServer && (
            <p className="text-center text-[11px] text-rose-400 mt-1.5 font-medium">
              Silakan unggah bukti pembayaran terlebih dahulu.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
