import { apiConfig } from "@/constant/baseurl";
export const taskRouteGroup = {
  //get
  getTaskAllUser: () => `${apiConfig.baseUrl}/workspaces/users`, // get work by all user
  getAllTaskForAllUser: () => `${apiConfig.baseUrl}/tasks`,
  getAllTaskForAllUser: () => `${apiConfig.baseUrl}/tasks`,
  getTaskByBoardAndGanttBarId: (boardId, ganttbarId) =>
    `${apiConfig.baseUrl}/tasks/boards/${boardId}/gantt-bars/${ganttbarId}`, //Get all task by specific board ID with gantt bar ID
  //put
  moveTaskStags: (taskId) => `${apiConfig.baseUrl}/tasks/${taskId}/move`, // Enum Moved task to another stage with specific tasks ID
  //delete
  deleteTaskByTaskId: (taskId, boardId, ganttBarId) =>
    `${apiConfig.baseUrl}/tasks/${taskId}/boards/${boardId}/gantt-bars/${ganttBarId}`, //Deleted task by ID with boards ID and gantt bars ID
};
