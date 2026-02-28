import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Package, ArrowRight, 
  Download, Share2 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function SuccessPage() {
  const { cart, cartTotal } = useCart();
  
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  const downloadManifest = () => {
    const doc = new jsPDF();
    const orderID = `PLD-TX-${Math.floor(Math.random() * 90000) + 10000}`;

    // Header Background
    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, 210, 40, 'F');
    
    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("PALLADIUM RESOURCE GROUP", 15, 25);
    
    // Manifest Details
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.text(`MANIFEST REF: ${orderID}`, 15, 50);
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, 15, 56);

    // Table Logic
    const tableBody = cart.map(item => [
      item.name.toUpperCase(),
      item.quantity,
      `N${item.price.toLocaleString()}`,
      `N${(item.price * item.quantity).toLocaleString()}`
    ]);

    doc.autoTable({
      startY: 65,
      head: [['ASSET DESIGNATION', 'QTY', 'UNIT PRICE', 'SUBTOTAL']],
      body: tableBody,
      headStyles: { fillColor: [15, 23, 42] },
      styles: { fontSize: 8, cellPadding: 5 },
    });

    // Total
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`TOTAL VALUATION: N${cartTotal.toLocaleString()}`, 15, finalY);

    doc.save(`${orderID}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-emerald-500 rounded-full" />
        
        <div className="mb-10 inline-flex items-center justify-center w-24 h-24 bg-emerald-50 rounded-[2.5rem] text-emerald-500">
          <CheckCircle2 size={48} strokeWidth={1.5} />
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-brand-dark mb-4">
          Transaction <span className="text-slate-300">Authorized</span>
        </h1>
        
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-8">
          Assets Queued for Immediate Deployment
        </p>

        <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 border border-slate-100 text-left">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Order Reference</span>
            <span className="text-[10px] font-mono font-bold text-brand-dark">PLD-CONFIRMED</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-400">
                <Package size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-brand-dark">Logistics Status</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase italic">Processing at Hub</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/shop" 
            className="flex items-center justify-center gap-3 bg-brand-dark text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all group"
          >
            New Acquisition <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button 
            onClick={downloadManifest}
            className="flex items-center justify-center gap-3 bg-slate-50 text-slate-400 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all"
          >
            <Download size={14} /> Save Manifest
          </button>
        </div>
      </motion.div>
    </div>
  );
}