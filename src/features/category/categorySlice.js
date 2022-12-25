import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: null,
  selectedMenuType: {
    id: 1,
    name: "Newest",
    sort: "id desc",
  },
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedMenuType: (state, action) => {
      state.selectedMenuType = action.payload;
    },
  },
});

export const { setSelectedCategory, setCategories, setSelectedMenuType } =
  categorySlice.actions;

export default categorySlice.reducer;
