import { ProductItem, PaymentMethodId, OrderAccountData, GameId } from '../types';

// Direct asset imports so Vite compiles and bundles them safely into production build without broken paths
import bannerTokoImg from '../assets/images/banner_toko.png';
import bannerFreefireImg from '../assets/images/freefire/banner_freefire.png';
import cardFreefireImg from '../assets/images/freefire/card_freefire.jpg';
import bpCardImg from '../assets/images/freefire/bp_card.webp';
import diamondFreefireImg from '../assets/images/freefire/diamond_freefire.png';
import memberBulananImg from '../assets/images/freefire/member_bulanan.png';
import memberMingguanImg from '../assets/images/freefire/member_mingguan.png';
import ffwsThroneImg from '../assets/images/freefire/ffws_throne.png';
import permaisuriCahayaImg from '../assets/images/freefire/permaisuri_cahaya_bundle.png';
import scarCahayaBulanImg from '../assets/images/freefire/scar_cahaya_bulan.png';
import sultanCahayaImg from '../assets/images/freefire/sultan_cahaya_bundle.png';
import supergamerBundleImg from '../assets/images/freefire/supergamer_bundle.png';

import robloxBannerImg from '../assets/images/roblox/roblox_banner.png';
import robloxCardImg from '../assets/images/roblox/roblox_card.png';
import robuxImg from '../assets/images/roblox/robux.jpg';

// New Games: Mobile Legends
import bannerMobileLegendImg from '../assets/images/mobilelegend/banner_mobilelegend.png';
import cardMobileLegendImg from '../assets/images/mobilelegend/card_mobilelegend.png';
import diamondMlbbImg from '../assets/images/mobilelegend/diamond_mlbb.png';
import weeklyPassImg from '../assets/images/mobilelegend/weekly_pass.png';

// New Games: FC Mobile
import bannerFcMobileImg from '../assets/images/fcmobile/banner_fcmobile.png';
import cardFcMobileImg from '../assets/images/fcmobile/card_fcmobile.png';
import fcPointImg from '../assets/images/fcmobile/fc_point.png';
import silverImg from '../assets/images/fcmobile/silver.png';

// New Games: Pokemon Unite
import bannerPokemonUniteImg from '../assets/images/pokemonunite/banner_pokemonunite.png';
import cardPokemonUniteImg from '../assets/images/pokemonunite/card_pokemonunite.png';
import aeosGemsImg from '../assets/images/pokemonunite/aeos_gems.png';

// New Games: Blood Strike
import bannerBloodStrikeImg from '../assets/images/bloodstrike/banner_bloodstrike.png';
import cardBloodStrikeImg from '../assets/images/bloodstrike/card_bloodstrike.png';
import goldBloodStrikeImg from '../assets/images/bloodstrike/gold.png';

import danaImg from '../assets/images/payment/dana.webp';
import gopayImg from '../assets/images/payment/gopay.png';
import qrVrenaStoreImg from '../assets/images/payment/qr_vrena_store.jpeg';
import qrisImg from '../assets/images/payment/qris.png';

export const STORE_ASSETS = {
  storeBanner: bannerTokoImg,
  freefireBanner: bannerFreefireImg,
  freefireCard: cardFreefireImg,
  robloxBanner: robloxBannerImg,
  robloxCard: robloxCardImg,
  mobilelegendBanner: bannerMobileLegendImg,
  mobilelegendCard: cardMobileLegendImg,
  fcmobileBanner: bannerFcMobileImg,
  fcmobileCard: cardFcMobileImg,
  pokemonuniteBanner: bannerPokemonUniteImg,
  pokemonuniteCard: cardPokemonUniteImg,
  bloodstrikeBanner: bannerBloodStrikeImg,
  bloodstrikeCard: cardBloodStrikeImg,
  qrCodeImage: qrVrenaStoreImg,
};

export const PAYMENT_METHODS: {
  id: PaymentMethodId;
  name: string;
  image: string;
  description: string;
  targetNumber?: string;
}[] = [
  {
    id: 'qris',
    name: 'QRIS',
    image: qrisImg,
    description: 'Scan QRIS menggunakan aplikasi pembayaran apa saja yang mendukung QRIS (BCA, Mandiri, BRI, GoPay, OVO, DANA, dll).',
  },
  {
    id: 'dana',
    name: 'DANA',
    image: danaImg,
    description: 'Transfer menggunakan aplikasi DANA ke nomor resmi (a.n Kenos Store).',
    targetNumber: '0851-1736-4018',
  },
  {
    id: 'gopay',
    name: 'GoPay',
    image: gopayImg,
    description: 'Transfer menggunakan aplikasi GoPay ke nomor resmi (a.n Kenos Store).',
    targetNumber: '0851-1736-4018',
  },
];

// FREE FIRE
export const FREE_FIRE_SPECIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'ff-bp-card',
    gameId: 'freefire',
    category: 'special',
    name: 'BP Card',
    price: 15500,
    originalPrice: 45000,
    image: bpCardImg,
    isSoldOut: true,
    badge: 'SOLD OUT',
  },
  {
    id: 'ff-member-mingguan',
    gameId: 'freefire',
    category: 'special',
    name: 'Member Mingguan',
    price: 10000,
    originalPrice: 28000,
    image: memberMingguanImg,
    badge: 'Tersedia',
  },
  {
    id: 'ff-member-bulanan',
    gameId: 'freefire',
    category: 'special',
    name: 'Member Bulanan',
    price: 30000,
    originalPrice: 85000,
    image: memberBulananImg,
    badge: 'Tersedia',
  },
];

export const FREE_FIRE_DIAMOND_PRODUCTS: ProductItem[] = [
  {
    id: 'ff-dm-70',
    gameId: 'freefire',
    category: 'diamond',
    name: '70 Diamond',
    price: 5000,
    originalPrice: 10000,
    image: diamondFreefireImg,
  },
  {
    id: 'ff-dm-140',
    gameId: 'freefire',
    category: 'diamond',
    name: '140 Diamond',
    price: 10000,
    originalPrice: 20000,
    image: diamondFreefireImg,
  },
  {
    id: 'ff-dm-210',
    gameId: 'freefire',
    category: 'diamond',
    name: '210 Diamond',
    price: 15000,
    originalPrice: 30000,
    image: diamondFreefireImg,
  },
  {
    id: 'ff-dm-355',
    gameId: 'freefire',
    category: 'diamond',
    name: '355 Diamond',
    price: 23000,
    originalPrice: 50000,
    image: diamondFreefireImg,
  },
  {
    id: 'ff-dm-720',
    gameId: 'freefire',
    category: 'diamond',
    name: '720 Diamond',
    price: 32000,
    originalPrice: 100000,
    image: diamondFreefireImg,
  },
  {
    id: 'ff-dm-1000-promo',
    gameId: 'freefire',
    category: 'diamond',
    name: '1000 Diamond',
    price: 20000,
    originalPrice: 150000,
    image: diamondFreefireImg,
    isPromo: true,
    promoStock: 12,
    badge: 'PROMO 11.11',
  },
];

export const FREE_FIRE_GIFT_PRODUCTS: ProductItem[] = [
  {
    id: 'ff-gift-ffws',
    gameId: 'freefire',
    category: 'gift',
    name: 'FFWS Throne',
    price: 30000,
    originalPrice: 300000,
    image: ffwsThroneImg,
    badge: 'Diskon 90%',
    isOrangeBundle: true,
  },
  {
    id: 'ff-gift-supergamer',
    gameId: 'freefire',
    category: 'gift',
    name: 'Supergamer Bundle',
    price: 25000,
    originalPrice: 250000,
    image: supergamerBundleImg,
    badge: 'Diskon 90%',
    isOrangeBundle: true,
  },
  {
    id: 'ff-gift-scar',
    gameId: 'freefire',
    category: 'gift',
    name: 'SCAR Cahaya Bulan',
    price: 15000,
    originalPrice: 150000,
    image: scarCahayaBulanImg,
    badge: 'Diskon 90%',
  },
  {
    id: 'ff-gift-sultan',
    gameId: 'freefire',
    category: 'gift',
    name: 'Sultan Cahaya Bundle',
    price: 5000,
    originalPrice: 50000,
    image: sultanCahayaImg,
    badge: 'Diskon 90%',
  },
  {
    id: 'ff-gift-permaisuri',
    gameId: 'freefire',
    category: 'gift',
    name: 'Permaisuri Cahaya Bundle',
    price: 5000,
    originalPrice: 50000,
    image: permaisuriCahayaImg,
    badge: 'Diskon 90%',
  },
];

// ROBLOX
export const ROBLOX_PRODUCTS: ProductItem[] = [
  {
    id: 'rbx-80',
    gameId: 'roblox',
    category: 'robux',
    name: '80 Robux',
    price: 5000,
    originalPrice: 15000,
    image: robuxImg,
  },
  {
    id: 'rbx-160',
    gameId: 'roblox',
    category: 'robux',
    name: '160 Robux',
    price: 10000,
    originalPrice: 28000,
    image: robuxImg,
  },
  {
    id: 'rbx-220',
    gameId: 'roblox',
    category: 'robux',
    name: '220 Robux',
    price: 15000,
    originalPrice: 40000,
    image: robuxImg,
  },
  {
    id: 'rbx-350',
    gameId: 'roblox',
    category: 'robux',
    name: '350 Robux',
    price: 20000,
    originalPrice: 55000,
    image: robuxImg,
  },
];

// 1. MOBILE LEGENDS
export const MOBILE_LEGEND_DIAMOND_PRODUCTS: ProductItem[] = [
  {
    id: 'mlbb-dm-42',
    gameId: 'mobilelegend',
    category: 'mlbb-diamond',
    name: '42 Diamond',
    price: 5000,
    originalPrice: 13000,
    image: diamondMlbbImg,
  },
  {
    id: 'mlbb-dm-75',
    gameId: 'mobilelegend',
    category: 'mlbb-diamond',
    name: '75 Diamond',
    price: 10000,
    originalPrice: 22000,
    image: diamondMlbbImg,
  },
  {
    id: 'mlbb-dm-110',
    gameId: 'mobilelegend',
    category: 'mlbb-diamond',
    name: '110 Diamond',
    price: 15000,
    originalPrice: 33000,
    image: diamondMlbbImg,
  },
  {
    id: 'mlbb-dm-148',
    gameId: 'mobilelegend',
    category: 'mlbb-diamond',
    name: '148 Diamond',
    price: 20000,
    originalPrice: 44000,
    image: diamondMlbbImg,
  },
  {
    id: 'mlbb-dm-210',
    gameId: 'mobilelegend',
    category: 'mlbb-diamond',
    name: '210 Diamond',
    price: 25000,
    originalPrice: 65000,
    image: diamondMlbbImg,
    badge: 'Diskon 62%',
    badgeStyle: 'red',
  },
  {
    id: 'mlbb-dm-1000',
    gameId: 'mobilelegend',
    category: 'mlbb-diamond',
    name: '1000 Diamond',
    price: 80000,
    originalPrice: 300000,
    image: diamondMlbbImg,
    badge: 'Diskon 73%',
    badgeStyle: 'green',
  },
];

export const MOBILE_LEGEND_PASS_PRODUCTS: ProductItem[] = [
  {
    id: 'mlbb-weekly-pass',
    gameId: 'mobilelegend',
    category: 'mlbb-pass',
    name: 'Weekly Pass',
    price: 15000,
    originalPrice: 30000,
    image: weeklyPassImg,
    badge: 'Hemat 50%',
  },
];

// 2. FC MOBILE
export const FC_MOBILE_SILVER_PRODUCTS: ProductItem[] = [
  {
    id: 'fc-silver-499',
    gameId: 'fcmobile',
    category: 'fc-silver',
    name: '499 Silver',
    price: 20000,
    originalPrice: 70000,
    image: silverImg,
    badge: 'Diskon 71%',
  },
];

export const FC_MOBILE_POINT_PRODUCTS: ProductItem[] = [
  {
    id: 'fc-point-100',
    gameId: 'fcmobile',
    category: 'fc-point',
    name: '100 FC Point',
    price: 5000,
    originalPrice: 15000,
    image: fcPointImg,
  },
  {
    id: 'fc-point-520',
    gameId: 'fcmobile',
    category: 'fc-point',
    name: '520 FC Point',
    price: 30000,
    originalPrice: 70000,
    image: fcPointImg,
  },
  {
    id: 'fc-point-2200',
    gameId: 'fcmobile',
    category: 'fc-point',
    name: '2.200 FC Point',
    price: 80000,
    originalPrice: 300000,
    image: fcPointImg,
    badge: 'Diskon 73%',
  },
  {
    id: 'fc-point-5750',
    gameId: 'fcmobile',
    category: 'fc-point',
    name: '5.750 FC Point',
    price: 140000,
    originalPrice: 750000,
    image: fcPointImg,
    badge: 'Diskon 81%',
  },
  {
    id: 'fc-point-12000',
    gameId: 'fcmobile',
    category: 'fc-point',
    name: '12.000 FC Point',
    price: 250000,
    originalPrice: 1450000,
    image: fcPointImg,
    badge: 'Diskon 83%',
    badgeStyle: 'green',
  },
];

// 3. POKEMON UNITE
export const POKEMON_UNITE_PRODUCTS: ProductItem[] = [
  {
    id: 'poke-gem-60',
    gameId: 'pokemonunite',
    category: 'pokemon-gems',
    name: '60 AeosGems (ID)',
    price: 5000,
    originalPrice: 9500,
    image: aeosGemsImg,
  },
  {
    id: 'poke-gem-250',
    gameId: 'pokemonunite',
    category: 'pokemon-gems',
    name: '250 AeosGems (ID)',
    price: 15000,
    originalPrice: 28500,
    image: aeosGemsImg,
  },
  {
    id: 'poke-gem-525',
    gameId: 'pokemonunite',
    category: 'pokemon-gems',
    name: '525 AeosGems (ID)',
    price: 30000,
    originalPrice: 57000,
    image: aeosGemsImg,
  },
  {
    id: 'poke-gem-1350',
    gameId: 'pokemonunite',
    category: 'pokemon-gems',
    name: '1350 AeosGems (ID)',
    price: 50000,
    originalPrice: 95000,
    image: aeosGemsImg,
    badge: 'Lebih Hemat',
    badgeStyle: 'green',
  },
];

// 4. BLOOD STRIKE (Belum Tersedia)
export const BLOOD_STRIKE_PRODUCTS: ProductItem[] = [
  {
    id: 'bs-gold-100',
    gameId: 'bloodstrike',
    category: 'bloodstrike-gold',
    name: '100 Gold',
    price: 1000000,
    image: goldBloodStrikeImg,
    isSoldOut: true,
    badge: 'Belum Tersedia',
  },
  {
    id: 'bs-gold-300',
    gameId: 'bloodstrike',
    category: 'bloodstrike-gold',
    name: '300 Gold',
    price: 1000000,
    image: goldBloodStrikeImg,
    isSoldOut: true,
    badge: 'Belum Tersedia',
  },
  {
    id: 'bs-gold-500',
    gameId: 'bloodstrike',
    category: 'bloodstrike-gold',
    name: '500 Gold',
    price: 1000000,
    image: goldBloodStrikeImg,
    isSoldOut: true,
    badge: 'Belum Tersedia',
  },
  {
    id: 'bs-gold-1000',
    gameId: 'bloodstrike',
    category: 'bloodstrike-gold',
    name: '1000 Gold',
    price: 1000000,
    image: goldBloodStrikeImg,
    isSoldOut: true,
    badge: 'Belum Tersedia',
  },
  {
    id: 'bs-gold-2000',
    gameId: 'bloodstrike',
    category: 'bloodstrike-gold',
    name: '2000 Gold',
    price: 1000000,
    image: goldBloodStrikeImg,
    isSoldOut: true,
    badge: 'Belum Tersedia',
  },
];

export const GAME_DETAILS: Record<
  string,
  {
    id: string;
    name: string;
    publisher: string;
    banner: string;
    card: string;
    startingPrice: string;
    isAvailable: boolean;
    tag: string;
  }
> = {
  freefire: {
    id: 'freefire',
    name: 'Free Fire',
    publisher: 'Garena',
    banner: bannerFreefireImg,
    card: cardFreefireImg,
    startingPrice: 'Rp 5.000',
    isAvailable: true,
    tag: 'HOT',
  },
  roblox: {
    id: 'roblox',
    name: 'Roblox',
    publisher: 'Roblox Corporation',
    banner: robloxBannerImg,
    card: robloxCardImg,
    startingPrice: 'Rp 5.000',
    isAvailable: true,
    tag: 'POPULAR',
  },
  mobilelegend: {
    id: 'mobilelegend',
    name: 'Mobile Legends',
    publisher: 'Moonton',
    banner: bannerMobileLegendImg,
    card: cardMobileLegendImg,
    startingPrice: 'Rp 5.000',
    isAvailable: true,
    tag: 'BESTSELLER',
  },
  fcmobile: {
    id: 'fcmobile',
    name: 'EA SPORTS FC Mobile',
    publisher: 'Electronic Arts',
    banner: bannerFcMobileImg,
    card: cardFcMobileImg,
    startingPrice: 'Rp 5.000',
    isAvailable: true,
    tag: 'RESMI',
  },
  pokemonunite: {
    id: 'pokemonunite',
    name: 'Pokemon Unite',
    publisher: 'The Pokemon Company',
    banner: bannerPokemonUniteImg,
    card: cardPokemonUniteImg,
    startingPrice: 'Rp 5.000',
    isAvailable: true,
    tag: 'INSTAN',
  },
  bloodstrike: {
    id: 'bloodstrike',
    name: 'Blood Strike',
    publisher: 'NetEase Games',
    banner: bannerBloodStrikeImg,
    card: cardBloodStrikeImg,
    startingPrice: 'Belum Tersedia',
    isAvailable: false,
    tag: 'SEGERA',
  },
};

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount).replace('Rp', 'Rp ');
}

export function getGameName(gameId: GameId): string {
  return GAME_DETAILS[gameId]?.name || (gameId === 'freefire' ? 'Free Fire' : gameId);
}

export function formatAccountDisplay(account: OrderAccountData): string {
  if (account.gameId === 'roblox') {
    return `@${account.username || '-'}`;
  }
  if (account.gameId === 'mobilelegend') {
    const nick = account.nickname ? ` (${account.nickname})` : '';
    return `ID: ${account.uid || '-'} (${account.serverId || '-'})${nick}`;
  }
  const nick = account.nickname ? ` (${account.nickname})` : '';
  return `UID: ${account.uid || '-'}${nick}`;
}

export function getDiscountPercentage(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
