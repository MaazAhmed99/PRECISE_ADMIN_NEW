import React, { useState } from "react";
import { logo } from "../../assests/media-constants";
import { Link, useNavigate } from "react-router-dom";
import APP_CONSTANTS from "../../constants/app-constant";

const Header = () => {
  const navigate = useNavigate();
  // const [getToken, setGetToken] = useState(
  //   JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_TOKEN)) || false
  // );
  const [getProfile, setGetProfile] = useState(
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_PROFILE)) || false
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  let headerLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Individual Tax", link: "/individual-tax" },
    { name: "Independent Contractor", link: "/independent-contractor" },
    { name: "Small Business Tax", link: "/small-business-tax" },
  ];
  return (
    <>
      <div className="header-small">
        <div className="container">
          <div className="row">
            <div className="col-10">
              {" "}
              <img
                onClick={() => navigate("/")}
                src={logo}
                className="main-logo"
                alt="logo"
              />
            </div>
            <div className="col-2 text-end align-self-center">
              <div
                className={`menu-icon ${menuOpen ? "open" : ""}`}
                onClick={handleMenuClick}
              >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="menu">
            <div className="container pt-3">
              <div className="row">
                <div className="col-10">
                  <img
                    src={logo}
                    className="header-menu-image"
                    alt="header image"
                  />
                </div>
                <div className="col-2 text-end">
                  <div className="close-icon" onClick={closeMenu}>
                    &times;
                  </div>
                </div>
              </div>
              <ul>
                {headerLinks.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      className={"text-decoration-none"}
                      to={`${item.link}`}
                    >
                      <li
                        style={
                          item?.link == window.location.pathname
                            ? {
                                borderBottom: "5px solid #EAA053",
                              }
                            : null
                        }
                      >
                        {item.name}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="header-full">
        <div className="container-fluid ps-0">
          <div className="row">
            <div className="col-md-2">
              <div className="header-logo-bg">
                <img src={logo} className="header-logo" />
              </div>
            </div>
            <div className="col-md-10">
              <ul className="header-full-content">
                {headerLinks.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      className={"text-decoration-none"}
                      to={`${item.link}`}
                    >
                      <li
                        className={
                          item?.link == window.location.pathname
                            ? "active"
                            : null
                        }
                        key={index + 200}
                      >
                        {item.name}
                      </li>
                    </Link>
                  );
                })}
                {getProfile ? (
                  <>
                    <span
                      onClick={() => navigate("/admin")}
                      className="avatar cursor_pointer"
                    >
                      {getProfile?.user?.username.slice(0, 1)}
                    </span>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() => navigate("/login")}
                        className="btn btn-light me-3 login-btn"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => navigate("/register")}
                        className="btn btn-light yellow-btn"
                      >
                        SignUp
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
