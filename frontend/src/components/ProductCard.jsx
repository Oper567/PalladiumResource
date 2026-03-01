import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. Import your Auth State
import { useNavigate } from 'react-router-dom';   // 2. Import navigation
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingBag, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart();
  const { currentUser } = useAuth(); // 3. Get current user status
  const navigate = useNavigate();

  const cartItem = cart.find((item) => item.id === product.id);

  // 4. THE GATEKEEPER LOGIC
  const handleProtectedAddToCart = () => {
    if (!currentUser) {
      // If no user, block the action and send to login
      toast.error("AUTHENTICATION REQUIRED", {
        icon: <Lock size={16} />,
        style: { background: '#1e293b', color: '#fff', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' }
      });
      return navigate('/login'); 
    }
    
    // If user exists, proceed as normal
    addToCart(product);
    toast.success(`${product.name} Added to Inventory`);
  };

  return (
    <motion.div 
      // ... your existing motion props
      className="group bg-white p-4 md:p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden"
    >
      {/* ... Image & Content sections stay the same ... */}

      {/* Pricing & Action */}
      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between gap-2 px-1">
        <div className="flex flex-col min-w-0 flex-1"> 
          <span className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest">Unit Price</span>
          <span className="text-lg md:text-2xl font-black text-brand-dark tracking-tighter truncate">
            ₦{product.price?.toLocaleString()}
          </span>
        </div>

        {/* 5. UI FEEDBACK: Change button look based on Auth */}
        <button 
          onClick={handleProtectedAddToCart}
          className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-all shadow-lg active:scale-95 shrink-0 flex items-center gap-2 ${
            !currentUser 
              ? 'bg-slate-100 text-slate-400' // Dimmed look if logged out
              : 'bg-brand-dark text-white hover:bg-slate-800'
          }`}
        >
          {!currentUser && <Lock size={14} className="opacity-50" />}
          <Plus size={18} className="md:w-5 md:h-5 stroke-[3]" />
        </button>
      </div>
    </motion.div>
  );
};