/* service/workspace.service.js */
"use server";
import { workspaceRoute } from "@/routes/workspaceRoute";

/*
 *for create workspace -> createWorkspace: `${apiConfig.baseUrl}/api/v1/workspaces`,
 */
export const createWorkspace = async (title, description, yourToken) => {
  try {
    const url = workspaceRoute.createWorkspace;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Failed to create workspace:", error.message);
    throw error;
  }
};

/*
 *for Get all workspaces -> getAllWorkspaces: `${apiConfig.baseUrl}/api/v1/workspaces`,
 */
export const getAllWorkspaces = async (yourToken) => {
  try {
    const url = workspaceRoute.getAllWorkspaces();

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Failed to get all workspaces:", error.message);
    throw error;
  }
};

/*
 *for  Get workspace by id -> getWorkspaceById: (id) => `${apiConfig.baseUrl}/api/v1/workspaces/${id}`,
 */
export const getWorkspaceById = async (id, yourToken) => {
  try {
    const url = workspaceRoute.getWorkspaceById(id);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Failed to get workspace by id:", error.message);
    throw error;
  }
};

/*
 *for  Delete workspace by id -> deleteWorkspaceById: (id) => `${apiConfig.baseUrl}/api/v1/workspaces/${id}`,
 */
export const deleteWorkspaceById = async (id, yourToken) => {
  try {
    const url = workspaceRoute.deleteWorkspaceById(id);

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Failed to delete workspace by id:", error.message);
    throw error;
  }
};

/*
 * for Update workspace by id -> updateWorkspaceById: (id) => `${apiConfig.baseUrl}/api/v1/workspaces/${id}`,
 */
export const updateWorkspaceById = async (
  id,
  title,
  description,
  yourToken
) => {
  try {
    const url = workspaceRoute.updateWorkspaceById(id);

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Failed to update workspace by id:", error.message);
    throw error;
  }
};

/*
 *  for Get all workspaces by user -> getWorkspacesByUser: `${apiConfig.baseUrl}/api/v1/workspaces/users`,
 */
export const getWorkspacesByUser = async (users, yourToken) => {
  try {
    const url = workspaceRoute.getWorkspacesByUser;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Failed to get workspace by users:", error.message);
    throw error;
  }
};

/*
 * for Get workspaces by workspace id for user -> getWorkspacesByUser: `${apiConfig.baseUrl}/api/v1/workspaces/users`,
 */
export const getWorkspacesByUserId = async (userId, yourToken) => {
  try {
    const url = workspaceRoute.getWorkspacesByUserId(userId);

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to get workspace by user ID:", error.message);
    throw error;
  }
};

/*
 * for Get workspaces by title -> getWorkspacesByTitle: (title) =>
 *  `${apiConfig.baseUrl}/api/v1/workspaces/title/${title}`,
 */

export const getWorkspacesByTitle = async (title, yourToken) => {
  try {
    const url = workspaceRoute.getWorkspacesByTitle(title);

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to get workspace by user ID:", error.message);
    throw error;
  }
};
