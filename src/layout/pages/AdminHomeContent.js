import React, { useEffect, useState } from "react";
import {
  exclaim,
  file,
  home,
  info,
  logo,
  logout,
} from "../../assests/media-constants";
import { useNavigate } from "react-router-dom";
import APP_CONSTANTS from "../../constants/app-constant";
import { useDispatch, useSelector } from "react-redux";
import { logoutSubmit } from "../../redux/reducers/AuthReducer";
import axios from "../../services/api-client";
import { headersWithToken } from "../../services/auth";
import SideMenu from "../components/sideMenu";
import { useLoader } from "../../services/Loader/LoaderContext";
import { toast } from "react-toastify";

const AdminHomeContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setLoader = useLoader();
  const [getProfile, setGetProfile] = useState(
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_PROFILE)) || false
  );
  const [token, setToken] = useState(
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_TOKEN)) || false
  );

  const [taxation, setTaxation] = useState();

  const getTaxations = () => {
    setLoader(true);
    try {
      axios
        .get("taxation-types")
        .then((res) => {
          setLoader(false);
          // console.log(res);
          setTaxation(res?.data);
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  };

  useEffect(() => {
    getTaxations();
  }, []);

  const handleInputChange = (id, field, value) => {
    setTaxation((prevTaxation) =>
      prevTaxation.map((tax) =>
        tax.id === id ? { ...tax, [field]: value } : tax
      )
    );
  };

  const submitUpdate = (id, data) => {
    setLoader(true);
    try {
      axios
        .put(`taxation-types/${id}`, data, headersWithToken(token))
        .then((res) => {
          // console.log(res);
          getTaxations();
          setLoader(false);
          //   setTaxation(res?.data?.data);
        })
        .catch((err) => {
          toast.error("Failed to update try again");
          getTaxations();
          setLoader(false);
          console.log(err);
        });
    } catch (e) {
      toast.error("Failed to update try again");
      setLoader(false);
      console.log(e);
    }
  };

  return (
    <div className="admin-panel-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <SideMenu />
          </div>
          <div className="col-lg-9 all-things">
            <div className="user-area text-end">
              <span className="avatar"> {"A"}</span>
              <div className="text">
                <span className="user-name"> Admin</span> <br />
                {/* <span> {getProfile?.user?.email}</span> */}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-7">
                <div className="greeting-txt">
                  <p>Greetings,</p>
                  <h3> Admin</h3>
                </div>
              </div>
              <div className="col-5 text-end">
                {/* <button className="btn btn-light blue-btn">
                  Need Help <img src={exclaim} />
                </button> */}
              </div>
            </div>
            <div className="main-content mt-4">
              <div className="row">
                <div className="col-lg-12">
                  <h3 className="fw-bold mb-3 mt-0">Edit Taxation</h3>
                </div>
              </div>
              {taxation &&
                taxation?.map((tax) => (
                  <div className="row" key={tax?.id}>
                    <div className="col-lg-12">
                      <h5>Taxation Type {tax?.displayName}</h5>
                    </div>
                    <div className="col-lg-6 ">
                      <p className="mt-2">Price</p>
                      <input
                        className="form-control"
                        value={tax?.price}
                        type="number"
                        // disabled
                        onChange={(e) =>
                          handleInputChange(tax?.id, "price", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-lg-6 ">
                      <p className="mt-2">Display Name</p>
                      <input
                        className="form-control"
                        value={tax?.displayName}
                        onChange={(e) =>
                          handleInputChange(
                            tax?.id,
                            "displayName",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    {/* <div className="col-lg-12 my-3">
                      <p className="mt-2">Description</p>
                      <textarea
                        rows={4}
                        style={{ resize: "none" }}
                        className="form-control"
                        value={tax.description}
                        onChange={(e) =>
                          handleInputChange(
                            tax.id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div> */}
                    <div className="col-lg-12 text-end mt-3">
                      <button
                        onClick={() =>
                          submitUpdate(tax.id, {
                            price: Number(`${tax.price}`) || 0,
                            displayName: tax.displayName,
                            description: tax.description,
                          })
                        }
                        disabled=""
                        className="btn btn-light blue-btn px-4 me-3 fw-bold"
                      >
                        Update
                      </button>
                      {/* <button className="btn btn-danger me-3 px-4">
                        Cancel
                      </button> */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeContent;
