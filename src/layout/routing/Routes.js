import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// packages css import
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// custom css import
import "../../assests/css/home.css";
import "../../assests/css/components.css";
import "../../assests/css/auth.css";
import "../../assests/css/form-steps.css";
import "../../assests/css/admin-panel.css";
import "../../assests/css/responsive.css";
// pages import
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AdminHome from "../pages/AdminHome";
import Authenticator from "./Authenticator";
import APP_CONSTANTS from "../../constants/app-constant";
import ForgetPassword from "../pages/ForgetPassword";
import NewPassword from "../pages/NewPassword";
import AdminHomeContent from "../pages/AdminHomeContent";
import FilePreview from "../pages/FilePreview";
import UserPage from "../pages/UserPage";

const MainRoutes = () => {
  const [getToken, setGetToken] = useState(
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_TOKEN)) || false
  );
  const routes = [
    {
      path: "/login",
      authRoutes: false,
      blockAfterLogin: true,
      element: <Login />,
    },
    {
      path: "/register",
      authRoutes: false,
      blockAfterLogin: true,
      element: <SignUp />,
    },
    {
      path: "/forget-password",
      authRoutes: false,
      blockAfterLogin: true,
      element: <ForgetPassword />,
    },
    {
      path: "/reset-password",
      authRoutes: false,
      blockAfterLogin: true,
      element: <NewPassword />,
    },
    {
      path: "/tax-content",
      authRoutes: true,
      blockAfterLogin: false,
      element: <AdminHomeContent />,
    },
    {
      path: "/file-preview/:id",
      authRoutes: true,
      blockAfterLogin: false,
      element: <FilePreview />,
    },
    {
      path: "/user/:id",
      authRoutes: true,
      blockAfterLogin: false,
      element: <UserPage />,
    },
    {
      path: "/",
      authRoutes: true,
      blockAfterLogin: false,
      element: <AdminHome />,
    },

    { path: "*", authRoutes: true, element: <AdminHome /> },
  ];
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((val, index) => (
            <Route
              key={index + 1000}
              path={val?.path}
              element={
                <Authenticator authRoute={val?.authRoutes}>
                  {val?.blockAfterLogin && getToken ? (
                    <AdminHome />
                  ) : (
                    val?.element
                  )}
                </Authenticator>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainRoutes;
