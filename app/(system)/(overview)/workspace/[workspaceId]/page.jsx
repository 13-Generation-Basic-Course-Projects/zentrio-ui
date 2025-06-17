import {
  
  createBoardAction,
  deleteBoardAction,
  getAllBoardBywWorkspaceIdAction,
  getBoardByIdAction,
  getMemeberByBoardIdAction,
  updateBoardByIdAction,
  updateFavBoardByIdAction,
} from "@/action/workspace.action";
import Myworkspace from "@/components/appserver/Myworkspace";
import React from "react";

export default async function WorkspaceSpcific({ params }) {
  const workspaceId = await params.workspaceId;

  /*
   * call board for get all board by workspace id
   */
  const getBoardByWorkspaceId = await getAllBoardBywWorkspaceIdAction(
    workspaceId
  );
  
  let allMembers = [];
  if (
    Array.isArray(getBoardByWorkspaceId?.payload) &&
    getBoardByWorkspaceId.payload.length > 0
  ) {
    const boardIds = getBoardByWorkspaceId.payload.map(
      (board) => board.boardId
    );
    console.log("Board IDs in page workspace:", boardIds);

    // Fetch members in parallel
    const memberPromises = boardIds.map((boardId) =>
      getMemeberByBoardIdAction(boardId)
    );
    const membersResponses = await Promise.allSettled(memberPromises);

    // Aggregate members, deduplicating by a unique identifier (e.g., memberId or email)
    allMembers = membersResponses
      .filter((result) => result.status === "fulfilled")
      .flatMap((result) => result.value?.payload || result.value || [])
      .reduce((unique, member) => {
        // Deduplicate by memberId (adjust if your API uses a different key, e.g., email)
        if (!unique.some((m) => m.memberId === member.memberId)) {
          unique.push(member);
        }
        return unique;
      }, []);

    console.log("Members in page workspace:", allMembers);
  }

  return (
    <>
      <Myworkspace
        Workspaceid={workspaceId}
        getBoardByWorkspaceId={getBoardByWorkspaceId}
        createBoardAction={createBoardAction}
        deleteBoardAction={deleteBoardAction}
        updateNameBoardAction={updateBoardByIdAction}
        getBoardByIdAction={getBoardByIdAction}
        updateFavAction={updateFavBoardByIdAction}
        memberData={allMembers}
      />
      ;
    </>
  );
}
