import React from "react";
import { Link } from "react-router-dom";
import { logo, phoneCall } from "../../assests/media-constants";

const Footer = () => {
  return (
    <>
      <div className="footer-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <img src={logo} className="footer-logo" />
              <div className="text-dark mt-4 pt-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor
              </div>
            </div>
            <div className="col-lg-4">
              <ul>
                <li>
                  <Link to={"/home"}>Home</Link>
                </li>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
                <li>
                  <Link to={"/individual-tax"}>Individual Tax</Link>
                </li>
                <li>
                  <Link to={"/independent-contractor"}>
                    Independent Contractor
                  </Link>
                </li>
                <li>
                  <Link to={"/small-business-tax"}>Small Business Tax</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h3 className="text-dark fw-bold">Location</h3>
              <p className="text-dark mb-4">
                1535 W Hildebrand Ave, San Antonio, TX, United States, Texas
              </p>
              <div className="d-flex">
                <img className="me-2" src={phoneCall} />
                <a href="tel:+1 210-733-5476">
                  <p className="text-dark mb-0">
                    24/7 SUPPORT CENTER <br /> +1 210-733-5476
                  </p>
                </a>
              </div>
              <div>
                <button className="btn btn-light yellow-btn mt-4">
                  File Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div c></div>
            <div className="col-md-12 text-center">
              <span>Copyright © 2023 Precise. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
