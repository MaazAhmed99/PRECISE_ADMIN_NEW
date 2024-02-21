import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  individualCost: {
    step1: {
      fields: {
        fullName: "",
        emailAddress: "",
        dob: "",
        phoneNumber: "",
        lastYearTaxReturn: { fileName: "", base64Data: "" }, // Store file data
        socialSecurityNumber: { fileName: "", base64Data: "" }, // Store file data
        country: "",
        city: "",
        state: "",
        zipCode: "",
      },
      spouseFields: [],
    },
    step2: {
      w2Documents: [""],
      otherIncomeDocuments: [""],
    },
    step3: [{ fullName: "", ssn: "", dob: "", relationship: "" }],
    step4: [
      {
        base64Data: "",
        name: "1098-T Forms: If You Received Tuition And Fees Statements For Higher Education, Upload These Forms.",
        file: null,
        error: "",
      },
      {
        base64Data: "",
        name: "1099-K Forms: If You Received Income From Online Platforms Or Payment Processors, Upload These Forms.",
        file: null,
        error: "",
      },
      {
        base64Data: "",
        name: "1099-MISC Forms: If You Received Miscellaneous Income Not Reported On A W-2, Upload These Forms.",
        file: null,
        error: "",
      },
      {
        base64Data: "",
        name: "1099-R Forms: If You Received Retirement Income, Such As Pensions Or Annuities, Upload These Forms.",
        file: null,
        error: "",
      },
      {
        base64Data: "",
        name: "1099-INT Forms: If You Received Interest Income, Such As Bank Interest Or Dividends, Upload These Forms.",
        file: null,
        error: "",
      },
      {
        base64Data: "",
        name: "1099-DIV Forms: If You Received Dividend Income, Upload These Forms.",
        file: null,
        error: "",
      },
    ],
    step5: [
      {
        name: "If You Have Any Other Tax Forms Please Upload Here",
        file: null,
        error: "",
      },
      {
        name: "It's Recommended To Label Each Uploaded Document Clearly With The Corresponding Income Or Deduction Category.",
        file: null,
        error: "",
      },
      {
        name: "Consider Including A Progress Indicator On The Form To Show Users How Much Information They Have Submitted.",
        file: null,
        error: "",
      },
      {
        name: "Consider Including A Progress Indicator On The Form To Show Users How Much Information They Have Submitted.",
        file: null,
        error: "",
      },
    ],
  },
  loading: false,
};

const individualCostSlice = createSlice({
  name: "individualCost",
  initialState,
  reducers: {
    IndividualCostDecrease: (state, action) => {
      state.currentStep = action.payload;
    },
    IndividualCostSaveStep1: (state, action) => {
      console.log("dipatched");
      state.individualCost.step1 = action.payload;
      state.currentStep = 2;
    },
    IndividualCostSaveStep2: (state, action) => {
      state.individualCost.step2 = action.payload;
      state.currentStep = 3;
    },
    IndividualCostSaveStep3: (state, action) => {
      state.individualCost.step3 = action.payload;
      state.currentStep = 4;
    },
    IndividualCostSaveStep4: (state, action) => {
      state.individualCost.step4 = action.payload;
      state.currentStep = 5;
    },
    IndividualCostSaveStep5: (state, action) => {
      state.individualCost.step5 = action.payload;
    },
    resetIndividualCostSteps: (state) => {
      state.individualCost = initialState.individualCost;
    },
  },
});

export const {
  IndividualCostSaveStep1,
  IndividualCostSaveStep2,
  IndividualCostSaveStep3,
  IndividualCostSaveStep4,
  IndividualCostSaveStep5,
  IndividualCostDecrease,
  resetIndividualCostSteps,
} = individualCostSlice.actions;
export default individualCostSlice.reducer;
