import { apiConfig } from "@/constant/baseurl";

export const workspaceRouteGroup = {
  createWorkspace: () => `${apiConfig.baseUrl}/workspaces`, // Create workspace
  getAllWorkspaces: () => `${apiConfig.baseUrl}/workspaces?page=1&size=9999`, // Get all workspaces with pagination
  getWorkspaceById: (id) => `${apiConfig.baseUrl}/workspaces/${id}`, // Get workspace by id
  deleteWorkspaceById: (id) => `${apiConfig.baseUrl}/workspaces/${id}`, // Delete workspace by id
  updateWorkspaceById: (id) => `${apiConfig.baseUrl}/workspaces/${id}`, // Update workspace by id

  getWorkspacesByUser: () => `${apiConfig.baseUrl}/workspaces/users`, // Get all workspaces by user
  getWorkspacesByUserId: (id) => `${apiConfig.baseUrl}/workspaces/users/${id}`, // Get workspaces by workspace id for user
  getWorkspacesByTitle: (title) =>
    `${apiConfig.baseUrl}/workspaces/title/${title}`, // Get workspaces by title

  //new
  getOtherWorkSpaceJoined: () => `${apiConfig.baseUrl}/workspaces/other`, // Get other workspaces that users has joined

  getMemeberByBoardId: (boardId) =>
    `${apiConfig.baseUrl}/boards/${boardId}/members`, // get member by board id
};

export const boardRouteGroup = {
  getBoardById: (boardId) => `${apiConfig.baseUrl}/boards/${boardId}`, // Get board by ID
  updateBoardById: (boardId) => `${apiConfig.baseUrl}/boards/${boardId}`, // Update board by board ID and workspace id
  updateFavBoardById: (boardId) =>
    `${apiConfig.baseUrl}/boards/${boardId}/favourite`, // Toggle favorite (updated favorite of board by id)
  getAllBoards: () => `${apiConfig.baseUrl}/boards`, // Get all boards
  createBoard: () => `${apiConfig.baseUrl}/boards`, // Create new board by workspace id
  inviteUserToBoard: (id) => `${apiConfig.baseUrl}/boards/${id}/users/invite`, // Invite user to board
  uploadBoardCover: (boardId) => `${apiConfig.baseUrl}/boards/${boardId}/cover`, // Upload cover by board id
  assignUserRole: `${apiConfig.baseUrl}/boards/assign`, // Assign role to user in board

  getBoardsByUserId: (userId) => `${apiConfig.baseUrl}/boards/${userId}/users`, // Get boards by user ID
  getBoardCover: (id, filename) =>
    `${apiConfig.baseUrl}/boards/${id}/cover/${filename}`, // Get board cover image
  getBoardsByWorkspaceId: (workspaceId) =>
    `${apiConfig.baseUrl}/boards/workspaces/${workspaceId}`, // Get boards by workspace id
  getBoardByTitle: (title) => `${apiConfig.baseUrl}/boards/title/${title}`, // Get board by title
  getBoardsForCurrentUser: `${apiConfig.baseUrl}/boards/current`, // Boards for current user
  deleteBoard: (id, workspaceId) =>
    `${apiConfig.baseUrl}/boards/${id}/workspaces/${workspaceId}`, // Delete board

  //new
  getFavoriteBoard: (userId) =>
    `${apiConfig.baseUrl}/boards/favourite/users/${userId}`, // getfavorite board

  //new
};
