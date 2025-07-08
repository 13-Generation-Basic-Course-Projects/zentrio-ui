import React from "react";
import Otherworkspace from "@/components/appserver/Otherworkspace";
import {
  getOtherWorkSpaceJoinedAction,
  updateFavBoardByIdAction,
} from "@/action/workspace.action";
import { getMemberByBoardIdAction } from "@/action/board.action";

//useage route : http://localhost:3000/workspace/otherworkspace/1
export default async function OtherWorkspace({ params }) {
  const workspaceId = await params.id;
  //workspace other
  const getWorKSpaceJoined = await getOtherWorkSpaceJoinedAction();
    ("getWorKSpaceJoined other", getWorKSpaceJoined);

  // Filter the payload to get only the workspace matching the workspaceId
  const matchingWorkspace = getWorKSpaceJoined.payload.find(
    (workspace) => workspace.workspaceId === workspaceId
  );

    ("Matching workspace:", matchingWorkspace?.otherBoards);
  let allMembersInOther = [];

  // Extract board IDs from the matching workspace
  const boardIds =
    matchingWorkspace?.otherBoards?.map((board) => board.boardId) || [];
    ("Board IDs in other workspace:", boardIds);

  if (boardIds.length === 0) {
      ("No valid board IDs found.");
  } else {
    // Fetch members for each board sequentially
    for (const boardId of boardIds) {
      try {
        const response = await getMemberByBoardIdAction({boardId}); // Hypothetical action
        const members = response?.payload || [];
        allMembersInOther.push(...members);
      } catch (error) {
        console.error(`Failed to fetch members for boardId ${boardId}:`, error);
      }
    }

    // Deduplicate members by userId using a Set
    allMembersInOther = Array.from(
      new Map(
        allMembersInOther.map((member) => [member.userId, member])
      ).values()
    );
      ("Unique members in other workspace:", allMembersInOther);
  }

  return (
    <Otherworkspace
      Workspaceid={workspaceId}
      boards={matchingWorkspace?.otherBoards}
      updateFavAction={updateFavBoardByIdAction}
      allMembersInOther={allMembersInOther}
    />
  );
}
