import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, ShieldCheck, ArrowLeft, 
  PackageCheck, Minus, Plus, Trash2, 
  ShoppingBag, Loader2, Lock 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFWLoaded, setIsFWLoaded] = useState(false);
  const navigate = useNavigate();

  // Step 1: Secure Script Polling
  useEffect(() => {
    const checkScript = setInterval(() => {
      if (window.FlutterwaveCheckout) {
        setIsFWLoaded(true);
        clearInterval(checkScript);
      }
    }, 500);
    return () => clearInterval(checkScript);
  }, []);

  const handleFlutterwavePayment = () => {
    if (cart.length === 0) return toast.error("Logistics Error: Inventory Empty");
    if (!isFWLoaded) return toast.error("System Error: Payment Node Offline");

    // CRITICAL: Ensure we have a key and it is accessed correctly for Vite
    const publicKey = import.meta.env.VITE_FLW_PUBLIC_KEY;
    
    if (!publicKey) {
      console.error("VITE_FLW_PUBLIC_KEY is missing from .env");
      return toast.error("Configuration Error: Missing Public Key");
    }

    setIsProcessing(true);

    try {
      const config = {
        public_key: publicKey, 
        tx_ref: `PLD-TX-${Date.now()}`,
        amount: Number(cartTotal), // BUG FIX: Force Number type to prevent browser hangs
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: 'auth-user@palladium.com', 
          name: 'Authorized Client',
        },
        customizations: {
          title: 'Palladium Resource Group',
          description: `Deployment of ${cart.length} assets`,
          logo: 'https://cdn-icons-png.flaticon.com/512/6047/6047310.png',
        },
        callback: (response) => {
          if (response.status === "successful") {
            toast.success("Transaction Authorized: Assets Released");
            clearCart();
            // Wrap navigate in timeout to allow Flutterwave modal cleanup
            setTimeout(() => navigate('/success'), 500); 
          } else {
            toast.error("Transaction Aborted by Gateway");
            setIsProcessing(false);
          }
        },
        onclose: () => {
          setIsProcessing(false);
          toast("Payment Node Closed", { icon: '🔐' });
        },
      };

      // Execute Flutterwave
      window.FlutterwaveCheckout(config);

    } catch (err) {
      console.error("FW Initialization Error:", err);
      setIsProcessing(false);
      toast.error("Critical Payment Node Failure");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="text-slate-300" size={32} />
        </div>
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-brand-dark">Terminal Empty</h2>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2 mb-8">No assets queued for deployment</p>
        <Link to="/shop" className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
          Return to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/shop" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-dark transition-all">
            <div className="p-2 bg-white rounded-xl border border-slate-100 group-hover:shadow-md transition-all">
              <ArrowLeft size={14} />
            </div>
            Back to Terminal
          </Link>
          <div className="flex items-center gap-2">
            <Lock size={12} className="text-emerald-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">256-Bit SSL Secured</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Asset Review */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h1 className="text-5xl font-black tracking-tighter uppercase italic mb-2">
                Order <span className="text-slate-300">Review</span>
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Inventory Verification Protocol</p>
            </div>
            
            <div className="space-y-4">
              <AnimatePresence mode='popLayout'>
                {cart.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="group relative flex items-center gap-6 bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:border-brand-dark/10 transition-all"
                  >
                    <div className="relative w-24 h-24 shrink-0 bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-tight text-brand-dark mb-1">{item.name}</h4>
                        <p className="text-[10px] font-mono font-bold text-slate-400 italic">₦{item.price.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-white rounded-xl transition-all"><Minus size={12} /></button>
                          <span className="text-xs font-mono font-black px-4">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-white rounded-xl transition-all"><Plus size={12} /></button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-mono font-black text-brand-dark">₦{(item.price * item.quantity).toLocaleString()}</p>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-[9px] font-black uppercase text-red-300 hover:text-red-500 transition-colors flex items-center gap-1 mt-1 ml-auto"
                          >
                            <Trash2 size={10} /> Discard
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Payment Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="bg-white p-10 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-brand-dark rounded-2xl flex items-center justify-center text-white">
                      <CreditCard size={18} />
                    </div>
                    <h3 className="text-lg font-black uppercase italic tracking-tighter">Settlement</h3>
                  </div>
                  
                  <div className="space-y-5 mb-10">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Logistics</span>
                      <span className="text-brand-dark">Free Deployment</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Asset Count</span>
                      <span className="text-brand-dark">{cart.length} Units</span>
                    </div>
                    <div className="h-px bg-slate-100" />
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">Grand Total</span>
                        <span className="text-4xl font-black text-brand-dark tracking-tighter">₦{cartTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleFlutterwavePayment}
                    disabled={isProcessing || !isFWLoaded}
                    className={`w-full py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-brand-dark/20 ${
                      isProcessing || !isFWLoaded ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-brand-dark text-white hover:bg-slate-800'
                    }`}
                  >
                    {isProcessing ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        <ShieldCheck size={18} className="text-emerald-400" /> 
                        Authorize Deployment
                      </>
                    )}
                  </button>

                  {!isFWLoaded && (
                    <p className="text-[9px] text-center font-bold text-amber-500 uppercase tracking-widest mt-4 animate-pulse">
                      Establishing Secure Payment Node...
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-8 px-10 py-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                <PackageCheck className="text-brand-dark opacity-20" size={32} />
                <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed tracking-wider">
                  By authorizing, you agree to our <span className="text-brand-dark underline cursor-pointer">Logistics & Supply Protocols</span>.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}