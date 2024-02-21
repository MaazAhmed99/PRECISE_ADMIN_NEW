import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { BusinessSaveStep1 } from "../../../redux/reducers/smallBusinessTaxSlice";
import { useDispatch } from "react-redux";

const BusinessInformation = () => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    businessName: yup.string().required("Business name is required"),
    ein: yup.string().required("EIN is required"),
    businessEmailAddress: yup.string().required("Business email is required"),
    businessIndustries: yup.string().required("Business industry is required"),
    businessPhoneNo: yup.string().required("Business phone number is required"),
    typeofBusiness: yup.string().required("Business type is required"),
    businessOwnerName: yup.string().required("Business owner name is required"),
    businessOwnerSSN: yup.string().required("Business owner SSN is required"),
    businessOwnerAddress: yup
      .string()
      .required("business owner address is required"),
    BusinessOwnerPercentage: yup
      .string()
      .required("Business Owner Percentage is required"),
    uploadedProfitAndLossFile: yup
      .mixed()
      .required("File is required")
      .test(
        "fileType",
        "Only Word files are allowed",
        (value) => value && value[0]?.type === "application/msword"
      ),
    uploadedFilesDynamic: yup.array().of(
      yup
        .mixed()
        .required("File is required")
        .test(
          "fileType",
          "Only Word files are allowed",
          (value) => value && value[0]?.type === "application/msword"
        )
    ),
    autoExtractedStatement: yup
      .mixed()
      .required("File is required")
      .test(
        "fileType",
        "Only Word files are allowed",
        (value) => value && value[0]?.type === "application/msword"
      ),
    vehicleDocument: yup
      .mixed()
      .required("File is required")
      .test(
        "fileType",
        "Only Word files are allowed",
        (value) => value && value[0]?.type === "application/msword"
      ),
    businessUsePercentage: yup
      .number()
      .typeError("Percentage must be a number")
      .required("Percentage Of Business Use is required")
      .min(0, "Percentage must be greater than or equal to 0")
      .max(100, "Percentage must be less than or equal to 100"),
    totalMilesDriven: yup
      .number()
      .typeError("Miles driven must be a number")
      .required("Total Miles Driven is required")
      .min(0, "Miles driven must be greater than or equal to 0"),
    lastYearsTaxReturn: yup
      .mixed()
      .required("Last Year's Tax Return is required")
      .test(
        "fileType",
        "Only PDF files are allowed",
        (value) => value && value[0]?.type === "application/pdf"
      ),
  });

  const { handleSubmit, control, setValue, getValues, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const [fileFields, setFileFields] = useState([{ id: 1 }]);

  const onSubmit = (data) => {
    // dispatch(BusinessSaveStep1(data));
    console.log(data);
  };

  const handleAutoExtractedFileChange = (event) => {
    setValue("autoExtractedStatement", event.target.files);
  };

  const handleVehicleDocumentChange = (event) => {
    setValue("vehicleDocument", event.target.files);
  };

  const handleFileChange = (event, index) => {
    const newFiles = getValues(`uploadedFiles`, []).slice(); // Get the current files array
    newFiles[index] = event.target.files; // Update the files at the specified index
    setValue(`uploadedFiles`, newFiles); // Set the updated files array
  };
  const lastYearsTaxReturnChange = (event) => {
    setValue("lastYearsTaxReturn", event.target.files);
  };
  const removeFileField = (index) => {
    const updatedFields = [...fileFields];
    if (index > 0) {
      updatedFields.splice(index, 1);
      setFileFields(updatedFields);
    }
  };
  const addFileField = () => {
    const newField = { id: fileFields.length + 1 };
    setFileFields([...fileFields, newField]);
  };

  return (
    <div className="personal-information">
      <h1 className="mt-4 pt-3">Business Information</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-6">
            <p className="label-text">Business Name</p>
            <Controller
              name="businessName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.businessName ? "is-invalid" : ""
                    }`}
                    placeholder="Business Name"
                  />
                </>
              )}
            />
            {errors.businessName && (
              <span className="invalid-feedback">
                {errors.businessName.message}
              </span>
            )}
          </div>
          <div className="col-lg-6">
            <p className="label-text">EIN (Employer Identification Number)</p>
            <Controller
              name="ein"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.ein ? "is-invalid" : ""
                    }`}
                    placeholder="Business Name"
                  />
                </>
              )}
            />
            {errors.ein && (
              <span className="invalid-feedback">{errors.ein.message}</span>
            )}
          </div>
          <div className="col-lg-6">
            <p className="label-text">Business Email Address</p>
            <Controller
              name="businessEmailAddress"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.ein ? "is-invalid" : ""
                    }`}
                    placeholder="Business EmailAddress"
                  />
                </>
              )}
            />
            {errors.businessEmailAddress && (
              <span className="invalid-feedback">
                {errors.businessEmailAddress.message}
              </span>
            )}
          </div>
          <div className="col-lg-6">
            <p className="label-text">Business Phone Number</p>
            <Controller
              name="businessPhoneNo"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.ein ? "is-invalid" : ""
                    }`}
                    placeholder="Business Phone Number"
                  />
                </>
              )}
            />
            {errors.businessPhoneNo && (
              <span className="invalid-feedback">
                {errors.businessPhoneNo.message}
              </span>
            )}
          </div>
          <div className="col-lg-12">
            <p className="label-text">Business Industries</p>
            <Controller
              name="businessIndustries"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.ein ? "is-invalid" : ""
                    }`}
                    placeholder="Business Industries"
                  />
                </>
              )}
            />
            {errors.businessIndustries && (
              <span className="invalid-feedback">
                {errors.businessIndustries.message}
              </span>
            )}
          </div>
          <div className="col-lg-12">
            <p className="label-text">Type of Business</p>
            <Controller
              name="typeofBusiness"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select
                  {...field}
                  className={`form-select field-text ${
                    errors.typeofBusiness ? "is-invalid" : ""
                  }`}
                >
                  <option value="" disabled>
                    Type of Business
                  </option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </select>
              )}
            />
            {errors.typeofBusiness && (
              <span className="invalid-feedback">
                {errors.typeofBusiness.message}
              </span>
            )}
          </div>
          <div className="col-lg-6">
            <p className="label-text">Business Owner Name</p>
            <Controller
              name="businessOwnerName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.ein ? "is-invalid" : ""
                    }`}
                    placeholder="Business Owner Name"
                  />
                </>
              )}
            />
            {errors.businessOwnerName && (
              <span className="invalid-feedback">
                {errors.businessOwnerName.message}
              </span>
            )}
          </div>
          <div className="col-lg-6">
            <p className="label-text">Business Owner SSN</p>
            <Controller
              name="businessOwnerSSN"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.ein ? "is-invalid" : ""
                    }`}
                    placeholder="Business Owner SSN"
                  />
                </>
              )}
            />
            {errors.businessOwnerSSN && (
              <span className="invalid-feedback">
                {errors.businessOwnerSSN.message}
              </span>
            )}
          </div>
          <div className="col-lg-6">
            <p className="label-text">Business Owner Address </p>
            <Controller
              name="businessOwnerAddress "
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.ein ? "is-invalid" : ""
                    }`}
                    placeholder="Business Owner Address "
                  />
                </>
              )}
            />
            {errors.businessOwnerAddress && (
              <span className="invalid-feedback">
                {errors.businessOwnerAddress.message}
              </span>
            )}
          </div>
          <div className="col-lg-6">
            <p className="label-text">Business Owner % </p>
            <Controller
              name="BusinessOwnerPercentage  "
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.ein ? "is-invalid" : ""
                    }`}
                    placeholder="Business Owner % "
                  />
                </>
              )}
            />
            {errors.BusinessOwnerPercentage && (
              <span className="invalid-feedback">
                {errors.BusinessOwnerPercentage.message}
              </span>
            )}
          </div>

          {/* {fileFields?.map((field, index) => (
            <div key={field.id} className="col-lg-12">
              <p className="label-text">
                Upload Any 1099 Forms Received, Such As 1099-NEC, 1099-K, Or
                1099-MISC
              </p>
              <div className="file-content">
                <input
                  type="file"
                  className={`form-control field-text file-field ${
                    errors.uploadedFiles && errors.uploadedFiles[index]
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(event) => handleFileChange(event, index)}
                  accept=""
                />
                <div className="upload-doc-text">
                  {formState?.isSubmitted && !errors.uploadedFiles[index]
                    ? formState?.touchedFields.uploadedFiles[index]?.[0]?.name
                    : "Upload a secure document"}
                </div>
                {errors.uploadedFiles && errors.uploadedFiles[index] && (
                  <span className="invalid-feedback">
                    {errors.uploadedFiles[index].message}
                  </span>
                )}
                {index > 0 ? (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => removeFileField(index)}
                  >
                    Close
                  </button>
                ) : null}
              </div>
            </div>
          ))}
          <div className="col-lg-12">
            <button
              type="button"
              className="btn btn-light blue-btn py-2 mt-4 mb-4"
              onClick={addFileField}
            >
              + Add another Income Document
            </button>
          </div> */}
          <div className="col-lg-10">
            <p className="label-text">
              Expenses Will Be Automatically Extracted From Your Uploaded
              Statement.
            </p>
            <div className="file-content">
              <input
                type="file"
                className={`form-control field-text file-field ${
                  errors.autoExtractedStatement ? "is-invalid" : ""
                }`}
                onChange={handleAutoExtractedFileChange}
                accept=""
              />
              <div className="upload-doc-text">
                {errors.autoExtractedStatement
                  ? errors.autoExtractedStatement.message
                  : "Upload a secure document"}
              </div>
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
                className={`form-control field-text file-field ${
                  errors.vehicleDocument ? "is-invalid" : ""
                }`}
                onChange={handleVehicleDocumentChange}
                accept=""
              />
              <div className="upload-doc-text">
                {errors.vehicleDocument
                  ? errors.vehicleDocument.message
                  : "Upload a secure document"}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <p className="label-text">Total Miles Driven </p>
            <Controller
              name="totalMilesDriven"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className={`form-control field-text ${
                    errors.totalMilesDriven ? "is-invalid" : ""
                  }`}
                  placeholder="Total Miles Driven"
                />
              )}
            />
            {errors.totalMilesDriven && (
              <span className="invalid-feedback">
                {errors.totalMilesDriven.message}
              </span>
            )}
          </div>
          <div className="col-lg-6">
            <p className="label-text">Percentage Of Business Use</p>
            <Controller
              name="businessUsePercentage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className={`form-control field-text ${
                    errors.businessUsePercentage ? "is-invalid" : ""
                  }`}
                  placeholder="Percentage Of Business Use"
                />
              )}
            />
            {errors.businessUsePercentage && (
              <span className="invalid-feedback">
                {errors.businessUsePercentage.message}
              </span>
            )}
          </div>
          <div className="col-lg-12">
            <p className="label-text">
              Please Upload A Copy Of Your Last Year's Tax Return, Including All
              Schedules And Forms.
            </p>
            <div className="file-content">
              <input
                type="file"
                className={`form-control field-text file-field ${
                  errors.lastYearsTaxReturn ? "is-invalid" : ""
                }`}
                onChange={lastYearsTaxReturnChange}
              />
              <div className="upload-doc-text">
                {errors?.lastYearsTaxReturn
                  ? errors?.lastYearsTaxReturn.message
                  : "Upload a secure document"}
              </div>
              {errors.lastYearsTaxReturn && (
                <span className="invalid-feedback">
                  {errors.lastYearsTaxReturn.message}
                </span>
              )}
            </div>
          </div>
          <div className="offset-lg-8 col-lg-4 mt-2">
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

export default BusinessInformation;
