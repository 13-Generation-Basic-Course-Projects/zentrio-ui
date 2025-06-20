import { getReportAction } from "@/action/report.action";
import Reportpage from "@/components/appserver/Reportpage";
import { BtnPreview, BtnSaveAs } from "@/components/button/ButtonReport";
import ModalSaveAs from "@/components/modal/rep/ModalSaveAs";
import { Token } from "@/constant/token";
import React from "react";

export default async function Report({ params }) {
  // const boardId = `d4f6ed17-3f68-48b4-9cbb-fa141a2d2000`;
  const { boardId } = params;
  const reportData = await getReportAction({ boardId });

  return (
    <>
      <Reportpage
        modal={[
          <BtnPreview key="btn-preview" report={reportData}/>, 
          <ModalSaveAs key="modal-save-as" boardId={boardId}/>,
        ]}
        report={reportData}
      />
    </>
  );
}