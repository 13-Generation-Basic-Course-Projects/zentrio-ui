import Reportpage from "@/components/appserver/Reportpage";
import { BtnPreview, BtnSaveAs } from "@/components/button/ButtonReport";
import ModalSaveAs from "@/components/modal/rep/ModalSaveAs";
import React from "react";

//useage route : http://localhost:3000/dashboard/1/1/report
export default function Report() {
  return (
    <>
      <Reportpage
        modal={[
          <BtnPreview key="btn-preview" />,
          <ModalSaveAs key="modal-save-as" />,
        ]}
      />
    </>
  );
}
