import { apiConfig } from "@/constant/baseurl";

export const workspaceRoute = {
  createWorkspace: () => `${apiConfig.baseUrl}/workspaces`, // Create workspace
  getAllWorkspaces: () => `${apiConfig.baseUrl}/workspaces`, // Get all workspaces
  getWorkspaceById: (id) => `${apiConfig.baseUrl}/workspaces/${id}`, // Get workspace by id
  deleteWorkspaceById: (id) => `${apiConfig.baseUrl}/workspaces/${id}`, // Delete workspace by id
  updateWorkspaceById: (id) => `${apiConfig.baseUrl}/workspaces/${id}`, // Update workspace by id

  getWorkspacesByUser: () => `${apiConfig.baseUrl}/workspaces/users`, // Get all workspaces by user
  getWorkspacesByUserId: (id) =>
    `${apiConfig.baseUrl}/workspaces/users/${id}`, // Get workspaces by workspace id for user
  getWorkspacesByTitle: (title) =>
    `${apiConfig.baseUrl}/workspaces/title/${title}`, // Get workspaces by title
};
