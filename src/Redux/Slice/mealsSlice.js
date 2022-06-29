import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  meals: [],
};

export const getMeals = createAsyncThunk(
  'meals',
  async (endpoint) => {
    const responde = await fetch(endpoint);
    const data = await responde.json();
    // console.log(endpoint);
    return data.meals === null ? [] : data.meals;
  },
);

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMeals.fulfilled, (state, action) => {
      state.meals = [...action.payload];
    });
  },
});

export default mealsSlice.reducer;
