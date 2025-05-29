import React from "react";

export default function CoverDocument() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative bg-white max-w-lg w-full rounded-lg shadow-xl p-12 border border-gray-200">
        {/* Main content */}
        <div className="relative z-10">
          <div className="bg-blue-50 p-6 rounded-md mb-6">
            <h1 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
              PROJECT <br />
              REPORT FOR <br />
              INVESTORES
            </h1>
          </div>

          <div className="mb-6 text-right ml-auto">
            <div className="bg-gray-900 text-white px-4 py-2 text-sm font-semibold inline-block rounded">
              [COMPANY LETTERHEAD WITH LOGO]
            </div>
            <p className="mt-2 text-gray-700">[Company Name]</p>
            <p className="text-gray-600">[Insert Contact Detail]</p>
          </div>

          <div className="mt-10 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Prepared by:</span>
              <br />
              Mr. Adminh
            </p>
            <p className="mt-4">
              Any inquiries with respect to this report may be directed to:
              <br />
              [Insert Name]
            </p>
          </div>

          {/* File Icons */}
          <div className="mt-10 flex space-x-4">
            {["doc", "xls", "pptx", "pdf"].map((type) => (
              <div
                key={type}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  type === "doc"
                    ? "bg-blue-600"
                    : type === "xls"
                    ? "bg-green-600"
                    : type === "pptx"
                    ? "bg-red-400"
                    : "bg-red-600"
                }`}
              >
                {type.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
