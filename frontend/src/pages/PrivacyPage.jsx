import { Lock, EyeOff, Server } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="pt-24 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-12">Data <span className="text-slate-300">Privacy.</span></h1>
        
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-slate-900 text-white p-4 rounded-2xl"><Lock size={24} /></div>
            <div className="space-y-4">
              <h4 className="font-black uppercase text-sm tracking-widest">Enterprise Encryption</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                We use AES-256 military-grade encryption for all communication between our resource hubs and client dashboards. Your operational data is never shared with third-party marketers.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-slate-100 text-brand-dark p-4 rounded-2xl"><Server size={24} /></div>
            <div className="space-y-4">
              <h4 className="font-black uppercase text-sm tracking-widest">Data Sovereignty</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Information regarding regional mineral deposits or energy reserves is stored on dedicated local servers to comply with Nigerian and International Data Protection Regulations (NDPR/GDPR).
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
            <h4 className="font-black uppercase text-[10px] tracking-[0.3em] mb-4 text-slate-400">Cookie Protocol</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Palladium uses functional cookies solely to maintain your session security and remember your dashboard preferences. We do not use tracking pixels or behavioral profiling cookies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;