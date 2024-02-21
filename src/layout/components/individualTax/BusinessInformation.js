import React from "react";

const BusinessInformation = () => {
  return (
    <div className="personal-information">
      <h1 className="mt-4 pt-3">Business Information</h1>
      <div className="row">
        <div className="col-lg-6">
          <p className="label-text">Business Name</p>
          <input
            className="form-control field-text"
            placeholder="Business Name"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">EIN (Employer Identification Number)</p>
          <input
            className="form-control field-text"
            placeholder="EIN (Employer Identification Number)"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">Business Email Address</p>
          <input
            className="form-control field-text"
            placeholder="Business Email Address"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">Business Phone Number</p>
          <input
            className="form-control field-text"
            placeholder="+1 0000000000"
          />
        </div>
        <div className="col-lg-12">
          <p className="label-text">Business Industries</p>
          <select className="form-select field-text">
            <option disabled selected>
              Business Industries
            </option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <div className="col-lg-12">
          <p className="label-text">Type of Business</p>
          <select className="form-select field-text">
            <option disabled selected>
              Type of Business
            </option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
        <div className="col-lg-6">
          <p className="label-text">Business Owner Name</p>
          <input
            className="form-control field-text"
            placeholder="Business Owner Name"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">Business Owner SSN</p>
          <input
            className="form-control field-text"
            placeholder="Business Owner SSN"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">Business Owner Address</p>
          <input
            className="form-control field-text"
            placeholder="Business Owner Address"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">Business Owner %</p>
          <input
            className="form-control field-text"
            placeholder="Business Owner %"
          />
        </div>
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
          <button className="btn btn-light blue-btn py-2 mt-4 mb-0">
            + Add another Income Document
          </button>
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
      </div>
    </div>
  );
};

export default BusinessInformation;
