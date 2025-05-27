// PDFPreview.jsx
import React from "react";
import { BlobProvider } from "@react-pdf/renderer";
import MyDocument from "./MyDoc";

const PDFPreview = () => {
  return (
    <BlobProvider document={<MyDocument />}>
      {({ url, loading, error }) => {
        if (loading) return <div>Loading PDF preview...</div>;
        if (error) return <div>Error loading PDF 😬</div>;
        return (
          <iframe
            src={url}
            style={{ width: "100%", height: "100vh", border: "none" }}
            title="PDF Preview"
          />
        );
      }}
    </BlobProvider>
  );
};

export default PDFPreview;
