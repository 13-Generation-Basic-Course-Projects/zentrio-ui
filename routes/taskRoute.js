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
  /* new add */
  updateTaskById: (taskId) => `${apiConfig.baseUrl}/tasks/${taskId}`, //Update task by Id with board id and gantt bar id
  //delete
  deleteTaskByTaskId: (taskId, boardId, ganttBarId) =>
    `${apiConfig.baseUrl}/tasks/${taskId}/boards/${boardId}/gantt-bars/${ganttBarId}`, //Deleted task by ID with boards ID and gantt bars ID

  /* //add new */
  getTaskByTaskId: (taskId) => `${apiConfig.baseUrl}/tasks/${taskId}`, //get task by task id
};
