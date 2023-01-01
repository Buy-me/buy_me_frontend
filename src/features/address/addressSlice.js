import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressList: [],
  selectedAddress: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressList: (state, action) => {
      state.addressList = action.payload;
    },
    addAddress: (state, action) => {
      state.addressList = [{ ...action.payload }, ...state.addressList];

      console.log(state.addressList);
    },
    deleteAddress: (state, action) => {
      // newAddr = state.addressList.filter((item) => item.id !== action.payload);
      state.addressList = state.addressList.filter(
        (item) => item.id !== action.payload
      );

      if (state.addressList.length == 0) {
        state.selectedAddress = null;
      }
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const { setAddressList, setSelectedAddress, addAddress, deleteAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
