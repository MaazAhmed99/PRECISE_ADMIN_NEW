import React, { useState } from "react";
import {
  fileMenu,
  home,
  logo,
  logout,
  users,
} from "../../assests/media-constants";
import { useLocation, useNavigate } from "react-router-dom";
import APP_CONSTANTS from "../../constants/app-constant";
import { useDispatch, useSelector } from "react-redux";
import { logoutSubmit } from "../../redux/reducers/AuthReducer";
import { headersWithToken } from "../../services/auth";

const SideMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [getProfile, setGetProfile] = useState(
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_PROFILE)) || false
  );
  const token =
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_TOKEN)) || false;
  const [taxation, setTaxation] = useState(null);

  return (
    <div className="left-side">
      <div className="logo-area">
        <img
          onClick={() => navigate("/")}
          className="logo cursor_pointer"
          src={logo}
        />
      </div>
      <div className="list-links">
        <p
          onClick={() => navigate("/")}
          className={
            location.pathname === "/"
              ? "active cursor_pointer"
              : "home-txt cursor_pointer"
          }
        >
          <img src={home} /> Home
        </p>
        <p
          onClick={() => navigate("/tax-content")}
          className={
            location.pathname === "/tax-content"
              ? "active cursor_pointer"
              : "home-txt cursor_pointer"
          }
        >
          <img src={fileMenu} width={25} /> Tax Content
        </p>
        <p
          onClick={() => navigate("/users")}
          className={
            location.pathname === "/users"
              ? "active cursor_pointer"
              : "home-txt cursor_pointer"
          }
        >
          <img src={users} width={25} /> Users
        </p>
        <p
          onClick={
            () =>
              dispatch(
                logoutSubmit({
                  refreshToken: getProfile?.tokens?.refresh?.token,
                })
              )
            // navigate("/login")
          }
          className="logout-txt cursor_pointer "
        >
          <img className="bg-white" src={logout} /> Logout{" "}
        </p>
      </div>
    </div>
  );
};

export default SideMenu;
