import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFood: null,
  foods: [],
  populars: [],
  recommends: [],
  rating: 0,
  prices: [0, 0],
  isLoading: false,
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedFood: (state, action) => {
      state.selectedFood = action.payload;
    },
    setFoods: (state, action) => {
      state.foods = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setRecommends: (state, action) => {
      state.recommends = action.payload;
    },
    setPopulars: (state, action) => {
      state.populars = action.payload;
    },
  },
});

export const {
  setSelectedFood,
  setRating,
  setPrices,
  setFoods,
  setPopulars,
  setRecommends,
  setIsLoading,
} = foodSlice.actions;

export default foodSlice.reducer;
