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
import SideMenu from "../components/sideMenu";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { headersWithToken } from "../../services/auth";
import { useLoader } from "../../services/Loader/LoaderContext";

const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setLoader = useLoader();
  const [getProfile, setGetProfile] = useState(
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_PROFILE)) || false
  );
  const [token, setToken] = useState(
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_TOKEN)) || false
  );

  const [userListing, setUserListing] = useState([]);
  const [userMeta, setUserMeta] = useState();
  const [taxationListing, setTaxationListing] = useState([]);
  const [taxationMeta, setTaxationMeta] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const getTaxationLsiting = (index) => {
    setLoader(true);
    try {
      axios
        .get(
          `taxation/request/admin?page=${index ? index : 1}`,
          headersWithToken(token)
        )
        .then((res) => {
          setTaxationListing(res?.taxationRequests?.docs);
          setTaxationMeta(res?.taxationRequests?.meta);
          // console.log(
          //   "res?.data?.taxationRequestsres?.data?.taxationRequests",
          //   res
          // );
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  };
  const getUserLsiting = (index) => {
    // console.log(index, "indexindexindexindex");
    setLoader(true);
    try {
      axios
        .get(`users?page=${index ? index : 1}`, headersWithToken(token))
        .then((res) => {
          setUserListing(res?.users?.docs);
          setUserMeta(res?.users?.meta);
          // console.log(res?.users?.meta, "res?.users?.metares?.users?.meta");
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  };

  const userPaginate = (index) => {
    // setCurrentPage(index);
    // console.log("userPaginateuserPaginate", index);
    getUserLsiting(index + 1);
  };

  const taxPaginate = (index) => {
    // setCurrentPage(index);
    // console.log("taxPaginatetaxPaginate", index);
    getTaxationLsiting(index + 1);
  };

  useEffect(() => {
    getUserLsiting();
    getTaxationLsiting();
  }, []);

  // console.log(taxationMeta, "taxationMetataxationMetataxationMeta");

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
                <div className="col-lg-12 ">
                  <h3 className="fw-bold mb-3">Taxation Requests</h3>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">User Names</TableCell>
                          <TableCell align="left">Taxation Type</TableCell>
                          <TableCell align="left">Last Update</TableCell>
                          <TableCell align="left">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {taxationListing?.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell align="left">
                              {row?.user?.username}
                            </TableCell>
                            <TableCell align="left">
                              {row?.taxation_type}
                            </TableCell>
                            <TableCell align="left">
                              {row?.createdAt?.slice(0, 10)}
                            </TableCell>
                            <TableCell
                              onClick={() =>
                                navigate(`/file-preview/${row?.id}`)
                              }
                              className="cursor_pointer"
                              align="left"
                            >
                              <button className="btn btn-light">View</button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className="col-lg-12 mt-3 text-end paginate">
                    {taxationMeta
                      ? [...Array(taxationMeta?.totalPages)].map((item, i) => {
                          return (
                            <button
                              onClick={() => taxPaginate(i)}
                              className={
                                taxationMeta?.page == i + 1
                                  ? "btn btn-light active me-2"
                                  : "btn btn-light me-2"
                              }
                            >
                              {i + 1}
                            </button>
                          );
                        })
                      : ""}
                  </div>
                  {/* <h3 className="fw-bold mb-3 mt-5">Users List</h3> */}
                  {/* <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Username</TableCell>
                          <TableCell align="left">Email</TableCell>
                          <TableCell align="left">Created At</TableCell>
                          <TableCell align="left">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userListing?.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell align="left">{user?.username}</TableCell>
                            <TableCell align="left">{user?.email}</TableCell>
                            <TableCell align="left">
                              {user?.createdAt?.slice(0, 10)}
                            </TableCell>
                            <TableCell align="left">
                              <button
                                className="btn btn-light"
                                onClick={() => navigate(`/user/${user?.id}`)}
                              >
                                View
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer> */}
                </div>
                {/* <div className="col-lg-12 mt-3 text-end paginate">
                  {userMeta
                    ? [...Array(userMeta?.totalPages)].map((item, i) => {
                        return (
                          <button
                            onClick={() => userPaginate(i)}
                            className={
                              userMeta?.page == i + 1
                                ? "btn btn-light active me-2"
                                : "btn btn-light me-2"
                            }
                          >
                            {i + 1}
                          </button>
                        );
                      })
                    : ""}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
