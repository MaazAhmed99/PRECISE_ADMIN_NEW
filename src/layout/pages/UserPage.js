import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APP_CONSTANTS from "../../constants/app-constant";
import { useDispatch, useSelector } from "react-redux";
import { headersWithToken } from "../../services/auth";
import SideMenu from "../components/sideMenu";
import { useLoader } from "../../services/Loader/LoaderContext";
import { toast } from "react-toastify";
import axios from "../../services/api-client";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setLoader = useLoader();
  const [getProfile, setGetProfile] = useState(
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_PROFILE)) || false
  );
  const [token, setToken] = useState(
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_TOKEN)) || false
  );
  const [showModal, setShowModal] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const getUserDetail = () => {
    setLoader(true);
    try {
      axios
        .get(`users/${id}`)
        .then((res) => {
          setLoader(false);
          setUserDetail(res);
          setLoader(false);
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

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    setLoader(true);
    axios
      .delete(`users/${id}`, headersWithToken())
      .then((res) => {
        setLoader(false);
        toast.success("User deleted successfully");
        navigate("/");
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        toast.error("Failed to delete user");
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (id) {
      getUserDetail();
    }
  }, [id]);

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
                <div>
                  <h3 className="mb-4">User Details</h3>
                </div>
                <div className="col-lg-12">
                  <h3>{userDetail?.username}</h3>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <span className="fw-bold">Email : </span>
                    {userDetail?.email}
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <span className="fw-bold">Email : </span>
                    {userDetail?.email}
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <span className="fw-bold">created at : </span>
                    {userDetail?.createdAt.slice(0, 10)}
                  </p>
                </div>
                <div className="col-lg-12 mt-4">
                  <button onClick={handleDelete} className="btn btn-danger">
                    {" "}
                    Delete User
                  </button>
                </div>
              </div>
            </div>
            {showModal && (
              <div className="custom-modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <h2 className="mb-4">Confirm Deletion</h2>
                  <p>
                    Are you sure you want to delete user{" "}
                    <b>{userDetail?.username}</b>
                  </p>
                  <div className="modal-buttons">
                    <button className="btn btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button className="btn btn-danger" onClick={confirmDelete}>
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
