import { apiConfig } from "@/constant/baseurl";

export const workspaceRoute = {
  createWorkspace: `${apiConfig.baseUrl}/api/workspaces`, // Create workspace
  getAllWorkspaces: `${apiConfig.baseUrl}/api/workspaces`, // Get all workspaces
  getWorkspaceById: (id) => `${apiConfig.baseUrl}/api/workspaces/${id}`, // Get workspace by id
  deleteWorkspaceById: (id) => `${apiConfig.baseUrl}/api/workspaces/${id}`, // Delete workspace by id
  updateWorkspaceById: (id) => `${apiConfig.baseUrl}/api/workspaces/${id}`, // Update workspace by id

  getWorkspacesByUser: `${apiConfig.baseUrl}/api/workspaces/users`, // Get all workspaces by user
  getWorkspacesByUserId: (id) =>
    `${apiConfig.baseUrl}/api/workspaces/users/${id}`, // Get workspaces by workspace id for user
  getWorkspacesByTitle: (title) =>
    `${apiConfig.baseUrl}/api/workspaces/title/${title}`, // Get workspaces by title
};
