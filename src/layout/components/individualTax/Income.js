import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndividualCostSaveStep2 } from "../../../redux/reducers/individualCostSlice";

const Income = () => {
  const dispatch = useDispatch();
  const w2DocumentsRedux = useSelector(
    (state) => state.individualCostSlice.individualCost.step2.w2Documents
  );
  const otherIncomeDocumentsRedux = useSelector(
    (state) =>
      state.individualCostSlice.individualCost.step2.otherIncomeDocuments
  );
  // console.log(w2DocumentsRedux, "w2DocumentsRedux");
  // console.log(otherIncomeDocumentsRedux, "otherIncomeDocumentsRedux");
  const [w2Documents, setW2Documents] = useState([""]);
  const [otherIncomeDocuments, setOtherIncomeDocuments] = useState([""]);
  const [w2DocumentsError, setW2DocumentsError] = useState();
  const [otherIncomeDocumentsError, setOtherIncomeDocumentsError] = useState();

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (w2DocumentsRedux) {
      setW2Documents(w2DocumentsRedux);
    }
    if (otherIncomeDocumentsRedux) {
      setOtherIncomeDocuments(otherIncomeDocumentsRedux);
    }
  }, [w2DocumentsRedux, otherIncomeDocumentsRedux]);

  const handleW2DocumentChange = async (event, index) => {
    const file = event.target.files[0];
    const fileBase64 = await readFileAsBase64(file);
    const newDocuments = [...w2Documents];
    newDocuments[index] = { fileName: file.name, base64Data: fileBase64 };
    setW2Documents(newDocuments);
  };

  const handleOtherIncomeDocumentChange = async (event, index) => {
    const file = event.target.files[0];
    const fileBase64 = await readFileAsBase64(file);
    const newDocuments = [...otherIncomeDocuments];
    newDocuments[index] = { fileName: file.name, base64Data: fileBase64 };
    setOtherIncomeDocuments(newDocuments);
  };

  const handleAddW2Document = () => {
    setW2Documents([...w2Documents, ""]);
  };

  const handleRemoveW2Document = (index) => {
    if (index === 0 && w2Documents.length === 1) return; // Prevent removing the last document
    const updatedDocuments = [...w2Documents];
    updatedDocuments.splice(index, 1);
    setW2Documents(updatedDocuments);
  };

  const handleAddOtherIncomeDocument = () => {
    setOtherIncomeDocuments([...otherIncomeDocuments, ""]);
  };

  const handleRemoveOtherIncomeDocument = (index) => {
    if (index === 0 && otherIncomeDocuments.length === 1) return; // Prevent removing the last document
    const updatedDocuments = [...otherIncomeDocuments];
    updatedDocuments.splice(index, 1);
    setOtherIncomeDocuments(updatedDocuments);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset error states
    setW2DocumentsError("");
    setOtherIncomeDocumentsError("");

    // Validate at least one W-2 document
    if (w2Documents.length === 0 || w2Documents.every((doc) => !doc)) {
      setW2DocumentsError("At least one W-2 document is required");
      return;
    }

    // Validate at least one other income document
    if (
      otherIncomeDocuments.length === 0 ||
      otherIncomeDocuments.every((doc) => !doc)
    ) {
      setOtherIncomeDocumentsError(
        "At least one other income document is required"
      );
      return;
    }

    // Proceed with form submission
    // Add your logic here
    console.log(w2Documents, "w2Documents");
    console.log(otherIncomeDocuments, "otherIncomeDocuments");
    dispatch(IndividualCostSaveStep2({ w2Documents, otherIncomeDocuments }));
  };

  return (
    <div className="income">
      <h1 className="mt-4 pt-3">Income</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* W-2 Documents */}
          <div className="col-lg-12">
            <p className="label-text">
              Upload Scanned Copies Or Pdfs Of All W-2 Forms Received From
              Employers.
            </p>
            {w2Documents.map((document, index) => (
              <div key={index} className="file-content my-3">
                <input
                  type="file"
                  className="form-control field-text file-field"
                  placeholder="Email Address"
                  onChange={(event) => handleW2DocumentChange(event, index)}
                />
                <div className="upload-doc-text">
                  {document && document.fileName ? (
                    <>
                      <div>{document.fileName}</div>
                    </>
                  ) : (
                    "Upload a secure document"
                  )}
                </div>
                {index !== 0 && (
                  <button
                    className="btn btn-light blue-btn py-2 mt-4 mb-4"
                    onClick={() => handleRemoveW2Document(index)}
                    type="button"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {w2DocumentsError ? (
              <div className="text-danger">{w2DocumentsError}</div>
            ) : null}
            <button
              className="btn btn-light blue-btn py-2 mt-4 mb-4"
              onClick={handleAddW2Document}
              type="button"
            >
              + Add another W-2
            </button>
          </div>
          {/* Other Income Documents */}
          <div className="col-lg-12">
            <p className="label-text">Other Income Document</p>
            {otherIncomeDocuments.map((document, index) => (
              <div key={index} className="file-content my-3">
                <input
                  type="file"
                  className="form-control field-text file-field"
                  placeholder="Email Address"
                  onChange={(event) =>
                    handleOtherIncomeDocumentChange(event, index)
                  }
                />
                <div className="upload-doc-text">
                  {document && document.fileName ? (
                    <>
                      <div>{document.fileName}</div>
                    </>
                  ) : (
                    "Upload a secure document"
                  )}
                </div>
                {index !== 0 && (
                  <button
                    className="btn btn-light blue-btn py-2 mt-4 mb-4"
                    onClick={() => handleRemoveOtherIncomeDocument(index)}
                    type="button"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {otherIncomeDocumentsError ? (
              <div className="text-danger">{otherIncomeDocumentsError}</div>
            ) : null}
            <button
              className="btn btn-light blue-btn py-2 mt-4 mb-4"
              onClick={handleAddOtherIncomeDocument}
              type="button"
            >
              + Add another Document
            </button>
          </div>
        </div>
        {/* Submit Button */}
        <div className="offset-lg-8 col-lg-4 text-end">
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

export default Income;
