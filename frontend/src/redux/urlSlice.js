import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createShortUrl as apiCreateShortUrl } from '../api/urlApi';


const initialState = {
  shortUrls: [],
  loading: false,
  sU: null,
  error: null,
  currentShortUrl: null,
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setShortUrls: (state, action) => {
      state.shortUrls = action.payload;
    },
    setSU: (state, action) => {
      state.sU = action.payload;
    },
    addShortUrl: (state, action) => {
      state.shortUrls.unshift(action.payload);
    },
    clearCurrentUrl: (state) => {
      state.sU = null;
    },


  },
});

export const { clearError, clearCurrentUrl, setSU, setShortUrls, addShortUrl } = urlSlice.actions;
export default urlSlice.reducer;
