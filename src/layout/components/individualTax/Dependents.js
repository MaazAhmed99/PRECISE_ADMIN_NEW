import React, { useState } from "react";
import { deleteIcon } from "../../../assests/media-constants";
import { useDispatch, useSelector } from "react-redux";
import { IndividualCostSaveStep3 } from "../../../redux/reducers/individualCostSlice";

const Dependents = () => {
  const dependent = useSelector(
    (state) => state.individualCostSlice.individualCost.step3
  );
  const dispatch = useDispatch();
  const [dependents, setDependents] = useState(dependent);

  const handleDependentChange = (index, field, value) => {
    const newDependents = [...dependents];
    newDependents[index] = {
      ...newDependents[index],
      [field]: value,
    };
    setDependents(newDependents);
  };

  const handleAddDependent = () => {
    setDependents([
      ...dependents,
      { fullName: "", ssn: "", dob: "", relationship: "" },
    ]);
  };

  const handleDeleteDependent = (index) => {
    if (index === 0 && dependents.length === 1) return; // Prevent deleting the last dependent
    const newDependents = [...dependents];
    newDependents.splice(index, 1);
    setDependents(newDependents);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate each dependent
    const newDependents = dependents.map((dependent) => {
      const errors = {};
      if (!dependent.fullName) {
        errors.fullName = "Full Name is required";
      }
      if (!dependent.ssn) {
        errors.ssn = "Social Security Number is required";
      }
      if (!dependent.dob) {
        errors.dob = "Date of Birth is required";
      }
      if (!dependent.relationship) {
        errors.relationship = "Relationship is required";
      }
      return { ...dependent, errors };
    });

    // Update state with errors
    setDependents(newDependents);

    // Check if there are any errors
    const hasErrors = newDependents.some(
      (dependent) => Object.keys(dependent.errors).length > 0
    );

    if (!hasErrors) {
      // Proceed with your logic here
      // For example, you can send the form data to the server
      console.log("Form submitted successfully!");
      console.log("Dependents data:", dependents);
      dispatch(IndividualCostSaveStep3(dependents));
    }
  };

  return (
    <div className="dependents">
      <h1 className="mt-4 pt-3">Dependents</h1>
      <form onSubmit={handleSubmit}>
        {dependents.map((dependent, index) => (
          <div key={index} className="row">
            <div className="col-lg-6">
              <p className="label-text">Full Name</p>
              <input
                className="form-control field-text"
                placeholder="Full Name"
                value={dependent.fullName}
                onChange={(e) =>
                  handleDependentChange(index, "fullName", e.target.value)
                }
              />
              {dependent.errors && dependent.errors.fullName && (
                <p className="text-danger">{dependent.errors.fullName}</p>
              )}
            </div>
            <div className="col-lg-6">
              <p className="label-text">Social Security Number</p>
              <input
                className="form-control field-text"
                placeholder="Social Security Number"
                value={dependent.ssn}
                onChange={(e) =>
                  handleDependentChange(index, "ssn", e.target.value)
                }
              />
              {dependent.errors && dependent.errors.ssn && (
                <p className="text-danger">{dependent.errors.ssn}</p>
              )}
            </div>
            <div className="col-lg-6">
              <p className="label-text">Date of Birth</p>
              <input
                type="date"
                className="form-control field-text"
                placeholder="Date of Birth"
                value={dependent.dob}
                onChange={(e) =>
                  handleDependentChange(index, "dob", e.target.value)
                }
              />
              {dependent.errors && dependent.errors.dob && (
                <p className="text-danger">{dependent.errors.dob}</p>
              )}
            </div>
            <div className="col-lg-6">
              <p className="label-text">Relationship To You</p>
              <input
                className="form-control field-text"
                placeholder="Relationship To You"
                value={dependent.relationship}
                onChange={(e) =>
                  handleDependentChange(index, "relationship", e.target.value)
                }
              />
              {dependent.errors && dependent.errors.relationship && (
                <p className="text-danger">{dependent.errors.relationship}</p>
              )}
            </div>
            {index > 0 ? (
              //  (
              //   <div className="col-lg-6 align-item-center align-self-center text-end">
              //     <p className="mb-0 text-danger fw-bold cursor_pointer">
              //       <img src={deleteIcon} alt="delete" /> Delete Dependents
              //     </p>
              //   </div>
              // ) :

              <div className="col-lg-12 align-item-center align-self-center text-end my-3">
                <p
                  onClick={() => handleDeleteDependent(index)}
                  className="mb-0 text-danger fw-bold cursor_pointer"
                >
                  <img src={deleteIcon} alt="delete" /> Delete Dependents
                </p>
              </div>
            ) : null}
          </div>
        ))}
        <div className="row">
          <div className="col-lg-6">
            <button
              className="btn btn-light blue-btn py-2 mt-4 mb-4"
              onClick={handleAddDependent}
              type="button"
            >
              + Add More Dependents
            </button>
          </div>
          <div className="offset-lg-2 col-lg-4 text-end">
            <button
              type="submit"
              className="btn btn-light blue-btn w-100 py-2 mt-4 mb-4"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Dependents;
