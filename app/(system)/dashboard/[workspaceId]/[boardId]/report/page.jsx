import { getReportAction } from "@/action/report.action";
import { getOtherWorkSpaceJoinedAction } from "@/action/workspace.action";
import Reportpage from "@/components/appserver/Reportpage";
import { BtnPreview, BtnSaveAs } from "@/components/button/ButtonReport";
import ModalSaveAs from "@/components/modal/rep/ModalSaveAs";
import { Token } from "@/constant/token";
import React from "react";

//usage route : http://localhost:3000/dashboard/1/1/report
export default async function Report({ params }) {
  const boardId = params?.boardId;
  const reportData = await getReportAction({ boardId });
  console.log("report data", reportData);

  /**
   * workspace joined
   */
  //workspace other
  const getWorKSpaceJoined = await getOtherWorkSpaceJoinedAction();
  console.log("getWorKSpaceJoined other", getWorKSpaceJoined);

  // Search through all workspaces and their otherBoards to find the matching board
  let matchingBoard = null;
  let matchingWorkspace = null;

  for (const workspace of getWorKSpaceJoined.payload) {
    const board = workspace.otherBoards?.find(
      (board) => board.boardId === boardId
    );

    if (board) {
      matchingBoard = board;
      matchingWorkspace = workspace;
      break; // Found it, no need to continue searching
    }
  }

  console.log("matching board:", matchingBoard);
  console.log("matching workspace:", matchingWorkspace);

  if (!matchingBoard) {
    console.log("Board not found with ID:", boardId);
    return <div>Board not found</div>;
  }

  const matchingBoardForNotPM = matchingBoard;
  console.log("in report", matchingBoardForNotPM);

  // Get role from matchingBoardForNotPM with priority logic
  const getUserRole = (roles) => {
    if (!roles || roles.length === 0) return "ROLE_MEMBER";

    // If has 3 roles (ROLE_LEADER, ROLE_MEMBER, ROLE_MANAGER), return ROLE_MANAGER
    if (roles.length === 3 && roles.includes("ROLE_MANAGER")) {
      return "ROLE_MANAGER";
    }

    // If has 2 roles (ROLE_LEADER, ROLE_MEMBER), return ROLE_LEADER
    if (roles.length === 2 && roles.includes("ROLE_LEADER")) {
      return "ROLE_LEADER";
    }

    // Default to highest priority role available
    if (roles.includes("ROLE_MANAGER")) return "ROLE_MANAGER";
    if (roles.includes("ROLE_LEADER")) return "ROLE_LEADER";
    return "ROLE_MEMBER";
  };

  const userRole = getUserRole(matchingBoardForNotPM?.role);
  console.log("User role in report:", userRole);

  // Only show report page if user is ROLE_MANAGER
  if (userRole !== "ROLE_MANAGER") {
    console.log("Access denied: User does not have ROLE_MANAGER permission");
    return <div>Access denied. Only managers can view reports.</div>;
    // Or return null for nothing:
    // return null;
  }

  return (
    <>
      <Reportpage
        modal={[
          <BtnPreview key="btn-preview" />,
          <ModalSaveAs key="modal-save-as" />,
        ]}
        report={reportData}
        boardId={boardId}
      />
    </>
  );
}
