import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="text-2xl font-black tracking-tighter text-brand-dark flex items-center gap-1 group">
              PALL<span className="text-slate-400 group-hover:text-brand-dark transition-colors">ADIUM</span>
            </Link>
            <p className="text-slate-500 max-w-sm leading-relaxed font-medium">
              Providing industrial-grade resource management solutions with 
              unmatched precision and global logistics support across 50+ hubs.
            </p>
            
            <div className="space-y-4 pt-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Newsletter Subscription</h4>
              <div className="flex max-w-md group">
                <input 
                  type="email" 
                  placeholder="Enter professional email" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-l-2xl px-6 py-4 text-xs focus:outline-none focus:border-brand-dark transition-all"
                />
                <button className="bg-brand-dark text-white px-6 rounded-r-2xl hover:bg-slate-800 transition-all flex items-center justify-center">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-xs font-black mb-6 uppercase tracking-widest text-brand-dark">Infrastructure</h4>
              <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-tighter">
                <li><Link to="/shop" className="hover:text-brand-dark transition-colors">Inventory</Link></li>
                <li><Link to="/analysis" className="hover:text-brand-dark transition-colors">Market Analysis</Link></li>
                <li><Link to="/governance" className="hover:text-brand-dark transition-colors">Corporate Governance</Link></li>
                <li><Link to="/logistics" className="hover:text-brand-dark transition-colors">Global Logistics</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black mb-6 uppercase tracking-widest text-brand-dark">Company</h4>
              <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-tighter">
                <li><Link to="/about" className="hover:text-brand-dark transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-brand-dark transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-brand-dark transition-colors">Careers</Link></li>
                <li><Link to="/press" className="hover:text-brand-dark transition-colors">Press Kit</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xs font-black mb-6 uppercase tracking-widest text-brand-dark">Support</h4>
              <ul className="space-y-4 text-slate-500 text-xs font-medium">
                <li className="flex items-center gap-3"><MapPin size={14} className="text-slate-300" /> Lagos, Nigeria</li>
                <li className="flex items-center gap-3"><Phone size={14} className="text-slate-300" /> +234 800 PALLADIUM</li>
                <li className="flex items-center gap-3"><Mail size={14} className="text-slate-300" /> desk@palladium.res</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
            © 2026 PALLADIUM RESOURCE. <span className="hidden sm:inline">Engineered for Excellence.</span>
          </p>
          
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-[10px] font-black text-slate-400 hover:text-brand-dark uppercase tracking-widest">Privacy</Link>
            <Link to="/terms" className="text-[10px] font-black text-slate-400 hover:text-brand-dark uppercase tracking-widest">Terms</Link>
            <div className="flex items-center gap-4 ml-4">
               <Linkedin size={16} className="text-slate-300 hover:text-brand-dark transition-colors cursor-pointer" />
               <Twitter size={16} className="text-slate-300 hover:text-brand-dark transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;