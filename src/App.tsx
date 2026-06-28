import React, { useState, useEffect, FormEvent } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Instagram, 
  Trash2, 
  Plus, 
  Minus, 
  X, 
  ChevronRight, 
  Flame, 
  Gamepad2, 
  Bus, 
  Car, 
  Sliders, 
  CreditCard, 
  HelpCircle, 
  Check,
  TrendingUp,
  Award,
  Users,
  Copy,
  Info,
  BadgeAlert,
  Send,
  MessageSquare,
  Zap,
  Lock,
  Unlock,
  Edit2,
  PlusCircle,
  RotateCcw,
  LogOut
} from 'lucide-react';

// Interfaces for our state and items
interface PricelistItem {
  id: string;
  name: string;
  price: number;
  category: 'joki' | 'gift';
  subcategory: 'dds' | 'cdid' | 'gamepass-reguler' | 'gamepass-kilat';
  popular?: boolean;
}

interface CartItem {
  item: PricelistItem;
  quantity: number;
}

const INITIAL_ITEMS: PricelistItem[] = [
  // JOKI ROBLOX - Drag Drive Simulator (DDS)
  { id: 'dds-300m', name: '300 Juta Cash', price: 20000, category: 'joki', subcategory: 'dds' },
  { id: 'dds-500m', name: '500 Juta Cash', price: 30000, category: 'joki', subcategory: 'dds' },
  { id: 'dds-700m', name: '700 Juta Cash', price: 38000, category: 'joki', subcategory: 'dds' },
  { id: 'dds-1b', name: '1 Miliar Cash', price: 60000, category: 'joki', subcategory: 'dds', popular: true },
  { id: 'dds-2b', name: '2 Miliar Cash', price: 110000, category: 'joki', subcategory: 'dds' },
  { id: 'dds-5b', name: '5 Miliar Cash', price: 270000, category: 'joki', subcategory: 'dds' },

  // JOKI ROBLOX - Car Driving Indonesia (CDID)
  { id: 'cdid-10b', name: '10 Miliar Cash', price: 15000, category: 'joki', subcategory: 'cdid' },
  { id: 'cdid-20b', name: '20 Miliar Cash', price: 20000, category: 'joki', subcategory: 'cdid' },
  { id: 'cdid-50b', name: '50 Miliar Cash', price: 30000, category: 'joki', subcategory: 'cdid' },
  { id: 'cdid-100b', name: '100 Miliar Cash', price: 50000, category: 'joki', subcategory: 'cdid', popular: true },
  { id: 'cdid-200b', name: '200 Miliar Cash', price: 100000, category: 'joki', subcategory: 'cdid' },
  { id: 'cdid-400b', name: '400 Miliar Cash', price: 200000, category: 'joki', subcategory: 'cdid' },

  // GAMEPASS DDS REGULER (subcategory: 'gamepass-reguler')
  { id: 'reg-suspension', name: 'Suspension Pro [Reguler]', price: 6000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-boombox', name: 'Boombox Radio [Reguler]', price: 6000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-advance-paint', name: 'Advance Paint [Reguler]', price: 10000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-accessories', name: 'Premium Accessories [Reguler]', price: 10000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-rims', name: 'Exclusive Rims [Reguler]', price: 13000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-custom-plate', name: 'Custom Plate [Reguler]', price: 13000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-slot-limit', name: 'Slot Limit Unlock [Reguler]', price: 14000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-dragspec', name: 'DragSpec [Reguler]', price: 16000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-luxury', name: 'Luxury [Reguler]', price: 17000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-police', name: 'Police [Reguler]', price: 20000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-2x-paycheck', name: '2x Paycheck [Reguler]', price: 51000, category: 'gift', subcategory: 'gamepass-reguler', popular: true },
  { id: 'reg-50m-cash', name: '50 Juta Cash [Reguler]', price: 10000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-100m-cash', name: '100 Juta Cash [Reguler]', price: 14000, category: 'gift', subcategory: 'gamepass-reguler' },
  { id: 'reg-500m-cash', name: '500 Juta Cash [Reguler]', price: 42000, category: 'gift', subcategory: 'gamepass-reguler' },

  // GAMEPASS DDS KILAT (subcategory: 'gamepass-kilat')
  { id: 'kilat-custom-plate', name: 'Custom Plate [Kilat]', price: 14000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-advance-paint', name: 'Advance Paint [Kilat]', price: 10000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-2x-paycheck', name: '2x Paycheck [Kilat]', price: 75000, category: 'gift', subcategory: 'gamepass-kilat', popular: true },
  { id: 'kilat-luxury', name: 'Luxury [Kilat]', price: 20000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-dragspec', name: 'Dragspec [Kilat]', price: 18000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-boombox', name: 'Boombox Radio [Kilat]', price: 6000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-police', name: 'Police Pass [Kilat]', price: 23000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-suspension', name: 'Suspension Pro [Kilat]', price: 6000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-rims', name: 'Exclusive Rims [Kilat]', price: 14000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-slot-limit', name: 'Slot Limit Unlocker [Kilat]', price: 14000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-accessories', name: 'Premium Accessories [Kilat]', price: 11000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-10m-cash', name: '10 Juta Cash [Kilat]', price: 11000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-50m-cash', name: '50 Juta Cash [Kilat]', price: 13000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-100m-cash', name: '100 Juta Cash [Kilat]', price: 16000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-300m-cash', name: '300 Juta Cash [Kilat]', price: 30000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-500m-cash', name: '500 Juta Cash [Kilat]', price: 55000, category: 'gift', subcategory: 'gamepass-kilat' },
  { id: 'kilat-1b-cash', name: '1 Miliar Cash [Kilat]', price: 110000, category: 'gift', subcategory: 'gamepass-kilat' },
];

export default function App() {
  // Live WIB Time Clock State
  const [wibTime, setWibTime] = useState<Date>(() => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * 7));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      setWibTime(new Date(utc + (3600000 * 7)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatWIBClock = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }) + ' WIB';
  };

  const wibHour = wibTime.getHours();
  
  // Status check variables based on WIB Time
  const isStoreOpen = wibHour >= 9 && wibHour < 21;
  const isRegulerOpen = wibHour >= 12 && wibHour < 19;
  const isKilatOpen = true; // 24 Hours

  // Pricelist Items state loaded from localStorage or default
  const [items, setItems] = useState<PricelistItem[]>(() => {
    const saved = localStorage.getItem('sientong_store_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved items, using defaults:', e);
      }
    }
    return INITIAL_ITEMS;
  });

  const saveItems = (newItems: PricelistItem[]) => {
    setItems(newItems);
    localStorage.setItem('sientong_store_items', JSON.stringify(newItems));
  };

  // Admin states
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('sientong_admin') === 'true';
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState<string | null>(null);

  // Item management states
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PricelistItem | null>(null);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PricelistItem>>({
    id: '',
    name: '',
    price: 0,
    category: 'gift',
    subcategory: 'gamepass-kilat',
    popular: false
  });

  // States
  const [selectedSub, setSelectedSub] = useState<'dds' | 'cdid' | 'gamepass-reguler' | 'gamepass-kilat' | 'driving-empire' | 'bus-explore'>('dds');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Checkout Form
  const [robloxUsername, setRobloxUsername] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS'); // Removed OVO/Gopay, only QRIS or DANA
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [warningNotification, setWarningNotification] = useState<string | null>(null);

  const triggerWarning = (msg: string) => {
    setWarningNotification(msg);
    setTimeout(() => setWarningNotification(null), 4000);
  };

  // Admin and item actions
  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === 'kenari88') {
      setIsAdmin(true);
      sessionStorage.setItem('sientong_admin', 'true');
      setIsAdminModalOpen(false);
      setAdminPasswordInput('');
      setAdminPasswordError(null);
    } else {
      setAdminPasswordError('Password salah! Silakan coba lagi.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('sientong_admin');
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini dari pricelist?')) {
      const updated = items.filter(item => item.id !== itemId);
      saveItems(updated);
      triggerWarning('Item berhasil dihapus.');
    }
  };

  const handleSaveEditedItem = (e: FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const updated = items.map(item => item.id === editingItem.id ? editingItem : item);
    saveItems(updated);
    setIsEditItemModalOpen(false);
    setEditingItem(null);
  };

  const handleAddNewItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newItem.id || !newItem.name || newItem.price === undefined || newItem.price <= 0) {
      alert('Mohon isi ID, Nama, dan Harga item dengan benar.');
      return;
    }
    const itemToAdd: PricelistItem = {
      id: newItem.id,
      name: newItem.name,
      price: Number(newItem.price),
      category: newItem.category as 'joki' | 'gift',
      subcategory: newItem.subcategory as any,
      popular: !!newItem.popular
    };
    
    // Check if ID already exists
    if (items.some(item => item.id === itemToAdd.id)) {
      alert('ID item sudah terdaftar. Silakan gunakan ID unik.');
      return;
    }

    const updated = [...items, itemToAdd];
    saveItems(updated);
    setIsAddItemModalOpen(false);
    setNewItem({
      id: '',
      name: '',
      price: 0,
      category: 'gift',
      subcategory: 'gamepass-kilat',
      popular: false
    });
  };

  const handleResetToDefault = () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan semua pricelist dan harga ke pengaturan default? Semua perubahan custom Anda akan hilang.')) {
      saveItems(INITIAL_ITEMS);
    }
  };

  const isItemAvailable = (item: PricelistItem) => {
    if (item.subcategory === 'gamepass-reguler') {
      return isRegulerOpen;
    }
    return true;
  };

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('sientong_cart_v2');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('sientong_cart_v2', JSON.stringify(newCart));
  };

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const addToCart = (item: PricelistItem) => {
    if (!isItemAvailable(item)) {
      triggerWarning('GamePass DDS Reguler saat ini sedang TUTUP (Jam proses: 12:00 - 19:00 WIB). Silakan pilih GamePass DDS Kilat yang buka 24 jam!');
      return;
    }
    const existing = cart.find(c => c.item.id === item.id);
    if (existing) {
      const updated = cart.map(c => 
        c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { item, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string, forceAll = false) => {
    const existing = cart.find(c => c.item.id === itemId);
    if (!existing) return;

    if (existing.quantity === 1 || forceAll) {
      const updated = cart.filter(c => c.item.id !== itemId);
      saveCart(updated);
    } else {
      const updated = cart.map(c => 
        c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c
      );
      saveCart(updated);
    }
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.item.price * item.quantity), 0);

  // Filter items based on subcategory & search text
  const getFilteredItems = (subcategory: 'dds' | 'cdid' | 'gamepass-reguler' | 'gamepass-kilat') => {
    return items.filter(item => 
      item.subcategory === subcategory && 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Generate Instagram order format text
  const generateOrderMessage = () => {
    let msg = `Halo Sientong Store (@sientong.id)! 🌟\nSaya ingin memesan layanan Roblox berikut:\n\n`;
    msg += `📝 DAFTAR DETAIL PESANAN:\n`;
    
    cart.forEach((cartItem, idx) => {
      let subName = '';
      if (cartItem.item.subcategory === 'dds') subName = 'Drag Drive Simulator';
      else if (cartItem.item.subcategory === 'cdid') subName = 'Car Driving Indonesia';
      else if (cartItem.item.subcategory === 'gamepass-reguler') subName = 'GamePass DDS Reguler';
      else if (cartItem.item.subcategory === 'gamepass-kilat') subName = 'GamePass DDS Kilat';

      msg += `${idx + 1}. [${subName}] ${cartItem.item.name} x${cartItem.quantity} - ${formatPrice(cartItem.item.price * cartItem.quantity)}\n`;
    });

    msg += `\n💵 TOTAL HARGA: ${formatPrice(totalPrice)}\n`;
    msg += `👤 USERNAME ROBLOX: ${robloxUsername || '-'}\n`;
    msg += `💳 METODE PEMBAYARAN: ${paymentMethod}\n`;
    if (additionalNotes) {
      msg += `📌 CATATAN TAMBAHAN: ${additionalNotes}\n`;
    }
    msg += `\nMohon segera diproses ya kak Sientong. Terima kasih! 🙏✨`;
    return msg;
  };

  // Click on "Pesan" button (direct order for single item)
  const handleDirectOrder = (item: PricelistItem) => {
    if (!isItemAvailable(item)) {
      triggerWarning('GamePass DDS Reguler saat ini sedang TUTUP (Jam proses: 12:00 - 19:00 WIB). Silakan pilih GamePass DDS Kilat yang buka 24 jam!');
      return;
    }
    setCart([{ item, quantity: 1 }]);
    setIsCheckoutOpen(true);
  };

  // Process order, automatically copy format and redirect to instagram DM
  const handleCheckoutAndRedirect = () => {
    const orderMsg = generateOrderMessage();
    
    // Copy to clipboard
    navigator.clipboard.writeText(orderMsg).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    }).catch(err => {
      console.error('Failed to copy format message: ', err);
    });

    // Directly open Instagram DM URL to @sientong.id
    setTimeout(() => {
      window.open('https://www.instagram.com/sientong.id/', '_blank');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative pb-20 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* PROFESSIONAL DECORATIVE LIGHT BLUE & DEEP BLUE GRADIENT GLOWS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* TOP COMPACT BRAND NAVIGATION */}
      <nav className="relative z-10 border-b border-blue-900/40 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-400/10">
              <span className="font-black text-xl text-white tracking-wider">S</span>
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent tracking-tight">SIENTONG STORE</span>
              <p className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">Roblox Joki & Gift Gamepass</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="https://www.instagram.com/sientong.id/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-cyan-400 transition-colors text-xs font-semibold flex items-center space-x-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>@sientong.id</span>
            </a>

            {/* Shopping Cart Header Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:bg-slate-900/40 transition-all cursor-pointer"
              aria-label="Keranjang Belanja"
            >
              <ShoppingCart className="w-4 h-4 text-slate-300" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 bg-cyan-400 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center px-1 animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {isAdmin && (
        <div className="relative z-20 bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 border-b border-emerald-500/30 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Mode Admin Aktif</span>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">• Edit atau kelola katalog pricelist Anda secara instan</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setIsAddItemModalOpen(true)}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tambah Item</span>
            </button>
            <button
              onClick={handleResetToDefault}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer border border-slate-700 transition-colors"
              title="Reset Semua Ke Harga Default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
            <button
              onClick={handleAdminLogout}
              className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900/60 text-red-200 font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer border border-red-900/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* ORIGINAL BRAND IDENTITY HEADER (THEME: BLUE & CYAN) */}
      <section className="relative z-10 pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Header Copy Info */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 text-xs font-semibold mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sientong Store Pricelist Resmi & Aman</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
              Pricelist Roblox <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Aman, Cepat & Legal!
              </span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mb-6 leading-relaxed">
              Selamat datang di Sientong Store. Kami menyediakan jasa joki game Roblox (Drag Drive Simulator & Car Driving Indonesia) dengan jaminan koin instan amanah, serta gift gamepass reguler harga miring langsung masuk ke akun Anda.
            </p>

            {/* Unique Benefit Highlights */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8">
              <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-xl flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-200">100% Anti-Minus</span>
              </div>
              <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-xl flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-200">Proses Cepat & Rapih</span>
              </div>
            </div>

            {/* Quick Action Scroll Trigger */}
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <a 
                href="#categories-list"
                className="flex-1 sm:flex-none py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider text-center cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                Lihat Daftar Pricelist
              </a>
              <a 
                href="https://www.instagram.com/sientong.id/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 sm:flex-none py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider text-center cursor-pointer"
              >
                Hubungi Admin IG
              </a>
            </div>
          </div>

          {/* RIGHT STATS PREVIEW (AESTHETIC DECORATIVE GRAPHIC - NOT SIMULATING INFRASTRUCTURE) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="p-6 bg-gradient-to-br from-[#0c1224] to-[#040814] border border-blue-900/40 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-900/20">
                <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Waktu & Operasional</span>
                </span>
                <span className="text-[10px] bg-slate-950 text-cyan-400 font-mono font-bold px-2 py-0.5 rounded border border-blue-900/30">
                  {formatWIBClock(wibTime)}
                </span>
              </div>

              {/* Status Indicator */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-900 text-xs">
                  <span className="text-slate-400 font-bold">Jam Operasional Toko:</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isStoreOpen ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                    <span className={`font-black uppercase tracking-wider text-[11px] ${isStoreOpen ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isStoreOpen ? 'BUKA (09.00 - 21.00)' : 'TUTUP (09.00 - 21.00)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-900 text-xs">
                  <span className="text-slate-400 font-bold">GamePass DDS Reguler:</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isRegulerOpen ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                    <span className={`font-black uppercase tracking-wider text-[11px] ${isRegulerOpen ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isRegulerOpen ? 'TERSEDIA (12.00 - 19.00)' : 'TUTUP (12.00 - 19.00)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-900 text-xs">
                  <span className="text-slate-400 font-bold">GamePass DDS Kilat:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-black uppercase tracking-wider text-[11px] text-emerald-400">
                      Buka 24 Jam
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-cyan-950/20 border border-cyan-900/20 rounded-xl flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Layanan GamePass DDS Reguler otomatis <span className="text-red-400 font-bold">tidak tersedia</span> di luar jam 12.00 - 19.00 WIB. Gunakan GamePass DDS Kilat untuk pesanan instan kapan saja.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SEARCH AND FILTER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-8 relative z-10" id="categories-list">
        <div className="bg-[#0b0f1a] p-4 rounded-xl border border-blue-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Cari Item Pricelist</span>
          </div>
          <div className="w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Ketik nama item/nominal cash (contoh: 1 Miliar, Custom, dll)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm text-white placeholder-slate-650 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* GAME CATEGORIES GRID CONTROL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-6">
          <h2 className="text-sm font-black uppercase tracking-widest text-cyan-400 mb-1">
            PILIH KATEGORI LAYANAN
          </h2>
          <p className="text-xs text-slate-500">Klik salah satu game di bawah untuk melihat rincian paket harga joki atau gamepass.</p>
        </div>

        {/* 6 column category list styled independently */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { id: 'dds', name: 'Drag Drive Simulator', desc: 'Joki Roblox', icon: Flame, badge: 'Aman & Murah' },
            { id: 'cdid', name: 'Car Driving Indonesia', desc: 'Joki Roblox', icon: Car, badge: 'Terlaris' },
            { id: 'gamepass-reguler', name: 'GamePass DDS Reguler', desc: 'Gift In-Game', icon: Sparkles, badge: 'Proses 12-19' },
            { id: 'gamepass-kilat', name: 'GamePass DDS Kilat', desc: 'Gift In-Game', icon: Zap, badge: 'Buka 24 Jam' },
            { id: 'driving-empire', name: 'Driving Empire', desc: 'Joki Roblox', icon: Sliders, comingSoon: true },
            { id: 'bus-explore', name: 'Bus Explore Indonesia', desc: 'Joki Roblox', icon: Bus, comingSoon: true }
          ].map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedSub === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (!cat.comingSoon) {
                    setSelectedSub(cat.id as any);
                  }
                }}
                className={`relative p-4 rounded-xl border transition-all flex flex-col justify-between cursor-pointer min-h-[110px] ${
                  cat.comingSoon 
                    ? 'opacity-40 bg-slate-900/10 border-slate-950 cursor-not-allowed' 
                    : isSelected
                    ? 'bg-gradient-to-b from-[#0c1a30] to-[#050b14] border-cyan-500/80 shadow-md shadow-cyan-500/5'
                    : 'bg-[#0a0f1d] border-slate-900 hover:border-slate-800 hover:-translate-y-0.5'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="p-1.5 rounded-lg bg-slate-950/60 text-cyan-400 border border-slate-900">
                    <Icon className="w-4 h-4" />
                  </div>
                  {!cat.comingSoon && (
                    <span className="text-[8px] bg-cyan-950 text-cyan-400 font-extrabold px-1.5 py-0.5 rounded uppercase border border-cyan-900/20">
                      {cat.badge}
                    </span>
                  )}
                  {cat.comingSoon && (
                    <span className="text-[8px] bg-slate-900 text-slate-500 font-extrabold px-1.5 py-0.5 rounded uppercase">
                      Soon
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">{cat.desc}</span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-100 block truncate mt-0.5">{cat.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DYNAMIC LIST OF PRICELIST ITEMS (THEME: BLUE CYAN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-10">
        
        <div className="flex items-center justify-between border-b border-blue-900/20 pb-3.5 mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              {selectedSub === 'dds' && 'Daftar Harga Drag Drive Simulator'}
              {selectedSub === 'cdid' && 'Daftar Harga Car Driving Indonesia'}
              {selectedSub === 'gamepass-reguler' && 'Daftar Harga GamePass DDS Reguler'}
              {selectedSub === 'gamepass-kilat' && 'Daftar Harga GamePass DDS Kilat'}
            </h3>
          </div>

          <span className="text-xs text-slate-400">
            Terbuka: <span className="text-cyan-400 font-bold">
              {selectedSub === 'gamepass-reguler' || selectedSub === 'gamepass-kilat' ? 'Gift Sistem' : 'Joki Login'}
            </span>
          </span>
        </div>

        {/* PRICE ITEMS CONTAINER */}
        <div>
          {/* If the user clicks on driving-empire or bus-explore (which are coming soon, but disabled, so handled gracefully) */}
          {(selectedSub as any) === 'driving-empire' || (selectedSub as any) === 'bus-explore' ? (
            <div className="bg-[#0a0f1d] p-10 rounded-2xl border border-slate-900 text-center max-w-lg mx-auto">
              <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-3 animate-pulse" />
              <h4 className="font-extrabold text-white text-sm mb-1 uppercase tracking-widest">Coming Soon!</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pricelist joki untuk kategori game ini sedang dalam persiapan. Hubungi admin melalui instagram untuk mengajukan kustom request.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredItems(selectedSub as any).map((item) => {
                const available = isItemAvailable(item);
                return (
                  <div
                    key={item.id}
                    className={`bg-[#0a0f1d] border rounded-xl p-4 flex flex-col justify-between hover:border-cyan-500/30 hover:bg-slate-900/30 transition-all group ${
                      item.popular ? 'border-cyan-500/20' : 'border-slate-900'
                    } ${!available ? 'opacity-65 border-red-950/40' : ''}`}
                  >
                    {isAdmin && (
                      <div className="flex justify-between items-center gap-2 mb-3 pb-2 border-b border-slate-900/60">
                        <span className="text-[8px] text-slate-500 font-mono">ID: {item.id}</span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={(e) => { e.stopPropagation(); setEditingItem(item); setIsEditItemModalOpen(true); }}
                            className="px-2 py-0.5 bg-slate-950 hover:bg-cyan-950 hover:text-cyan-400 text-slate-400 rounded border border-slate-800 text-[9px] font-black uppercase flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-2.5 h-2.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                            className="px-2 py-0.5 bg-slate-950 hover:bg-red-950 hover:text-red-400 text-slate-400 rounded border border-slate-800 text-[9px] font-black uppercase flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest block mb-0.5">Paket Layanan</span>
                        <h4 className={`font-extrabold text-sm sm:text-base transition-colors ${
                          available ? 'text-slate-100 group-hover:text-cyan-400' : 'text-slate-400'
                        }`}>
                          {item.name}
                        </h4>
                      </div>

                      {item.popular && available && (
                        <span className="text-[8px] bg-cyan-950 text-cyan-400 border border-cyan-800/30 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                          Best Seller
                        </span>
                      )}

                      {!available && (
                        <span className="text-[8px] bg-red-950 text-red-400 border border-red-900/30 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                          Tidak Tersedia
                        </span>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-950/60 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest block mb-0.5">Harga</span>
                        {available ? (
                          <span className="text-sm sm:text-base font-black text-cyan-400">
                            {formatPrice(item.price)}
                          </span>
                        ) : (
                          <span className="text-xs font-black text-red-400 uppercase tracking-wider">
                            Tidak Tersedia
                          </span>
                        )}
                      </div>

                      <div className="flex space-x-1.5">
                        {available ? (
                          <>
                            <button
                              onClick={() => addToCart(item)}
                              className="p-2 bg-slate-950 text-slate-400 hover:text-cyan-400 rounded-lg hover:border-cyan-500/20 border border-slate-850 cursor-pointer"
                              title="Tambah ke Keranjang"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDirectOrder(item)}
                              className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-slate-950 font-extrabold text-xs rounded-lg cursor-pointer"
                            >
                              Pesan
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] text-red-400 font-extrabold bg-red-950/30 px-2.5 py-1.5 rounded-lg border border-red-900/20 select-none">
                            Tutup (12:00 - 19:00 WIB)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {getFilteredItems(selectedSub as any).length === 0 && (
                <div className="col-span-3 text-center py-10 bg-[#0a0f1d] rounded-xl border border-slate-900">
                  <p className="text-slate-500 text-xs">Tidak ada item yang cocok dengan pencarian "{searchTerm}".</p>
                </div>
              )}
            </div>
          )}
        </div>

      </section>

      {/* FOOTER INFORMATIONAL BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
        <div className="bg-[#0b0f1a] p-6 rounded-2xl border border-blue-900/20 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Jam Operasional & Proses Sientong Store</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Sientong Store aktif memproses pesanan setiap hari sesuai dengan jadwal proses masing-masing kategori di bawah ini.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">Jam Operasional Toko</span>
                <span>Setiap Hari (09:00 - 21:00 WIB)</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">Proses Gamepass Reguler</span>
                <span>Setiap Hari (12:00 - 19:00 WIB)</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">Proses Gamepass Kilat</span>
                <span>Buka 24 Jam Nonstop</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">Pengiriman Joki</span>
                <span>Instan / Sesuai Antrean</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 space-y-2 text-xs">
            <h4 className="font-extrabold text-slate-200">ℹ️ Kebijakan Transaksi</h4>
            <div className="space-y-1.5 text-slate-400 text-[11px] leading-relaxed">
              <p>1. Transaksi resmi hanya diproses melalui DM instagram resmi kami <span className="text-cyan-400 font-bold">@sientong.id</span>.</p>
              <p>2. Pastikan memasukkan Username Roblox secara lengkap & akurat untuk menghindari salah kirim.</p>
              <p>3. Setelah mengklik Pesan, format order otomatis disalin. Kirimkan format tersebut langsung ke DM instagram kami.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER GENERAL DESIGN COLOFON */}
      <footer className="text-center text-[9px] uppercase tracking-[0.2em] py-12 mt-16 border-t border-slate-900/60 flex flex-col items-center gap-2">
        <span className="opacity-45">© 2026 SIENTONG STORE — AMAN, CEPAT DAN TERPERCAYA • POWERED BY SIENTONG.ID</span>
        <button
          onClick={() => setIsAdminModalOpen(true)}
          className="text-slate-500 hover:text-cyan-400 font-bold transition-all flex items-center gap-1 mt-1 uppercase text-[8px] cursor-pointer"
        >
          <Lock className="w-2.5 h-2.5 text-slate-600" />
          <span>Admin Portal</span>
        </button>
      </footer>

      {/* SHOPPING CART DRAWERS (SIDE SHEET) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans" aria-modal="true" role="dialog">
          {/* Slide overlay bg */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-950 border-l border-blue-900/20 flex flex-col shadow-2xl h-full">
              
              {/* Header */}
              <div className="p-6 border-b border-slate-900 flex items-center justify-between bg-slate-950">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-base font-extrabold text-white">Keranjang Pemesanan</h2>
                  <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-900/30 px-2 py-0.5 rounded-full font-bold">
                    {totalItemsCount}
                  </span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items in Cart */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-slate-900/40 border border-slate-900 text-slate-500 rounded-full flex items-center justify-center mb-4">
                      <ShoppingCart className="w-6 h-6 text-slate-650" />
                    </div>
                    <p className="text-slate-300 font-bold text-sm">Keranjang Kosong</p>
                    <p className="text-slate-500 text-xs mt-1 max-w-[220px]">Silakan klik tambah pada beberapa pricelist item di website kami.</p>
                  </div>
                ) : (
                  cart.map(({ item, quantity }) => (
                    <div 
                      key={item.id} 
                      className="p-4 bg-[#0a0f1d] rounded-xl border border-slate-900 flex items-center justify-between space-x-3"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase tracking-wider text-cyan-400 font-bold block mb-0.5">
                          {item.subcategory === 'dds' 
                            ? 'Drag Drive Sim' 
                            : item.subcategory === 'cdid' 
                            ? 'Car Driving Indonesia' 
                            : 'Gamepass Reguler'}
                        </span>
                        <h4 className="font-bold text-white text-xs truncate">{item.name}</h4>
                        <p className="text-xs text-cyan-400 font-extrabold mt-0.5">{formatPrice(item.price)}</p>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6.5 h-6.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded flex items-center justify-center cursor-pointer text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white w-5 text-center">{quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-6.5 h-6.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded flex items-center justify-center cursor-pointer text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, true)}
                          className="p-1 text-slate-500 hover:text-red-400 cursor-pointer ml-1"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-900 bg-slate-950 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-medium">Subtotal Estimasi</span>
                    <span className="text-base font-black text-cyan-400">{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={clearCart}
                      className="py-2.5 bg-slate-900 hover:text-red-400 text-xs font-semibold rounded-xl text-slate-400 border border-slate-850 cursor-pointer transition-colors"
                    >
                      Kosongkan
                    </button>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                      className="py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-extrabold rounded-xl shadow-md cursor-pointer text-center"
                    >
                      Checkout Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DETAILED CHECKOUT MODAL AND AUTOMATIC REDIRECT SETUP */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans animate-fade-in" role="dialog" aria-modal="true">
          {/* Modal overlay */}
          <div 
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm" 
          />

          {/* Modal Content container */}
          <div className="relative bg-[#0b0f1a] border border-blue-900/20 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-900 bg-[#0b0f1a] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <h3 className="font-extrabold text-white text-sm uppercase tracking-wider">Format Pemesanan Sientong Store</h3>
              </div>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              
              {/* Order total calculation summary */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">Ringkasan Item</span>
                <div className="space-y-1.5">
                  {cart.map(({ item, quantity }) => (
                    <div key={item.id} className="flex justify-between text-xs text-slate-300">
                      <span className="truncate max-w-[280px]">{item.name} <span className="text-slate-500 font-bold">x{quantity}</span></span>
                      <span className="font-bold text-slate-100">{formatPrice(item.price * quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-900 mt-3 pt-2.5 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">Total Harga</span>
                  <span className="text-sm font-black text-cyan-400">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                    Username Roblox <span className="text-cyan-400 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan username Roblox Anda (Tanpa password/sandi)"
                    value={robloxUsername}
                    onChange={(e) => setRobloxUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Harap pastikan username Roblox benar demi kelancaran proses joki / gift.</p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                    Metode Pembayaran (Hanya QRIS & DANA)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['QRIS (E-Wallet)', 'DANA'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-2 px-1 rounded-lg text-xs font-bold transition-all border cursor-pointer text-center ${
                          paymentMethod === method
                            ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40'
                            : 'bg-slate-950 text-slate-400 border-slate-850 hover:bg-slate-900/40 hover:text-slate-200'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    placeholder="Contoh: pengerjaan jam malam, fast respon ya kak..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition-all resize-none placeholder-slate-700"
                  />
                </div>
              </div>

              {/* Message format preview for DM */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Format Pesan Yang Tersalin</span>
                  <span className="text-[9px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800/30 uppercase font-mono font-bold">DM INSTAGRAM</span>
                </div>
                <pre className="text-[10px] sm:text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed bg-slate-950 max-h-[140px] overflow-y-auto pr-1">
                  {generateOrderMessage()}
                </pre>
              </div>

            </div>

            {/* Modal Bottom buttons */}
            <div className="p-5 border-t border-slate-900 bg-[#0b0f1a] flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="w-full sm:w-1/3 py-3 bg-slate-950 border border-slate-850 hover:border-slate-700 text-xs font-bold rounded-xl text-slate-400 transition-all cursor-pointer"
              >
                Kembali
              </button>
              
              <button
                type="button"
                onClick={handleCheckoutAndRedirect}
                className="w-full sm:w-2/3 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-slate-950" />
                <span>SALIN PESAN & BUKA DM INSTAGRAM</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FLOAT SUCCESS COPY CHIPS */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/30 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 max-w-sm animate-bounce animate-duration-1000">
          <div className="p-1 bg-cyan-500 text-slate-950 rounded-full">
            <Check className="w-3.5 h-3.5 font-bold" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-white">Berhasil Disalin!</p>
            <p className="text-[10px] text-slate-400">Silakan tempel format di DM Instagram @sientong.id</p>
          </div>
        </div>
      )}

      {/* FLOAT WARNING TIMEOUT CHIPS */}
      {warningNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-red-500/30 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 max-w-sm animate-bounce animate-duration-1000">
          <div className="p-1 bg-red-500 text-white rounded-full">
            <BadgeAlert className="w-4 h-4 font-bold" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-white">Layanan Tutup</p>
            <p className="text-[10px] text-slate-400">{warningNotification}</p>
          </div>
        </div>
      )}

      {/* ADMIN PORTAL LOGIN MODAL */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans" role="dialog" aria-modal="true">
          <div onClick={() => setIsAdminModalOpen(false)} className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm animate-fade-in" />
          <div className="relative bg-[#0b0f1a] border border-blue-900/30 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-900">
              <Lock className="w-5 h-5 text-cyan-400" />
              <h3 className="font-extrabold text-white text-sm uppercase tracking-wider">Login Admin Portal</h3>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                  Masukkan Sandi Keamanan Admin
                </label>
                <input
                  type="password"
                  required
                  placeholder="Ketik password admin..."
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-cyan-400 transition-colors text-center"
                />
                {adminPasswordError && (
                  <p className="text-[10px] text-red-400 mt-1 font-bold text-center">{adminPasswordError}</p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminModalOpen(false);
                    setAdminPasswordInput('');
                    setAdminPasswordError(null);
                  }}
                  className="w-1/2 py-2.5 bg-slate-950 border border-slate-850 hover:border-slate-700 text-xs font-bold rounded-xl text-slate-400 cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-extrabold rounded-xl shadow-md cursor-pointer text-center"
                >
                  Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN ADD ITEM MODAL */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans" role="dialog" aria-modal="true">
          <div onClick={() => setIsAddItemModalOpen(false)} className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm animate-fade-in" />
          <div className="relative bg-[#0b0f1a] border border-blue-900/30 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-900">
              <PlusCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="font-extrabold text-white text-sm uppercase tracking-wider">Tambah Item Pricelist Baru</h3>
            </div>

            <form onSubmit={handleAddNewItem} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                  ID Item Unik (misal: dds-10b, kilat-test)
                </label>
                <input
                  type="text"
                  required
                  placeholder="ID Item..."
                  value={newItem.id || ''}
                  onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-750 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                  Nama Item Pricelist
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 1 Miliar Cash [Kilat]..."
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-750 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                  Harga Item (Rupiah, misal: 15000)
                </label>
                <input
                  type="number"
                  required
                  placeholder="Sebut harga..."
                  value={newItem.price === 0 ? '' : newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-750 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                    Kategori Utama
                  </label>
                  <select
                    value={newItem.category || 'gift'}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="joki">Joki</option>
                    <option value="gift">Gift</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                    Subkategori Game
                  </label>
                  <select
                    value={newItem.subcategory || 'gamepass-kilat'}
                    onChange={(e) => setNewItem({ ...newItem, subcategory: e.target.value as any })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="dds">Roblox DDS (Joki)</option>
                    <option value="cdid">Roblox CDID (Joki)</option>
                    <option value="gamepass-reguler">DDS Gamepass Reguler</option>
                    <option value="gamepass-kilat">DDS Gamepass Kilat</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="newPopular"
                  checked={!!newItem.popular}
                  onChange={(e) => setNewItem({ ...newItem, popular: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 rounded bg-slate-950 border-slate-800"
                />
                <label htmlFor="newPopular" className="text-xs text-slate-400 font-bold cursor-pointer">
                  Tandai sebagai Best Seller / Terlaris
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-950 border border-slate-850 text-xs font-bold rounded-xl text-slate-400 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 text-xs font-extrabold rounded-xl shadow-md cursor-pointer text-center"
                >
                  Tambah Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN EDIT ITEM MODAL */}
      {isEditItemModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans" role="dialog" aria-modal="true">
          <div onClick={() => { setIsEditItemModalOpen(false); setEditingItem(null); }} className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm animate-fade-in" />
          <div className="relative bg-[#0b0f1a] border border-blue-900/30 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-900">
              <Edit2 className="w-5 h-5 text-cyan-400" />
              <h3 className="font-extrabold text-white text-sm uppercase tracking-wider">Edit Item Pricelist</h3>
            </div>

            <form onSubmit={handleSaveEditedItem} className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono mb-1">ID Item: {editingItem.id}</span>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                  Nama Item Pricelist
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ketik nama item..."
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-750 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                  Harga Item (Rupiah)
                </label>
                <input
                  type="number"
                  required
                  placeholder="Harga item..."
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-750 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                    Kategori Utama
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="joki">Joki</option>
                    <option value="gift">Gift</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                    Subkategori Game
                  </label>
                  <select
                    value={editingItem.subcategory}
                    onChange={(e) => setEditingItem({ ...editingItem, subcategory: e.target.value as any })}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="dds">Roblox DDS (Joki)</option>
                    <option value="cdid">Roblox CDID (Joki)</option>
                    <option value="gamepass-reguler">DDS Gamepass Reguler</option>
                    <option value="gamepass-kilat">DDS Gamepass Kilat</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editPopular"
                  checked={!!editingItem.popular}
                  onChange={(e) => setEditingItem({ ...editingItem, popular: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 rounded bg-slate-950 border-slate-800"
                />
                <label htmlFor="editPopular" className="text-xs text-slate-400 font-bold cursor-pointer">
                  Tandai sebagai Best Seller / Terlaris
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setIsEditItemModalOpen(false); setEditingItem(null); }}
                  className="w-1/2 py-2.5 bg-slate-950 border border-slate-850 text-xs font-bold rounded-xl text-slate-400 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-extrabold rounded-xl shadow-md cursor-pointer text-center"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
