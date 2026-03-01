import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Globe, Zap, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const partners = ["CHEVRON", "SHELL", "TOTAL", "NNPC", "AGIP", "EXXON", "PALLADIUM", "GE"];

  return (
    <div className="space-y-8 md:space-y-24 pb-24 relative bg-[#fcfcfc] overflow-x-hidden">
      
      {/* --- WHATSAPP FLOATING LOGO --- */}
      <motion.a
        href="https://wa.me/2348000000000"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 md:w-8 md:h-8 fill-current" />
      </motion.a>

      {/* --- HERO SECTION: COMPACT & COZY --- */}
      {/* Reduced min-h from 85vh to 60vh on mobile and added rounding/margins */}
      <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-slate-900 text-white shadow-2xl mx-3 mt-3 md:mx-4 md:mt-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            alt="Logistics Hub"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60" />
        </div>

        <div className="relative z-20 text-center max-w-4xl px-4 md:px-6 py-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 mb-4 md:mb-8 text-[8px] md:text-[12px] font-black tracking-[0.2em] md:tracking-[0.4em] uppercase bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-100 backdrop-blur-md"
          >
            Institutional Infrastructure
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter mb-4 md:mb-8 leading-[1.1] md:leading-[0.85] uppercase"
          >
            Precision in <br className="hidden md:block" /> 
            <span className="text-slate-400 italic">Every Asset.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-lg text-slate-300 mb-6 md:mb-12 max-w-lg md:max-w-2xl mx-auto font-medium px-2"
          >
            Real-time inventory intelligence and seamless logistics for the next generation of procurement.
          </motion.p>

          <div className="flex justify-center">
            <Link to="/shop" className="bg-white text-brand-dark hover:bg-slate-200 px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl">
              Explore <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- CONTENT WRAPPER --- */}
      <div className="px-4 md:px-12 space-y-16 md:space-y-24">
        
        {/* --- TRUSTED BY SLIDESHOW --- */}
        <section className="py-4 md:py-16 overflow-hidden">
          <div className="text-center mb-6 md:mb-10">
            <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Trusted By Giants</p>
          </div>
          <div className="relative flex items-center overflow-x-hidden">
            <motion.div 
              className="flex whitespace-nowrap gap-8 md:gap-24 items-center py-2"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            >
              {[...partners, ...partners].map((logo, index) => (
                <span key={index} className="text-xl md:text-5xl font-black text-slate-200 uppercase">
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- BENTO MISSION SECTION --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="md:col-span-2 bg-white p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-5xl font-black text-brand-dark mb-4 tracking-tighter uppercase italic">The Mission</h2>
              <p className="text-slate-500 leading-relaxed text-sm md:text-xl font-medium max-w-md">
                Bridging global supply and industrial demand with technical precision.
              </p>
            </div>
            <div className="mt-8 md:mt-16 flex gap-6 md:gap-16">
              <div>
                <p className="text-3xl md:text-6xl font-black text-brand-dark tracking-tighter">99.9%</p>
                <p className="text-[7px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Accuracy</p>
              </div>
              <div>
                <p className="text-3xl md:text-6xl font-black text-brand-dark tracking-tighter">24/7</p>
                <p className="text-[7px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Support</p>
              </div>
            </div>
            <Globe className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 text-slate-50 opacity-50" />
          </div>

          <div className="h-[300px] md:h-auto rounded-[2.5rem] md:rounded-[4rem] overflow-hidden relative group shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Refined Assets"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-70" />
            <div className="absolute bottom-6 left-6 text-white">
              <ShieldCheck className="w-8 h-8 mb-2 text-slate-400" />
              <h3 className="text-xl font-black uppercase italic tracking-tighter">Secure</h3>
            </div>
          </div>
        </section>

        {/* --- WHY CHOOSE US --- */}
        <section className="py-4 md:py-12">
          <div className="text-center mb-8 md:mb-20">
            <h2 className="text-2xl md:text-6xl font-black tracking-tighter text-brand-dark uppercase">Why Us?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { img: "https://images.unsplash.com/photo-1565034946487-0d715132e53f?q=80&w=800", title: "Sync", icon: <Zap className="w-4 h-4" /> },
              { img: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=800", title: "Reach", icon: <Globe className="w-4 h-4" /> },
              { img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800", title: "BI", icon: <BarChart3 className="w-4 h-4" /> },
              { img: "https://images.unsplash.com/photo-1536640639111-6577380182f7?q=80&w=800", title: "Safety", icon: <ShieldCheck className="w-4 h-4" /> }
            ].map((feature, i) => (
              <div key={i} className="relative h-40 md:h-72 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-md group">
                <img src={feature.img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-dark/50 backdrop-blur-[1px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                  <div className="mb-2 text-white opacity-80">{feature.icon}</div>
                  <h4 className="text-white font-black text-[10px] md:text-xl uppercase">{feature.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;