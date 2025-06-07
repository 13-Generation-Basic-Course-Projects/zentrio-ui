
import { createBoardAction, deleteBoardAction, getAllBoardBywWorkspaceIdAction, getBoardByIdAction, updateBoardByIdAction, updateFavBoardByIdAction } from "@/action/workspace.action";
import Myworkspace from "@/components/appserver/Myworkspace";
import React from "react";



export default async function WorkspaceSpcific({ params }) {
  const workspaceId = await(params).workspaceId;
  

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
        updateNameBoardAction={updateBoardByIdAction}
        getBoardByIdAction={getBoardByIdAction}
        updateFavAction = {updateFavBoardByIdAction}
      />
      ;
    </>
  );
  
}
