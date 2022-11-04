import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../features/tab/tabSlice";

export const store = configureStore({
  reducer: {
    tab: tabReducer,
  },
});
