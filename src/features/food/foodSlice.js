import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFood: null,
  foods: [],
  populars: [],
  recommends: [],
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setSelectedFood: (state, action) => {
      state.selectedFood = action.payload;
    },
    setFoods: (state, action) => {
      state.foods = action.payload;
    },
    setRecommends: (state, action) => {
      state.recommends = action.payload;
    },
    setPopulars: (state, action) => {
      state.populars = action.payload;
    },
  },
});

export const { setSelectedFood, setFoods, setPopulars, setRecommends } =
  foodSlice.actions;

export default foodSlice.reducer;
