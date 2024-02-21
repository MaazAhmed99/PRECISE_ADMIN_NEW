import Axios from "axios";
import APP_CONSTANTS from "../constants/app-constant";
import APP from "../constants/app-constant";

const axios = Axios.create({
  baseURL: "http://18.171.120.116:3000/api/v1/",
});

axios.interceptors.request.use((request) => {
  if (request?.headers.images) {
    request.headers = {
      Accept: "application/json",
      Authorization: localStorage.getItem(`${APP_CONSTANTS.ACCESS_TOKEN}`)
        ? `Bearer ${JSON?.parse(localStorage?.getItem(`${APP?.ACCESS_TOKEN}`))}`
        : "",
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    return request;
  } else {
    request.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: localStorage.getItem(`${APP_CONSTANTS.ACCESS_TOKEN}`)
        ? `Bearer ${JSON.parse(
            localStorage.getItem(`${APP_CONSTANTS.ACCESS_TOKEN}`)
          )}`
        : "",
    };
    return request;
  }
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // LOGOUT IN CASE OF UNAUTHORIZE
    if (
      error?.response?.status === 401 &&
      window.location.pathname != "/login"
    ) {
      axios.defaults.headers.common["Authorization"] = null;
      localStorage?.removeItem(`${APP_CONSTANTS.ACCESS_TOKEN}`);
      localStorage?.removeItem(`${APP_CONSTANTS.ACCESS_PROFILE}`);
      window.location.replace("/");
    }
    console.log("An error occurred in API Client");

    return error?.response;
  }
);

export default axios;
