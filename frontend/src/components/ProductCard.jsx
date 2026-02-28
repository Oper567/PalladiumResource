import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart();

  // Check if this specific item is already in the cart to show a quantity badge
  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container with Quantity Overlay */}
      <div className="relative overflow-hidden rounded-[2rem] mb-6">
        <img 
          src={product.imageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'} 
          alt={product.name} 
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        <AnimatePresence>
          {cartItem && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 right-4 bg-brand-dark text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1 border border-white/20 backdrop-blur-md"
            >
              <ShoppingBag size={10} /> {cartItem.quantity} IN CART
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="flex-grow px-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-black text-brand-dark tracking-tighter uppercase leading-tight">
            {product.name}
          </h3>
        </div>
        
        <p className="text-slate-400 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Pricing & Action */}
      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between px-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Unit Price</span>
          <span className="text-2xl font-black text-brand-dark tracking-tighter">
            ₦{product.price?.toLocaleString()}
          </span>
        </div>

        <button 
          onClick={() => addToCart(product)}
          className="bg-brand-dark text-white p-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-90 group-hover:rotate-3"
          title="Add to Inventory"
        >
          <Plus size={20} className="stroke-[3]" />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;