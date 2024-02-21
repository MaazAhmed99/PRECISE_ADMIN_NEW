import { all } from "redux-saga/effects";
import AuthSaga from "./AuthSaga";
import FormStepSaga from "./FormStepSaga";

export default function* rootSaga() {
  yield all([AuthSaga(), FormStepSaga()]);
}
