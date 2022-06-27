import { configureStore } from '@reduxjs/toolkit';
import mealsSlice from './Slice/mealsSlice';
import drinksSlice from './Slice/drinksSlice';
import mealCategorySlice from './Slice/mealCategorySlice';
import drinkCategorySlice from './Slice/drinkCategorySlice';

const Store = configureStore({
  reducer: {
    mealsSlice,
    drinksSlice,
    mealCategorySlice,
    drinkCategorySlice,
    // filtredMeals,
    // filtredDrinks,
  },
});

export default Store;
