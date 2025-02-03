// store/providerSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const providerSlice = createSlice({
  name: 'provider',
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    // Add more reducers as needed
  },
});

export const { setData } = providerSlice.actions;

export default providerSlice.reducer;
