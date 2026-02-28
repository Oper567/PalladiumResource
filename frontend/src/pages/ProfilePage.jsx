import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Package, MapPin, Settings } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-4xl mx-auto pt-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-brand-dark text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <User size={18} /> Profile Info
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-brand-dark text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <Package size={18} /> Order History
          </button>
          <button 
            onClick={() => setActiveTab('address')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'address' ? 'bg-brand-dark text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <MapPin size={18} /> Shipping
          </button>
        </div>

        {/* Content Area */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
        >
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-black text-brand-dark mb-6">ACCOUNT SETTINGS</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                    <p className="text-lg font-bold text-brand-dark">{user?.email}</p>
                  </div>
                </div>
                <button className="w-full py-4 border-2 border-brand-dark text-brand-dark font-bold rounded-2xl hover:bg-brand-dark hover:text-white transition-all">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="text-center py-20">
              <Package size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-medium">No industrial orders found yet.</p>
              <button className="mt-4 text-brand-accent font-bold">Browse Inventory</button>
            </div>
          )}

          {activeTab === 'address' && (
            <div>
              <h2 className="text-2xl font-black text-brand-dark mb-6">SHIPPING LOGISTICS</h2>
              <textarea 
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-dark outline-none h-32"
                placeholder="Enter full corporate or residential delivery address..."
              />
              <button className="w-full mt-4 bg-brand-dark text-white font-bold py-4 rounded-2xl shadow-lg">
                Save Address
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;