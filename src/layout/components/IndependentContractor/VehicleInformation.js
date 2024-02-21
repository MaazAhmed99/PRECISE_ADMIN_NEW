import React from "react";

const VehicleInformation = () => {
  return (
    <div className="personal-information">
      <h1 className="mt-4 pt-3">Vehicle Information</h1>
      <div className="row">
        <div className="col-lg-12">
          <p className="label-text">
            Make, Model, And Year Of Vehicle Used For Business
          </p>
          <div className="file-content">
            <input
              type="file"
              className="form-control field-text file-field"
              placeholder="Make, Model, And Year Of Vehicle Used For Business"
            />
            <div className="upload-doc-text">Upload a secure document</div>
          </div>
        </div>
        <div className="col-lg-6">
          <p className="label-text">Total Miles Driven</p>
          <input
            className="form-control field-text"
            placeholder="Total Miles Driven"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">Percentage Of Business Use</p>
          <input
            className="form-control field-text"
            placeholder="Percentage Of Business Use"
          />
        </div>
        <div className="col-lg-12">
          <p className="label-text">
            Please Upload A Copy Of Your Last Year's Tax Return, Including All
            Schedules And Forms.
          </p>
          <div className="file-content">
            <input
              type="file"
              className="form-control field-text file-field"
              placeholder="Please Upload A Copy Of Your Last Year's Tax Return, Including All Schedules And Forms."
            />
            <div className="upload-doc-text">Upload a secure document</div>
          </div>
        </div>
        <div className="col-lg-6">
          <p className="label-text">Name Of Insurance Provider</p>
          <input
            className="form-control field-text"
            placeholder="Name Of Insurance Provider"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">Policy Number</p>
          <input
            className="form-control field-text"
            placeholder="Policy Number"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">Months Of Coverage In The Tax Year</p>
          <input
            className="form-control field-text"
            placeholder="Months Of Coverage In The Tax Year"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">Zip Code</p>
          <input className="form-control field-text" placeholder="Zip Code" />
        </div>
        <div className="col-lg-12">
          <p className="label-text">
            Please Upload A Copy Of Your Last Year's Tax Return, Including All
            Schedules And Forms.
          </p>
          <div className="file-content">
            <input
              type="file"
              className="form-control field-text file-field"
              placeholder="Please Upload A Copy Of Your Last Year's Tax Return, Including All Schedules And Forms."
            />
            <div className="upload-doc-text">
              Months of coverage in the tax year
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInformation;
