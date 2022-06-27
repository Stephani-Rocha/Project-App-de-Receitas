import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  drinkCategory: [],
};

export const getDrinkCategory = createAsyncThunk(
  'drinkCategory',
  async (endpoint) => {
    const responde = await fetch(endpoint);
    const data = await responde.json();
    return data.drinks;
  },
);

const drinkCategorySlice = createSlice({
  name: 'drinkCategory',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDrinkCategory.fulfilled, (state, action) => {
      state.drinkCategory = [...action.payload];
    });
  },
});

export default drinkCategorySlice.reducer;
