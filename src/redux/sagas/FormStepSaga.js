import {
  BusinessSubmitData,
  ResetBusinessSteps,
  BusinessSucess,
} from "../reducers/smallBusinessTaxSlice";
import { FormSubmitApiCall } from "../../services/auth";
import APP from "../../constants/app-constant";
import { put, select, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { SetError } from "../reducers/ErrorReducer";

function* FormStepSubmit(action) {
  try {
    let token = JSON?.parse(localStorage?.getItem(`${APP?.ACCESS_TOKEN}`));
    if (action.payload === "SmallBusinessTax") {
      const { businessInfo } = yield select(
        (state) => state.SmallBusinessTaxSlice
      );
      let data = {
        fullName: "string",
        emailAddress: "user@example.com",
        dob: "string",
        phoneNumber: "string",
        socialSecurityNumber: "string",
        country: "string",
        city: "string",
        zipCode: "string",
        mailingAddress: "string",
        lastYearTaxReturn: "string",
        taxation_type: "INDIVIDUAL",
        user: {
          username: "string",
          email: "user@example.com",
          password: "string",
          isEmailVerified: true,
          role: "ADMIN",
          id: "string",
        },
        dependents: {
          fullName: "string",
          socialSecurityNumber: "string",
          dob: "string",
          relationship: "string",
          id: "string",
        },
        additionalNotes: {
          label: "string",
          value: "string",
          id: "string",
        },
        income: {
          w2Doc: [],
          otherIncomeDoc: [],
          id: "string",
        },
        commonDoc: {
          T1098: "string",
          K1099: "string",
          MISC1099: "string",
          R1099: "string",
          INT1099: "string",
          DIV1099: "string",
          id: "string",
        },
        businessInfo: {
          name: "string",
          ein: "string",
          email: "string",
          phone: "string",
          industry: "string",
          type: "string",
          ownerName: "string",
          ownerSSN: "string",
          ownerAddress: "string",
          ownerShare: "string",
          profitLossDoc: "string",
          registrationLetterDoc: "string",
          lastYearTaxReturnDoc: "string",
          forms1099: [],
          id: "string",
        },
        businessExpense: {
          profitLossStatementDoc: "string",
          details: "string",
          estimates: "string",
          id: "string",
        },
        businessVehicleInfo: {
          registrationDoc: "string",
          totalMiles: 0,
          usePercentage: 0,
          taxReturnDoc: "string",
          insuranceProviderName: "string",
          policyNumber: 0,
          monthsOfCoverage: "string",
          zipCode: "string",
          id: "string",
        },
        businessFinancialInfo: {
          profitAndLossDoc: "string",
          balanceSheetDoc: "string",
          description: "string",
          bankStatementDoc: "string",
          lastYeartaxReturnDocument: "string",
          id: "string",
        },
        id: "string",
      };
    } else if (action.payload === "individualTax") {
      let data = {
        fullName: "string",
        emailAddress: "user@example.com",
        dob: "string",
        phoneNumber: "string",
        socialSecurityNumber: "string",
        country: "string",
        city: "string",
        zipCode: "string",
        mailingAddress: "string",
        lastYearTaxReturn: "string",
        taxation_type: "INDIVIDUAL",
        user: {
          username: "string",
          email: "user@example.com",
          password: "string",
          isEmailVerified: true,
          role: "ADMIN",
          id: "string",
        },
        dependents: {
          fullName: "string",
          socialSecurityNumber: "string",
          dob: "string",
          relationship: "string",
          id: "string",
        },
        additionalNotes: {
          label: "string",
          value: "string",
          id: "string",
        },
        income: {
          w2Doc: [],
          otherIncomeDoc: [],
          id: "string",
        },
        commonDoc: {
          T1098: "string",
          K1099: "string",
          MISC1099: "string",
          R1099: "string",
          INT1099: "string",
          DIV1099: "string",
          id: "string",
        },
        businessInfo: {
          name: "string",
          ein: "string",
          email: "string",
          phone: "string",
          industry: "string",
          type: "string",
          ownerName: "string",
          ownerSSN: "string",
          ownerAddress: "string",
          ownerShare: "string",
          profitLossDoc: "string",
          registrationLetterDoc: "string",
          lastYearTaxReturnDoc: "string",
          forms1099: [],
          id: "string",
        },
        businessExpense: {
          profitLossStatementDoc: "string",
          details: "string",
          estimates: "string",
          id: "string",
        },
        businessVehicleInfo: {
          registrationDoc: "string",
          totalMiles: 0,
          usePercentage: 0,
          taxReturnDoc: "string",
          insuranceProviderName: "string",
          policyNumber: 0,
          monthsOfCoverage: "string",
          zipCode: "string",
          id: "string",
        },
        businessFinancialInfo: {
          profitAndLossDoc: "string",
          balanceSheetDoc: "string",
          description: "string",
          bankStatementDoc: "string",
          lastYeartaxReturnDocument: "string",
          id: "string",
        },
        id: "string",
      };
    }

    // const response = yield FormSubmitApiCall(action.payload, token);
    console.log(action.payload, "from form step");
    // if (response.status == 200) {
    //   toast.success("Form Successfully Submitted");
    //   yield put(BusinessSucess(response));
    // } else {
    //   toast.error(`${response?.data?.message}`);
    //   console.log("from else signup submit", response);
    //   //   yield put(ClearState());
    //   yield put(SetError(response));
    // }
  } catch (e) {
    console.log("catch error from signup submit", e);
    yield put(SetError(e));
    // yield put(ResetBusinessSteps());
  }
}

function* FormStepSaga() {
  yield takeLatest(BusinessSubmitData.type, FormStepSubmit);
}

export default FormStepSaga;
