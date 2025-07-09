import { getBoardMemberAction } from "@/action/member.action";
import { getCurrentUserProfileAction } from "@/action/profile.action";
import { getReportAction, getReportVersionByReportIdAction } from "@/action/report.action";
import { getOtherWorkSpaceJoinedAction } from "@/action/workspace.action";
import Reportpage from "@/components/appserver/Reportpage";
import { BtnPreview, BtnSaveAs } from "@/components/button/ButtonReport";
import ModalSaveAs from "@/components/modal/rep/ModalSaveAs";
import { Token } from "@/constant/token";
import React from "react";

export default async function Report({ params }) {
  // const boardId = `d4f6ed17-3f68-48b4-9cbb-fa141a2d2000`;
  const boardId = params.boardId;
  const reportData = await getReportAction({ boardId });
  const reportId = reportData?.payload?.reportId;
  const reportVersionData = await getReportVersionByReportIdAction({ reportId })
  const boardMember = await getBoardMemberAction(boardId);
  const currentUserProfile = await getCurrentUserProfileAction();

    ("boardMember", boardId);
    ("currentUserProfile", currentUserProfile);
  const getRoleByBoardId = (boardId, profile) => {
    // Check ownBoards
    const ownBoard = profile.payload.ownBoards.find(
      (board) => board.boardId === boardId
    );
    if (ownBoard) {
      return ownBoard.role;
    }

    // Check joinedBoards
    const joinedBoard = profile.payload.joinedBoards.find(
      (board) => board.boardId === boardId
    );
    if (joinedBoard) {
      return joinedBoard.role;
    }

    return null; // Board not found
  };

  // Get the role
  const role = getRoleByBoardId(boardId, currentUserProfile);
    ("sadd", role);
  const roleNeverJoined = null;
    ("Report Version: ", reportVersionData.payload)
    ("BoardId: ", boardId)
  return (
    <>
      <Reportpage
        roleNeverJoined={roleNeverJoined}
        roleJoined={role}
        modal={[
          <BtnPreview key="btn-preview" report={reportData} />,
          <ModalSaveAs key="modal-save-as" board={boardId} report={reportData}/>,
        ]}
        report={reportData}
        version={reportVersionData}
      />
    </>
  );
}
