import React, { useRef } from 'react';
import { UploadCloud, Image, Trash2, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ProofUploadProps {
  proofUrl: string | null;
  proofName: string | null;
  onUpload: (url: string, name: string) => void;
  onRemove: () => void;
  onError: (msg: string) => void;
}

export const ProofUpload: React.FC<ProofUploadProps> = ({
  proofUrl,
  proofName,
  onUpload,
  onRemove,
  onError,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onError('File yang diunggah harus berupa gambar (JPG, PNG, atau WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      onError('Ukuran gambar maksimal adalah 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onUpload(result, file.name);
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 p-5">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 flex items-center gap-1.5">
          <UploadCloud className="w-4 h-4 text-indigo-400" />
          <span>Upload Bukti Transfer <span className="text-rose-400">*</span></span>
        </label>
        {proofUrl ? (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Bukti Siap
          </span>
        ) : (
          <span className="text-[11px] font-semibold text-rose-400">
            Wajib Diunggah
          </span>
        )}
      </div>

      {!proofUrl ? (
        <div
          onClick={triggerUpload}
          className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-900/40 hover:bg-slate-900/80 group"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 flex items-center justify-center mx-auto mb-3 transition-transform">
            <Image className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-white dark:text-white light:text-slate-900">
            Klik untuk Pilih File Bukti Transfer
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Bisa ambil foto struk / screenshot bukti transfer dari galeri HP atau komputer (JPG, PNG maks 5MB)
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerUpload();
            }}
            className="mt-4 px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-colors"
          >
            Pilih Gambar
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Preview box */}
          <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center max-h-60 p-2">
            <img
              src={proofUrl}
              alt="Bukti Transfer"
              className="max-h-56 max-w-full object-contain rounded-lg"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="truncate text-slate-300">
              <span className="text-slate-500 font-medium mr-1.5">File:</span>
              <strong className="text-white truncate">{proofName || 'bukti_transfer.jpg'}</strong>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={triggerUpload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ganti Gambar</span>
              </button>

              <button
                type="button"
                onClick={onRemove}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/80 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="mt-2.5 text-[11px] text-slate-400 leading-relaxed">
        *Pastikan nominal transfer sesuai dengan total pembayaran agar proses verifikasi pesanan berjalan lancar.
      </p>
    </div>
  );
};
