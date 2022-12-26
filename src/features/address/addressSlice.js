import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressList: [
    {
      id: 0,
      title: "Le Quy Don Highschool",
      address: "123 Tran Hung Dao Street, Ward 2, District 1",
    },
    {
      id: 1,
      title: "Le Quy Don Highschool",
      address: "123 Tran Hung Dao Street, Ward 2, District 1",
    },
    {
      id: 2,
      title: "University of Informaton Technology",
      address: "123 Tran Hung Dao Street, Ward 2, District 1",
    },
    {
      id: 3,
      title: "Ben Thanh Market",
      address: "123 Tran Hung Dao Street, Ward 2, District 1",
    },
  ],
  selectedAddress: {
    id: 2,
    title: "University of Informaton Technology",
    address: "123 Tran Hung Dao Street, Ward 2, District 1",
  },
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressList: (state, action) => {
      state.addressList = action.payload;
    },
    addAddress: (state, action) => {
      console.log("Come here add ");
      state.addressList = [
        { id: action.payload.title, ...action.payload },
        ...state.addressList,
      ];

      console.log(state.addressList);
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const { setAddressList, setSelectedAddress, addAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
