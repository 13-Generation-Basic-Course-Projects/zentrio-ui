import { apiConfig } from "@/constant/baseurl";


export const calenderRouteGroup = {
    getNotebyId: (id) => `${apiConfig.baseUrl}/calendars/${id}`,
    getNotebyTaskId: (id) => `${apiConfig.baseUrl}/caledars/tasks/${id}`,
    getTaskbyBoardId: (id) =>`${apiConfig.baseUrl}/calendars/boards/${id}`,
    updateNoteById: (id) => `${apiConfig.baseUrl}/calendars/${id}`,
    deteteNoteByNoteIdTaskId: (id, id) => `${apiConfig.baseUrl}/calendars/${id}/tasks/${id}`,
};
