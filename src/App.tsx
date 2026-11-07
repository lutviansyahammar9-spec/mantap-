/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ViewState, 
  GameId, 
  ProductItem, 
  OrderAccountData, 
  PaymentMethodId, 
  OrderRecord, 
  ToastMessage 
} from './types';
import { PAYMENT_METHODS, getGameName } from './data/products';
import { Navbar } from './components/Navbar';
import { GameCards } from './components/GameCards';
import { FreeFireView } from './components/FreeFireView';
import { RobloxView } from './components/RobloxView';
import { MobileLegendView } from './components/MobileLegendView';
import { FcMobileView } from './components/FcMobileView';
import { PokemonUniteView } from './components/PokemonUniteView';
import { BloodStrikeView } from './components/BloodStrikeView';
import { StickySummaryBar } from './components/StickySummaryBar';
import { AccountFormView } from './components/AccountFormView';
import { PaymentSelectView } from './components/PaymentSelectView';
import { PaymentQrisView } from './components/PaymentQrisView';
import { PaymentTransferView } from './components/PaymentTransferView';
import { PaymentSuccessModal } from './components/PaymentSuccessModal';
import { PaymentExpiredModal } from './components/PaymentExpiredModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { ToastContainer } from './components/ToastContainer';
import { ReviewsSection } from './components/ReviewsSection';
import { TrustStatsSection } from './components/TrustStatsSection';
import { Loader2, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  // Theme state (Dark / Light) with localStorage
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('vrena_theme') || localStorage.getItem('kenos_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('vrena_theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('vrena_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // View state navigation
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activeGame, setActiveGame] = useState<GameId>('freefire');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Account form data
  const [accountData, setAccountData] = useState<OrderAccountData>({
    gameId: 'freefire',
    uid: '',
    serverId: '',
    nickname: '',
    username: '',
  });

  // Payment method
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId | null>(null);

  // Promo Stock (Initial 12 from master prompt)
  const [promoStock, setPromoStock] = useState<number>(() => {
    const saved = localStorage.getItem('vrena_ff_promo_stock') || localStorage.getItem('kenos_ff_promo_stock');
    return saved ? parseInt(saved, 10) : 12;
  });

  // Order history
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    const saved = localStorage.getItem('vrena_orders') || localStorage.getItem('kenos_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Active completed order for modal
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  // History modal open/close
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Loading state overlay
  const [isLoading, setIsLoading] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handle Game Selection from Home / Nav
  const handleSelectGame = (view: ViewState) => {
    if (
      view === 'freefire' ||
      view === 'roblox' ||
      view === 'mobilelegend' ||
      view === 'fcmobile' ||
      view === 'pokemonunite' ||
      view === 'bloodstrike'
    ) {
      setActiveGame(view as GameId);
      setAccountData({
        gameId: view as GameId,
        uid: '',
        serverId: '',
        nickname: '',
        username: '',
      });
    }
    setSelectedProduct(null);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Product Selection
  const handleSelectProduct = (product: ProductItem) => {
    if (product.isSoldOut) return;
    setSelectedProduct(product);
  };

  // Handle Checkout Continue from Sticky Bar
  const handleStartCheckout = () => {
    if (!selectedProduct) {
      showToast('Silakan pilih produk terlebih dahulu.', 'error');
      return;
    }
    setCurrentView('checkout-account');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Account Form Submit
  const handleAccountSubmit = (data: OrderAccountData) => {
    setAccountData(data);
    setCurrentView('checkout-payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Payment Selection Continue
  const handlePaymentSelectContinue = () => {
    if (!selectedPayment) {
      showToast('Silakan pilih salah satu metode pembayaran.', 'error');
      return;
    }

    if (selectedPayment === 'qris') {
      setCurrentView('payment-qris');
    } else {
      setCurrentView('payment-transfer');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Finalize Payment & Create Order
  const handleConfirmPayment = (proofUrl: string, proofName: string) => {
    if (!selectedProduct) return;

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `VRN-${randomNum}`;

    const paymentMethodObj = PAYMENT_METHODS.find((m) => m.id === selectedPayment);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: OrderRecord = {
      orderId,
      gameId: activeGame,
      gameName: getGameName(activeGame),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      price: selectedProduct.price,
      accountData,
      paymentMethod: selectedPayment || 'qris',
      paymentMethodName: paymentMethodObj ? paymentMethodObj.name : 'QRIS',
      paymentProofUrl: proofUrl,
      paymentProofName: proofName,
      createdAt: formattedDate,
      status: 'Menunggu Proses Pesanan',
    };

    // If 1000 diamond promo, decrement stock
    if (selectedProduct.id === 'ff-dm-1000-promo' && promoStock > 0) {
      const updatedStock = Math.max(1, promoStock - 1);
      setPromoStock(updatedStock);
      localStorage.setItem('vrena_ff_promo_stock', updatedStock.toString());
    }

    // Save to order history in localStorage
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('vrena_orders', JSON.stringify(updatedOrders));

    setCompletedOrder(newOrder);
    setCurrentView('payment-success');
    showToast('Pembayaran berhasil dikonfirmasi!', 'success');
  };

  // Reset to Home
  const handleResetToHome = () => {
    setSelectedProduct(null);
    setSelectedPayment(null);
    setCompletedOrder(null);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all history
  const handleClearHistory = () => {
    setOrders([]);
    localStorage.removeItem('vrena_orders');
    localStorage.removeItem('kenos_orders');
    showToast('Riwayat pesanan berhasil dibersihkan.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 light:bg-slate-50 light:text-slate-800 transition-colors duration-300">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Global Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (
            view === 'freefire' ||
            view === 'roblox' ||
            view === 'mobilelegend' ||
            view === 'fcmobile' ||
            view === 'pokemonunite' ||
            view === 'bloodstrike'
          ) {
            handleSelectGame(view);
          } else {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        orderCount={orders.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-xs font-bold text-slate-300 tracking-wide">
              Memuat Halaman...
            </p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        <div key={currentView} className="page-smooth-enter">
          {/* HOMEPAGE */}
          {currentView === 'home' && (
            <div>
            <GameCards onSelectGame={handleSelectGame} />
            <TrustStatsSection />
            <ReviewsSection />
          </div>
        )}

        {/* 1. FREE FIRE CATALOG */}
        {currentView === 'freefire' && (
          <>
            <FreeFireView
              selectedProduct={selectedProduct}
              onSelectProduct={handleSelectProduct}
              onBackToHome={() => setCurrentView('home')}
              promoStock={promoStock}
            />
            <StickySummaryBar
              selectedProduct={selectedProduct}
              onContinue={handleStartCheckout}
              onClear={() => setSelectedProduct(null)}
            />
          </>
        )}

        {/* 2. ROBLOX CATALOG */}
        {currentView === 'roblox' && (
          <>
            <RobloxView
              selectedProduct={selectedProduct}
              onSelectProduct={handleSelectProduct}
              onBackToHome={() => setCurrentView('home')}
            />
            <StickySummaryBar
              selectedProduct={selectedProduct}
              onContinue={handleStartCheckout}
              onClear={() => setSelectedProduct(null)}
            />
          </>
        )}

        {/* 3. MOBILE LEGENDS CATALOG */}
        {currentView === 'mobilelegend' && (
          <>
            <MobileLegendView
              selectedProduct={selectedProduct}
              onSelectProduct={handleSelectProduct}
              onBackToHome={() => setCurrentView('home')}
            />
            <StickySummaryBar
              selectedProduct={selectedProduct}
              onContinue={handleStartCheckout}
              onClear={() => setSelectedProduct(null)}
            />
          </>
        )}

        {/* 4. FC MOBILE CATALOG */}
        {currentView === 'fcmobile' && (
          <>
            <FcMobileView
              selectedProduct={selectedProduct}
              onSelectProduct={handleSelectProduct}
              onBackToHome={() => setCurrentView('home')}
            />
            <StickySummaryBar
              selectedProduct={selectedProduct}
              onContinue={handleStartCheckout}
              onClear={() => setSelectedProduct(null)}
            />
          </>
        )}

        {/* 5. POKEMON UNITE CATALOG */}
        {currentView === 'pokemonunite' && (
          <>
            <PokemonUniteView
              selectedProduct={selectedProduct}
              onSelectProduct={handleSelectProduct}
              onBackToHome={() => setCurrentView('home')}
            />
            <StickySummaryBar
              selectedProduct={selectedProduct}
              onContinue={handleStartCheckout}
              onClear={() => setSelectedProduct(null)}
            />
          </>
        )}

        {/* 6. BLOOD STRIKE CATALOG (Belum Tersedia) */}
        {currentView === 'bloodstrike' && (
          <BloodStrikeView onBackToHome={() => setCurrentView('home')} />
        )}

        {/* ACCOUNT DATA FORM */}
        {currentView === 'checkout-account' && selectedProduct && (
          <AccountFormView
            gameId={activeGame}
            product={selectedProduct}
            initialAccountData={accountData}
            onSubmit={handleAccountSubmit}
            onBack={() => setCurrentView(activeGame)}
          />
        )}

        {/* PAYMENT METHOD SELECTOR */}
        {currentView === 'checkout-payment' && selectedProduct && (
          <PaymentSelectView
            product={selectedProduct}
            accountData={accountData}
            selectedPayment={selectedPayment}
            onSelectPayment={(id) => {
              setSelectedPayment(id);
            }}
            onContinue={handlePaymentSelectContinue}
            onBack={() => setCurrentView('checkout-account')}
          />
        )}

        {/* QRIS PAYMENT VIEW */}
        {currentView === 'payment-qris' && selectedProduct && (
          <PaymentQrisView
            product={selectedProduct}
            accountData={accountData}
            onConfirmPayment={handleConfirmPayment}
            onBack={() => setCurrentView('checkout-payment')}
            onExpired={() => setCurrentView('payment-expired')}
          />
        )}

        {/* DANA & GOPAY PAYMENT VIEW */}
        {currentView === 'payment-transfer' && selectedProduct && selectedPayment && (
          <PaymentTransferView
            methodId={selectedPayment}
            product={selectedProduct}
            accountData={accountData}
            onConfirmPayment={handleConfirmPayment}
            onBack={() => setCurrentView('checkout-payment')}
            onShowToast={showToast}
          />
        )}

        {/* QRIS EXPIRED MODAL */}
        {currentView === 'payment-expired' && (
          <PaymentExpiredModal
            onRetry={() => {
              setCurrentView(activeGame);
              setSelectedProduct(null);
            }}
            onBackToHome={handleResetToHome}
          />
        )}
        </div>
      </main>

      {/* SUCCESS MODAL */}
      {currentView === 'payment-success' && completedOrder && (
        <PaymentSuccessModal
          order={completedOrder}
          onBackToHome={handleResetToHome}
          onOpenHistory={() => {
            setIsHistoryOpen(true);
            setCurrentView('home');
          }}
        />
      )}

      {/* ORDER HISTORY MODAL */}
      {isHistoryOpen && (
        <OrderHistoryModal
          orders={orders}
          onClose={() => setIsHistoryOpen(false)}
          onClearHistory={handleClearHistory}
        />
      )}

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 dark:bg-slate-950/80 light:bg-white light:border-slate-200 py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white dark:text-white light:text-slate-900 tracking-wider">
              VRENA STORE
            </span>
            <span>&bull;</span>
            <span>&copy; {new Date().getFullYear()} Hak Cipta Dilindungi</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Legal & Terpercaya
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for gamers
            </span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-4 pt-4 border-t border-slate-800/40 text-[11px] text-slate-500 text-center">
          Vrena Store merupakan toko digital game terpercaya. Seluruh gambar, karakter, dan aset merek game adalah hak cipta dari masing-masing publisher terkait (Garena, Roblox, Moonton, Electronic Arts, The Pokemon Company, dan NetEase Games).
        </div>
      </footer>
    </div>
  );
}
