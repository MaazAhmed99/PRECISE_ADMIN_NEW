import React from "react";

const BusinessInformation = () => {
  return (
    <div className="income">
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
        <div className="col-lg-12">
          <p className="label-text">Business Address</p>
          <input
            className="form-control field-text"
            placeholder="Business Address"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessInformation;
