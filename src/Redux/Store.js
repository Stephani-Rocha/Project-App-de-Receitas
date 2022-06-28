import { configureStore } from '@reduxjs/toolkit';
import mealsSlice from './Slice/mealsSlice';
import drinksSlice from './Slice/drinksSlice';
import mealCategorySlice from './Slice/mealCategorySlice';
import drinkCategorySlice from './Slice/drinkCategorySlice';
import mealFiltredSlice from './Slice/mealFiltredSlice';
import drinksFiltredSlice from './Slice/drinksFiltredSlice';

const Store = configureStore({
  reducer: {
    mealsSlice,
    drinksSlice,
    mealCategorySlice,
    drinkCategorySlice,
    mealFiltredSlice,
    drinksFiltredSlice,
  },
});

export default Store;
