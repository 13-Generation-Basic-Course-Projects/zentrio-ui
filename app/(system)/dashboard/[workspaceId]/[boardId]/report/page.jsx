import { getReportAction } from "@/action/report.action";
import Reportpage from "@/components/appserver/Reportpage";
import { BtnPreview, BtnSaveAs } from "@/components/button/ButtonReport";
import ModalSaveAs from "@/components/modal/rep/ModalSaveAs";
import { Token } from "@/constant/token";
import React from "react";

//useage route : http://localhost:3000/dashboard/1/1/report
export default async function Report({ boardId }) {
  // export default async function Report() {
  // const boardId = `feb6d22e-b2d6-4105-b3ad-663c7148c337`;
  // const {boardId} = params;
  const reportData = await getReportAction({ boardId });
  // console.log("Param: ", boardId)

  return (
    <>
      <Reportpage
        modal={[
          <BtnPreview key="btn-preview" />,
          <ModalSaveAs key="modal-save-as" />,
        ]}
        report={reportData}
        boardId={boardId} // -> prop me if you can
      />
    </>
  );
}
