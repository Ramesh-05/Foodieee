import { createSlice } from '@reduxjs/toolkit';
import { orders as initialOrders } from '../../data/orders';

const initialState = {
  orders: initialOrders,
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
    },
    createOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        order.timeline.push({
          status,
          time: new Date().toISOString()
        });
      }
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const {
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  updateOrderStatus,
  setCurrentOrder,
  clearCurrentOrder,
  setOrders,
} = orderSlice.actions;

export default orderSlice.reducer;