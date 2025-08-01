import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  analytics: {
    totalRestaurants: 45,
    totalOrders: 1284,
    totalRevenue: 24590.50,
    totalUsers: 892,
    averageRating: 4.3,
    ordersToday: 67,
    revenueToday: 1834.20,
    newUsersToday: 12,
    popularDishes: [
      { name: "Margherita Pizza", orders: 89 },
      { name: "Chicken Burger", orders: 76 },
      { name: "Pad Thai", orders: 65 },
      { name: "Caesar Salad", orders: 54 },
      { name: "Chocolate Cake", orders: 43 }
    ],
    recentActivity: [
      { type: "order", message: "New order #1284 from John Doe", time: "2 min ago" },
      { type: "restaurant", message: "Pizza Palace added new menu item", time: "15 min ago" },
      { type: "review", message: "New 5-star review for Taco Bell", time: "32 min ago" },
      { type: "user", message: "New user registration: jane.smith@email.com", time: "45 min ago" }
    ]
  },
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAnalytics: (state, action) => {
      state.analytics = { ...state.analytics, ...action.payload };
    },
    updateAnalytics: (state, action) => {
      const { metric, value } = action.payload;
      if (state.analytics[metric] !== undefined) {
        state.analytics[metric] = value;
      }
    },
    addActivity: (state, action) => {
      state.analytics.recentActivity.unshift(action.payload);
      // Keep only last 10 activities
      if (state.analytics.recentActivity.length > 10) {
        state.analytics.recentActivity = state.analytics.recentActivity.slice(0, 10);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAnalytics,
  updateAnalytics,
  addActivity,
  setLoading,
  setError,
} = adminSlice.actions;

export default adminSlice.reducer;
