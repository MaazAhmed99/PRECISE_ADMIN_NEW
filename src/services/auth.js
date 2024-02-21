import axios from "./api-client";
import API from "../constants/apis";

// headers

export const headers = () => {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export const headersWithToken = (token) => {
  return {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export const headersWithImage = (token) => {
  return {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export const signinApiCall = async (data) => {
  return axios.post(API.LOGIN_URL, data, headers());
};
export const signupApiCall = async (data) => {
  return axios.post(API.SIGNUP_URL, data, headers());
};
export const forgetPasswordApiCall = async (data) => {
  return axios.post(API.FORGOT_PASSWORD, data, headers());
};
export const resetPasswordApiCall = async (data) => {
  return axios.post(API.RESET_PASSWORD, data, headers());
};
export const logoutApiCall = async (data) => {
  return axios.post(API.LOGOUT_URL, data, headers());
};
