import React from "react";

const Dependents = () => {
  return (
    <div className="income">
      <h1 className="mt-4 pt-3">Dependents</h1>
      <div className="row">
        <div className="col-lg-6">
          <p className="label-text">Full Name</p>
          <input className="form-control field-text" placeholder="Full Name" />
        </div>

        <div className="col-lg-6">
          <p className="label-text">Social Security Number</p>
          <input
            className="form-control field-text"
            placeholder="Email Address"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">Date Of Birth</p>
          <input
            className="form-control field-text"
            placeholder="Date Of Birth"
          />
        </div>
        <div className="col-lg-6">
          <p className="label-text">Relationship To You</p>
          <input
            className="form-control field-text"
            placeholder="Relationship To You"
          />
        </div>
        <div className="col-lg-12">
          <button className="btn btn-light blue-btn py-2 mt-4 mb-4">
            + Add More Dependents
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dependents;
