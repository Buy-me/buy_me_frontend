import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: null,
  categories: [],
};

export const tabSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSelectedCategory } = tabSlice.actions;

export default tabSlice.reducer;
