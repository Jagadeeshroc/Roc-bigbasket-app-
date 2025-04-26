// hooks/useCart.js
import { useState, useEffect } from 'react';

const useCart = () => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved).map(item => ({
        ...item,
        productPrice: Number(item.productPrice) || 0,
        quantity: Number(item.quantity) || 1
      })) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id 
            ? {...item, quantity: item.quantity + 1} 
            : item
        );
      }
      return [...prev, {...product, quantity: 1}];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prev => 
      prev.map(item =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + (item.productPrice * item.quantity),
    0
  );

  const itemCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    itemCount
  };
};

export default useCart;