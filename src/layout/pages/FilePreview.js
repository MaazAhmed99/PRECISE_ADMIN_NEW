import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APP_CONSTANTS from "../../constants/app-constant";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../services/api-client";
import SideMenu from "../components/sideMenu";
import { useLoader } from "../../services/Loader/LoaderContext";
import { headersWithToken } from "../../services/auth";
import { toast } from "react-toastify";

const FilePreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [file, setFile] = useState();

  const [getProfile, setGetProfile] = useState(
    JSON?.parse(localStorage?.getItem(APP_CONSTANTS.ACCESS_PROFILE)) || false
  );

  const setLoader = useLoader();

  const getTaxationInfo = () => {
    setLoader(true);
    try {
      axios
        .get(`taxation/request/with-labels/${id}`)
        .then((res) => {
          console.log(res?.taxationRequest);
          setLoader(false);
          setData(res?.taxationRequest);
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
    getTaxationInfo();
  }, []);

  const getPreSignedUrl = async (e) => {
    e.preventDefault();
    if (file) {
      let token = JSON?.parse(localStorage?.getItem(`ACCESS_TOKEN`));
      setLoader(true);
      const presignedUrlResponse = await axios.post(
        "general/get-presigned-url",
        { fileName: "previewDoc" },
        headersWithToken(token)
      );
      const presignedUrl = presignedUrlResponse?.preSignedUrl;
      const fileUrl = presignedUrlResponse?.fileUrl;
      fetch(presignedUrl, {
        method: "PUT",
        body: file,
      })
        .then((response) => {
          setLoader(false);
          if (!response.ok) {
            toast.error("Unable to upload file");
            return;
          } else {
            let data = {
              previewDoc: fileUrl,
              previewComments: "",
            };
            axios
              .post(
                `taxation/request/admin/preview/${id}`,
                data,
                headersWithToken(token)
              )
              .then((res) => {
                toast.success("Document uploaded");
                getTaxationInfo();
                console.log(res, "resresres");
              })
              .catch((err) => {
                getTaxationInfo();
                console.log(err, "errerrerr");
              });
          }
        })
        .catch((error) => {
          setLoader(false);
          console.error("Error:", error);
          toast.error("Unable to upload file");
        });
    } else {
      toast.error("Unable to upload file");
      setFile(null);
      setLoader(false);
    }
  };
  console.log(
    data?.isPreviewAccepted?.value,
    "data?.isPreviewAccepted?.valuedata?.isPreviewAccepted?.valuedata?.isPreviewAccepted?.value"
  );
  // Render the component
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
              <div className="col-5 "></div>
            </div>
            <div className="main-content mt-4">
              <div className="row mb-4">
                <div className="col-lg-12 mb-3">
                  <b>{data?.fullName?.value} form preview</b>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <small>
                      <b>Upload File For User</b>
                    </small>
                  </p>
                  <input
                    onChange={(e) => setFile(e.target.files[0] || "")}
                    type="file"
                    className="form-control"
                  />
                  <button
                    onClick={(e) => getPreSignedUrl(e)}
                    // style={{ float: "inline-end" }}
                    className="btn btn-light blue-btn mt-2"
                  >
                    Upload
                  </button>
                </div>
                <div className="col-lg-6 align-self-center">
                  <p className="mb-1">
                    <b> Taxation Type </b> : {data?.taxation_type?.value}
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b> Preview file </b> :{" "}
                    {data?.previewDoc?.value?.length > 7 ? "YES" : "NO"}
                  </p>
                </div>
                {/* <div className="col-lg-6">
                  <p className="mb-1">
                    <b> Preview file </b> : {data?.isPreviewAccepted?.value}
                  </p>
                </div> */}
                {data?.previewDoc?.value?.length > 7 ? (
                  <div className="col-lg-12">
                    <p className="mb-1">
                      <b> Preview file </b> :{" "}
                      <a href={`${data?.previewDoc?.value}`}>download file</a>
                    </p>
                  </div>
                ) : (
                  <></>
                )}

                {/* <div className="col-lg-6">
                  <p className="mb-1">
                    <b> Full Name </b> : {data?.fullName?.value}
                  </p>
                </div> */}
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b>User Name</b>
                    {" : "} {data?.user?.value?.username?.value}
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b>Email </b>
                    {" : "} {data?.user?.value?.email?.value}
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b>City </b>
                    {" : "} {data?.city?.value}
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b>Zip Code </b>
                    {" : "} {data?.zipCode?.value}
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b> Social Security Number </b> :{" "}
                    <a href={`${data?.socialSecurityNumber?.value}`}>
                      download file
                    </a>
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b> Phone Number </b> : {data?.phoneNumber?.value}
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b> Phone Number </b> : {data?.phoneNumber?.value}
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    {/* <b> Date of Birth </b> : {data?.dob?.value || ""} */}
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b>Last Year Tax Return {" : "}</b>
                    <a href="#" download={data?.lastYearTaxReturn?.value}>
                      download file
                    </a>
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b> W2 Document : </b>
                    <a
                      href="#"
                      download={data?.income?.value?.otherIncomeDoc?.[0]?.value}
                    >
                      download file
                    </a>
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b> W2 Document : </b>
                    <a
                      href="#"
                      download={data?.income?.value?.w2Doc?.[0]?.value}
                    >
                      download file
                    </a>
                  </p>
                </div>
                <hr />
                <div className="col-lg-12">
                  <p className="mb-3 fw-bold">Addition Notes :</p>
                </div>
                {data?.additionalNotes?.map((item, index) => {
                  return (
                    <div className="col-lg-6">
                      <p className="mb-1">
                        <b>{item?.label?.value} </b>
                        {" : "}{" "}
                        <a href="#" download={item?.value?.value}>
                          download file
                        </a>
                      </p>
                    </div>
                  );
                })}
                <hr />
                <div className="col-lg-12">
                  <p className="mb-3 fw-bold">Common Document :</p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b>DIV1099 </b>
                    {" : "}{" "}
                    <a
                      href="#"
                      download={data?.commonDoc?.value?.DIV1099?.value}
                    >
                      download file
                    </a>
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b>INT1099</b>
                    {" : "}{" "}
                    <a
                      href="#"
                      download={data?.commonDoc?.value?.INT1099?.value}
                    >
                      download file
                    </a>
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b>K1099</b>
                    {" : "}{" "}
                    <a href="#" download={data?.commonDoc?.value?.K1099?.value}>
                      download file
                    </a>
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b>MISC1099</b>
                    {" : "}{" "}
                    <a
                      href="#"
                      download={data?.commonDoc?.value?.MISC1099?.value}
                    >
                      download file
                    </a>
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b>R1099</b>
                    {" : "}{" "}
                    <a href="#" download={data?.commonDoc?.value?.R1099?.value}>
                      download file
                    </a>
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b>T1098</b>
                    {" : "}{" "}
                    <a href="#" download={data?.commonDoc?.value?.R1099?.value}>
                      download file
                    </a>
                  </p>
                </div>

                <hr />
                {data?.dependents?.length > 0 ? (
                  <>
                    <div className="col-lg-12">
                      <p className="mb-3 fw-bold">Dependents :</p>
                    </div>
                    {data?.dependents?.map((item, index) => {
                      return (
                        <>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b>Date of Birth </b>
                              {" : "} {item?.dob?.value}
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b>Full Name </b>
                              {" : "} {item?.fullName?.value}
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b>Relationship </b>
                              {" : "} {item?.relationship?.value}
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b>Social Security Number </b>
                              {" : "} {item?.socialSecurityNumber?.value}
                            </p>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
