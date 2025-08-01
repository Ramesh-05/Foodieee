import { createSlice } from '@reduxjs/toolkit';
import { restaurants as initialRestaurants, cuisines } from '../../data/restaurants';

const initialState = {
  restaurants: initialRestaurants,
  cuisines: cuisines,
  selectedRestaurant: null,
  filters: {
    cuisine: '',
    rating: 0,
    priceRange: '',
    area: '',
    sortBy: 'rating' // rating, deliveryTime, price
  },
  searchQuery: '',
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        cuisine: '',
        rating: 0,
        priceRange: '',
        area: '',
        sortBy: 'rating'
      };
      state.searchQuery = '';
    },
    addRestaurant: (state, action) => {
      state.restaurants.push(action.payload);
    },
    updateRestaurant: (state, action) => {
      const index = state.restaurants.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.restaurants[index] = action.payload;
      }
    },
    deleteRestaurant: (state, action) => {
      state.restaurants = state.restaurants.filter(r => r.id !== action.payload);
    },
    updateMenu: (state, action) => {
      const { restaurantId, menu } = action.payload;
      const restaurant = state.restaurants.find(r => r.id === restaurantId);
      if (restaurant) {
        restaurant.menu = menu;
      }
    },
  },
});

export const {
  setRestaurants,
  setSelectedRestaurant,
  setFilters,
  setSearchQuery,
  clearFilters,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  updateMenu,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;