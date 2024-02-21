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
        socialSecurityNumber: { fileName: "", base64Data: "" }, // Store file data
        lastYearsTaxReturn: { fileName: "", base64Data: "" },
        mailingAddress: "",
        nameOfFinancialInstitution: "",
        routing: "",
        checkingOrSaving: "",
        account: "",
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
    step5: {
      businessName: "",
      ein: "",
      businessEmail: "",
      businessPhoneNumber: "",
      businessIndustry: "",
      businessType: "",
      businessAddress: "",
    },
    step6: [
      {
        base64Data: "",
        name: "Upload A Copy Of Your Business's Profit And Loss Statement For The Tax Year.",
        file: null,
        error: "",
      },
      {
        base64Data: "",
        name: "Upload Any 1099 Forms Received, Such As 1099-NEC, 1099-K, Or 1099-MISC",
        file: null,
        error: "",
      },
      {
        base64Data: "",
        name: "List Your Business Expenses In Detail",
        file: null,
        error: "",
      },
      {
        base64Data: "",
        name: "Be Advised That Estimates For Expenses Must Be Conservative And Bank Records Will Be Required If Requested By The IRS",
        file: null,
        error: "",
      },
    ],
    step7: {
      makeModelYear: "",
      totalMilesDriven: "",
      percentageOfBusinessUse: "",
      lastYearsTaxReturn: { fileName: "", base64Data: "" },
      insuranceProvider: "",
      policyNumber: "",
      monthsOfCoverage: "",
      zipCode: "",
    },
    step8: [
      {
        name: "Upload Any 1099 Forms Received, Such As 1099-NEC, 1099-K, Or 1099-MISC",
        base64Data: "",
        file: null,
        error: "",
      },
      {
        name: "Expenses Will Be Automatically Extracted From Your Uploaded Statement.",
        base64Data: "",
        file: null,
        error: "",
        onHold: true,
      },
      {
        name: "Make, Model, And Year Of Vehicle Used For Business",
        base64Data: "",
        file: null,
        error: "",
      },
    ],
  },
  loading: false,
};

const independentContractorSlice = createSlice({
  name: "independentContractorSlice",
  initialState,
  reducers: {
    IndependentContractorDecrease: (state, action) => {
      state.currentStep = action.payload;
    },
    IndependentContractorSaveStep1: (state, action) => {
      state.individualCost.step1 = action.payload;
      state.currentStep = 2;
    },
    IndependentContractorSaveStep2: (state, action) => {
      state.individualCost.step2 = action.payload;
      state.currentStep = 3;
    },
    IndependentContractorSaveStep3: (state, action) => {
      state.individualCost.step3 = action.payload;
      state.currentStep = 4;
    },
    IndependentContractorSaveStep4: (state, action) => {
      state.individualCost.step4 = action.payload;
      state.currentStep = 5;
    },
    IndependentContractorSaveStep5: (state, action) => {
      state.individualCost.step5 = action.payload;
      state.currentStep = 6;
    },
    IndependentContractorSaveStep6: (state, action) => {
      state.individualCost.step6 = action.payload;
      state.currentStep = 7;
    },
    IndependentContractorSaveStep7: (state, action) => {
      state.individualCost.step7 = action.payload;
      state.currentStep = 8;
    },
    IndependentContractorSaveStep8: (state, action) => {
      state.individualCost.step8 = action.payload;
    },

    resetIndependentContractorStep: (state) => {
      state.individualCost = initialState.individualCost;
    },
  },
});

export const {
  IndependentContractorSaveStep1,
  IndependentContractorSaveStep2,
  IndependentContractorSaveStep3,
  IndependentContractorSaveStep4,
  IndependentContractorSaveStep5,
  IndependentContractorSaveStep6,
  IndependentContractorSaveStep7,
  IndependentContractorSaveStep8,
  IndependentContractorDecrease,
  resetIndependentContractorStep,
} = independentContractorSlice.actions;
export default independentContractorSlice.reducer;
