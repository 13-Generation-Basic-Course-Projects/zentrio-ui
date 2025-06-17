import { getReportAction } from "@/action/report.action";
import Reportpage from "@/components/appserver/Reportpage";
import { BtnPreview, BtnSaveAs } from "@/components/button/ButtonReport";
import ModalSaveAs from "@/components/modal/rep/ModalSaveAs";
import { Token } from "@/constant/token";
import React from "react";

//useage route : http://localhost:3000/dashboard/1/1/report
// export default async function Report({ boardId }) {
  export default async function Report() {
  const boardId = `d4f6ed17-3f68-48b4-9cbb-fa141a2d2000`;
  // const {boardId} = params;
  const reportData = await getReportAction({ boardId });
  // console.log("Param: ", boardId)
  // console.log("Report: ", reportData)

  return (
    <>
      <Reportpage
        modal={[
          <BtnPreview key="btn-preview" report={reportData}/>, 
          <ModalSaveAs key="modal-save-as" />,
        ]}
        report={reportData}
      />
    </>
  );
}
