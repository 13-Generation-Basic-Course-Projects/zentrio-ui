import {
  
  createBoardAction,
  deleteBoardAction,
  getAllBoardBywWorkspaceIdAction,
  getBoardByIdAction,
  getMemberByBoardIdAction,
  getMemeberByBoardIdAction,
  updateBoardByIdAction,
  updateFavBoardByIdAction,
} from "@/action/workspace.action";
import Myworkspace from "@/components/appserver/Myworkspace";
// import { C } from "@fullcalendar/core/internal-common";
import React from "react";

export default async function WorkspaceSpcific({ params }) {
  const workspaceId = await params.workspaceId;

  /*
   * call board for get all board by workspace id
   */
  const getBoardByWorkspaceId = await getAllBoardBywWorkspaceIdAction(
    workspaceId
  );
  
  /* let allMembers = [];
  if (
    Array.isArray(getBoardByWorkspaceId?.payload) &&
    getBoardByWorkspaceId.payload.length > 0
  ) {
    const boardIds = getBoardByWorkspaceId.payload
      .filter((board) => board.boardId) // Ensure valid boardId
      .map((board) => board.boardId);
    console.log("Board IDs in page workspace:", boardIds);

    if (boardIds.length === 0) {
      console.log("No valid board IDs found.");
      return;
    }
    const memberPromises = boardIds.map(
      (boardId) => getMemeberByBoardIdAction(boardId) 
    );
    const membersResponses = await Promise.allSettled(memberPromises);
    console.log("Members Response:", membersResponses);
    
    allMembers = membersResponses
      .filter((result) => result.status === "fulfilled")
      .flatMap((result) => {
        const members = result.value?.payload || [];
        return Array.isArray(members) ? members : [];
      })
      .reduce((unique, member) => {
        if (member.userId && !unique.some((m) => m.userId === member.userId)) {
          unique.push(member);
        }
        return unique;
      }, []);

    console.log("Members in page workspace:", allMembers);
  } else {
    console.log("No boards found in workspace.");
  } */
    let allMembers = [];

    if (
      Array.isArray(getBoardByWorkspaceId?.payload) &&
      getBoardByWorkspaceId.payload.length > 0
    ) {
      const boardIds = getBoardByWorkspaceId.payload
        .filter((board) => board.boardId)
        .map((board) => board.boardId);
      console.log("Board IDs in page workspace:", boardIds);

      if (boardIds.length === 0) {
        console.log("No valid board IDs found.");
      } else {
        // Fetch members sequentially
        for (const boardId of boardIds) {
          try {
            const response = await getMemberByBoardIdAction(boardId);
            const members = response?.payload || [];
            allMembers.push(...members);
          } catch (error) {
            console.error(
              `Failed to fetch members for boardId ${boardId}:`,
              error
            );
          }
        }

        // Deduplicate by userId
        allMembers = allMembers.reduce((unique, member) => {
          if (
            member.userId &&
            !unique.some((m) => m.userId === member.userId)
          ) {
            unique.push(member);
          }
          return unique;
        }, []);

        console.log("Members in page workspace:", allMembers);
      }
    } else {
      console.log("No boards found in workspace.");
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
