import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  businessInfo: {
    step1: {
      formData: {
        businessName: "",
        ein: "",
        emailAddress: "",
        phoneNumber: "",
        businessIndustries: "",
        businessType: "",
        // ownerName: "",
        // ownerSSN: "",
        // ownerAddress: "",
        // ownerPercentage: "",
        profitLossStatement: null,
        // lastYearsTaxReturn: null,
        vehicleMakeModelYear: "",
        totalMilesDriven: "",
        percentageOfBusinessUse: "",
        lastYearsTaxReturnVehicle: null,
      },
      businessfields: [
        { ownerName: "", ownerSSN: "", ownerAddress: "", ownerPercentage: "" },
      ],
    },
    step2: {
      additionalFiles: [
        {
          name: "Upload Any 1099 Forms Received, Such As 1099-NEC, 1099-K, Or 1099-MISC",
          base64Data: "",
          file: null,
          error: "",
        },
      ],
      files: [
        {
          name: "Upload A Copy Of Your Business's Profit And Loss Statement For The Tax Year",
          base64Data: "",
          file: null,
          error: "",
        },
        {
          name: " Upload A Copy Of Your Business's Balance Sheet As Of The End Of The Tax Year",
          base64Data: "",
          file: null,
          error: "",
        },
        {
          name: "You May Be Required To Upload Bank Statements To Verify Your Income And Expenses",
          base64Data: "",
          file: null,
          error: "",
        },

        {
          name: "Please Upload A Copy Of Franchise Tax Letter Containing XT Number (XT123456)",
          base64Data: "",
          file: null,
          error: "",
        },
      ],
      additionalNotes: "",
    },
    step3: {
      lastYearTaxReturn: null,
      fullName: "",
      emailAddress: "",
      dateOfBirth: "",
      phoneNumber: "",
      mailingAddress: "",
    },
    step4: {
      lastYearTaxReturn: null,
    },
  },
  loading: false,
  type: "",
  submit: false,
  error: null,
  success: null,
};

const smallBusinessTaxSlice = createSlice({
  name: "smallBusinessTax",
  initialState,
  reducers: {
    BusinessSaveStep1: (state, action) => {
      state.businessInfo.step1 = action.payload;
      state.currentStep = 2;
    },
    BusinessSaveStep2: (state, action) => {
      state.businessInfo.step2 = action.payload;
      state.submit = true;
    },
    BusinessSubmitData: (state, action) => {
      state.loading = true;
      state.type = action.payload;
    },
    BusinessSucess: (state, action) => {
      state.success = action.payload;
      state.submit = true;
    },
    ResetBusinessSteps: (state) => {
      state.businessInfo = initialState.businessInfo;
    },
    SmallBusinessInfoDecrease: (state, action) => {
      state.currentStep = action.payload;
    },
    // BusinessSaveStep
    BusinessSaveStep3: (state, action) => {
      state.businessInfo.step3 = action.payload;
      state.currentStep = 4;
    },
    BusinessSaveStep4: (state, action) => {
      state.businessInfo.step4 = action.payload;
    },
  },
});

export const {
  BusinessSaveStep1,
  BusinessSaveStep2,
  BusinessSaveStep3,
  BusinessSaveStep4,
  BusinessSubmitData,
  BusinessSucess,
  ResetBusinessSteps,
  SmallBusinessInfoDecrease,
} = smallBusinessTaxSlice.actions;
export default smallBusinessTaxSlice.reducer;
