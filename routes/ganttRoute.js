import { apiConfig } from "@/constant/baseurl";

export const ganttRouteGroup = {
  //Gantt Chart Controller

  //get
  getGanttChartForCurrentUser: (ganttChartId, boardId) =>
    `${apiConfig.baseUrl}/gantt-charts/${ganttChartId}/boards/${boardId}`, //Get gantt chart by ID with current boards
  getGanttChartByBoardId: (boardId) =>
    `${apiConfig.baseUrl}/gantt-charts/boards/${boardId}`, //Get gantt chart by specific boards ID

  //update

  updateGanttChart: (ganttChartId) =>
    `${apiConfig.baseUrl}/gantt-charts/${ganttChartId}`, //Updated gantt chart by ID with current boards

  //post
  createGanttChart: () => `${apiConfig.baseUrl}/gantt-charts`, //Created gantt chart by specific boards ID

  //delete
  deleteGanttChart: (ganttChartId) =>
    `${apiConfig.baseUrl}/gantt-charts/${ganttChartId}/boards/${boardId}`, //Deleted gantt chart by ID with current boards

  //Gantt bar Controller

  //get
  getAllGanttBar: () => `${apiConfig.baseUrl}/gantt-bars`,
  getAllGanttBarByGanttChartID: (ganttChartId) =>
    `${apiConfig.baseUrl}/gantt-bars/gantt-charts/${ganttChartId}`,

  //post
  createGanttBar: () => `${apiConfig.baseUrl}/gantt-bars/gantt-charts`, //Created gantt bars with specific gantt charts ID

  //delete
  deleteGanttBar: (ganttbarId, ganttChartId) =>
    `${apiConfig.baseUrl}/gantt-bars/${ganttbarId}/ganttChart/${ganttChartId}`, //delete
};
