import { apiConfig } from "@/constant/baseurl";

export const boardRouteGroup = {
  //get
  getBoardById: (id) => `${apiConfig.baseUrl}/boards/${id}`, //
  getTaskByBoardId: (id) => `${apiConfig.baseUrl}/tasks/boards/${id}`, // get task use to recive fill call " createdBy "
  getTaskByBoardAndGanttBarId: (boardId, ganttbarId) =>
    `${apiConfig.baseUrl}/tasks/boards/${boardId}/gantt-bars/${ganttbarId}`, //Get all task by specific board ID with gantt bar ID

  getMemberByBoardId: (boardId) =>
    `${apiConfig.baseUrl}/boards/${boardId}/members`, //get all  memeber  specific boardId
  getCommentByCheckListId: (checkListId) =>
    `${apiConfig.baseUrl}/comment/checklists/${checkListId}`,

  //post
  assignUserRoleToBoard: () => `${apiConfig.baseUrl}/boards/assign`,
  inviteUserToBoard: (boardId) =>
    `${apiConfig.baseUrl}/boards/${boardId}/users/invite`,
  assignUserRoleLeaderToBoard: (taskid, assignId) =>
    `${apiConfig.baseUrl}/tasks/${taskid}/members/${assignId}`, //asign team ld
  assignMemberInChecklist: (checklistId, taskId, assignedBy, assignedTo) =>
    `${apiConfig.baseUrl}/api/v1/checklists/${checklistId}/tasks/${taskId}/members${assignedBy}/members/${assignedTo}/`,

  createTaskByBoardIdAndGanttBarId: () => `${apiConfig.baseUrl}/tasks`, // Created task with boards ID and gantt bars ID
  createCheckListBytaskId: () => `${apiConfig.baseUrl}/checklists`, // Created task with boards ID and gantt bars ID
  postCommentByCheckListId: () => `${apiConfig.baseUrl}/comment/checklist/`,
  //put
  updateBoardFavorite: (boardId) =>
    `${apiConfig.baseUrl}/boards/${boardId}/favourite`, //enum
  updateCommentById: (id) => `${apiConfig.baseUrl}/comment/${id}`,

  //delete
  deleteBoardById: (boardId, workspaceId) =>
    `${apiConfig.baseUrl}/boards/${boardId}/workspaces/${workspaceId}`, //Deleted a board by board ID
  deleteTask: (taskId, boardId, ganttbarId) =>
    `${apiConfig.baseUrl}/tasks/${taskId}/boards/${boardId}/gantt-bars/${ganttbarId}`, //Deleted a board by board ID

  //advance

  moveTaskOrder: (taskId) =>
    `${apiConfig.baseUrl}/checklists/orders/tasks/${taskId}`,
};
