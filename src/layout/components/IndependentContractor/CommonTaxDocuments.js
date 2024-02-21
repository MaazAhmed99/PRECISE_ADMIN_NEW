import React from "react";

const CommonTaxDocuments = () => {
  return (
    <div className="income">
      <h1 className="mt-4 pt-3">Common Tax Documents</h1>
      <div className="row">
        <div className="col-lg-12">
          <p className="label-text">
            1098-T Forms: If You Received Tuition And Fees Statements For Higher
            Education, Upload These Forms.
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
          <p className="label-text">
            1099-K Forms: If You Received Income From Online Platforms Or
            Payment Processors, Upload These Forms.
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
          <p className="label-text">
            1099-MISC Forms: If You Received Miscellaneous Income Not Reported
            On A W-2, Upload These Forms.
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
          <p className="label-text">
            1099-R Forms: If You Received Retirement Income, Such As Pensions Or
            Annuities, Upload These Forms.
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
          <p className="label-text">
            1099-INT Forms: If You Received Interest Income, Such As Bank
            Interest Or Dividends, Upload These Forms.
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
          <p className="label-text">
            1099-DIV Forms: If You Received Dividend Income, Upload These Forms.
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

export default CommonTaxDocuments;
