import React from "react";

const PerosnalIncome = () => {
  return (
    <div className="personal-information">
      <h1 className="mt-4 pt-3">Peronsal Income</h1>
      <div className="row">
        <div className="col-lg-12">
          <p className="label-text">
            Upload Scanned Copies Or Pdfs Of All W-2 Forms Received From
            Employers.
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
        <div className="col-lg-12">
          <button className="btn btn-light blue-btn py-2 mt-4 mb-4">
            + Add Another W-2
          </button>
        </div>
        <div className="col-lg-12">
          <p className="label-text">Other Income Document</p>
          <div className="file-content">
            <input
              type="file"
              className="form-control field-text file-field"
              placeholder="Email Address"
            />
            <div className="upload-doc-text">Upload a secure document</div>
          </div>
        </div>
        <div className="col-lg-12">
          <button className="btn btn-light blue-btn py-2 mt-4 mb-4">
            + Add Another Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerosnalIncome;
