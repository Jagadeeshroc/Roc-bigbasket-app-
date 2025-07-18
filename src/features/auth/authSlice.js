import { createSlice } from '@reduxjs/toolkit';

// Load user from localStorage on app start
const storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: storedUser || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;

      // Ensure the payload contains a proper user object
      const user = action.payload?.user || action.payload;
      state.user = user;

      localStorage.setItem('user', JSON.stringify(user));
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem('user');
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
