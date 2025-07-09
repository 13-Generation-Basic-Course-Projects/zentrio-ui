import { apiConfig } from "@/constant/baseurl";

export const announcementRouteGroup = {
    // POST
    createAnnouncementByBoardId: (boardId) => `${apiConfig.baseUrl}/announcements`,
    uploadMultiImgByBoardId: (boardId,announcementId) => `${apiConfig.baseUrl}/files/boards/${boardId}/announcements/${announcementId}/upload-multiple-files`,

    // GET
    getAllAnnouncementByBoardId: (boardId) => `${apiConfig.baseUrl}/announcements/boards/${boardId}`,


    // DELETE
    deleteAnnouncementById: (announId) => `${apiConfig.baseUrl}/announcements/${announId}`,

    // PUT
    pinedAnnouncementById: (announId) => `${apiConfig.baseUrl}/announcements/${announId}/pinned`,
    updateAnnouncementById: (announId) => `${apiConfig.baseUrl}/announcements/${announId}`,


    // GET members
    getAllMembersByBoardId: (boardId) => `${apiConfig.baseUrl}/`,

    // POST comment
    createCommentByAnnouncementId: () => `${apiConfig.baseUrl}/comment/announcement/announcement/`,

    // PUT comment
    editCommentById: (commentId) => `${apiConfig.baseUrl}/comment/announcement/${commentId}`,

    // DELETE comment
    deleteCommentById: (commentId) => `${apiConfig.baseUrl}/comment/announcement/${commentId}`,

};
