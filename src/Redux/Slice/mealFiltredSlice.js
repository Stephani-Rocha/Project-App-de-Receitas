import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  meals: [],
};

export const getFiltredMeals = createAsyncThunk(
  'filtredMeals',
  async (endpoint) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.meals === null ? [] : data.meals;
  },
);

const mealsFiltredSlice = createSlice({
  name: 'filtredMeals',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFiltredMeals.fulfilled, (state, action) => {
      state.meals = [...action.payload];
    });
  },
});

export default mealsFiltredSlice.reducer;
