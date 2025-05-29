import Reportpage from "@/components/appserver/Reportpage";
import CardBoardReport from "@/components/card/CardBoardReport";
import ModalCreateChecklist from "@/components/modal/board/ModalCreateChecklist";
import ModalCreateGanttBar from "@/components/modal/board/ModalCreateGanttBar";
import ModalCreateGanttChart from "@/components/modal/board/ModalCreateGanttChart";
import ModalDetailTask from "@/components/modal/board/ModalDetailTask";
import ModalUpdateChecklist from "@/components/modal/board/ModalUpdateChecklist";
import React from "react";

//useage route : http://localhost:3000/dashboard/1/1/report
export default function Report() {
  return (
    <div>
      {/* <Reportpage /> */}

      {/* use for test modal in leap/modal */}

      {/* <ModalCreateGanttChart /> */}

      {/* <ModalCreateGanttBar /> */}

      {/* <ModalCreateChecklist/> */}

      {/* <ModalUpdateChecklist/> */}

      {/* <CardBoardReport/> */}

      <ModalDetailTask/>
    </div>
  );
}
