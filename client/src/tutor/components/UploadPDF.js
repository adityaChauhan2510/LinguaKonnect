import React from "react";

export default function UploadPDF({ loading, handleFileChange, handleUpload }) {
  return (
    <>
      <h3 className="font-semibold text-xl tracking-wider">Upload PDFs</h3>
      <input
        type="file"
        id="pdf-upload"
        accept=".pdf"
        onChange={handleFileChange}
        className="my-3"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        {loading ? "Loading..." : "Upload More PDFs"}
      </button>
    </>
  );
}
