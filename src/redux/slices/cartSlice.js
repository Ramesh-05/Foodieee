import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  restaurantId: null,
  subtotal: 0,
  deliveryFee: 0,
  tax: 0,
  total: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, restaurantId, deliveryFee } = action.payload;
      
      // If cart has items from different restaurant, clear cart
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        state.items = [];
      }
      
      state.restaurantId = restaurantId;
      state.deliveryFee = deliveryFee;
      
      const existingItem = state.items.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      
      // Recalculate totals
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      if (state.items.length === 0) {
        state.restaurantId = null;
        state.deliveryFee = 0;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== itemId);
          if (state.items.length === 0) {
            state.restaurantId = null;
            state.deliveryFee = 0;
          }
        } else {
          item.quantity = quantity;
        }
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
      state.subtotal = 0;
      state.deliveryFee = 0;
      state.tax = 0;
      state.total = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCartOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    calculateTotals: (state) => {
      state.subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.tax = state.subtotal * 0.08; // 8% tax
      state.total = state.subtotal + state.deliveryFee + state.tax;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;