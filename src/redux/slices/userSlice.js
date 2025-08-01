import { createSlice } from '@reduxjs/toolkit';
import { users as initialUsers } from '../../data/users';

const initialState = {
  users: initialUsers,
  favorites: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
    addToFavorites: (state, action) => {
      const restaurantId = action.payload;
      if (!state.favorites.includes(restaurantId)) {
        state.favorites.push(restaurantId);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} = userSlice.actions;

export default userSlice.reducer;