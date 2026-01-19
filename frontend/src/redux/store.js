import { configureStore } from '@reduxjs/toolkit';
import urlReducer from './urlSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    url: urlReducer,
    auth: authReducer,
  },
});
