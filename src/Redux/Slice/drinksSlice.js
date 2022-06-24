import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  drinks: [],
};

export const getDrinks = createAsyncThunk(
  'drinks',
  async (endpoint) => {
    const responde = await fetch(endpoint);
    const data = await responde.json();
    return data.drinks === null ? [] : data.drinks;
  },
);

const drinksSlice = createSlice({
  name: 'drinks',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDrinks.fulfilled, (state, action) => {
      state.drinks = [...action.payload];
    });
  },
});

export default drinksSlice.reducer;
