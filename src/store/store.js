// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices'; // Import the combined reducers

export const store = configureStore({
  reducer: rootReducer,
});

