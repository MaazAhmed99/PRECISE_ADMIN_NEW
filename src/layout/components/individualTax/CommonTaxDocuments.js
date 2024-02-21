import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndividualCostSaveStep4 } from "../../../redux/reducers/individualCostSlice";

const CommonTaxDocuments = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector(
    (state) => state.individualCostSlice.individualCost.step4
  );
  const [documents, setDocuments] = useState(reduxData);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result.split(",")[1];
      const newDocuments = [...documents];
      newDocuments[index] = {
        ...newDocuments[index],
        file: file,
        base64Data: base64Data,
        fileName: file.name, // Add file name property
      };
      setDocuments(newDocuments);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filesData = documents.map((doc) => ({
      name: doc.name,
      base64Data: doc.base64Data,
      fileName: doc.fileName,
    }));

    const newDocuments = filesData.map((doc) => {
      if (!doc.base64Data) {
        return { ...doc, error: "File is required" };
      }
      return { ...doc, error: "" };
    });
    setDocuments(newDocuments);

    const hasErrors = newDocuments.some((doc) => doc.error);

    if (!hasErrors) {
      console.log("Form submitted successfully!");
      console.log("Documents data:", filesData);
      dispatch(IndividualCostSaveStep4(filesData));
    }
  };

  return (
    <div className="income">
      <h1 className="mt-4 pt-3">Common Tax Documents</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {documents.map((document, index) => (
            <div key={index} className="col-lg-12">
              <p className="label-text">{document.name}</p>
              <div className="file-content">
                <input
                  type="file"
                  className="form-control field-text file-field"
                  placeholder="Email Address"
                  onChange={(event) => handleFileChange(event, index)}
                />
                <div className="upload-doc-text">
                  {/* Display file name */}
                  {document.fileName || "Upload a secure document"}
                </div>
                {document.error && (
                  <p className="text-danger">{document.error}</p>
                )}
              </div>
            </div>
          ))}
        </div>
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

export default CommonTaxDocuments;
