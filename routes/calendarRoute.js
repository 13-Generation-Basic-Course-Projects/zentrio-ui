import { apiConfig } from "@/constant/baseurl";


export const calenderRouteGroup = {
    //get
    getNotebyId: (id) => `${apiConfig.baseUrl}/calendars/${id}`,
    //get
    getNotebyTaskId: (id) => `${apiConfig.baseUrl}/caledars/tasks/${id}`,
    //get
    getTaskbyBoardId: (id) =>`${apiConfig.baseUrl}/calendars/boards/${id}`,
    //update
    updateNoteById: (id) => `${apiConfig.baseUrl}/calendars/${id}`,
    //delete
    deteteNoteByNoteIdTaskId: (id, id) => `${apiConfig.baseUrl}/calendars/${id}/tasks/${id}`,
};
