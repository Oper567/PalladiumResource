import { ShieldCheck, Scale, FileText, Globe } from 'lucide-react';

const GovernancePage = () => {
  const principles = [
    { title: "Transparency", desc: "Real-time reporting of all resource movements.", icon: <Globe size={20} /> },
    { title: "Accountability", desc: "Strict adherence to international trade laws.", icon: <Scale size={20} /> },
    { title: "Ethical Sourcing", desc: "Zero-tolerance for non-compliant suppliers.", icon: <ShieldCheck size={20} /> }
  ];

  return (
    <div className="pt-24 pb-24 bg-[#fcfcfc]">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-16 border-b border-slate-200 pb-12 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">Compliance Division</span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6">Corporate <br /> <span className="italic text-slate-400">Governance.</span></h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed font-medium">
            Palladium Resource is committed to the highest standards of integrity. Our governance framework ensures technical precision and legal compliance in every asset we manage.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-8 mb-20">
          {principles.map((p, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="text-brand-dark mb-4">{p.icon}</div>
              <h4 className="font-black uppercase text-xs tracking-widest mb-2">{p.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </section>

        <article className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100">
          <h3 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
            <FileText size={20} /> Code of Ethics
          </h3>
          <div className="space-y-6 text-sm text-slate-500 leading-loose">
            <p><strong>1. Anti-Corruption:</strong> Palladium maintains a zero-tolerance policy regarding bribery and extortion. All transactions are logged via decentralized ledgers for audit trails.</p>
            <p><strong>2. Safety Standards:</strong> We operate under ISO 45001 standards, ensuring that our logistics personnel and engineering partners work in zero-hazard environments.</p>
            <p><strong>3. Reporting:</strong> Any deviation from our technical protocols is immediately escalated to the Board of Directors via our automated "Fail-Safe" system.</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default GovernancePage;