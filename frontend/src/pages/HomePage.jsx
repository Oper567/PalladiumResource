import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Globe, Zap, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const partners = ["CHEVRON", "SHELL", "TOTAL", "NNPC", "AGIP", "EXXON", "PALLADIUM", "GE"];

  return (
    <div className="space-y-12 md:space-y-24 pb-24 relative px-4 md:px-0 bg-[#fcfcfc]">
      
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
        <span className="hidden md:block absolute right-16 bg-white text-brand-dark px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap pointer-events-none">
          Chat with an Agent
        </span>
      </motion.a>

      {/* --- HERO SECTION WITH CINEMATIC IMAGE --- */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-slate-900 text-white shadow-2xl mt-4 md:mt-0">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            alt="Logistics Hub"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60" />
        </div>

        <div className="relative z-20 text-center max-w-4xl px-4 md:px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 md:mb-8 text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-100 backdrop-blur-md"
          >
            Institutional Resource Infrastructure
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter mb-6 md:mb-8 leading-[1] md:leading-[0.85] uppercase"
          >
            Precision in <br className="hidden md:block" /> <span className="text-slate-400 italic">Every Asset.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-slate-300 mb-8 md:mb-12 max-w-2xl mx-auto font-medium"
          >
            Empowering global industries with real-time inventory intelligence, seamless 
            logistics, and the next generation of resource procurement.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center">
            <Link to="/shop" className="bg-white text-brand-dark hover:bg-slate-200 px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl">
              Explore Inventory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- TRUSTED BY SLIDESHOW --- */}
      <section className="py-8 md:py-16 overflow-hidden">
        <div className="text-center mb-6 md:mb-10">
          <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Trusted By Industrial Giants</p>
        </div>
        <div className="relative flex items-center overflow-x-hidden">
          <motion.div 
            className="flex whitespace-nowrap gap-12 md:gap-24 items-center py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {[...partners, ...partners].map((logo, index) => (
              <span key={index} className="text-2xl md:text-5xl font-black text-slate-200 hover:text-brand-dark transition-all duration-300 cursor-default tracking-tighter uppercase">
                {logo}
              </span>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[#fcfcfc] via-[#fcfcfc]/80 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[#fcfcfc] via-[#fcfcfc]/80 to-transparent z-10" />
        </div>
      </section>

      {/* --- BENTO MISSION SECTION WITH IMAGE --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2 bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 tracking-tighter uppercase italic">The Palladium Mission</h2>
            <p className="text-slate-500 leading-relaxed text-base md:text-xl font-medium max-w-xl">
              We bridge the gap between global supply and industrial demand with 
              unparalleled technical precision and transparency.
            </p>
          </div>
          <div className="mt-12 md:mt-16 flex gap-8 md:gap-16">
            <div>
              <p className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter">99.9%</p>
              <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Accuracy Rate</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter">24/7</p>
              <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Global Support</p>
            </div>
          </div>
          {/* Subtle Background Icon */}
          <Globe className="absolute -bottom-10 -right-10 w-64 h-64 text-slate-50 opacity-50" />
        </div>

        <div className="h-[400px] md:h-auto rounded-[2.5rem] md:rounded-[4rem] overflow-hidden relative group shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            alt="Refined Assets"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-80" />
          <div className="absolute bottom-10 left-10 text-white">
            <ShieldCheck className="w-10 h-10 mb-4 text-slate-400" />
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Secure Trading</h3>
            <p className="text-slate-300 text-xs mt-2 uppercase tracking-widest opacity-70">Verified Protocol</p>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US: IMAGE CARDS --- */}
      <section className="py-8 md:py-12">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-brand-dark uppercase">Why Palladium?</h2>
          <p className="text-slate-400 font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em] mt-2 italic">Engineering the future of enterprise resource.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { img: "https://images.unsplash.com/photo-1565034946487-0d715132e53f?q=80&w=800", title: "Real-time Sync", icon: <Zap /> },
            { img: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=800", title: "Global Reach", icon: <Globe /> },
            { img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800", title: "Advanced BI", icon: <BarChart3 /> },
            { img: "https://images.unsplash.com/photo-1536640639111-6577380182f7?q=80&w=800", title: "Compliance", icon: <ShieldCheck /> }
          ].map((feature, i) => (
            <div key={i} className="relative h-72 rounded-[2.5rem] overflow-hidden shadow-lg group">
              <img src={feature.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 text-white opacity-80 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h4 className="text-white font-black text-xl uppercase tracking-tighter">{feature.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;