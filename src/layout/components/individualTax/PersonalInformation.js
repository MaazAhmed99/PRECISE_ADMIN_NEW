import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndividualCostSaveStep1 } from "../../../redux/reducers/individualCostSlice";

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector(
    (state) => state.individualCostSlice.individualCost.step1
  );

  const [fields, setFields] = useState(reduxData.fields);
  const [spouseFields, setSpouseFields] = useState(reduxData.spouseFields);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  useEffect(() => {
    if (reduxData.fields) {
      setFields(reduxData.fields);
    }
    if (reduxData.spouseFields) {
      setSpouseFields(reduxData.spouseFields);
    }
  }, [reduxData.fields, reduxData.spouseFields]);

  const addSpouseField = () => {
    setSpouseFields([
      ...spouseFields,
      {
        fullName: "",
        emailAddress: "",
        dob: "",
        phoneNumber: "",
      },
    ]);
  };

  const handleRemoveField = (index) => {
    const newSpouseFields = [...spouseFields];
    newSpouseFields.splice(index, 1);
    setSpouseFields(newSpouseFields);
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (event, fieldName, index) => {
    const file = event.target.files[0];
    if (!file) {
      setErrors({
        ...errors,
        [`${fieldName}`]: `Field is required.`,
      });
    } else {
      try {
        // Read file as base64
        const fileBase64 = await readFileAsBase64(file);
        // Update fields state with file name and base64 data
        setFields((prevFields) => ({
          ...prevFields,
          [`${fieldName}`]: {
            fileName: file.name,
            base64Data: fileBase64,
          },
        }));
        // Clear error for the field
        setErrors({
          ...errors,
          [`${fieldName}`]: "",
        });
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    // Validate fields
    const allFields = {
      ...fields,
      ...spouseFields.reduce((acc, curr, index) => {
        acc[`fullName${index}`] = curr.fullName;
        acc[`emailAddress${index}`] = curr.emailAddress;
        acc[`dob${index}`] = curr.dob;
        acc[`phoneNumber${index}`] = curr.phoneNumber;
        return acc;
      }, {}),
    };

    Object.entries(allFields).forEach(([key, value]) => {
      // Check if value is a string before calling trim()
      if (typeof value === "string" && !value.trim()) {
        newErrors[key] = `Field is required`;
      }
    });
    // z
    // Update errors state
    setErrors(newErrors);

    // If there are no errors, proceed with form submission logic
    if (Object.keys(newErrors).length === 0) {
      dispatch(IndividualCostSaveStep1({ spouseFields, fields }));
    } else {
      console.log("Errors found:", newErrors); // Log errors if any
    }
  };
  console.log(fields);
  return (
    <div className="personal-information">
      <h1 className="mt-4 pt-3">Personal Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <p className="label-text">Full Name</p>
            <input
              name="fullName"
              value={fields.fullName}
              onChange={handleChange}
              className="form-control field-text"
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p className="text-danger">{errors.fullName}</p>
            )}
          </div>
          <div className="col-lg-6">
            <p className="label-text">Email Address</p>
            <input
              name="emailAddress"
              value={fields.emailAddress}
              onChange={handleChange}
              className="form-control field-text"
              placeholder="Email Address"
            />
            {errors.emailAddress && (
              <p className="text-danger">{errors.emailAddress}</p>
            )}
          </div>
          <div className="col-lg-6">
            <p className="label-text">Date of Birth</p>
            <input
              type="date"
              name="dob"
              value={fields.dob}
              onChange={handleChange}
              className="form-control field-text"
              placeholder="Date of Birth"
            />
            {errors.dob && <p className="text-danger">{errors.dob}</p>}
          </div>
          <div className="col-lg-6">
            <p className="label-text">Phone Number</p>
            <input
              name="phoneNumber"
              value={fields.phoneNumber}
              onChange={handleChange}
              className="form-control field-text"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-danger">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="col-lg-12">
            <button
              className="btn btn-light blue-btn py-2 mt-4 mb-4"
              onClick={addSpouseField}
              type="button"
            >
              + Add Spouse
            </button>
          </div>
          {spouseFields.map((field, index) => (
            <div key={index} className="col-lg-12">
              <p className="label-text">Spouse #{index + 1}</p>
              <div className="row">
                <div className="col-lg-6">
                  <p className="label-text">Full Name</p>
                  <input
                    name={`fullName`}
                    value={field.fullName}
                    onChange={(e) =>
                      setSpouseFields(
                        spouseFields.map((item, i) =>
                          i === index
                            ? { ...item, fullName: e.target.value }
                            : item
                        )
                      )
                    }
                    className="form-control field-text"
                    placeholder="Full Name"
                  />
                  {errors[`fullName${index}`] && (
                    <p className="text-danger">{errors[`fullName${index}`]}</p>
                  )}
                </div>
                <div className="col-lg-6">
                  <p className="label-text">Email Address</p>
                  <input
                    name={`emailAddress`}
                    value={field.emailAddress}
                    onChange={(e) =>
                      setSpouseFields(
                        spouseFields.map((item, i) =>
                          i === index
                            ? { ...item, emailAddress: e.target.value }
                            : item
                        )
                      )
                    }
                    className="form-control field-text"
                    placeholder="Email Address"
                  />
                  {errors[`emailAddress${index}`] && (
                    <p className="text-danger">
                      {errors[`emailAddress${index}`]}
                    </p>
                  )}
                </div>
                <div className="col-lg-6">
                  <p className="label-text">Date of Birth</p>
                  <input
                    type="date"
                    name={`dob`}
                    value={field.dob}
                    onChange={(e) =>
                      setSpouseFields(
                        spouseFields.map((item, i) =>
                          i === index ? { ...item, dob: e.target.value } : item
                        )
                      )
                    }
                    className="form-control field-text"
                    placeholder="Date of Birth"
                  />
                  {errors[`dob${index}`] && (
                    <p className="text-danger">{errors[`dob${index}`]}</p>
                  )}
                </div>
                <div className="col-lg-6">
                  <p className="label-text">Phone Number</p>
                  <input
                    name={`phoneNumber`}
                    value={field.phoneNumber}
                    onChange={(e) =>
                      setSpouseFields(
                        spouseFields.map((item, i) =>
                          i === index
                            ? { ...item, phoneNumber: e.target.value }
                            : item
                        )
                      )
                    }
                    className="form-control field-text"
                    placeholder="Phone Number"
                  />
                  {errors[`phoneNumber${index}`] && (
                    <p className="text-danger">
                      {errors[`phoneNumber${index}`]}
                    </p>
                  )}
                </div>
                <div className="col-lg-12 mt-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveField(index)}
                    type="button"
                  >
                    Remove Spouse
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="col-lg-12">
            <p className="label-text">Last Year Tax Return</p>
            <div className="file-content">
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, "lastYearTaxReturn", "")}
                className="form-control field-text file-field"
                placeholder="Last Year Tax Return"
              />
              <div className="upload-doc-text">
                {fields.lastYearTaxReturn.fileName ||
                  "Upload a secure document"}
              </div>
              {errors.lastYearTaxReturn && (
                <p className="text-danger">{errors.lastYearTaxReturn}</p>
              )}
            </div>
            <p className="label-text-bottom">
              Ensure the Social Security number field is secure and only visible
              to authorized personnel.
            </p>
          </div>
          <div className="col-lg-12">
            <p className="label-text">Social Security Number</p>
            <div className="file-content">
              <input
                type="file"
                onChange={(e) =>
                  handleFileUpload(e, "socialSecurityNumber", "")
                }
                className="form-control field-text file-field"
                placeholder="Social Security Number"
              />
              <div className="upload-doc-text">
                {fields.socialSecurityNumber.fileName ||
                  "Upload a secure document"}
              </div>
              {errors.socialSecurityNumber && (
                <p className="text-danger">{errors.socialSecurityNumber}</p>
              )}
            </div>
            <p className="label-text-bottom">
              Ensure the Social Security number field is secure and only visible
              to authorized personnel.
            </p>
          </div>
          <div className="col-lg-6">
            <p className="label-text">Country</p>
            <input
              name="country"
              value={fields.country}
              onChange={handleChange}
              className="form-control field-text"
              placeholder="Country"
            />
            {errors.country && <p className="text-danger">{errors.country}</p>}
          </div>
          <div className="col-lg-6">
            <p className="label-text">City</p>
            <input
              name="city"
              value={fields.city}
              onChange={handleChange}
              className="form-control field-text"
              placeholder="City"
            />
            {errors.city && <p className="text-danger">{errors.city}</p>}
          </div>
          <div className="col-lg-6">
            <p className="label-text">State</p>
            <input
              name="state"
              value={fields.state}
              onChange={handleChange}
              className="form-control field-text"
              placeholder="State"
            />
            {errors.state && <p className="text-danger">{errors.state}</p>}
          </div>
          <div className="col-lg-6">
            <p className="label-text">Zip Code</p>
            <input
              name="zipCode"
              value={fields.zipCode}
              onChange={handleChange}
              className="form-control field-text"
              placeholder="Zip Code"
            />
            {errors.zipCode && <p className="text-danger">{errors.zipCode}</p>}
          </div>
          <div className="offset-lg-8 col-lg-4 mt-4">
            <button
              type="submit"
              className="btn btn-light blue-btn w-100 py-2 "
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
