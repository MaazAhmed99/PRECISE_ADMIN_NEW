// import React from "react";

// const AdditionalNotes = () => {
//   return (
//     <div className="additional-notes">
//       <h1 className="mt-4 pt-3">Additional Notes</h1>
//       <div className="row">
//         <div className="col-lg-12">
//           <p className="label-text">
//             If You Have Any Other Tax Forms Please Upload Here
//           </p>
//           <div className="file-content">
//             <input
//               type="file"
//               className="form-control field-text file-field"
//               placeholder="Email Address"
//             />
//             <div className="upload-doc-text">Upload a secure document</div>
//           </div>
//         </div>
//         <div className="col-lg-12">
//           <p className="label-text">
//             It's Recommended To Label Each Uploaded Document Clearly With The
//             Corresponding Income Or Deduction Category.
//           </p>
//           <div className="file-content">
//             <input
//               type="file"
//               className="form-control field-text file-field"
//               placeholder="Email Address"
//             />
//             <div className="upload-doc-text">Upload a secure document</div>
//           </div>
//         </div>
//         <div className="col-lg-12">
//           <p className="label-text">
//             Consider Including A Progress Indicator On The Form To Show Users
//             How Much Information They Have Submitted.
//           </p>
//           <div className="file-content">
//             <input
//               type="file"
//               className="form-control field-text file-field"
//               placeholder="Email Address"
//             />
//             <div className="upload-doc-text">Upload a secure document</div>
//           </div>
//         </div>
//         <div className="col-lg-12">
//           <p className="label-text">
//             Consider Including A Progress Indicator On The Form To Show Users
//             How Much Information They Have Submitted.
//           </p>
//           <div className="file-content">
//             <input
//               type="file"
//               className="form-control field-text file-field"
//               placeholder="Email Address"
//             />
//             <div className="upload-doc-text">Upload a secure document</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdditionalNotes;import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { IndividualCostSaveStep5 } from "../../../redux/reducers/individualCostSlice";

const AdditionalNotes = () => {
  const dispatch = useDispatch();

  const [documents, setDocuments] = useState([
    {
      name: "If You Have Any Other Tax Forms Please Upload Here",
      file: null,
      error: "",
    },
    {
      name: "It's Recommended To Label Each Uploaded Document Clearly With The Corresponding Income Or Deduction Category.",
      file: null,
      error: "",
    },
    {
      name: "Consider Including A Progress Indicator On The Form To Show Users How Much Information They Have Submitted.",
      file: null,
      error: "",
    },
    {
      name: "Consider Including A Progress Indicator On The Form To Show Users How Much Information They Have Submitted.",
      file: null,
      error: "",
    },
  ]);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const newDocuments = [...documents];
    newDocuments[index].file = file;
    setDocuments(newDocuments);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if any files are missing
    const missingFiles = documents.filter((doc) => !doc.file);

    if (missingFiles.length > 0) {
      // If any file is missing, set error for each missing file
      const newDocuments = documents.map((doc) => ({
        ...doc,
        error: doc.file ? "" : "File is required",
      }));
      setDocuments(newDocuments);
    } else {
      // If all files are present, proceed with dispatch
      const filesData = documents.map((doc) => ({
        name: doc.name,
        base64Data: doc.base64Data,
        fileName: doc.fileName,
      }));

      console.log("Form submitted successfully!");
      console.log("Documents data:", filesData);
      dispatch(IndividualCostSaveStep5(filesData));
    }
  };

  return (
    <div className="additional-notes">
      <h1 className="mt-4 pt-3">Additional Notes</h1>
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
                  {document.file
                    ? document.file.name
                    : "Upload a secure document"}
                </div>
                {document.error && (
                  <p className="text-danger">{document.error}</p>
                )}
              </div>
            </div>
          ))}
          <div className="offset-lg-8 col-lg-4 text-end">
            <button
              type="submit"
              className="btn btn-light blue-btn w-100 py-2 mt-4 mb-4"
            >
              Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdditionalNotes;
