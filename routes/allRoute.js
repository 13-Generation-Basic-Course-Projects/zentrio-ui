import { apiConfig } from "@/constant/baseurl";

export const dashboardRoute = {
  getWorkspace: `${apiConfig.baseUrl}/api/workspace`, //use for get workspace
  getWorkspaceById: (id) => `${apiConfig.baseUrl}/api/workspace/${id}`, // get spacific workspace by workspaceId
};

export const boardRoute = {
  getBoardByDashBoardId: (id) => `${apiConfig.baseUrl}/api/board/${id}`, // get bord in spacific workspace
};
