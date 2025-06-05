///service/board.service.js
"use server";
import { boardRouteGroup } from "@/routes/boardRoute";
import { checklistRouteGroup } from "@/routes/checklistRoute";

/*
 * getTaskByBoardIdAndGanttBarIdService in side board feature or stage
 */
export const getTaskByBoardIdAndGanttBarIdService = async ({
  boardId,
  ganttbarId,
  token,
}) => {
  try {
    console.log("from service ", token);
    const url = boardRouteGroup.getTaskByBoardAndGanttBarId(
      boardId,
      ganttbarId
    );
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error;
  }
};

/*
 * getCheckListByTaskId in side board feature or stage
 */
export const getCheckListByTaskIdService = async ({ taskId, token }) => {
  try {
    console.log("from service ", token);
    const url = checklistRouteGroup.getCheckListByTaskId(taskId);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error;
  }
};

/*
 * get all  memeber  specific boardId
 */
export const getMemberByBoardIdService = async ({ boardId, token }) => {
  try {
    console.log("from service ", token);
    const url = boardRouteGroup.getMemberByBoardId(boardId);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error;
  }
};
/*
 * invite member to baord
 */
export const inviteMemberToBoardService = async ({ boardId, data, token }) => {
  try {
    console.log("from service", { boardId, data, token });
    const url = boardRouteGroup.inviteUserToBoard(boardId);
    const res = await fetch(url, {
      method: "POST", // Changed to POST to send invite data
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data), // Send the array of invites
    });
    const result = await res.json();
    console.log("📥 Backend responded with:", result);

    // Ensure the response has a consistent structure
    return {
      success: res.ok,
      data: result.data || null,
      error: res.ok ? null : result.error || "Failed to send invites",
    };
  } catch (error) {
    console.error("Invite service error:", error.message);
    return { success: false, error: error.message };
  }
};

/*
 * get comment by checklist
 */
export const getCommentByCheckListIdService = async ({
  checkListId,
  token,
}) => {
  try {
    const url = boardRouteGroup.getCommentByCheckListId(checkListId);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    console.log("📥 Backend responded with:", result);

    // Ensure the response has a consistent structure
    return {
      success: res.ok,
      data: result.data || null,
      error: res.ok ? null : result.error || "Failed to send invites",
    };
  } catch (error) {
    console.error("Invite service error:", error.message);
    return { success: false, error: error.message };
  }
};
