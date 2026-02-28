import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        toast.success("Identity Verified. Welcome.");
      } else {
        await signup(email, password);
        toast.success("Professional Account Provisioned.");
      }
      navigate('/shop');
    } catch (err) {
      toast.error(err.message.replace('Firebase:', '').replace('auth/', ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[85vh] px-4 overflow-hidden">
      
      {/* --- CINEMATIC AMBIENCE --- */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-slate-200 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-blue-100 rounded-full blur-[150px] opacity-30" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-2xl p-8 md:p-14 rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-white w-full max-w-md relative"
      >
        {/* Portal Header */}
        <div className="text-center mb-12">
          <motion.div 
            key={isLogin ? 'login-icon' : 'signup-icon'}
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-brand-dark text-white rounded-2xl mb-6 shadow-2xl"
          >
            {isLogin ? <Lock size={24} /> : <ShieldCheck size={24} />}
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-brand-dark uppercase italic leading-none">
            {isLogin ? 'Access Portal' : 'Join Resource'}
          </h2>
          <p className="text-slate-400 text-[10px] mt-3 font-black uppercase tracking-[0.3em]">
            {isLogin ? 'Secured Industrial Interface' : 'Institutional Membership'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-5 tracking-widest">Corporate Email</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-dark transition-colors" size={18} />
              <input 
                type="email" 
                required
                className="w-full p-5 pl-14 bg-slate-50/50 border border-transparent focus:border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-slate-100 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                placeholder="name@company.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-5 tracking-widest">Secure Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-dark transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="w-full p-5 px-14 bg-slate-50/50 border border-transparent focus:border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-slate-100 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand-dark transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button 
            disabled={isLoading}
            className="group relative w-full bg-brand-dark text-white font-black py-5 rounded-[1.5rem] overflow-hidden transition-all hover:bg-slate-800 active:scale-[0.98] shadow-2xl disabled:opacity-70"
          >
            <div className="relative z-10 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em]">
              {isLoading ? 'Verifying...' : (
                <>
                  {isLogin ? 'Authorize Access' : 'Create Credentials'}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
        </form>

        {/* Switch Mode */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-black text-slate-400 hover:text-brand-dark transition-colors uppercase tracking-[0.2em]"
          >
            {isLogin ? "No Credentials? Register Unit" : "Existing Member? Authenticate"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;