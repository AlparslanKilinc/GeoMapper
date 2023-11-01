import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux-slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  devTools: false
});
