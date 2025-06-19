import React from "react";
import Otherworkspace from "@/components/appserver/Otherworkspace";
import {
  getOtherWorkSpaceJoinedAction,
  updateFavBoardByIdAction,
} from "@/action/workspace.action";

//useage route : http://localhost:3000/workspace/otherworkspace/1
export default async function OtherWorkspace({ params }) {
  const workspaceId = await params.id;
  //workspace other
  const getWorKSpaceJoined = await getOtherWorkSpaceJoinedAction();
  console.log("getWorKSpaceJoined other", getWorKSpaceJoined);

  // Filter the payload to get only the workspace matching the workspaceId
  const matchingWorkspace = getWorKSpaceJoined.payload.find(
    (workspace) => workspace.workspaceId === workspaceId
  );

  console.log("Matching workspace:", matchingWorkspace?.otherBoards);

  let allMembersInOther = [];
  
      if (
        Array.isArray(getOtherWorkSpaceJoinedAction?.payload) &&
        getOtherWorkSpaceJoinedAction?.payload?.length > 0
      ) {
        const boardIds = getOtherWorkSpaceJoinedAction?.payload
          .filter((board) => board.boardId)
          .map((board) => board.boardId);
        console.log("Board IDs in other workspace:", boardIds);

        if (boardIds.length === 0) {
          console.log("No valid board IDs found.");
        } else {
          // Fetch members sequentially
          for (const boardId of boardIds) {
            try {
              const response = await getOtherWorkSpaceJoinedAction(boardId);
              const members = response?.payload || [];
              allMembersInOther.push(...members);
            } catch (error) {
              console.error(
                `Failed to fetch members for boardId ${boardId}:`,
                error
              );
            }
          }

          // Deduplicate by userId
          allMembersInOther = allMembersInOther.reduce((unique, member) => {
            if (
              member.userId &&
              !unique.some((m) => m.userId === member.userId)
            ) {
              unique.push(member);
            }
            return unique;
          }, []);

          console.log("Members in other workspace:", allMembersInOther);
        }
      } else {
        console.log("No boards found in other workspace.");
      }
   console.log("All members in other workspace: ", allMembersInOther);

  return (
    <Otherworkspace
      Workspaceid={workspaceId}
      boards={matchingWorkspace?.otherBoards}
      updateFavAction={updateFavBoardByIdAction}
      allMembersInOther={allMembersInOther}
    />
  );
}
