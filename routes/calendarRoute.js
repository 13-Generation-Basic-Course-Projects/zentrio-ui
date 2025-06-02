import { apiConfig } from "@/constant/baseurl";


export const calenderRoute = {
    getNotebyId: (id) => `${apiConfig.baseUrl}/calendars/${id}`,
    getNotebyTaskId: (id) => `${apiConfig.baseUrl}/caledars/tasks/${id}`,

};
