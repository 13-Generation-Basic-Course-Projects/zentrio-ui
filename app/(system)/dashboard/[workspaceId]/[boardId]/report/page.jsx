import { reportAction } from "@/action/report.action";
import Reportpage from "@/components/appserver/Reportpage";
import { BtnPreview, BtnSaveAs } from "@/components/button/ButtonReport";
import ModalSaveAs from "@/components/modal/rep/ModalSaveAs";
import { Token } from "@/constant/token";
import React from "react";

//useage route : http://localhost:3000/dashboard/1/1/report
export default async function Report() {
  const boardId = `8d985fb5-cdd6-45a5-82a0-ee821f3aceda`;
  const reportData = await reportAction({ boardId });

  return (
    <>
      <Reportpage
        modal={[
          <BtnPreview key="btn-preview" />,
          <ModalSaveAs key="modal-save-as" />,
        ]}
        report={reportData}
      />
    </>
  );
}
