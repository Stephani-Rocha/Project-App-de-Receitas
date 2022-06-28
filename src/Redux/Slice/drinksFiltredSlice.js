import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  drinks: [],
};

export const getFiltredDrinks = createAsyncThunk(
  'filtredDrinks',
  async (endpoint) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.drinks === null ? [] : data.drinks;
  },
);

const drinksFiltredSlice = createSlice({
  name: 'filtredDrinks',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFiltredDrinks.fulfilled, (state, action) => {
      state.drinks = [...action.payload];
    });
  },
});

export default drinksFiltredSlice.reducer;
