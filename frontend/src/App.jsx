import { Routes, Route, useLocation, Navigate, Link } from "react-router-dom"; // Added Link here
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; 
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";

// 1. Scroll to Top Utility
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 2. Protected Route Guard
const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-brand-dark rounded-full animate-spin" />
    </div>
  );
  
  if (!user || !isAdmin) return <Navigate to="/login" replace />;
  
  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />

          {/* 404 Catch-all */}
          <Route path="*" element={
            <div className="py-40 text-center">
              <h1 className="text-9xl font-black text-slate-100 italic">404</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 -mt-8">Resource Not Found</p>
              <Link to="/" className="mt-8 inline-block text-[10px] font-black uppercase border-b-2 border-brand-dark pb-1 hover:text-brand-dark transition-colors">
                Return Home
              </Link>
            </div>
          } />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const location = useLocation();
  
  // Custom logic: Hide navbar/footer on specific "clean" pages if needed
  const isAuthPage = location.pathname === "/login";

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans antialiased selection:bg-brand-dark selection:text-white">
          <ScrollToTop />
          {!isAuthPage && <Navbar />}
          
          <main className="flex-grow w-full pt-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <AnimatedRoutes />
            </div>
          </main>

          {/* Footer logic: Home, Shop, and Contact usually need it */}
          {["/", "/shop", "/contact"].includes(location.pathname) && <Footer />}

          <Toaster 
            position="bottom-right" 
            toastOptions={{
              className: 'rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-2xl border border-slate-100 bg-white/90 backdrop-blur-md',
              duration: 4000,
              success: {
                iconTheme: { primary: '#0f172a', secondary: '#fff' },
              },
            }}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;