import { getGuestUserDisplayKanbanAction } from "@/action/board.action";
import GuestKanbanBoardCompo from "@/components/appserver/GuestUserPage";
import React from "react";

export default async function GuestKanbanBoard(   ) {
  const workspaceId = "feb6d22e-b2d6-4105-b3ad-663c7148c337";
  const boardId = "15bf8b35-fc6e-49fc-be3e-7730dc76a533";

  const data = await getGuestUserDisplayKanbanAction({ workspaceId, boardId });

  return <GuestKanbanBoardCompo data={data} />;
}
