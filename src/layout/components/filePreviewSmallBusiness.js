import React from "react";

const FilePreviewSmallBusiness = (props) => {
  const { data } = props;
  return (
    <>
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
            <a href={`${data?.socialSecurityNumber?.value}`}>download file</a>
          </p>
        </div>
      ) : null}

      {data?.dob?.value ? (
        <div className="col-lg-6">
          <p className="mb-1">
            <b> Date of Birth </b> : {data?.dob?.value.slice(0, 10) || ""}
          </p>
        </div>
      ) : null}
      {data?.lastYearTaxReturn?.value ? (
        <div className="col-lg-6">
          <p className="mb-1">
            <b>Last Year Tax Return {" : "}</b>
            <a href={`${data?.lastYearTaxReturn?.value}`}>download file</a>
          </p>
        </div>
      ) : null}

      {/* spouse details */}

      {data?.spouse && data?.spouse?.length > 0 ? (
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
      ) : null}

      {/* dependents */}

      {data?.dependents?.length > 0 ? (
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
      ) : null}

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
          {data?.emailAddress?.value ? (
            <div className="col-lg-6">
              <p className="mb-1">
                <b> Email : </b>
                {data?.emailAddress?.value}
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
          {data?.businessInfo?.value?.forms1099?.[0]?.value ? (
            <div className="col-lg-6">
              <p className="mb-1">
                <b> Any Form of 1099 : </b>
                {data?.businessInfo?.value?.forms1099?.map((item, index) => {
                  return (
                    <div>
                      <a key={index + 1000} href={`${item?.value}`}>
                        download file
                      </a>
                    </div>
                  );
                })}
              </p>
            </div>
          ) : null}
          {data?.businessInfo?.value?.registrationLetterDoc?.value ? (
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
          {data?.businessExpense?.value?.profitLossStatementDoc?.value ? (
            <div className="col-lg-6">
              <p className="mb-1">
                <b> Details : </b>
                {data?.businessExpense?.value?.details?.value}
              </p>
            </div>
          ) : null}

          {data?.businessExpense?.value?.profitLossStatementDoc?.value ? (
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
              <p className="mb-3 fw-bold">Business Financials Informations :</p>
            </div>
            {data?.businessFinancialInfo?.value?.balanceSheetDoc?.value ? (
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

            {data?.businessFinancialInfo?.value?.bankStatementDoc?.value ? (
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

      {/* business Vechile info */}

      {data?.businessVehicleInfo ? (
        <>
          <>
            <hr />
            <div className="col-lg-12">
              <p className="mb-3 fw-bold">Business Vehicle Informations :</p>
            </div>
            {data?.businessVehicleInfo?.value?.registrationDoc?.value ? (
              <div className="col-lg-6">
                <p className="mb-1">
                  <b> Registration Document : </b>
                  <a
                    href={`${data?.businessVehicleInfo?.value?.registrationDoc?.value}`}
                  >
                    download file
                  </a>
                </p>
              </div>
            ) : null}

            {data?.businessVehicleInfo?.value?.totalMiles?.value ? (
              <div className="col-lg-6">
                <p className="mb-1">
                  <b> Total Miles : </b>
                  {`${data?.businessVehicleInfo?.value?.totalMiles?.value}`}
                </p>
              </div>
            ) : null}

            {data?.businessVehicleInfo?.value?.usePercentage?.value ? (
              <div className="col-lg-6">
                <p className="mb-1">
                  <b> Useage percentage : </b>
                  {`${data?.businessVehicleInfo?.value?.usePercentage?.value}`}
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
          {data?.income?.value?.otherIncomeDoc?.[0]?.value ? (
            <div className="col-lg-6">
              <p className="mb-1">
                <b> Other Income Document : </b>
                {data?.income?.value?.otherIncomeDoc.map((item, index) => {
                  return (
                    <div>
                      <a href={`${item?.value}`}>download file</a>
                    </div>
                  );
                })}
              </p>
            </div>
          ) : null}

          {data?.income?.value?.otherIncomeDoc?.[0]?.value ? (
            <div className="col-lg-6">
              <p className="mb-1">
                <b> W2 Document : </b>
                {data?.income?.value?.w2Doc.map((item, index) => {
                  console.log("itemitemitemitemitem", item);
                  return (
                    <div>
                      <a href={`${item?.value}`}>download file</a>
                    </div>
                  );
                })}
              </p>
            </div>
          ) : null}
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
                  {" : "} <a href={`${item?.value?.value}`}>download file</a>
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
    </>
  );
};

export default FilePreviewSmallBusiness;
