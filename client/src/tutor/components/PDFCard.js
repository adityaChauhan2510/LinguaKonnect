import React from "react";

export default function PDFCard({ unit, handlePdfDownload }) {
  return (
    <div className="my-10">
      <h2 className="font-bold text-xl tracking-wider py-3">Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
        {unit.pdf_urls.map((pdf_url, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-200"
            onClick={() => handlePdfDownload(pdf_url, index)}
            style={{ cursor: "pointer" }}
          >
            <div className="text-center">
              <p className="font-semibold">PDF {index + 1}</p>
              <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
