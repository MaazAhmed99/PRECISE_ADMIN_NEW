import React from "react";
import { Routes, Outlet, Link, useLocation, Navigate } from "react-router-dom";
import APP_CONSTANTS from "../../constants/app-constant";

const Authenticator = (props) => {
  const location = useLocation();

  const isLogin =
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_TOKEN)) || false;
  // console.log(isLogin);
  if (props.authRoute && isLogin === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return props.children;
};

export default Authenticator;
