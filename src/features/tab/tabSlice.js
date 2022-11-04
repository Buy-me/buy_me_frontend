import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTab: "",
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
  
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = tabSlice.actions;

export default tabSlice.reducer;
