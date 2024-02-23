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
  // console.log(
  //   data,
  //   "data?.isPreviewAccepted?.valuedata?.isPreviewAccepted?.valuedata?.isPreviewAccepted?.value"
  // );
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
                {data?.user?.value?.username?.value ? (
                  <div className="col-lg-6">
                    <p className="mb-1">
                      <b>User Name</b>
                      {" : "} {data?.user?.value?.username?.value}
                    </p>
                  </div>
                ) : null}
                {data?.user?.value?.email?.value ? (
                  <div className="col-lg-6">
                    <p className="mb-1">
                      <b>Email </b>
                      {" : "} {data?.user?.value?.email?.value}
                    </p>
                  </div>
                ) : null}
                {data?.city?.value ? (
                  <div className="col-lg-6">
                    <p className="mb-1">
                      <b>City </b>
                      {" : "} {data?.city?.value}
                    </p>
                  </div>
                ) : null}
                {data?.zipCode?.value ? (
                  <div className="col-lg-6">
                    <p className="mb-1">
                      <b>Zip Code </b>
                      {" : "} {data?.zipCode?.value}
                    </p>
                  </div>
                ) : null}
                {data?.socialSecurityNumber?.value ? (
                  <div className="col-lg-6">
                    <p className="mb-1">
                      <b> Social Security Number </b> :{" "}
                      <a href={`${data?.socialSecurityNumber?.value}`}>
                        download file
                      </a>
                    </p>
                  </div>
                ) : null}
                {data?.phoneNumber?.value ? (
                  <div className="col-lg-6">
                    <p className="mb-1">
                      <b> Phone Number </b> : {data?.phoneNumber?.value}
                    </p>
                  </div>
                ) : null}
                {data?.dob?.value ? (
                  <div className="col-lg-6">
                    <p className="mb-1">
                      <b> Date of Birth </b> :{" "}
                      {data?.dob?.value.slice(0, 10) || ""}
                    </p>
                  </div>
                ) : null}
                {data?.lastYearTaxReturn?.value ? (
                  <div className="col-lg-6">
                    <p className="mb-1">
                      <b>Last Year Tax Return {" : "}</b>
                      <a href={`${data?.lastYearTaxReturn?.value}`}>
                        download file
                      </a>
                    </p>
                  </div>
                ) : null}

                {/* spouse details */}

                {/* {data?.spouse?.length > 0 ? (
                  <>
                    {data?.spouse.map((item, index) => {
                      return (
                        <>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b> Full Name : </b>
                              {item?.fullName}
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b> Social Security Number : </b>
                              {item?.socialSecurityNumber}
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b> Date of Birth : </b>
                              {item?.dob}
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b> Relationship To You: </b>
                              {item?.relationship}
                            </p>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : null} */}

                {/* dependents */}

                {/* {data?.dependents?.length > 0 ? (
                  <>
                    <hr />
                    <div className="col-lg-12">
                      <p className="mb-3 fw-bold">Dependents Details :</p>
                    </div>
                    {data?.dependents?.map((item, index) => {
                      return (
                        <>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b> Full Name : </b>
                              {item?.fullName}
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b> Social Security Number : </b>
                              {item?.socialSecurityNumber}
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b> Date of Birth : </b>
                              {item?.dob}
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p className="mb-1">
                              <b> Relationship To You: </b>
                              {item?.relationship}
                            </p>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : null} */}

                {/* business owners */}

                {data?.businessOwners?.[0] ? (
                  <>
                    <hr />
                    <div className="col-lg-12">
                      <p className="mb-3 fw-bold">Business Owner Details :</p>
                    </div>
                    {data?.businessOwners?.map((item) => {
                      return (
                        <>
                          {item?.ownerAddress?.value && (
                            <div className="col-lg-6">
                              <p className="mb-1">
                                <b> Owner Address : </b>
                                {item?.ownerAddress?.value}
                              </p>
                            </div>
                          )}
                          {item?.ownerName?.value && (
                            <div className="col-lg-6">
                              <p className="mb-1">
                                <b> Owner Name : </b>
                                {item?.ownerName?.value}
                              </p>
                            </div>
                          )}
                          {item?.ownerSSN?.value && (
                            <div className="col-lg-6">
                              <p className="mb-1">
                                <b> Owner SSN : </b>
                                {item?.ownerSSN?.value}
                              </p>
                            </div>
                          )}
                          {item?.ownerShare?.value && (
                            <div className="col-lg-6">
                              <p className="mb-1">
                                <b> Owner Share : </b>
                                {item?.ownerShare?.value}
                              </p>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </>
                ) : null}

                {/* business information */}

                {data?.businessInfo ? (
                  <>
                    <hr />
                    <div className="col-lg-12">
                      <p className="mb-3 fw-bold">Business Details :</p>
                    </div>
                    {data?.businessInfo?.value?.name?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b> Name : </b>
                          {data?.businessInfo?.value?.name?.value}
                        </p>
                      </div>
                    ) : null}

                    {data?.businessInfo?.value?.industry?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b> Industry : </b>
                          {data?.businessInfo?.value?.industry?.value}
                        </p>
                      </div>
                    ) : null}

                    {data?.businessInfo?.value?.type?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b> Industry Type : </b>
                          {data?.businessInfo?.value?.type?.value}
                        </p>
                      </div>
                    ) : null}

                    {data?.businessInfo?.value?.ein?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b> Ein : </b>
                          {data?.businessInfo?.value?.ein?.value}
                        </p>
                      </div>
                    ) : null}

                    {data?.businessInfo?.value?.forms1099?.[0]?.[0].value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b> Any Form of 1099 : </b>
                          <a
                            href={`${data?.businessInfo?.value?.forms1099?.[0]?.[0].value}`}
                          >
                            download file
                          </a>
                        </p>
                      </div>
                    ) : null}
                    {data?.businessInfo?.value?.registrationLetterDoc.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b> Registration Letter Document : </b>
                          <a
                            href={`${data?.businessInfo?.value?.registrationLetterDoc.value}`}
                          >
                            download file
                          </a>
                        </p>
                      </div>
                    ) : null}
                  </>
                ) : null}

                {/* business expense */}

                {data?.businessExpense ? (
                  <>
                    <hr />
                    <div className="col-lg-12">
                      <p className="mb-3 fw-bold">Business Expense :</p>
                    </div>
                    {data?.businessExpense?.value?.profitLossStatementDoc
                      ?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b> Details : </b>
                          {data?.businessExpense?.value?.details?.value}
                        </p>
                      </div>
                    ) : null}

                    {data?.businessExpense?.value?.profitLossStatementDoc
                      ?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b> Profit Loss Document : </b>
                          <a
                            href={`${data?.businessExpense?.value?.profitLossStatementDoc?.value}`}
                            // download={

                            // }
                          >
                            download file
                          </a>
                        </p>
                      </div>
                    ) : null}
                  </>
                ) : null}

                {/* business Financials */}

                {data?.businessFinancialInfo ? (
                  <>
                    <>
                      <hr />
                      <div className="col-lg-12">
                        <p className="mb-3 fw-bold">
                          Business Financials Informations :
                        </p>
                      </div>
                      {data?.businessFinancialInfo?.value?.balanceSheetDoc
                        ?.value ? (
                        <div className="col-lg-6">
                          <p className="mb-1">
                            <b> Balance Sheet Document : </b>
                            <a
                              href={`${data?.businessFinancialInfo?.value?.balanceSheetDoc?.value}`}
                              // download={

                              // }
                            >
                              download file
                            </a>
                          </p>
                        </div>
                      ) : null}

                      {data?.businessFinancialInfo?.value?.bankStatementDoc
                        ?.value ? (
                        <div className="col-lg-6">
                          <p className="mb-1">
                            <b> Bank Statement Document : </b>
                            <a
                              href={`${data?.businessFinancialInfo?.value?.bankStatementDoc?.value}`}
                              // download={

                              // }
                            >
                              download file
                            </a>
                          </p>
                        </div>
                      ) : null}
                    </>
                  </>
                ) : null}

                {/* income section */}
                {data?.income ? (
                  <>
                    <hr />
                    <div className="col-lg-12">
                      <p className="mb-3 fw-bold">Income Document :</p>
                    </div>
                    <div className="col-lg-6">
                      <p className="mb-1">
                        <b> Other Income Document : </b>
                        <a
                          href={`${data?.income?.value?.otherIncomeDoc?.[0]?.value}`}
                          // download={

                          // }
                        >
                          download file
                        </a>
                      </p>
                    </div>

                    <div className="col-lg-6">
                      <p className="mb-1">
                        <b> W2 Document : </b>
                        <a
                          href={`${data?.income?.value?.w2Doc?.[0]?.value}`}
                          // download={}
                        >
                          download file
                        </a>
                      </p>
                    </div>
                  </>
                ) : null}

                {/* additional notes section */}

                {data?.additionalNotes?.length > 0 ? (
                  <>
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
                            <a href={`${item?.value?.value}`}>download file</a>
                          </p>
                        </div>
                      );
                    })}
                  </>
                ) : null}

                {/* common doc section */}

                {data?.commonDoc ? (
                  <>
                    <hr />
                    <div className="col-lg-12">
                      <p className="mb-3 fw-bold">Common Document :</p>
                    </div>
                    {data?.commonDoc?.value?.DIV1099?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b>DIV1099 </b>
                          {" : "}{" "}
                          <a
                            href={`${data?.commonDoc?.value?.DIV1099?.value}`}
                            // download={}
                          >
                            download file
                          </a>
                        </p>
                      </div>
                    ) : null}
                    {data?.commonDoc?.value?.INT1099?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b>INT1099</b>
                          {" : "}{" "}
                          <a
                            href={`${data?.commonDoc?.value?.INT1099?.value}`}
                            // download={}
                          >
                            download file
                          </a>
                        </p>
                      </div>
                    ) : null}
                    {data?.commonDoc?.value?.K1099?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b>K1099</b>
                          {" : "}{" "}
                          <a
                            href={`${data?.commonDoc?.value?.K1099?.value}`}
                            // download={}
                          >
                            download file
                          </a>
                        </p>
                      </div>
                    ) : null}
                    {data?.commonDoc?.value?.MISC1099?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b>MISC1099</b>
                          {" : "}{" "}
                          <a
                            href={`${data?.commonDoc?.value?.MISC1099?.value}`}
                            // download={}
                          >
                            download file
                          </a>
                        </p>
                      </div>
                    ) : null}
                    {data?.commonDoc?.value?.R1099?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b>R1099</b>
                          {" : "}{" "}
                          <a
                            href={`${data?.commonDoc?.value?.R1099?.value}`}
                            // download={}
                          >
                            download file
                          </a>
                        </p>
                      </div>
                    ) : null}
                    {data?.commonDoc?.value?.R1099?.value ? (
                      <div className="col-lg-6">
                        <p className="mb-1">
                          <b>T1098</b>
                          {" : "}{" "}
                          <a
                            href={`${data?.commonDoc?.value?.R1099?.value}`}
                            // download={}
                          >
                            download file
                          </a>
                        </p>
                      </div>
                    ) : null}
                  </>
                ) : null}

                {/* dependent section */}

                {data?.dependents?.length > 0 ? (
                  <>
                    <hr />
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
