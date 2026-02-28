import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, LogOut, User, Menu, X, Home, Package, Mail, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { cartCount } = useCart(); 
  const location = useLocation();

  const isActive = (path) => location.pathname === path 
    ? "text-brand-dark font-black" 
    : "text-slate-400 hover:text-brand-dark";

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={16} /> },
    { name: 'Inventory', path: '/shop', icon: <Package size={16} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={16} /> }
  ];

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-[100] px-4 flex justify-center">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="w-full max-w-7xl bg-white/90 backdrop-blur-xl border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl h-16 md:h-20 flex items-center justify-between px-4 md:px-8 relative"
      >
        {/* Logo */}
        <Link to="/" className="text-base md:text-2xl font-black tracking-tighter text-brand-dark flex items-center gap-1 group flex-shrink-0">
          PALL<span className="text-slate-400 group-hover:text-brand-dark transition-colors">ADIUM</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`${isActive(link.path)} transition-all text-[10px] uppercase tracking-[0.3em] relative group`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div layoutId="underline" className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-dark" />
              )}
            </Link>
          ))}
        </div>

        {/* Action Area */}
        <div className="flex items-center space-x-2 md:space-x-4">
          
          {/* Admin Database Icon - Refined to fix line glitch */}
          <AnimatePresence mode="wait">
            {isAdmin && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center"
              >
                <Link 
                  to="/admin" 
                  className="p-2 md:p-3 bg-slate-100 text-brand-dark rounded-xl hover:bg-brand-dark hover:text-white transition-all group border-none flex items-center justify-center outline-none shadow-sm"
                  title="Admin Command Center"
                >
                  <Database size={18} className="group-hover:rotate-12 transition-transform shrink-0" />
                </Link>
                {/* Intentional vertical divider for premium feel */}
                <div className="w-[1px] h-4 bg-slate-200 mx-2 hidden md:block" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cart */}
          <Link to="/checkout" className="relative p-2 md:p-3 hover:bg-slate-50 rounded-xl transition-all group outline-none">
            <ShoppingCart className="w-5 h-5 text-slate-600" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute top-1 right-1 bg-brand-dark text-white text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Desktop Auth */}
          <div className="hidden sm:flex items-center">
            {user ? (
              <Link to="/profile" className="w-10 h-10 bg-brand-dark rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform shadow-lg border-none outline-none">
                <User size={18} />
              </Link>
            ) : (
              <Link to="/login" className="bg-brand-dark text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95 border-none outline-none">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-brand-dark bg-slate-50 rounded-xl active:bg-slate-200 transition-colors border-none outline-none"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute top-[115%] right-0 w-72 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100 lg:hidden flex flex-col space-y-2 origin-top-right z-[101]"
            >
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] px-4 py-3 border-b border-slate-50 mb-2">Corporate Navigation</p>
              
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${location.pathname === link.path ? 'bg-brand-dark text-white font-bold shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <span className={location.pathname === link.path ? 'text-white/70' : 'text-slate-400'}>{link.icon}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black">{link.name}</span>
                </Link>
              ))}

              {isAdmin && (
                <Link 
                  to="/admin" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 text-brand-dark font-bold border border-slate-100"
                >
                  <Database size={16} />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black">Admin Terminal</span>
                </Link>
              )}

              <div className="pt-4 border-t border-slate-50 mt-2">
                {!user ? (
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-brand-dark text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-center block shadow-2xl"
                  >
                    Authorize Access
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <Link 
                        to="/profile" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 text-brand-dark hover:bg-slate-100 transition-colors"
                    >
                        <User size={16} />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black">Account Profile</span>
                    </Link>
                    <button 
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full bg-red-50 text-red-500 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border-none outline-none"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;