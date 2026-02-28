import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; // Changed to onSnapshot
import { db } from '../firebase-config';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Loader2, Package } from 'lucide-react';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // query helps sort them so they don't jump around
    const q = query(collection(db, 'products'), orderBy('name', 'asc'));

    // onSnapshot is faster because it stays "open" and listens
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(docs);
      setLoading(false);
    }, (error) => {
      console.error("Link Error:", error);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  return (
    <div className="pt-24 min-h-screen px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-brand-dark">
          Resource <span className="text-slate-400">Inventory</span>
        </h1>
        <div className="h-1 w-20 bg-brand-dark mt-4" />
      </div>

      {loading ? (
        /* SKELETON LOADING: Makes the app feel fast while waiting for images */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-[2rem]" />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
              <Package className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                No Resources Logged in Terminal
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ShopPage;