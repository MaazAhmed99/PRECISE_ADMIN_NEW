import React from "react";
import "../../assests/css/preloader.css";
import { logo } from "../../assests/media-constants";

const Loader = ({ display }) => {
  return (
    <>
      <div
        id="loader-full"
        style={{ display: display }}
        className="loader-full"
      >
        <div className="inner-svg-text">
          <div class="preloader">
            <div class="preloader-inner">
              <div class="logo">
                <img class="icon" src={logo} />
                {/* <svg class="icon" viewBox="0 0 41.1 40.5">
                  <path
                    class="is-active"
                    d="M41.1,40.5H0V0h41.1V40.5z M17.4,27.2h2V13h-2.3v10.3L9,13H7.2v14.2h2.2v-10L17.4,27.2z M33.8,14.5
              c-0.4-0.3-0.9-0.6-1.4-0.8s-1-0.4-1.6-0.6c-0.6-0.1-1.2-0.2-1.8-0.2c-1,0-1.9,0.2-2.6,0.5c-0.8,0.3-1.4,0.8-1.9,1.5
              s-0.7,1.4-0.7,2.4c0,0.7,0.2,1.3,0.5,1.8s0.8,0.9,1.4,1.2c0.6,0.3,1.4,0.6,2.3,0.8c0.8,0.2,1.5,0.4,2.1,0.6s1,0.4,1.3,0.7
              c0.3,0.3,0.5,0.7,0.5,1.1c0,0.6-0.2,1-0.7,1.3s-1.2,0.5-2.1,0.5c-0.5,0-1.1-0.1-1.6-0.2s-1-0.3-1.4-0.5S25.3,24.2,25,24
              c-0.3-0.2-0.6-0.4-0.8-0.6l-1,1.9c0.5,0.4,1.1,0.8,1.8,1.1c0.6,0.3,1.3,0.5,2,0.7c0.7,0.1,1.4,0.2,2.1,0.2s1.4-0.1,2-0.2
              c0.6-0.2,1.2-0.4,1.7-0.7c0.5-0.3,0.9-0.7,1.1-1.3c0.3-0.5,0.4-1.1,0.4-1.9c0-0.9-0.2-1.5-0.6-2.1c-0.4-0.5-0.9-0.9-1.6-1.2
              c-0.7-0.3-1.5-0.6-2.5-0.8c-0.8-0.2-1.4-0.4-2-0.6c-0.5-0.2-0.9-0.4-1.2-0.6c-0.3-0.3-0.4-0.6-0.4-1.1c0-0.6,0.2-1.1,0.7-1.4
              c0.5-0.3,1.1-0.5,2.1-0.5c0.4,0,0.8,0,1.2,0.1c0.4,0.1,0.8,0.2,1.1,0.4c0.3,0.1,0.6,0.3,0.9,0.5c0.3,0.2,0.4,0.3,0.6,0.5L33.8,14.5
              z"
                  />
                </svg> */}
                {/* <svg class="icon2" viewBox="0 0 42 43">
                  <polygon
                    class="is-active"
                    points="40.3,0 40.3,41.1 0,41.1 0,43 42,43 42,0 "
                  />
                </svg> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="spinner-border"
          style={{ borderColor: `#162b5a` }}
          role="status"
        >
          <div className="preloader">
            <div className="preloader-inner"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
