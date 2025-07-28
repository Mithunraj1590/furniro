import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }
      
      // Recalculate total
      state.total = state.items.reduce((sum, item) => {
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace('Rs. ', '').replace(',', ''))
          : item.price;
        return sum + (price * item.quantity);
      }, 0);
    },
    
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      
      // Recalculate total
      state.total = state.items.reduce((sum, item) => {
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace('Rs. ', '').replace(',', ''))
          : item.price;
        return sum + (price * item.quantity);
      }, 0);
    },
    
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== itemId);
        } else {
          item.quantity = quantity;
        }
      }
      
      // Recalculate total
      state.total = state.items.reduce((sum, item) => {
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.replace('Rs. ', '').replace(',', ''))
          : item.price;
        return sum + (price * item.quantity);
      }, 0);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 