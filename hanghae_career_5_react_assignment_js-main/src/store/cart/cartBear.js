import { create } from "zustand";
import {
  getCartFromLocalStorage,
  resetCartAtLocalStorage,
  setCartToLocalStorage,
  calculateTotal,
} from './cartUtils';

const useCartStore = create((set) => ({
  cart: [],
  totalCount: 0,
  totalPrice: 0,

  initCart: (userId) => {
    if (!userId) return;
    const prevCartItems = getCartFromLocalStorage(userId);
    const total = calculateTotal(prevCartItems);
    set({
      cart: prevCartItems,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
  },

  resetCart: (userId) => {
    resetCartAtLocalStorage(userId);
    set({ cart: [], totalCount: 0, totalPrice: 0 });
  },

  addCartItem: (item, userId, count) => {
    set((state) => {
      const existingItemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id);
      const newCart = [...state.cart];

      if (existingItemIndex !== -1) {
        newCart[existingItemIndex].count += count;
      } else {
        newCart.push({ ...item, count });
      }

      const total = calculateTotal(newCart);
      setCartToLocalStorage(newCart, userId);
      return {
        cart: newCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },

  removeCartItem: (itemId, userId) => {
    set((state) => {
      const newCart = state.cart.filter(item => item.id !== itemId);
      const total = calculateTotal(newCart);
      setCartToLocalStorage(newCart, userId);
      return {
        cart: newCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },

  changeCartItemCount: (itemId, count, userId) => {
    set((state) => {
      const itemIndex = state.cart.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        const newCart = [...state.cart];
        newCart[itemIndex].count = count;
        const total = calculateTotal(newCart);
        setCartToLocalStorage(newCart, userId);
        return {
          cart: newCart,
          totalCount: total.totalCount,
          totalPrice: total.totalPrice,
        };
      }
      return state; 
    });
  },
}));

export default useCartStore