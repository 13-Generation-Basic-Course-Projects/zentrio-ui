import { apiConfig } from "@/constant/baseurl";


export const calendarV2RouteGroup = {
  getTaskByBoardAndGanttBarId: (boardId, ganttbarId) =>
    `${apiConfig.baseUrl}/tasks/boards/${boardId}/gantt-bars/${ganttbarId}`, //Get all task by specific board ID with gantt bar ID
  getAllGanttBarByGanttChartID: (ganttChartId) =>
    `${apiConfig.baseUrl}/gantt-bars/gantt-charts/${ganttChartId}`, // Get gantt bar by gantt chart id
  getGanttChartByBoardId: (boardId) =>
    `${apiConfig.baseUrl}/gantt-charts/boards/${boardId}`, //Get gantt chart by specific boards ID
};
