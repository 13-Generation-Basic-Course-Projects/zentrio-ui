import CustomePDF from "@/components/integrate/pdf/CustomePDF";
import PDFPreview from "@/components/integrate/pdf/PreviewPDF";
import React from "react";
// import { testAction } from "../../../../action/test.action";
// import TestFetch from "@/components/testcomponent/TestFetch";
export default async function page() {
  // const getTest = await testAction();
  // console.log("gettestaction", getTest);
  return (
    <div>
      {/* <TestFetch dataProp={getTest} /> */}
      <CustomePDF />
    </div>
  );
}