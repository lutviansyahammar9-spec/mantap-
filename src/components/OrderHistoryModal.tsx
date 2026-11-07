import React from 'react';
import { OrderRecord } from '../types';
import { formatRupiah, formatAccountDisplay } from '../data/products';
import { History, X, Clock, Trash2, ExternalLink, Gamepad2 } from 'lucide-react';

interface OrderHistoryModalProps {
  orders: OrderRecord[];
  onClose: () => void;
  onClearHistory: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  orders,
  onClose,
  onClearHistory,
}) => {
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-slate-700/80 bg-slate-900/95 dark:bg-slate-900/95 light:bg-white light:border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white dark:text-white light:text-slate-900">
                Riwayat Pesanan
              </h2>
              <p className="text-xs text-slate-400">
                Daftar transaksi yang disimpan di browser lokal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders list */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {orders.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-500">
                <History className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white dark:text-white light:text-slate-800">
                Belum Ada Riwayat Pesanan
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Pesanan top up yang kamu buat akan otomatis tercatat dan tersimpan di sini.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const isFreeFire = order.gameId === 'freefire';

              return (
                <div
                  key={order.orderId}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 p-4 sm:p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/60">
                        {order.orderId}
                      </span>
                      <span className="text-xs text-slate-400">
                        {order.createdAt}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      <Clock className="w-3 h-3" />
                      <span>{order.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Game & Produk:</span>
                      <strong className="text-white dark:text-white light:text-slate-900 text-sm">
                        {order.gameName} — {order.productName}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Akun Tujuan:</span>
                      <strong className="text-white dark:text-white light:text-slate-900 text-sm">
                        {formatAccountDisplay(order.accountData)}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                    <span className="text-slate-400">
                      Metode: <strong className="text-white dark:text-white light:text-slate-900">{order.paymentMethodName}</strong>
                    </span>

                    <span className="text-base font-extrabold text-emerald-400">
                      {formatRupiah(order.price)}
                    </span>
                  </div>

                  {order.paymentProofUrl && (
                    <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400">
                      <span>Bukti transfer terlampir:</span>
                      <span className="font-medium text-slate-300 truncate max-w-[200px]">
                        {order.paymentProofName || 'bukti_transfer.jpg'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {orders.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-wrap items-center justify-between gap-3">
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-400 font-semibold">Hapus semua riwayat?</span>
                <button
                  type="button"
                  onClick={() => {
                    onClearHistory();
                    setConfirmDelete(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
                >
                  Ya, Hapus
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Batal
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Semua Riwayat</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-colors"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
