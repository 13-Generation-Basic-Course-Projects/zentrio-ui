
import { createBoardAction, deleteBoardAction, getAllBoardBywWorkspaceIdAction } from "@/action/workspace.action";
import Myworkspace from "@/components/appserver/Myworkspace";
import React from "react";



export default async function WorkspaceSpcific({ params }) {
  const workspaceId = params.workspaceId;
  
  /* call board action for create new board in workspace */
  /* 
  * call board for get all board by workspace id 
  */
 const getBoardByWorkspaceId = await getAllBoardBywWorkspaceIdAction(workspaceId);


  return (
    <>
      <Myworkspace
        Workspaceid={workspaceId}
        getBoardByWorkspaceId={getBoardByWorkspaceId}
        createBoardAction={createBoardAction}
        deleteBoardAction={deleteBoardAction}
      />
      ;
    </>
  );
  
}
