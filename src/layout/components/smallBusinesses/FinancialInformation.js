import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { BusinessSaveStep2 } from "../../../redux/reducers/smallBusinessTaxSlice";

const FinancialInformation = () => {
  const [bankStatementsFileName, setBankStatementsFileName] = useState("");
  const [lastYearsTaxReturnFileName, setLastYearsTaxReturnFileName] =
    useState("");
  const [balanceSheetFile, setBalanceSheetFile] = useState("");
  const [profitAndLossFile, setProfitAndLossFile] = useState("");
  const schema = yup.object().shape({
    profitAndLossFile: yup
      .mixed()
      .test(
        "fileType",
        "Only PDF files are allowed",
        (value) => value[0] && value[0].type === "application/pdf"
      )
      .required("Profit and Loss Statement is required"),
    balanceSheetFile: yup
      .mixed()
      .test(
        "fileType",
        "Only PDF files are allowed",
        (value) => value[0] && value[0].type === "application/pdf"
      )
      .required("Balance Sheet is required"),
    alternativeCalculation: yup.string().required("Field is required"),
    bankStatements: yup
      .mixed()
      .test(
        "fileType",
        "Only PDF files are allowed",
        (value) => value[0] && value[0].type === "application/pdf"
      )
      .required("Bank Statements are required"),
    lastYearsTaxReturn: yup
      .mixed()
      .test(
        "fileType",
        "Only PDF files are allowed",
        (value) => value[0] && value[0].type === "application/pdf"
      )
      .required("Last Year's Tax Return is required"),
  });

  const { handleSubmit, control, setValue, getValues, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const { errors } = formState;
  const dispatch = useDispatch();
  const SubmitData = async (data) => {
    const profitAndLossBase64 = await readFileAsBase64(
      data.profitAndLossFile[0]
    );
    const balanceSheetBase64 = await readFileAsBase64(data.balanceSheetFile[0]);
    const bankStatementsBase64 = await readFileAsBase64(data.bankStatements[0]);
    const lastYearsTaxReturnBase64 = await readFileAsBase64(
      data.lastYearsTaxReturn[0]
    );

    dispatch(
      BusinessSaveStep2({
        profitAndLossBase64,
        balanceSheetBase64,
        alternativeCalculation: data.alternativeCalculation,
        bankStatementsBase64,
        lastYearsTaxReturnBase64,
      })
    );
  };

  return (
    <div className="personal-information">
      <h1 className="mt-4 pt-3">Financial Information</h1>
      <form onSubmit={handleSubmit((data) => SubmitData(data))}>
        <div className="row">
          <div className="col-lg-12">
            <p className="label-text">
              Upload A Copy Of Your Business's Profit And Loss Statement For The
              Tax Year.
            </p>
            <div className="file-content">
              <input
                type="file"
                className={`form-control field-text file-field ${
                  errors.profitAndLossFile ? "is-invalid" : ""
                }`}
                onChange={(e) => {
                  setValue("profitAndLossFile", e.target.files);
                  setProfitAndLossFile(e.target.files[0]?.name || "");
                }}
              />
              <div className="upload-doc-text">
                {profitAndLossFile
                  ? profitAndLossFile
                  : "Upload a secure document"}
              </div>
              {errors.profitAndLossFile && (
                <span className="invalid-feedback">
                  {errors.profitAndLossFile.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <p className="label-text">
              Upload A Copy Of Your Business's Balance Sheet As Of The End Of
              The Tax Year
            </p>
            <div className="file-content">
              <input
                type="file"
                className={`form-control field-text file-field ${
                  errors.balanceSheetFile ? "is-invalid" : ""
                }`}
                onChange={(e) => {
                  setValue("balanceSheetFile", e.target.files);
                  setBalanceSheetFile(e.target.files[0]?.name || "");
                }}
              />
              <div className="upload-doc-text">
                {balanceSheetFile
                  ? balanceSheetFile
                  : "Upload a secure document"}
              </div>
              {errors.balanceSheetFile && (
                <span className="invalid-feedback">
                  {errors.balanceSheetFile.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <p className="label-text">
              If You Do Not Have A Profit And Loss Statement. We Will Reach Out
              To Discuss Alternative Methods Of Calculating Your Income And
              Expenses.
            </p>
            <textarea
              rows={5}
              className={`form-control field-text ${
                errors.alternativeCalculation ? "is-invalid" : ""
              }`}
              placeholder="Write Here"
              onChange={(e) => {
                setValue("alternativeCalculation", e.target.value);
              }}
            />
            {errors.alternativeCalculation && (
              <span className="invalid-feedback">
                {errors.alternativeCalculation.message}
              </span>
            )}
          </div>

          <div className="col-lg-12">
            <p className="label-text">
              You May Be Required To Upload Bank Statements To Verify Your
              Income And Expenses
            </p>
            <div className="file-content">
              <Controller
                name="bankStatements"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      className={`form-control field-text file-field ${
                        errors.bankStatements ? "is-invalid" : ""
                      }`}
                      onChange={(e) => {
                        setValue("bankStatements", e.target.files);
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
                    {errors.bankStatements && (
                      <span className="invalid-feedback">
                        {errors.bankStatements.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="col-lg-12">
            <p className="label-text">
              Please Upload A Copy Of Your Last Year's Tax Return, Including All
              Schedules And Forms
            </p>
            <div className="file-content">
              <Controller
                name="lastYearsTaxReturn"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      className={`form-control field-text file-field ${
                        errors.lastYearsTaxReturn ? "is-invalid" : ""
                      }`}
                      onChange={(e) => {
                        setValue("lastYearsTaxReturn", e.target.files);
                        setLastYearsTaxReturnFileName(
                          e.target.files[0]?.name || ""
                        );
                      }}
                    />
                    <div className="upload-doc-text">
                      {lastYearsTaxReturnFileName
                        ? lastYearsTaxReturnFileName
                        : "Upload a secure document"}
                    </div>
                    {errors.lastYearsTaxReturn && (
                      <span className="invalid-feedback">
                        {errors.lastYearsTaxReturn.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
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
      </form>
    </div>
  );
};

export default FinancialInformation;
