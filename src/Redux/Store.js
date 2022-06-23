import { configureStore } from '@reduxjs/toolkit';
import mealsSlice from './Slice/mealsSlice';
import drinksSlice from './Slice/drinksSlice';

const Store = configureStore({
  reducer: {
    mealsSlice,
    drinksSlice,
  },
});

export default Store;
