import AuthReducer from "./AuthReducer";
import ErrorReducer from "./ErrorReducer";
import smallBusinessTaxSlice from "./smallBusinessTaxSlice";
import individualCostSlice from "./individualCostSlice";
import independentContractorSlice from "./independentContractorSlice";
import StaticContentSlice from "./StaticContentSlice";

import { combineReducers } from "@reduxjs/toolkit";

const allReducers = combineReducers({
  AuthReducer,
  ErrorReducer,
  smallBusinessTaxSlice,
  individualCostSlice,
  independentContractorSlice,
  StaticContentSlice,
});

export default allReducers;
