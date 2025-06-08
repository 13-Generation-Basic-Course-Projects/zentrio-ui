import { apiConfig } from "@/constant/baseurl";

export const boardRouteGroup = {
  //get
  getBoardById: (id) => `${apiConfig.baseUrl}/board/${id}`, //
  getTaskByBoardAndGanttBarId: (boardId, ganttbarId) =>
    `${apiConfig.baseUrl}/tasks/boards/${boardId}/gantt-bars/${ganttbarId}`, //Get all task by specific board ID with gantt bar ID

  getMemberByBoardId: (boardId) =>
    `${apiConfig.baseUrl}/boards/${boardId}/members`, //get all  memeber  specific boardId

  //post
  assignUserRoleToBoard: () => `${apiConfig.baseUrl}/boards/assign`,
  inviteUserToBoard: (boardId) =>
    `${apiConfig.baseUrl}/boards/${boardId}/users/invite`,

  //put
  updateBoardFavorite: (boardId) =>
    `${apiConfig.baseUrl}/boards/${boardId}/favourite`, //enum

  //delete
  deleteBoardById: (boardId, workspaceId) =>
    `${apiConfig.baseUrl}/boards/${boardId}/workspaces/${workspaceId}`, //Deleted a board by board ID
};
