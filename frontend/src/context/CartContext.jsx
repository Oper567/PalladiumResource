import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('palladium_cart');
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return []; // Safety if localStorage is corrupted
    }
  });

  useEffect(() => {
    localStorage.setItem('palladium_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (!product?.id) return; // Guard clause
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        toast.success(`Incremented: ${product.name}`);
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      toast.success(`${product.name} Authorized`);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // NEW: Manual Quantity Adjustment (Great for Checkout Controls)
  const updateQuantity = (id, amount) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + amount);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.error("Resource De-allocated");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('palladium_cart');
  };

  // Variables (Calculated every render)
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, // Exported this
      clearCart, 
      cartTotal,      // Exported variable
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);