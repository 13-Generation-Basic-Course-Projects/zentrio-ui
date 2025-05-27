import Reportpage from "@/components/appserver/Reportpage";
import { BtnPreview, BtnSaveAs } from "@/components/button/ButtonReport";
import React from "react";

//useage route : http://localhost:3000/dashboard/1/1/report
export default function Report() {
  return (
    <>
      <Reportpage modal={[<BtnPreview />, <BtnSaveAs />]} />
    </>
  );
}
