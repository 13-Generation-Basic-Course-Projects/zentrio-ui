import { apiConfig } from "@/constant/baseurl";

export const boardRoute = {
  getBoardById: (id) => `${apiConfig.baseUrl}/boards/${id}`, // Get board by ID
  updateBoardById: (id) => `${apiConfig.baseUrl}/boards/${id}`, // Update board by board ID and workspace id
  updateFavBoardById: (id) => `${apiConfig.baseUrl}/boards/${id}/favourite`, // Toggle favorite (updated favorite of board by id)
  getAllBoards: `${apiConfig.baseUrl}/boards`, // Get all boards
  createBoard: `${apiConfig.baseUrl}/boards`, // Create new board by workspace id
  inviteUserToBoard: (id) => `${apiConfig.baseUrl}/boards/${id}/users/invite`, // Invite user to board
  uploadBoardCover: (id) => `${apiConfig.baseUrl}/boards/${id}/cover`, // Upload cover by board id
  assignUserRole: `${apiConfig.baseUrl}/boards/assign`, // Assign role to user in board

  getBoardsByUserId: (userId) => `${apiConfig.baseUrl}/boards/${userId}/users`, // Get boards by user ID
  getBoardMembers: (id) =>
    `${apiConfig.baseUrl}/boards/${id}/members`, // Get board members
  acceptBoardInvite: (id) =>
    `${apiConfig.baseUrl}/boards/${id}/invitations/accept`, // Accept invite
  getBoardCover: (id, filename) =>
    `${apiConfig.baseUrl}/boards/${id}/cover/${filename}`, // Get board cover image
  getBoardsByWorkspaceId: (workspaceId) =>
    `${apiConfig.baseUrl}/boards/workspace/${workspaceId}`, // Get boards by workspace
  getBoardByTitle: (title) => `${apiConfig.baseUrl}/boards/title/${title}`, // Get board by title
  getBoardsForCurrentUser: `${apiConfig.baseUrl}/boards/current`, // Boards for current user
  deleteBoard: (id, workspaceId) =>
    `${apiConfig.baseUrl}/boards/${id}/workspace/${workspaceId}`, // Delete board
};
