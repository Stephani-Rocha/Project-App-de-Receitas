import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  filtredMeals: [],
};

export const getFiltredMeals = createAsyncThunk(
  'filtredMeals',
  async (endpoint) => {
    const responde = await fetch(endpoint);
    const data = await responde.json();
    console.log(data.meals);
    return data.meals;
  },
);

const mealsFiltredSlice = createSlice({
  name: 'filtredMeals',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMeals.fulfilled, (state, action) => {
      state.meals = [...action.payload];
    });
  },
});

export default mealsFiltredSlice.reducer;
