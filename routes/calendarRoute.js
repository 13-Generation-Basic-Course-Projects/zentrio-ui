import { apiConfig } from "@/constant/baseurl";


export const calenderRouteGroup = {

    // Get
    getCalendarByBoardIdAndUserId: (boardId) => `${apiConfig.baseUrl}/calendars/boards/${boardId}`, // Get calendar by board id and user id
    getAllNotesFromCalendarByCurrentUser: (taskId) => `${apiConfig.baseUrl}/calendars/tasks/${taskId}`, // Get all notes from calendar by current user
    getNoteInCalendar: (calendarId) => `${apiConfig.baseUrl}/calendars/${calendarId}`, // Get note in calendar
    // Post
    createNoteInCalendar : () => `${apiConfig.baseUrl}/calendars/tasks`, // Create note in calendar
    // Put
    updateNoteByIdFromCalendar: (calendarId) => `${apiConfig.baseUrl}/calendars/${calendarId}`, // Update note by id from calendar
    // Delete
    deleteNoteByIdFromCalendar: (calendarId, taskId) => `${apiConfig.baseUrl}/calendars/${calendarId}/tasks/${taskId}`, // Delete note by id from calendar
};