import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../features/tab/tabSlice";
import categoryReducer from "../features/category/categorySlice";
import foodReducer from "../features/food/foodSlice";
import cartReducer from "../features/cart/cartSlice";
import addressReducer from "../features/address/addressSlice";
import userReducer from "../features/user/userSlice";
import favouriteReducer from "../features/favourite/favouriteSlice"

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    category: categoryReducer,
    food: foodReducer,
    cart: cartReducer,
    address: addressReducer,
    user: userReducer,
    favourite: favouriteReducer
  },
});
