import React from "react";

const OtherInformation = () => {
  return (
    <div className="income">
      <h1 className="mt-4 pt-3">Other Information</h1>
      <div className="row">
        <div className="col-lg-12">
          <p className="label-text">
            Upload Any 1099 Forms Received, Such As 1099-NEC, 1099-K, Or
            1099-MISC
          </p>
          <div className="file-content">
            <input
              type="file"
              className="form-control field-text file-field"
              placeholder="Email Address"
            />
            <div className="upload-doc-text">Upload a secure document</div>
          </div>
          <p className="label-text-bottom">
            Expenses will be automatically extracted from your uploaded
            statement.
          </p>
        </div>
        <div className="col-lg-10">
          <p className="label-text">
            Expenses Will Be Automatically Extracted From Your Uploaded
            Statement.
          </p>
          <div className="file-content">
            <input
              type="file"
              className="form-control field-text file-field"
              placeholder="Email Address"
            />
            <div className="upload-doc-text">Upload a secure document</div>
          </div>
        </div>
        <div className="col-lg-2 align-self-end">
          <button className="btn btn-light blue-btn py-2 mt-4 mb-0">
            On Hold
          </button>
        </div>
        <div className="col-lg-12">
          <p className="label-text">
            Make, Model, And Year Of Vehicle Used For Business
          </p>
          <div className="file-content">
            <input
              type="file"
              className="form-control field-text file-field"
              placeholder="Email Address"
            />
            <div className="upload-doc-text">Upload a secure document</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherInformation;
