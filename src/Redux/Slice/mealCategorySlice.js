import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  mealCategory: [],
};

export const getMealCategory = createAsyncThunk(
  'mealCategory',
  async (endpoint) => {
    const responde = await fetch(endpoint);
    const data = await responde.json();
    return data.meals;
  },
);

const mealCategorySlice = createSlice({
  name: 'mealCategory',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMealCategory.fulfilled, (state, action) => {
      state.mealCategory = [...action.payload];
    });
  },
});

export default mealCategorySlice.reducer;
