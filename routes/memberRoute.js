import { apiConfig } from "@/constant/baseurl";

/* This route uses in feature member but we use some board controll */
export const memberRouteGroup = {
  acceptBoardInvite: (id) =>
    `${apiConfig.baseUrl}/boards/${id}/invitations/accept`, // Accept invite
  getBoardMembers: (boardId) =>
    `${apiConfig.baseUrl}/boards/${boardId}/members`, // Get board members
  getUserByUserId: (id) => `${apiConfig.baseUrl}/profiles/users/${id}/profiles`,
};
