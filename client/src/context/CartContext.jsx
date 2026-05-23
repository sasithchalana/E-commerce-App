import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../api';
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setItems([]);
      setTotal(0);
      return;
    }
    
    setLoading(true);
    try {
      const data = await api.getCart();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [isAuthenticated]);

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return false;
    }
    
    try {
      await api.addToCart(productId, quantity);
      toast.success('Added to cart');
      await refreshCart();
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to add to cart');
      return false;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      return removeItem(itemId);
    }
    try {
      await api.updateCartItem(itemId, quantity);
      await refreshCart();
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to update quantity');
      return false;
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.removeCartItem(itemId);
      toast.success('Item removed from cart');
      await refreshCart();
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to remove item');
      return false;
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      total,
      itemCount,
      loading,
      addToCart,
      updateQuantity,
      removeItem,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
