/* service/workspace.service.js */
"use server";
import { boardRouteGroup, workspaceRouteGroup } from "@/routes/workspaceRoute";

/*
 *1. for service create workspace  -> createWorkspace: `${apiConfig.baseUrl}/api/v1/workspaces`,
 */
export const createWorkspaceService = async ({ title, description, token }) => {
  try {
    const url = workspaceRouteGroup.createWorkspace();
    const res = await fetch(url, {
      next: {
        tags: ["workspaces"], // ✅ Will be revalidated by revalidateTag()
      },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    //console.error("❌ Failed to create workspace:", error.message);
    throw error;
  }
};

/*
 *2. for service Get all workspaces -> getAllWorkspaces: `${apiConfig.baseUrl}/api/v1/workspaces`,
 */
export const getAllWorkspacesService = async ({ token }) => {
  const url = workspaceRouteGroup.getAllWorkspaces();

  const res = await fetch(url, {
    next: {
      tags: ["workspaces"], // ✅ Will be revalidated by revalidateTag()
    },
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
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
};

/*
 *3. for service Get workspace by id -> getWorkspaceById: (id) => `${apiConfig.baseUrl}/api/v1/workspaces/${id}`,
 */
export const getWorkspaceByIdService = async (id, token) => {
  try {
    const url = workspaceRoute.getWorkspaceById(id);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    //console.error("❌ Failed to get workspace by id:", error.message);
    throw error;
  }
};

/*
 * 4. for service Delete workspace by id -> deleteWorkspaceById: (id) => `${apiConfig.baseUrl}/api/v1/workspaces/${id}`,
 */
export const deleteWorkspaceByIdService = async ({ id, token }) => {
  const url = workspaceRouteGroup.deleteWorkspaceById(id);
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["workspaces"] },
  });
  const data = await res.json();
  return data;
};

/*
 * 5. for service Update workspace by id -> updateWorkspaceById: (id) => `${apiConfig.baseUrl}/workspaces/${id}`,
 */
export const updateWorkspaceByIdService = async ({ id, bodyPayload, token }) => {
  const url = workspaceRouteGroup.updateWorkspaceById(id);
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyPayload),
    next: { tags: ["workspaces"] },
  });
  const data = await res.json();
  return data;
};

/*
 * 6. for service Get all workspaces by user -> getWorkspacesByUser: `${apiConfig.baseUrl}/api/v1/workspaces/users`,
 */
export const getWorkspacesByUserService = async ({ token }) => {
  try {
    const url = workspaceRouteGroup.getWorkspacesByUser();

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    //console.error("❌ Failed to get workspace by users:", error.message);
    throw error;
  }
};

/*
 * 7. for service Get workspaces by workspace id for user -> getWorkspacesByUser: `${apiConfig.baseUrl}/api/v1/workspaces/users`,
 */
export const getWorkspacesByUserIdService = async (userId, token) => {
  try {
    const url = workspaceRoute.getWorkspacesByUserId(userId);

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    //console.error("❌ Failed to get workspace by user ID:", error.message);
    throw error;
  }
};

/*
 * 8. for serivce Get workspaces by title -> getWorkspacesByTitle: (title) =>
 *  `${apiConfig.baseUrl}/api/v1/workspaces/title/${title}`,
 */

export const getWorkspacesByTitleService = async (title, token) => {
  try {
    const url = workspaceRouteGroup.getWorkspacesByTitle(title);

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    //console.error("❌ Failed to get workspace by user ID:", error.message);
    throw error;
  }
};

/* for create board in workspace */

/*
 * 1. for Get board by ID -> getBoardById: (id) => `${apiConfig.baseUrl}/boards/${id}`,
 */

export const getBoardByIdService = async ({ boardId, token }) => {
  try {
    const url = boardRouteGroup.getBoardById(boardId);

    const res = await fetch(url, {
      method: "GET", // explicitly set method
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["boards"],
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
    //console.error("❌ Failed to get board by ID:", error.message);
    throw error;
  }
};

/*
 * 2. Update board by board Id and workspace id
 */
export const updateBoardByIdService = async ({
  boardId,
  title,
  description,
  cover,
  workspaceId,
  token,
}) => {
  // //console.log("🔁 Sending update payload in service:", {
  //   title,
  //   description,
  //   cover,
  //   workspaceId,
  // });

  const url = boardRouteGroup.updateBoardById(boardId);

  const res = await fetch(url, {
    method: "PUT", // or PATCH depending on your API
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      cover,
      workspaceId,
    }),
    next: { tags: ["boards"] },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || `Request failed with status ${res.status}`
    );
  }

  return await res.json();
};

/*
 * 3. Updated favourite of board by id
 */
export const updateFavBoardByIdService = async ({
  boardId,
  isFavourite,
  token,
}) => {
  const url = `${boardRouteGroup.updateFavBoardById(
    boardId
  )}?isFavourite=${isFavourite}`;

  //console.log("🔐 Using token in service:", token);
  //console.log("🌐 Final request URL:", url);

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["boards"] },
    });

    // if (!res.ok) {
    //   const errorData = await res.json();
    //   throw new Error(
    //     errorData.message || `Request failed with status ${res.status}`
    //   );
    // }

    return await res.json();
  } catch (error) {
    //console.error("❌ Failed to update favourite board:", error.message);
    throw error;
  }
};

/*
 * 4. Get all boards
 */
export const getAllBoardsService = async ({ token }) => {
  try {
    const url = boardRouteGroup.getAllBoards();

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    //console.error("❌ Failed to get all boards:", error.message);
    throw error;
  }
};

/*
 * 5. Create new board by workspace id
 */
export const createBoardService = async ({
  title,
  description,
  cover,
  workspaceId,
  token,
}) => {
  try {
    const url = boardRouteGroup.createBoard();

    // Create FormData to handle file upload properly
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("workspaceId", workspaceId);

    if (cover) {
      formData.append("cover", cover);
    }
    //console.log("FormData contents in service:", formData);

    const res = await fetch(url, {
      next: {
        tags: ["workspaces"], // ✅ Will be revalidated by revalidateTag()
      },
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        cover,
        workspaceId,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    //console.error("❌ Failed to create board by workspace id :", error.message);
    throw error;
  }
};

/*
 * 6. Invite users to board
 */
export const inviteUserToBoardService = async (id, email, roleName, token) => {
  try {
    const url = boardRouteGroup.inviteUserToBoard(id);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, email, roleName }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    //console.error(
    //   "❌ Failed to invite any users to specific board :",
    // error.message
    //);
    throw error;
  }
};

/*
 * 7. Upload cover by board id
 */
export const uploadBoardCoverService = async ({ boardId, file, token }) => {
  try {
    const url = boardRouteGroup.uploadBoardCover(boardId);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ boardId, file }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    //console.error(
    //  "❌ Failed to upload board cover by specific board id :",
    // error.message
    //);
    throw error;
  }
};

/*
 * 8. Assigned users role to board
 */
export const assignUserRoleService = async (
  id,
  assigneeId,
  roleName,
  workspaceId,
  token
) => {
  try {
    const validRoles = ["ROLE_LEADER", "ROLE_MEMBER", "ROLE_MANAGER"];
    if (!validRoles.includes(roleName)) {
      throw new Error(
        `Invalid roleName: must be one of ${validRoles.join(", ")}`
      );
    }

    const url = boardRouteGroup.assignUserRole;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, assigneeId, roleName, workspaceId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    //console.error("❌ Failed to assign user role to board:", error.message);
    throw error;
  }
};

/*
 * 9. Get board by id with current user id
 */
export const getBoardsByUserIdService = async (id, token) => {
  try {
    const url = boardRouteGroup.getBoardsByUserId(id);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    //console.error(
    //  "❌ Failed to get board by id with current user id :",
    //error.message
    //);
    throw error;
  }
};

/*
 * 12. Get cover board by board id
 */
export const getBoardCoverService = async (id, filename, token) => {
  try {
    const url = boardRouteGroup.getBoardCover(id, filename);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch cover image: ${res.status}`);
    }

    return await res.blob(); // Return image blob
  } catch (error) {
    //console.error("❌ Failed to get board cover:", error.message);
    throw error;
  }
};

/*
 * 13. Get all boards by workspace id
 */
export const getBoardsByWorkspaceIdService = async ({ workspaceId, token }) => {
  if (!workspaceId) {
    throw new Error("Workspace ID is required.");
  }

  try {
    const url = boardRouteGroup.getBoardsByWorkspaceId(workspaceId);
    //console.log("🌐 Fetching boards from:", url);

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      // Optionally log status-specific messages
      //console.warn(`⚠️ Server responded with status ${res.status}`);
      return null; // 👈 Return null to indicate failure
    }

    return await res.json();
  } catch (error) {
    //console.error("❌ Failed to get boards by workspace ID:", error);
    return null; // 👈 Prevent undefined
  }
};

/*
 * 14. Get board by title
 */
export const getBoardByTitleService = async (title, token) => {
  try {
    const url = boardRouteGroup.getBoardByTitle(title);

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get board by title: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    //console.error("❌ Failed to get board by title:", error.message);
    throw error;
  }
};

/*
 * 15. Get all board for current user
 */
export const getBoardsForCurrentUserService = async (token) => {
  try {
    const url = boardRouteGroup.getBoardsForCurrentUser;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get current user's boards: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    //console.error("❌ Failed to get boards for current user:", error.message);
    throw error;
  }
};

/*
 * 16. Deleted board by id and workspace id
 */
export const deleteBoardService = async ({ id, workspaceId, token }) => {
  //console.log("WorkspaceId in delete board service: ", workspaceId);
  try {
    const url = boardRouteGroup.deleteBoard(id, workspaceId);

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["boards"] },
      // body: JSON.stringify({ id, workspaceId }),
    });

    // if (!res.ok) {
    //   throw new Error(`Failed to delete board: ${res.status}`);
    // }

    return await res.json();
  } catch (error) {
    //console.error("❌ Failed to delete board:", error.message);
    throw error;
  }
};
/*
 * get all  favorite
 */
export const getFavoriteBoardService = async (userId, token) => {
  //console.log("service id", userId);
  const url = boardRouteGroup.getFavoriteBoard(userId);
  try {
    //console.log(url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    //console.log("📥 Backend responded with favboard:", data);

    return data; // just return the data, don't redirect here
  } catch (error) {
    //console.error("bug", error.message);
    throw error;
  }
};

/*
 * get all  joinworkspace for baord
 */
export const getOtherWorkSpaceJoinedService = async (token) => {
  const url = workspaceRouteGroup.getOtherWorkSpaceJoined();
  try {
    //console.log(url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with other", data);

    return data; // just return the data, don't redirect here
  } catch (error) {
    //console.error("bug", error.message);
    throw error;
  }
};

/* new
 * get member by board id
 */

export const getMemberByBoardIdService = async ({ boardId, token }) => {
  const url = workspaceRouteGroup.getMemeberByBoardId(boardId);
  try {
    //console.log(url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    //console.log("📥 Backend responded with member by board id:", data);

    return data; // just return the data, don't redirect here
  } catch (error) {
    //console.error("bug", error.message);
    throw error;
  }
};
