import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../features/tab/tabSlice";
import categoryReducer from "../features/category/categorySlice";
import foodReducer from "../features/food/foodSlice";

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    category: categoryReducer,
    food: foodReducer,
  },
});
