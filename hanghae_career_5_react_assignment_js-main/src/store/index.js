import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import filterReducer from './filter/filterSlice';
import productsReducer from './product/productsSlice';
import purchaseSlice from './purchase/purchaseSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    products: productsReducer,
    purchase: purchaseSlice,
  },
});
