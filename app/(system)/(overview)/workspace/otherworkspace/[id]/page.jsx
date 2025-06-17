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

  return (
    <Otherworkspace
      Workspaceid={workspaceId}
      boards={matchingWorkspace?.otherBoards}
      updateFavAction={updateFavBoardByIdAction}
    />
  );
}
