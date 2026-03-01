import { motion } from 'framer-motion';
import { Shield, Target, Users, Factory } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-24 pb-24 bg-[#fcfcfc]">
      {/* Hero Section */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block"
        >
          Established 2024
        </motion.span>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8">
          The Backbone of <br /> <span className="italic text-slate-400">Resource Logistics.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
          Palladium was founded to solve the complexity of industrial procurement. 
          We provide the infrastructure that allows energy and manufacturing giants 
          to move assets with 99.9% technical precision.
        </p>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-1 px-6 max-w-7xl mx-auto mb-32">
        {[
          { label: 'Global Hubs', val: '50+' },
          { label: 'Annual Tonnage', val: '1.2M' },
          { label: 'Active Partners', val: '200+' },
          { label: 'Security Rating', val: 'AAA' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 border border-slate-100 flex flex-col items-center text-center">
            <span className="text-4xl font-black text-brand-dark mb-2">{stat.val}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Mission Section */}
      <section className="px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="rounded-[3rem] overflow-hidden h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000" 
            className="w-full h-full object-cover" 
            alt="Engineering"
          />
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">Our Core Protocol</h2>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="bg-brand-dark text-white p-3 rounded-2xl h-fit"><Shield size={24} /></div>
              <div>
                <h4 className="font-black uppercase text-sm mb-1">Uncompromising Security</h4>
                <p className="text-slate-500 text-sm">Every asset is tracked via military-grade encrypted protocols.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="bg-brand-dark text-white p-3 rounded-2xl h-fit"><Target size={24} /></div>
              <div>
                <h4 className="font-black uppercase text-sm mb-1">Technical Precision</h4>
                <p className="text-slate-500 text-sm">We don't do "approximations." Our inventory is real-time and exact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;