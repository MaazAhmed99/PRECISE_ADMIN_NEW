import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APP_CONSTANTS from "../../constants/app-constant";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../services/api-client";
import SideMenu from "../components/sideMenu";
import { useLoader } from "../../services/Loader/LoaderContext";
import { headersWithToken } from "../../services/auth";
import { toast } from "react-toastify";
import FilePreviewIndiviudal from "../components/filePreviewIndiviudal";
import FilePreviewIndependent from "../components/filePreviewIndependent";
import FilePreviewSmallBusiness from "../components/filePreviewSmallBusiness";

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
        { fileName: "previewDoc" + Date.now() },
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
  // console.log(
  //   data,
  //   "data?.isPreviewAccepted?.valuedata?.isPreviewAccepted?.valuedata?.isPreviewAccepted?.value"
  // );
  // Render the component
  console.log(
    data?.taxation_type?.value,
    "data?.previewDoc?.taxation_type?.valuedata?.previewDoc?.taxation_type?.value"
  );
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
                {/* general fields */}

                <div className="col-lg-12 mb-3">
                  <b>{data?.fullName?.value} form preview</b>
                </div>
                <div className="col-lg-6 mb-3">
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
                <div className="col-lg-6 align-self-center ">
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
                <div className="col-lg-6">
                  <p className="mb-1">
                    <b> Payment Status </b> : {data?.paymentStatus?.value}
                  </p>
                </div>
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
                {data?.taxation_type?.value === "SMALL_BUSINESS" && (
                  <FilePreviewSmallBusiness data={data} />
                )}
                {data?.taxation_type?.value === "INDIVIDUAL" && (
                  <FilePreviewIndiviudal data={data} />
                )}
                {data?.taxation_type?.value === "INDEPENDENT" && (
                  <FilePreviewIndependent data={data} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
