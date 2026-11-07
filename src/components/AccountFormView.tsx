import React, { useState, useEffect, useRef } from 'react';
import { ProductItem, OrderAccountData, GameId } from '../types';
import { formatRupiah, GAME_DETAILS, getDiscountPercentage } from '../data/products';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Hash,
  ShieldCheck,
  AlertTriangle,
  Server,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Sparkles,
  Info,
  Check,
  HelpCircle,
  Flame,
} from 'lucide-react';

interface AccountFormViewProps {
  gameId: GameId;
  product: ProductItem;
  initialAccountData: OrderAccountData;
  onSubmit: (data: OrderAccountData) => void;
  onBack: () => void;
}

export const AccountFormView: React.FC<AccountFormViewProps> = ({
  gameId,
  product,
  initialAccountData,
  onSubmit,
  onBack,
}) => {
  const [uid, setUid] = useState(initialAccountData.uid || '');
  const [serverId, setServerId] = useState(initialAccountData.serverId || '');
  const [nickname, setNickname] = useState(initialAccountData.nickname || '');
  const [username, setUsername] = useState(initialAccountData.username || '');
  const [errorMessage, setErrorMessage] = useState('');

  // Free Fire Nickname Auto-Checker State
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isManualEdit, setIsManualEdit] = useState(false);
  const [notFoundNotice, setNotFoundNotice] = useState<string | null>(null);
  const [showIdGuide, setShowIdGuide] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isFreeFire = gameId === 'freefire';
  const isRoblox = gameId === 'roblox';
  const isMobileLegend = gameId === 'mobilelegend';
  const isFcMobile = gameId === 'fcmobile';
  const isPokemonUnite = gameId === 'pokemonunite';

  const gameInfo = GAME_DETAILS[gameId] || {
    name: isFreeFire
      ? 'Free Fire'
      : isRoblox
      ? 'Roblox'
      : isMobileLegend
      ? 'Mobile Legends'
      : isFcMobile
      ? 'FC Mobile'
      : isPokemonUnite
      ? 'Pokemon Unite'
      : 'Game',
    publisher: 'Game Publisher',
    tag: 'OFFICIAL',
  };

  const discountPercent = getDiscountPercentage(product.price, product.originalPrice);

  // Debounced auto-check nickname when Free Fire UID changes
  useEffect(() => {
    if (!isFreeFire) return;

    const cleanUid = uid.trim();
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (cleanUid.length >= 8 && /^\d+$/.test(cleanUid)) {
      debounceTimerRef.current = setTimeout(() => {
        checkFreeFireNickname(cleanUid);
      }, 400);
    } else {
      setIsVerified(false);
      setNotFoundNotice(null);
      if (!isManualEdit) {
        setNickname('');
      }
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [uid, isFreeFire]);

  // Function to call our backend Express endpoint (/api/check-nickname)
  const checkFreeFireNickname = async (targetId: string) => {
    setIsCheckingNickname(true);
    setErrorMessage('');
    setNotFoundNotice(null);

    try {
      const response = await fetch('/api/check-nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: targetId,
          game_code: 'freefire',
        }),
      });

      const data = await response.json();

      if (response.ok && data && data.status && data.nickname) {
        setNickname(data.nickname);
        setIsVerified(true);
        setNotFoundNotice(null);
      } else {
        setIsVerified(false);
        setNotFoundNotice(
          data?.message || `ID ${targetId} tidak ditemukan di server Free Fire. Silakan periksa kembali UID kamu atau isi nickname secara manual.`
        );
      }
    } catch (err) {
      console.warn('Gagal cek nickname via backend:', err);
      setIsVerified(false);
      setNotFoundNotice('Tidak dapat menghubungkan ke server validasi ID. Kamu dapat memasukkan nickname secara manual.');
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const handleOnlyDigits = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void,
    maxLen = 25
  ) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, maxLen);
    setter(val);
    if (errorMessage) setErrorMessage('');
    if (notFoundNotice) setNotFoundNotice(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (isFreeFire) {
      const cleanUid = uid.trim();
      if (!cleanUid) {
        setErrorMessage('User ID / UID Free Fire wajib diisi.');
        return;
      }
      if (!/^\d+$/.test(cleanUid) || cleanUid.length < 8 || cleanUid.length > 15) {
        setErrorMessage('User ID Free Fire harus berupa 8-15 digit angka yang valid.');
        return;
      }

      onSubmit({
        gameId: 'freefire',
        uid: cleanUid,
        nickname: nickname.trim() || undefined,
      });
    } else if (isRoblox) {
      const cleanUsername = username.trim();
      if (!cleanUsername) {
        setErrorMessage('Username Roblox wajib diisi.');
        return;
      }
      if (cleanUsername.length < 3 || cleanUsername.length > 20) {
        setErrorMessage('Username Roblox harus antara 3 - 20 karakter.');
        return;
      }

      onSubmit({
        gameId: 'roblox',
        username: cleanUsername,
      });
    } else if (isMobileLegend) {
      const cleanUid = uid.trim();
      const cleanServer = serverId.trim();

      if (!cleanUid) {
        setErrorMessage('User ID Mobile Legends wajib diisi.');
        return;
      }
      if (!cleanServer) {
        setErrorMessage('Server Zone ID Mobile Legends wajib diisi.');
        return;
      }

      if (!/^\d+$/.test(cleanUid) || cleanUid.length < 8 || cleanUid.length > 10) {
        setErrorMessage('User ID Mobile Legends harus berupa 8-10 digit angka.');
        return;
      }
      if (!/^\d+$/.test(cleanServer) || cleanServer.length < 4 || cleanServer.length > 5) {
        setErrorMessage('Zone Server ID Mobile Legends harus berupa 4-5 digit angka.');
        return;
      }

      onSubmit({
        gameId: 'mobilelegend',
        uid: cleanUid,
        serverId: cleanServer,
        nickname: nickname.trim() || undefined,
      });
    } else if (isFcMobile) {
      const cleanUid = uid.trim();
      if (!cleanUid) {
        setErrorMessage('UID Akun FC Mobile wajib diisi.');
        return;
      }
      if (!/^\d+$/.test(cleanUid) || cleanUid.length !== 18) {
        setErrorMessage('UID FC Mobile harus tepat berjumlah 18 digit angka.');
        return;
      }

      onSubmit({
        gameId: 'fcmobile',
        uid: cleanUid,
        nickname: nickname.trim() || undefined,
      });
    } else if (isPokemonUnite) {
      const cleanUid = uid.trim();
      if (!cleanUid) {
        setErrorMessage('Trainer ID Pokemon Unite wajib diisi.');
        return;
      }
      if (!/^\d+$/.test(cleanUid) || cleanUid.length !== 7) {
        setErrorMessage('Trainer ID Pokemon Unite harus tepat berjumlah 7 digit angka.');
        return;
      }

      onSubmit({
        gameId: 'pokemonunite',
        uid: cleanUid,
        nickname: nickname.trim() || undefined,
      });
    } else {
      const cleanUid = uid.trim();
      if (!cleanUid) {
        setErrorMessage('UID akun wajib diisi.');
        return;
      }
      onSubmit({
        gameId,
        uid: cleanUid,
        nickname: nickname.trim() || undefined,
      });
    }
  };

  return (
    <div className="py-6 max-w-2xl mx-auto px-4 sm:px-6 animate-in fade-in duration-200">
      {/* Top Back Action */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 backdrop-blur-md mb-5 transition-all shadow-sm hover:text-white"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Ganti Pilihan Produk</span>
      </button>

      {/* Progress Checkout Steps */}
      <div className="mb-6 p-3 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2 text-emerald-400">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="hidden sm:inline">Pilih Produk</span>
          </div>

          <div className="h-0.5 flex-1 mx-3 bg-indigo-500/40 rounded-full" />

          <div className="flex items-center gap-2 text-indigo-400">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black ring-4 ring-indigo-500/20">
              2
            </div>
            <span className="font-extrabold text-white">Data Akun</span>
          </div>

          <div className="h-0.5 flex-1 mx-3 bg-slate-800 rounded-full" />

          <div className="flex items-center gap-2 text-slate-500">
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
              3
            </div>
            <span className="hidden sm:inline">Pembayaran</span>
          </div>
        </div>
      </div>

      {/* Main Form Card Container */}
      <div className="rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Selected Product Summary Card with 11.11 Promo details */}
        <div className="relative z-10 p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-slate-900 p-2 flex items-center justify-center border border-slate-800 shrink-0 shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {gameInfo.name}
                </span>
                {discountPercent && (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-red-600 text-white flex items-center gap-0.5">
                    <Flame className="w-3 h-3 fill-current" />
                    11.11 SALE -{discountPercent}%
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white mt-1">
                {product.name}
              </h3>
            </div>
          </div>

          <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800/80 flex sm:flex-col justify-between items-end">
            <span className="text-[10px] text-slate-400 font-semibold block">Total Pembayaran</span>
            <div className="flex items-baseline gap-2">
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-semibold">
                  {formatRupiah(product.originalPrice)}
                </span>
              )}
              <span className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                {formatRupiah(product.price)}
              </span>
            </div>
          </div>
        </div>

        {/* Header Title & Guide Toggle */}
        <div className="relative z-10 flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Lengkapi Data Akun {gameInfo.name}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Masukkan ID akun kamu dengan benar agar top up otomatis terproses instan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowIdGuide(!showIdGuide)}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Petunjuk ID</span>
          </button>
        </div>

        {/* Collapsible ID Guide */}
        {showIdGuide && (
          <div className="mb-5 p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 animate-in fade-in duration-200">
            <div className="font-bold text-white mb-1 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Cara Menemukan ID Akun:</span>
            </div>
            {isFreeFire && (
              <p className="leading-relaxed">
                Buka profil Free Fire di pojok kiri atas lobi. Salin nomor <strong>User ID (UID)</strong> yang berada tepat di bawah avatar dan nickname kamu.
              </p>
            )}
            {isMobileLegend && (
              <p className="leading-relaxed">
                Buka profil Mobile Legends di pojok kiri atas. ID kamu tertulis seperti: <strong>12345678 (2024)</strong>. Masukkan angka depan di kolom User ID dan angka dalam kurung di kolom Server ID.
              </p>
            )}
            {isRoblox && (
              <p className="leading-relaxed">
                Masukkan <strong>Username Roblox</strong> kamu yang digunakan saat login (contoh: <code>GamerPro99</code>), bukan Display Name yang bisa diubah-ubah.
              </p>
            )}
            {isFcMobile && (
              <p className="leading-relaxed">
                Buka menu Pengaturan &gt; Profil Akun di FC Mobile, kemudian salin 18 digit UID akun kamu.
              </p>
            )}
            {isPokemonUnite && (
              <p className="leading-relaxed">
                Buka profil Trainer di menu utama game Pokemon Unite, periksa 7 digit Trainer ID kamu.
              </p>
            )}
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5 animate-in shake">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-bold">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {/* ============================================================ */}
          {/* 1. FREE FIRE FORM WITH LIVE NICKNAME CHECKER                */}
          {/* ============================================================ */}
          {isFreeFire && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-amber-400" />
                    <span>User ID / UID Free Fire</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {uid.length}/15 digit
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={uid}
                    onChange={(e) => handleOnlyDigits(e, setUid, 15)}
                    placeholder="Masukkan UID (contoh: 225009777)"
                    className="w-full pl-4 pr-12 py-3.5 rounded-2xl border-2 border-slate-700/80 bg-slate-950 text-white font-mono text-base font-bold tracking-wider placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all shadow-inner"
                  />

                  {/* Indicator or check spinner inside input */}
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
                    {isCheckingNickname ? (
                      <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                    ) : isVerified ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <span className="text-xs text-slate-500 font-bold">UID</span>
                    )}
                  </div>
                </div>
              </div>

              {/* LIVE USERNAME DISPLAY BOX (Requested explicitly by user) */}
              {isCheckingNickname && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 animate-pulse">
                  <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
                  <div className="text-xs text-amber-300 font-semibold">
                    Memeriksa ID {uid} ke database resmi Free Fire...
                  </div>
                </div>
              )}

              {/* Verified Nickname Banner - EXACT MATCH FROM SERVER */}
              {!isCheckingNickname && isVerified && nickname && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border-2 border-emerald-500/60 shadow-lg shadow-emerald-900/20 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Username Terdeteksi Sesuai Akun</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Resmi Terverifikasi
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsManualEdit(!isManualEdit)}
                        className="text-[11px] font-semibold text-slate-400 hover:text-white underline cursor-pointer"
                      >
                        {isManualEdit ? 'Selesai' : 'Ubah'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-400 font-bold">Username :</span>
                    <strong className="text-base sm:text-lg font-black text-white tracking-wide font-mono">
                      {nickname}
                    </strong>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Region: <strong>Indonesia (ID)</strong></span>
                    <span className="text-emerald-400 font-bold">✓ Akun Siap Menerima Diamond</span>
                  </div>
                </div>
              )}

              {/* ID Not Found Warning Notification */}
              {!isCheckingNickname && notFoundNotice && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 animate-in fade-in duration-200">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold text-amber-300 block mb-0.5">ID Akun Belum Terdeteksi</span>
                      <p className="text-[11px] text-slate-300 mb-1.5 leading-relaxed">{notFoundNotice}</p>
                      <p className="text-[11px] text-amber-400 font-semibold">
                        💡 Kamu tetap dapat melanjutkan pemesanan dengan memasukkan nickname game Free Fire kamu pada kolom di bawah:
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Manual Nickname Input Field */}
              {(isManualEdit || (!isVerified && uid.length >= 8 && !isCheckingNickname)) && (
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 animate-in fade-in">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Nickname Game Free Fire <span className="text-slate-500 text-[11px] font-normal">(masukkan jika belum terdeteksi otomatis)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Masukkan nickname Free Fire kamu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm font-semibold text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Manual Trigger Button if user wants to re-check */}
              {uid.length >= 8 && !isCheckingNickname && (
                <button
                  type="button"
                  onClick={() => checkFreeFireNickname(uid)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 py-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Cek Ulang ID</span>
                </button>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* 2. MOBILE LEGENDS DUAL INPUT (USER ID + SERVER ZONE ID)     */}
          {/* ============================================================ */}
          {isMobileLegend && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* User ID (2 cols) */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-blue-400" />
                      <span>User ID MLBB</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">{uid.length}/10</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={uid}
                    onChange={(e) => handleOnlyDigits(e, setUid, 10)}
                    placeholder="Contoh: 12345678"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-700/80 bg-slate-950 text-white font-mono text-base font-bold focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-inner"
                  />
                </div>

                {/* Server Zone ID (1 col) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Zone ID</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">{serverId.length}/5</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={serverId}
                    onChange={(e) => handleOnlyDigits(e, setServerId, 5)}
                    placeholder="(2024)"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-700/80 bg-slate-950 text-white font-mono text-base font-bold focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-inner text-center"
                  />
                </div>
              </div>

              {/* Optional Nickname */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Nickname Game <span className="text-slate-500 text-[11px] font-normal">(opsional untuk verifikasi)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Contoh: RRQ_Lemon"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 3. ROBLOX USERNAME FORM                                      */}
          {/* ============================================================ */}
          {isRoblox && (
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-400" />
                    <span>Username Roblox</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">{username.length}/20</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-red-400 font-bold text-base">
                    @
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Contoh: Builderman123"
                    className="w-full pl-9 pr-4 py-3 rounded-2xl border-2 border-slate-700/80 bg-slate-950 text-white font-semibold text-base focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all shadow-inner"
                  />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 text-[11px] text-red-300 flex items-center gap-2">
                <Info className="w-4 h-4 text-red-400 shrink-0" />
                <span>
                  Pastikan memasukkan <strong>Username Roblox asli</strong>, bukan Display Name. Robux akan dikirim langsung via game-pass atau direct transfer.
                </span>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 4. FC MOBILE (18 DIGITS) & POKEMON UNITE (7 DIGITS)          */}
          {/* ============================================================ */}
          {(isFcMobile || isPokemonUnite) && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <Hash className={`w-3.5 h-3.5 ${isFcMobile ? 'text-emerald-400' : 'text-purple-400'}`} />
                    <span>
                      {isFcMobile ? 'UID Akun FC Mobile (18 Digit)' : 'Trainer ID Pokemon Unite (7 Digit)'}
                    </span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] font-bold text-slate-400">
                    {uid.length} / {isFcMobile ? 18 : 7}
                  </span>
                </div>

                <input
                  type="text"
                  inputMode="numeric"
                  value={uid}
                  onChange={(e) => handleOnlyDigits(e, setUid, isFcMobile ? 18 : 7)}
                  placeholder={isFcMobile ? 'Contoh: 100234567890123456' : 'Contoh: 1234567'}
                  className={`w-full px-4 py-3 rounded-2xl border-2 border-slate-700/80 bg-slate-950 text-white font-mono text-base font-bold focus:outline-none shadow-inner transition-all ${
                    isFcMobile
                      ? 'focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20'
                      : 'focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20'
                  }`}
                />
              </div>

              {/* Optional Nickname */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Nickname Game <span className="text-slate-500 text-[11px] font-normal">(opsional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Masukkan nickname (opsional)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Trust & Instant Guarantee Badge */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-[11px] leading-tight">
                <strong className="text-white block font-bold">100% Aman & Tanpa Password</strong>
                <span className="text-slate-400">Hanya membutuhkan ID publik game kamu.</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-indigo-400 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Garansi Kirim 1-3 Menit</span>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wide bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <span>Lanjut ke Pilihan Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
