///service/board.service.js
"use server";
import { boardRoute } from "@/routes/boardRoute";

/*
 * 1. for Get board by ID -> getBoardById: (id) => `${apiConfig.baseUrl}/boards/${id}`,
 */

export const getBoardByIdService = async (id, yourToken) => {
  try {
    const url = boardRoute.getBoardById(id);

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
    console.error("❌ Failed to get board by ID:", error.message);
    throw error;
  }
};

/*
 * 2. Update board by board Id and workspace id
 */
export const updateBoardByIdService = async (
  id,
  title,
  description,
  cover,
  workspaceId,
  yourToken
) => {
  try {
    const url = boardRoute.updateBoardById(id);

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify({ title, description, cover, workspaceId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to update board:", error.message);
    throw error;
  }
};

/*
 * 3. Updated favourite of board by id
 */
export const updateFavBoardByIdService = async (id, isFavourite, yourToken) => {
  try {
    const url = boardRoute.updateFavBoardById(id);

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify({ id, isFavourite }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to update favourite board:", error.message);
    throw error;
  }
};

/*
 * 4. Get all boards
 */
export const getAllBoardsService = async (yourToken) => {
  try {
    const url = boardRoute.updateFavBoardById();

    const res = await fetch(url, {
      method: "GET",
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
    console.error("❌ Failed to get all boards:", error.message);
    throw error;
  }
};

/*
 * 5. Create new board by workspace id
 */
export const createBoardService = async (
  title,
  description,
  cover,
  workspaceId,
  yourToken
) => {
  try {
    const url = boardRoute.createBoard();

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify({ title, description, cover, workspaceId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to create board by workspace id :", error.message);
    throw error;
  }
};

/*
 * 6. Invite users to board
 */
export const inviteUserToBoardService = async (id, email, roleName, yourToken) => {
  try {
    const url = boardRoute.inviteUserToBoard(id);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
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
    console.error(
      "❌ Failed to invite any users to specific board :",
      error.message
    );
    throw error;
  }
};

/*
 * 7. Upload cover by board id
 */
export const uploadBoardCoverService = async (id, file, yourToken) => {
  try {
    const url = boardRoute.uploadBoardCover(id);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify({ id, file }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error(
      "❌ Failed to upload board cover by specific board id :",
      error.message
    );
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
  yourToken
) => {
  try {
    const validRoles = ["ROLE_LEADER", "ROLE_MEMBER", "ROLE_MANAGER"];
    if (!validRoles.includes(roleName)) {
      throw new Error(
        `Invalid roleName: must be one of ${validRoles.join(", ")}`
      );
    }

    const url = boardRoute.assignUserRole;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
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
    console.error("❌ Failed to assign user role to board:", error.message);
    throw error;
  }
};

/*
 * 9. Get board by id with current user id
 */
export const getBoardsByUserIdService = async (id, yourToken) => {
  try {
    const url = boardRoute.getBoardsByUserId(id);

    const res = await fetch(url, {
      method: "GET",
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
    console.error(
      "❌ Failed to get board by id with current user id :",
      error.message
    );
    throw error;
  }
};

/*
 * 10. Get board with members
 */
export const getBoardMembersService = async (userid, yourToken) => {
  try {
    const url = boardRoute.getBoardMembers(userid);

    const res = await fetch(url, {
      method: "GET",
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
    console.error("❌ Failed to get board with members:", error.message);
    throw error;
  }
};

/*
 * 11. Accept board invitation : acceptBoardInvite: (id) =>
     `${apiConfig.baseUrl}/boards/${id}/invitations/accept`,
 */
export const acceptBoardInviteService = async (id, email, roleName, yourToken) => {
  try {
    // Optional: validate roleName
    const validRoles = ["ROLE_LEADER", "ROLE_MEMBER"];
    if (!validRoles.includes(roleName)) {
      throw new Error(`Invalid roleName: ${roleName}`);
    }

    const url = boardRoute.acceptInviteBoardById(id);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify({ email, roleName }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to accept board invitation:", error.message);
    throw error;
  }
};

/*
 * 12. Get cover board by board id
 */
export const getBoardCoverService = async (id, filename, yourToken) => {
  try {
    const url = boardRoute.getBoardCover(id, filename);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch cover image: ${res.status}`);
    }

    return await res.blob(); // Return image blob
  } catch (error) {
    console.error("❌ Failed to get board cover:", error.message);
    throw error;
  }
};


/*
 * 13. Get all boards by workspace id
 */
export const getBoardsByWorkspaceIdService = async (workspaceId, yourToken) => {
  try {
    const url = boardRoute.getBoardsByWorkspaceId(workspaceId);

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get boards: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to get boards by workspace ID:", error.message);
    throw error;
  }
};


/*
 * 14. Get board by title
 */
export const getBoardByTitleService = async (title, yourToken) => {
  try {
    const url = boardRoute.getBoardByTitle(title);

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get board by title: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to get board by title:", error.message);
    throw error;
  }
};


/*
 * 15. Get all board for current user
 */
export const getBoardsForCurrentUserService = async (yourToken) => {
  try {
    const url = boardRoute.getBoardsForCurrentUser;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get current user's boards: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to get boards for current user:", error.message);
    throw error;
  }
};


/*
 * 16. Deleted board by id and workspace id
 */
export const deleteBoardService = async (id, workspaceId, yourToken) => {
  try {
    const url = boardRoute.deleteBoard(id, workspaceId);

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete board: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to delete board:", error.message);
    throw error;
  }
};
