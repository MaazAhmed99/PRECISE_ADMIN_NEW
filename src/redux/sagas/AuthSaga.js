import { put, takeLatest } from "redux-saga/effects";
import {
  loginSubmit,
  loginSuccess,
  ClearState,
  signupSubmit,
  signupSuccess,
  logoutSuccess,
  logoutSubmit,
  forgetPasswordSuccess,
  forgetPasswordSubmit,
  resetPasswordSubmit,
  resetPasswordSuccess,
} from "../reducers/AuthReducer";
import APP_CONSTANTS from "../../constants/app-constant";
import {
  forgetPasswordApiCall,
  logoutApiCall,
  resetPasswordApiCall,
  signinApiCall,
  signupApiCall,
} from "../../services/auth";
import axios from "../../services/api-client";
import { toast } from "react-toastify";
import { responseError } from "../../services/Error";
import { SetError } from "../reducers/ErrorReducer";

function* LoginSubmit(action) {
  // console.log("from auth saga outside trycatch", action);
  try {
    const response = yield signinApiCall(action.payload);
    if (response?.tokens) {
      localStorage.setItem(
        `${APP_CONSTANTS.ACCESS_TOKEN}`,
        JSON.stringify(response?.tokens?.access?.token)
      );
      localStorage.setItem(
        `${APP_CONSTANTS.ACCESS_PROFILE}`,
        JSON.stringify(response)
      );
      console.log("from auth saga inside try", response);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.data?.token}`;
      yield put(loginSuccess(response?.data?.user));
    } else {
      console.log("from auth saga inside  else", response?.data?.errors);
      toast.error(`${response?.data?.message}`);
      // let errorHandler = responseError(response);
      // yield put(SetError(errorHandler));
      yield put(ClearState());
    }
  } catch (e) {
    console.log("from login inside catch", e);
    yield put(SetError(e));
    yield put(ClearState());
  }
}

function* SignupSubmit(action) {
  try {
    const response = yield signupApiCall(action.payload);
    console.log(response, "from signup success");
    if (response?.tokens?.access?.token) {
      toast.success("User Successfully Registered");
      yield put(signupSuccess(response?.user));
    } else {
      toast.error(`${response?.data?.message}`);
      console.log("from else signup submit", response);
      yield put(ClearState());
    }
  } catch (e) {
    console.log("catch error from signup submit", e);
    yield put(SetError(e));
    yield put(ClearState());
  }
}

function* ForgetPasswordSubmit(action) {
  try {
    const response = yield forgetPasswordApiCall(action.payload);
    console.log(response, "from forgotpassword success");
    if (response?.token) {
      toast.success("Email sent successfully");
      yield put(forgetPasswordSuccess());
    } else {
      toast.error(response?.data?.message);
      console.log("from else signup submit", response);
    }
  } catch (e) {
    console.log("catch error from signup submit", e);
    yield put(SetError(e));
    yield put(ClearState());
  }
}

function* ResetPasswordSubmit(action) {
  try {
    const response = yield resetPasswordApiCall(action.payload);
    console.log(response, "from forgotpassword success");
    if (response.status == 200) {
      toast.success("Password changed successfully");
      yield put(resetPasswordSuccess());
    } else {
      toast.error(response?.data?.message);
      console.log("from else signup submit", response);
    }
  } catch (e) {
    console.log("catch error from signup submit", e);
    yield put(SetError(e));
    yield put(ClearState());
  }
}

function* LogoutSubmit(action) {
  try {
    const response = yield logoutApiCall(action.payload);
    console.log(response, "from signup success");
    localStorage.removeItem(APP_CONSTANTS.ACCESS_TOKEN);
    localStorage.removeItem(APP_CONSTANTS.ACCESS_PROFILE);
    yield put(logoutSuccess());
    yield put(ClearState());
    window.location.replace("/");
  } catch (e) {
    console.log("error from logout", e);
    yield put(SetError(e));
    yield put(logoutSuccess());
    yield put(ClearState());
  }
}

function* AuthSaga() {
  yield takeLatest(loginSubmit.type, LoginSubmit);
  yield takeLatest(signupSubmit.type, SignupSubmit);
  yield takeLatest(forgetPasswordSubmit.type, ForgetPasswordSubmit);
  yield takeLatest(logoutSubmit.type, LogoutSubmit);
  yield takeLatest(resetPasswordSubmit.type, ResetPasswordSubmit);
}

export default AuthSaga;
