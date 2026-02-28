import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ArrowUpRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Industrial Procurement',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      toast.success("Inquiry Transmitted. A representative will contact you.");
      setLoading(false);
      setFormData({ name: '', email: '', subject: 'Industrial Procurement', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-24">
      {/* --- HEADER SECTION --- */}
      <section className="pt-12 pb-16 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.4em] uppercase bg-slate-100 text-slate-500 rounded-full"
        >
          Global Support Network
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-black tracking-tighter text-brand-dark uppercase italic leading-none"
        >
          Connect with <br /> <span className="text-slate-400">The Infrastructure.</span>
        </motion.h1>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT: CONTACT BENTO BOXES (7 COLS) --- */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100"
            >
              <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                <Send size={20} className="text-slate-400" />
                Transmission Portal
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Authorized Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-dark outline-none transition-all text-sm font-medium"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Corporate Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="office@company.com"
                      className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-dark outline-none transition-all text-sm font-medium"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Inquiry Nature</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-dark outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  >
                    <option>Industrial Procurement</option>
                    <option>Logistics & Supply Chain</option>
                    <option>Market Analysis Request</option>
                    <option>Partnership Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Message / Requirements</label>
                  <textarea 
                    rows="5"
                    required
                    placeholder="Briefly describe your industrial requirements..."
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-dark outline-none transition-all text-sm font-medium"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-brand-dark text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Transmitting...' : 'Send Inquiry'}
                  <ArrowUpRight size={18} />
                </button>
              </form>
            </motion.div>
          </div>

          {/* --- RIGHT: INFORMATION HUB (5 COLS) --- */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Connect Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-brand-dark text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden h-fit"
            >
              <Globe className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5" />
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-8">Direct Hub</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                    <Phone className="text-slate-400" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Telephone</p>
                    <p className="text-lg font-bold">+234 800 PALLADIUM</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                    <Mail className="text-slate-400" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Electronic Mail</p>
                    <p className="text-lg font-bold">desk@palladium.res</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                    <MapPin className="text-slate-400" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Operational HQ</p>
                    <p className="text-lg font-bold">Lagos Financial District, Nigeria</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social / Digital Identity Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-brand-dark transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 text-brand-dark rounded-xl flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-all">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest">Live Agent</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Response in &lt; 5 mins</p>
                </div>
              </div>
              <ArrowUpRight className="text-slate-200 group-hover:text-brand-dark transition-colors" />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;