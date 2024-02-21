import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BusinessSaveStep4 } from "../../../redux/reducers/smallBusinessTaxSlice";
import { useDispatch } from "react-redux";

const TaxReturn = () => {
  const dispatch = useDispatch();
  const [bankStatementsFileName, setBankStatementsFileName] = useState();
  const schema = yup.object().shape({
    lastYearTaxReturn: yup
      .mixed()
      .test(
        "fileType",
        "Only PDF files are allowed",
        (value) => value[0] && value[0].type === "application/pdf"
      )
      .required("Last Year Tax Return is required"),
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

    dispatch(
      BusinessSaveStep4({
        lastYearTaxReturn,
      })
    );
  };

  return (
    <div className="income">
      <h1 className="mt-4 pt-3">Income</h1>
      <form onSubmit={handleSubmit((data) => submitData(data))}>
        <div className="row">
          <div className="col-lg-12">
            <p className="label-text">
              Please Upload A Copy Of Your Last Year's Tax Return, Including All
              Schedules And Forms
            </p>
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
                        setBankStatementsFileName(
                          e.target.files[0]?.name || ""
                        );
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

export default TaxReturn;
