import { apiConfig } from "@/constant/baseurl";
import { LuKanban } from "react-icons/lu";


export const calenderRouteGroup = {
    //get note by id
    getNotebyId: (id) => `${apiConfig.baseUrl}/calendars/${id}`,
    //get note by task id
    getNotebyTaskId: (id) => `${apiConfig.baseUrl}/calendars/tasks/${id}`,
    //get task by board id
    getTaskbyBoardId: (id) => `${apiConfig.baseUrl}/calendars/boards/${id}`,
    //update note by id
    updateNoteById: (id) => `${apiConfig.baseUrl}/calendars/${id}`,
    //delete delete note by task id
    deteteNoteByNoteIdTaskId: (noteId, taskId) => `${apiConfig.baseUrl}/calendars/${noteId}/tasks/${taskId}`,
};