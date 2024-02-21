import React from "react";

const BusinessFinancial = () => {
  return (
    <div className="additional-notes">
      <h1 className="mt-4 pt-3">Business Financial (Income and Expense)</h1>
      <div className="row">
        <div className="col-lg-12">
          <p className="label-text">
            Upload A Copy Of Your Business's Profit And Loss Statement For The
            Tax Year.
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
        </div>
        <div className="col-lg-12">
          <p className="label-text">List Your Business Expenses In Detail</p>
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
            Be Advised That Estimates For Expenses Must Be Conservative And Bank
            Records Will Be Required If Requested By The IRS
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

export default BusinessFinancial;
