import { apiConfig } from "@/constant/baseurl";

export const dashboardRoute = {
  getWorkspace: `${apiConfig.baseUrl}/api/workspace`,
  getWorkspaceById: (id) => `${apiConfig.baseUrl}/api/workspace/${id}`,
};
