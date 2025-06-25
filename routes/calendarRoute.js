import { apiConfig } from "@/constant/baseurl";

export const calenderRouteGroup = {
  getNotebyId: (id) => `${apiConfig.baseUrl}/calendars/${id}`,
  //get
  getNotebyTaskId: (id) => `${apiConfig.baseUrl}/calendars/tasks/${id}`,
  //get
  getTaskbyBoardId: (id) => `${apiConfig.baseUrl}/calendars/boards/${id}`,
  //update
  updateNoteById: (id) => `${apiConfig.baseUrl}/calendars/${id}`,
  //delete
  deteteNoteByNoteIdTaskId: (noteId, taskId) =>
    `${apiConfig.baseUrl}/calendars/${noteId}/tasks/${taskId}`,
  //add new
  updateNoteByIdFromCalendar: (calendarId) =>
    `${apiConfig.baseUrl}/calendars/${calendarId}`, // update note by id from calendar
};
