import React, { useState } from 'react';
import { ProductItem, OrderAccountData, PaymentMethodId } from '../types';
import { PAYMENT_METHODS, formatRupiah, getGameName, formatAccountDisplay } from '../data/products';
import { ProofUpload } from './ProofUpload';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  CheckCircle2, 
  Smartphone, 
  AlertTriangle, 
  Loader2, 
  Server 
} from 'lucide-react';

interface PaymentTransferViewProps {
  methodId: PaymentMethodId;
  product: ProductItem;
  accountData: OrderAccountData;
  onConfirmPayment: (proofUrl: string, proofName: string) => void;
  onBack: () => void;
  onShowToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const PaymentTransferView: React.FC<PaymentTransferViewProps> = ({
  methodId,
  product,
  accountData,
  onConfirmPayment,
  onBack,
  onShowToast,
}) => {
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [proofName, setProofName] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Server gimmick state
  const [isVerifyingServer, setIsVerifyingServer] = useState(false);
  const [serverStep, setServerStep] = useState(1);
  const [serverProgress, setServerProgress] = useState(0);

  const method = PAYMENT_METHODS.find((m) => m.id === methodId) || PAYMENT_METHODS[1];
  const targetNumber = method.targetNumber || '0851-1736-4018';
  const isFreeFire = product.gameId === 'freefire';

  const handleCopy = () => {
    navigator.clipboard.writeText(targetNumber.replace(/-/g, ''));
    setIsCopied(true);
    onShowToast('Nomor berhasil disalin!', 'success');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleStartVerification = () => {
    if (!proofUrl) {
      setUploadError('Silakan unggah bukti pembayaran terlebih dahulu.');
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
      onConfirmPayment(proofUrl, proofName || `bukti_${methodId}.jpg`);
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

      {/* Main Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/95 dark:bg-slate-900/95 light:bg-white light:border-slate-200 shadow-xl p-5 sm:p-6">
        {/* Header with Logo */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="w-12 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shadow border border-slate-200 shrink-0">
            <img
              src={method.image}
              alt={method.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-black text-white dark:text-white light:text-slate-900">
              Pembayaran {method.name}
            </h2>
            <p className="text-[11px] text-slate-400">
              Transfer saldo {method.name} ke nomor akun resmi Vrena Store
            </p>
          </div>
        </div>

        {/* Compact Number Card */}
        <div className="my-4 p-4 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-950/80 border border-indigo-500/40 text-center shadow-md">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 flex items-center justify-center gap-1 mb-1">
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
            <span>Nomor Tujuan Transfer {method.name}</span>
          </span>

          <div className="text-xl sm:text-2xl font-black font-mono tracking-wider text-white select-all">
            {targetNumber}
          </div>

          <p className="text-[11px] text-slate-400 mt-1 font-medium">
            Atas Nama: <strong className="text-indigo-300">Kenos Store</strong>
          </p>

          <button
            type="button"
            onClick={handleCopy}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-all hover:scale-105 active:scale-95"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                <span>Nomor Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Nomor</span>
              </>
            )}
          </button>
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

        {/* Upload Bukti Transfer */}
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
                {serverStep === 1 && 'Mengunggah & mengenkripsi bukti transfer...'}
                {serverStep === 2 && `Sinkronisasi mutasi ${method.name} dengan server Kenos...`}
                {serverStep === 3 && 'Memvalidasi data & menerbitkan nomor invoice...'}
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${serverProgress}%` }}
              />
            </div>

            <p className="text-[10px] text-slate-400 text-right">
              Proses transmisi data ({serverProgress}%)
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
                ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-indigo-600/25 hover:scale-[1.01] active:scale-[0.99]'
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
                <span>Lanjutkan Pembayaran</span>
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
