import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { 
  collection, addDoc, onSnapshot, query, orderBy, 
  serverTimestamp, doc, deleteDoc, updateDoc 
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Loader2, Package, DollarSign, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Industrial',
    stock: '',
    image: '' 
  });

  // 1. Real-time Sync with Error Catching
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
      setLoading(false);
    }, (error) => {
      console.error("Sync Error:", error);
      toast.error("Terminal Sync Failed: Check Rules");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Delete Protocol
  const handleDelete = async (id) => {
    if (window.confirm("CRITICAL: Authorize permanent removal of this asset?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        toast.success("Asset Purged from Terminal");
      } catch (error) {
        toast.error("Deletion Protocol Failed");
      }
    }
  };

  // 3. Edit Initiation
  const startEdit = (product) => {
    setNewProduct({
      name: product.name || '',
      price: product.price || '',
      category: product.category || 'Industrial',
      stock: product.stock || '',
      image: product.image || ''
    });
    setEditingId(product.id);
    setShowAddModal(true);
  };

  // 4. Add or Update Logic (Improved Error Resilience)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Safety check for image URL
    if (!newProduct.image.startsWith('http')) {
      return toast.error("Invalid Visual Link");
    }
    
    setIsSubmitting(true);

    try {
      const productData = {
        name: newProduct.name.trim(),
        price: Number(newProduct.price) || 0,
        category: newProduct.category,
        stock: Number(newProduct.stock) || 0,
        image: newProduct.image.trim(),
        updatedAt: serverTimestamp()
      };

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), productData);
        toast.success("Asset Specs Updated");
      } else {
        await addDoc(collection(db, "products"), {
          ...productData,
          createdAt: serverTimestamp()
        });
        toast.success("New Asset Deployed");
      }
      
      resetForm(); 

    } catch (error) {
      console.error("Firebase Submission Error:", error);
      // This helps diagnose if it's a permission issue or a network issue
      if (error.code === 'permission-denied') {
        toast.error("Access Denied: Check Security Rules");
      } else {
        toast.error(`System Error: ${error.message}`);
      }
    } finally {
      // CRITICAL: This ensures the button always unlocks
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowAddModal(false);
    setEditingId(null);
    setNewProduct({ name: '', price: '', category: 'Industrial', stock: '', image: '' });
  };

  const totalValue = products.reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.stock)), 0);
  const totalAssets = products.length;

  return (
    <div className="min-h-screen pb-20 px-4 md:px-0 bg-[#F8FAFC]">
      
      {/* COMMAND HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pt-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500">Live Terminal Protocol</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-brand-dark">
            Command <span className="text-slate-400">Inventory</span>
          </h1>
        </div>
        <button onClick={() => setShowAddModal(true)} className="w-full md:w-auto bg-brand-dark text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl hover:scale-105 transition-transform">
          <Plus size={18} /> Deploy New Asset
        </button>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5 shadow-sm">
          <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl"><Package size={20} /></div>
          <div>
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Total SKU</p>
            <p className="text-xl font-black text-brand-dark">{totalAssets}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5 shadow-sm">
          <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl"><DollarSign size={20} /></div>
          <div>
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Net Valuation</p>
            <p className="text-xl font-black text-brand-dark">₦{totalValue.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5 shadow-sm">
          <div className="p-4 bg-purple-50 text-purple-500 rounded-2xl"><BarChart3 size={20} /></div>
          <div>
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">System Health</p>
            <p className="text-xl font-black text-brand-dark">99.8%</p>
          </div>
        </div>
      </div>

      {/* INVENTORY TABLE */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px]">
            <Loader2 className="animate-spin text-slate-200" size={40} />
            <p className="mt-4 text-[9px] font-black uppercase tracking-widest text-slate-300">Decrypting Node Data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-7 text-[9px] font-black uppercase tracking-widest text-slate-400">Asset Visual</th>
                  <th className="px-10 py-7 text-[9px] font-black uppercase tracking-widest text-slate-400">Designation</th>
                  <th className="px-10 py-7 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Unit Value</th>
                  <th className="px-10 py-7 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Stock</th>
                  <th className="px-10 py-7 text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 group transition-colors">
                    <td className="px-10 py-6">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-inner group-hover:border-brand-dark/20 transition-all">
                         <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={item.name} />
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-xs font-black uppercase tracking-tight text-brand-dark mb-1">{item.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{item.category}</p>
                    </td>
                    <td className="px-10 py-6 text-xs font-mono font-black text-right text-brand-dark">₦{item.price?.toLocaleString()}</td>
                    <td className="px-10 py-6 text-xs font-mono font-bold text-right">
                       <span className={item.stock < 5 ? 'text-red-500 animate-pulse' : 'text-slate-500'}>{item.stock}</span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => startEdit(item)} className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-brand-dark hover:shadow-md rounded-xl transition-all">
                          <Edit3 size={14}/>
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-3 bg-white border border-slate-100 text-red-200 hover:text-red-500 hover:shadow-md rounded-xl transition-all">
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={!isSubmitting ? resetForm : null} className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md" />
            <motion.form 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onSubmit={handleFormSubmit}
              className="relative w-full max-w-2xl bg-white rounded-[3.5rem] p-12 md:p-16 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -mr-16 -mt-16 rounded-full" />
              
              <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-10">
                {editingId ? "Update" : "Asset"} <span className="text-slate-400">Specifications</span>
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Resource Image URL</label>
                  <div className="relative">
                    <input required value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-xs font-mono" placeholder="https://..." />
                    {newProduct.image && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg overflow-hidden border bg-white shadow-sm">
                        <img src={newProduct.image} className="w-full h-full object-cover" alt="preview" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Item Designation</label>
                  <input required value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-xs font-black uppercase" placeholder="e.g. CORE UNIT ALPHA" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Value per Unit</label>
                  <input required type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-xs font-mono font-bold" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Stock Allocation</label>
                  <input required type="number" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-xs font-mono font-bold" placeholder="0" />
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button type="button" disabled={isSubmitting} onClick={resetForm} className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-500 transition-colors disabled:opacity-50">Abort</button>
                <button type="submit" disabled={isSubmitting} className="flex-[2] py-5 bg-brand-dark text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <><Loader2 size={14} className="animate-spin" /> Authorizing...</>
                  ) : (
                    editingId ? "Update Asset Node" : "Authorize Deployment"
                  )}
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;