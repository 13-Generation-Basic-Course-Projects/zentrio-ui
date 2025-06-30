import { getGuestUserDisplayKanbanAction } from "@/action/board.action";
import GuestKanbanBoardCompo from "@/components/appserver/GuestUserPage";
import React from "react";

export default async function GuestKanbanBoard({ params }) {
  // const workspaceId = await params.workspaceId;
  // const boardId = await params.boardId;
  const workspaceId = await params.workspaceid;
  const boardId = await params.boardid;
  const data = await getGuestUserDisplayKanbanAction({
    workspaceId: workspaceId,
    boardId: boardId,
  });

  console.log("testing the id", workspaceId, boardId);
  return <GuestKanbanBoardCompo data={data} />;
}
