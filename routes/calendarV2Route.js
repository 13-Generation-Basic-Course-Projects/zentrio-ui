import { apiConfig } from "@/constant/baseurl";


export const calendarV2RouteGroup = {
  getTaskByBoardAndGanttBarId: (boardId, ganttbarId) =>
    `${apiConfig.baseUrl}/tasks/boards/${boardId}/gantt-bars/${ganttbarId}`, //Get all task by specific board ID with gantt bar ID
  getAllGanttBarByGanttChartID: (ganttChartId) =>
    `${apiConfig.baseUrl}/gantt-bars/gantt-charts/${ganttChartId}`, // Get gantt bar by gantt chart id
  getGanttChartByBoardId: (boardId) =>
    `${apiConfig.baseUrl}/gantt-charts/boards/${boardId}`, //Get gantt chart by specific boards ID

  /* calendar controller */
  createNoteInCalendar: () => `${apiConfig.baseUrl}/calendars/tasks`, // create noted in calendar
  getAllNoteInCalendar: (taskId) =>
    `${apiConfig.baseUrl}/calendars/tasks/${taskId}`, // Get all note from calendar by current user (note in each task)
  deleteNoteInCalendar: (calendarId, taskId) =>
    `${apiConfig.baseUrl}/calendars/${calendarId}/tasks/${taskId}`, // delete note by id from calendar

  // updateNoteInCalendar: (calendarId) =>
  //   `${apiConfig.baseUrl}/calendars/${calendarId}`, // update note by id from calendar
  updateNoteById: (id) => `${apiConfig.baseUrl}/calendars/${id}`,

  /* checklist controller */
  getChecklistByTaskId: (taskId) =>
    `${apiConfig.baseUrl}/checklists/tasks/${taskId}`, // Get all checklist by task id
};
