import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BusinessSaveStep3 } from "../../../redux/reducers/smallBusinessTaxSlice";
import { useDispatch } from "react-redux";

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const [bankStatementsFileName, setBankStatementsFileName] = useState();
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    emailAddress: yup
      .string()
      .email("Invalid email")
      .required("Email Address is required"),
    dateOfBirth: yup.string().required("Date of Birth is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    lastYearTaxReturn: yup
      .mixed()
      .test(
        "fileType",
        "Only PDF files are allowed",
        (value) => value[0] && value[0].type === "application/pdf"
      )
      .required("Last Year Tax Return is required"),
    mailingAddress: yup.string().required("Mailing Address is required"),
  });

  const { handleSubmit, control, setValue, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const submitData = async (data) => {
    const lastYearTaxReturn = await readFileAsBase64(data.lastYearTaxReturn[0]);
    const fullName = data.fullName;
    const emailAddress = data.emailAddress;
    const dateOfBirth = data.dateOfBirth;
    const phoneNumber = data.phoneNumber;
    const mailingAddress = data.mailingAddress;
    dispatch(
      BusinessSaveStep3({
        lastYearTaxReturn,
        fullName,
        emailAddress,
        dateOfBirth,
        phoneNumber,
        mailingAddress,
      })
    );
  };

  return (
    <div className="personal-information">
      <h1 className="mt-4 pt-3">Personal Information</h1>
      <form onSubmit={handleSubmit((data) => submitData(data))}>
        <div className="row">
          <div className="col-lg-6">
            <p className="label-text">Full Name</p>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                    placeholder="Full Name"
                  />
                  {errors.fullName && (
                    <span className="invalid-feedback">
                      {errors.fullName.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="col-lg-6">
            <p className="label-text">Email Address</p>
            <Controller
              name="emailAddress"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.emailAddress ? "is-invalid" : ""
                    }`}
                    placeholder="Email Address"
                  />
                  {errors.emailAddress && (
                    <span className="invalid-feedback">
                      {errors.emailAddress.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="col-lg-6">
            <p className="label-text">Date of Birth</p>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="date"
                    className={`form-control field-text ${
                      errors.dateOfBirth ? "is-invalid" : ""
                    }`}
                    placeholder="Date of Birth"
                  />
                  {errors.dateOfBirth && (
                    <span className="invalid-feedback">
                      {errors.dateOfBirth.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="col-lg-6">
            <p className="label-text">Phone Number</p>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className={`form-control field-text ${
                      errors.phoneNumber ? "is-invalid" : ""
                    }`}
                    placeholder="Phone Number"
                  />
                  {errors.phoneNumber && (
                    <span className="invalid-feedback">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        </div>
        <div className="col-lg-12">
          <p className="label-text">Last Year Tax Return</p>
          <div className="file-content">
            <Controller
              name="lastYearTaxReturn"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    className={`form-control field-text file-field ${
                      errors.lastYearTaxReturn ? "is-invalid" : ""
                    }`}
                    onChange={(e) => {
                      setValue("lastYearTaxReturn", e.target.files);
                      setBankStatementsFileName(e.target.files[0]?.name || "");
                    }}
                  />
                  <div className="upload-doc-text">
                    {bankStatementsFileName
                      ? bankStatementsFileName
                      : "Upload a secure document"}
                  </div>
                  {errors.lastYearTaxReturn && (
                    <span className="invalid-feedback">
                      {errors.lastYearTaxReturn.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        </div>
        <div className="col-lg-12">
          <p className="label-text">Mailing Address</p>
          <Controller
            name="mailingAddress"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className={`form-control field-text ${
                    errors.mailingAddress ? "is-invalid" : ""
                  }`}
                  placeholder="Mailing Address"
                />
                {errors.mailingAddress && (
                  <span className="invalid-feedback">
                    {errors.mailingAddress.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div className="col-lg-12">
          <button
            type="submit"
            className="btn btn-light blue-btn w-100 py-2 mt-4 mb-4"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
