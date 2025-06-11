import { apiConfig } from "@/constant/baseurl";

export const announcementRouteGroup = {
    // POST
    createAnnouncementByBoardId: (boardId) => `${apiConfig.baseUrl}/announcements`,
    uploadMultiImgByBoardId: (boardId) => `${apiConfig.baseUrl}/files/boards/${boardId}/upload-multiple-files`,

    // GET
    getAllAnnouncementByBoardId: (boardId) => `${apiConfig.baseUrl}/announcements/boards/${boardId}`,


    // GET members
    getAllMembersByBoardId: (boardId) => `${apiConfig.baseUrl}/`,
};
