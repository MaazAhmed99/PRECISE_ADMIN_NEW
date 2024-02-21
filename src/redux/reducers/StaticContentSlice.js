import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myProfile: null,
  priceListData: [
    {
      price: 1,
    },
    {
      price: 1,
    },
    {
      price: 1,
    },
  ],
};

const StaticContentSlice = createSlice({
  name: "StaticContentSlice",
  initialState,
  reducers: {
    GetMyProfileSubmit: (state, action) => {
      // console.log("from redux ", action, state);
      state.myProfile = action.payload;
    },
    GetPriceListSubmit: (state, action) => {
      state.priceListData = action.payload;
    },
  },
});

export const { GetMyProfileSubmit, GetPriceListSubmit } =
  StaticContentSlice.actions;
export default StaticContentSlice.reducer;
