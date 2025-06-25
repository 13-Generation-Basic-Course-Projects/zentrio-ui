///service/board.service.js
"use server";
import { boardRouteGroup } from "@/routes/boardRoute";
import { checklistRouteGroup } from "@/routes/checklistRoute";
import { ganttRouteGroup } from "@/routes/ganttRoute";
import { taskRouteGroup } from "@/routes/taskRoute";
import { workspaceRouteGroup } from "@/routes/workspaceRoute";

/*
 * getTaskByBoardIdAndGanttBarIdService in side board feature or stage
 */
export const getTaskByBoardIdAndGanttBarIdService = async ({
  boardId,
  ganttbarId,
  token,
}) => {
  try {
    //console.log("from service ", token);
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
    //console.log("📥 Backend responded with:", data);

    return data;
  } catch (error) {
    throw error;
  }
};

/*
 * getCheckListByTaskId in side board feature or stage
 */
export const getCheckListByTaskIdService = async ({ taskId, token }) => {
  try {
    //console.log("from service ", token);
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

    return data;
  } catch (error) {
    throw error;
  }
};

/*
 * get all  memeber  specific boardId
 */
export const getMemberByBoardIdService = async ({ boardId, token }) => {
  try {
    //console.log("from service ", token);
    const url = boardRouteGroup.getMemberByBoardId(boardId);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    //console.log("📥 Backend responded with:", data);

    return data;
  } catch (error) {
    throw error;
  }
};
/*
 * invite member to baord
 */
export const inviteMemberToBoardService = async ({
  boardId,
  workspaceId,
  data,
  token,
}) => {
  try {
    console.log("from service", { boardId, data, token });
    const url = boardRouteGroup.inviteUserToBoard(boardId, workspaceId);
    const res = await fetch(url, {
      method: "POST", // Changed to POST to send invite data
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data), // Send the array of invites
    });
    const result = await res.json();
    console.log("📥 Backend responded with invite member modal:", result);

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
    const response = await fetch(
      boardRouteGroup.getCommentByCheckListId(checkListId),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Service raw response:", data); // Log for debugging
    return data; // Return the full response { success, payload, message, status, timestamp }
  } catch (error) {
    console.error("Error in getCommentByCheckListIdService:", error);
    throw error; // Rethrow to be handled by the action
  }
};
/*
 * get all ganttchart
 */
export const getAllGanttBarByGanttChartIDService = async ({
  ganttChartId,
  token,
}) => {
  try {
    //console.log("from service ", token);
    const url = ganttRouteGroup.getAllGanttBarByGanttChartID(ganttChartId);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);

    return data;
  } catch (error) {
    throw error;
  }
};

/*
 * create task by boardId and Gantt chart id
 */

/*

export const createTaskByBoardIdAndGanttChartIdService = async ({
  boardId,
  ganttChartId,
  data,
  token,
}) => {
  try {
    const payload = {
      title: data.title,
      description: data.description,
      startedAt: data.startedAt,
      finishedAt: data.finishedAt,
      boardId,
      ganttBarId: data.ganttBarId,
    };
    console.log("Service payload:", payload);
    console.log("Service params:", { boardId, ganttChartId, token });
    const url = boardRouteGroup.createTaskByBoardIdAndGanttBarId(
      boardId,
      ganttChartId
    );
    console.log("Request URL:", url);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errorMessage = `Failed to create task: ${res.statusText} (${res.status})`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        console.error("Failed to parse error response:", jsonError);
      }
      throw new Error(errorMessage);
    }

    const result = await res.json();
    console.log("📥 Backend responded with loggg:", result);

    return result;
  } catch (error) {
    console.error("Create task service error:", error.message);
    throw error;
  }
};

*/

/**
 * fix bug
 */

export const createTaskByBoardIdAndGanttChartIdService = async ({
  boardId,
  ganttChartId,
  data,
  token,
}) => {
  try {
    const payload = {
      title: data.title,
      description: data.description,
      startedAt: data.startedAt,
      finishedAt: data.finishedAt,
      boardId,
      ganttBarId: data.ganttBarId,
      leaderId: data.leaderId || null, // Include leaderId
    };
    console.log("Service payload:", payload);
    console.log("Service params:", { boardId, ganttChartId, token });
    const url = boardRouteGroup.createTaskByBoardIdAndGanttBarId(
      boardId,
      ganttChartId
    );
    console.log("Request URL:", url);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errorMessage = `Failed to create task: ${res.statusText} (${res.status})`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        console.error("Failed to parse error response:", jsonError);
      }
      throw new Error(errorMessage);
    }

    const result = await res.json();
    console.log("Backend responded with:", JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error("Create task service error:", error.message);
    throw error;
  }
};

/*
 * create gantt chart by board id
 */
export const createGanttChartByBoardIdService = async ({
  boardId,
  data,
  token,
}) => {
  try {
    console.log("from service", { boardId, data, token });
    const url = ganttRouteGroup.createGanttChart();
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: data.title, boardId: boardId }),
    });
    const result = await res.json();
    console.log("📥 Backend responded with gantbar:", result);

    return data;
  } catch (error) {
    throw error;
  }
};

/*
 * create gantt chart by board id
 */
export const createCheckListService = async ({ taskId, data, token }) => {
  try {
    console.log("from service", { taskId, data, token });
    const url = boardRouteGroup.createCheckListBytaskId();
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        startedAt: data.startedAt,
        finishedAt: data.finishedAt,
        taskId: taskId,
      }),
    });
    const result = await res.json();
    console.log("📥 Backend responded with checklist:", result);

    return data;
  } catch (error) {
    throw error;
  }
};
/*
 * get board by board id
 */
export const getBoardByBoardIdService = async ({ boardId, token }) => {
  try {
    console.log("token bos board ", token);
    const url = boardRouteGroup.getBoardById(boardId);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("📥 Backend responded with board:", data);

    return data;
  } catch (error) {
    throw error;
  }
};
/*
 * create comment
 */
export const postCommentByCheckListIdService = async ({
  checklistId,
  data,
  token,
}) => {
  try {
    console.log("from service", { checklistId, data, token });
    const url = boardRouteGroup.postCommentByCheckListId();
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: data.content,
        checklistId: data.checklistId,
      }),
    });
    const result = await res.json();
    // console.log("📥 Backend responded with content:", result);

    return data;
  } catch (error) {
    throw error;
  }
};
/*
 * edit comment
 */
export const editCommmentService = async ({ data, token }) => {
  try {
    console.log("service edit", data.content, data.checklistId);
    const url = boardRouteGroup.updateCommentById(data.commentId);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: data.content,
        checklistId: data.checklistId,
      }),
    });
    const result = await res.json();
    console.log("📥 Backend responded with comment reply:", result);

    return data;
  } catch (error) {
    throw error;
  }
};
/*
 * assign leader
 */
export const assignUserRoleLeadeerToBoardService = async ({
  taskId,
  assignId,
  token,
}) => {
  console.log("from service", { taskId, assignId, token });
  const url = boardRouteGroup.assignUserRoleLeaderToBoard(taskId, assignId);
  console.log(url);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  console.log("📥 Backend responded with ld:", result);

  return result;
};
/*
 * get all  getTaskByBoardId
 */
export const getTaskByBoardIdService = async ({ boardId, token }) => {
  try {
    //console.log("from service ", token);
    const url = boardRouteGroup.getTaskByBoardId(boardId);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    //console.log("📥 Backend responded with boardtask:", data);

    return data;
  } catch (error) {
    throw error;
  }
};

/*
 * delete task
 */
export const deleteTaskService = async (taskId, boardId, ganttbarId, token) => {
  try {
    //console.log("from service ", token);
    const url = boardRouteGroup.deleteTask(taskId, boardId, ganttbarId);
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("📥 Backend responded with delete:", data);

    return data;
  } catch (error) {
    throw error;
  }
};
/*
 * assign member in checklist
 */
export const assignMemberInChecklistService = async ({
  checklistId,
  taskId,
  assignBy,
  assignTo,
  token,
}) => {
  try {
    console.log("from service", {
      checklistId,
      taskId,
      assignBy,
      assignTo,
      token,
    });
    const url = boardRouteGroup.assignMemberInChecklist(
      checklistId,
      taskId,
      assignBy,
      assignTo
    );
    console.log(url);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    console.log("📥 Backend responded with ld:", result);

    return result;
  } catch (error) {
    throw error;
  }
};
/*
 * assign member in checklist
 */
export const moveTaskOrderService = async (boardId, newId, oldId, token) => {
  try {
    console.log("from service", {
      boardId,
      newId,
      oldId,
      token,
    });
    const url = boardRouteGroup.moveTaskOrder(boardId, newId, oldId);
    console.log(url);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    console.log("📥 Backend responded with moveld:", result);

    return result;
  } catch (error) {
    throw error;
  }
};

/*
 * assignMemberToChecklistService
 */
export const assignMemberToChecklistService = async (
  checklistId,
  taskId,
  assignedBy,
  assignedTo,
  token
) => {
  try {
    console.log("from service", {
      checklistId,
      taskId,
      assignedBy,
      assignedTo,
      token,
    });
    const url = boardRouteGroup.assignMemberToChecklist(
      checklistId,
      taskId,
      assignedBy,
      assignedTo
    );
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    console.log("📥 Backend responded with checklist:", result);

    return result;
  } catch (error) {
    throw error;
  }
};

/*
 * cheng status checklist
 */
export const chageStatusCheckListService = async (checklistId, token, type) => {
  try {
    //console.log("from service ", token);
    const url = boardRouteGroup.chageStatusCheckListWhenHaveTeamLeader(
      checklistId,
      type
    );
    console.log(url);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with change status checklist:", data);

    return data;
  } catch (error) {
    throw error;
  }
};

/*
 * cheng status task
 */
export const changeStatusTaskService = async (taskId, token, type) => {
  try {
    //console.log("from service ", token);
    const url = boardRouteGroup.changeStatusTask(taskId, type);
    console.log(url);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with change status:", data);

    return data;
  } catch (error) {
    throw error;
  }
};

/*
 * cheng  task to underreview
 */
export const changeStageToUnderReviewService = async (taskId, token, stage) => {
  try {
    //console.log("from service ", token);
    const url = boardRouteGroup.changeStagToUnderReview(taskId, stage);
    console.log(url);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with change status completed:", data);

    return data;
  } catch (error) {
    throw error;
  }
};

export const FeedBackService = async (taskId, token, comment) => {
  try {
    console.log("from service of ", taskId);
    console.log("from service of ", comment.comment);
    const url = boardRouteGroup.changeStageToInProgress();
    console.log(url);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: comment.comment,
        taskId: taskId,
      }),
    });
    const data = await res.json();
    console.log("📥 Backend responded with change feedback:", data);

    return data;
  } catch (error) {
    throw error;
  }
};
/*
 * delete member
 */
export const deleteMemberService = async (boardId, userId, token) => {
  try {
    console.log("from service ", boardId, userId);
    const url = boardRouteGroup.deleteMemberByBoardId(boardId, userId);
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with delete user:", data);

    return data;
  } catch (error) {
    throw error;
  }
};

/*
 * checkEmail
 */
export const checkEmailService = async (email) => {
  try {
    console.log("from service ", boardId, userId);
    const url = boardRouteGroup.deleteMemberByBoardId(boardId, userId);
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with delete user:", data);

    return data;
  } catch (error) {
    throw error;
  }
};
/*
 * checkEmail
 */
export const checkEmailForClearService = async (email) => {
  try {
    console.log("from service ", email);
    const url = boardRouteGroup.checkEmailForClearToken(email);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with check user:", data);

    return data;
  } catch (error) {
    throw error;
  }
};

/*
 * new add
 * Update task by Id with board id and gantt bar id
 */
export const updateTaskByIdService = async ({
  taskId,
  title,
  description,
  startedAt,
  finishedAt,
  boardId,
  ganttBarId,
  token,
}) => {
  console.log(" taskId in updateTask service: ", taskId);
  console.log("Data get for updateTaskByIdService:", {
    taskId,
    title,
    description,
    startedAt,
    finishedAt,
    boardId,
    ganttBarId,
  });

  const url = taskRouteGroup.updateTaskById(taskId);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      startedAt,
      finishedAt,
      boardId,
      ganttBarId,
    }),
  });
  const data = await response.json();
  console.log("err update", data);
  return data;
};

/*
 * new add
 * Delete checklist by specific tasks ID
 */
export const deleteCheckListByTaskIdService = async ({
  checkListId,
  taskId,
  token,
}) => {
  console.log("Token in delete service task id delete: ", token);

  const url = checklistRouteGroup.deleteCheckListByTaskId(checkListId, taskId);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || `Failed to delete checklist: ${response.status}`
    );
  }

  return response.json(); // Note: DELETE typically doesn't return a body, so this may not be needed
};

/*
 * new add
 * update checklist by specific tasks ID and checklist id
 */
export const updateCheckListByIdAndTaskIdService = async (
  checklistId,
  title,
  description,
  startedAt,
  finishedAt,
  taskId,
  token
) => {
  console.log("Token in update checklist service: ", token);

  console.log("Request Body in update service: ", {
    checklistId,
    title,
    description,
    startedAt,
    finishedAt,
    taskId,
  });

  const url = checklistRouteGroup.updateCheckListByIdAndTaskId(checklistId);
  console.log("Request URL", url);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      startedAt,
      finishedAt,
      taskId,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error("Backend error response update checklist: ", error);
    if (response.status === 401 || response.status === 403) {
      throw new Error("Authentication required or token is invalid");
    }
    throw new Error(
      error.message || `Failed to update checklist: ${response.status}`
    );
  }

  return response.status === 204 ? { success: true } : response.json();
};

export const uploadImageBoardService = async ({ boardId, image, token }) => {
  const url = boardRouteGroup.uploadImageBoard(boardId);
  console.log("url", url, "image", image, "token", token);

  const formData = new FormData();
  formData.append("file", image);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
      // Do NOT set Content-Type, browser sets it automatically for FormData
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Upload failed: ${errorData.message || res.statusText}`);
  }

  const data = await res.json();
  return data;
};

/* add new
 *  delete comment in checklist
 */
export const deleteCommentBycmtIdService = async ({ commentId, token }) => {
  console.log("delete service comment id delete: ", commentId);

  const url = checklistRouteGroup.deleteCommentBycmtId(commentId);
  console.log("Delete url : ", url);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || `Failed to delete comment: ${response.status}`
    );
  }

  return response.json();
};

/* //add new
 * task by task id
 */
export const getTaskByTaskIdService = async ({ taskId, token }) => {
  console.log("taskId getTaskByTaskIdService: ", taskId);

  const url = taskRouteGroup.getTaskByTaskId(taskId);
  console.log("get task url : ", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || `Failed to get task by task id: ${response.status}`
    );
  }

  return response.json();
};

/**
 * guest user
 */
export const getGuestUserDisplayKanbanService = async ({
  workspaceId,
  boardId,
}) => {
  const url = boardRouteGroup.getGuestUserDisplayKanban(workspaceId, boardId);
  console.log("get task url : ", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("data from guest", data);
  return data;
};

/**
 * guest user
 */ export const updateGanttBarByGanttBarIdService = async (
  ganttbarId,
  data,
  token
) => {
  const url = ganttRouteGroup.updateGanttBar(ganttbarId);
  console.log("get task url : ", url);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      body: JSON.stringify(data),
    },
  });

  console.log("data from guest", data);
  return response.json();
};
//add new upload cover checklist
export const uploadCoverChecklistService = async ({
  checklistId,
  file,
  token,
}) => {
  console.log("checklistId uploadCoverChecklistService: ", checklistId);

  const url = checklistRouteGroup.uploadCoverChecklist(checklistId);
  console.log("upload cover url: ", url);

  // Create FormData object
  const formData = new FormData();
  formData.append("file", file);

  console.log("File details:", {
    name: file.name,
    size: file.size,
    type: file.type,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
      body: formData,
    });

    console.log("Upload response status:", response.status);

    if (!response.ok) {
      let errorMessage;
      try {
        const error = await response.json();
        errorMessage =
          error.message ||
          error.error ||
          `Upload failed with status ${response.status}`;
      } catch (parseError) {
        errorMessage =
          response.statusText || `Upload failed with status ${response.status}`;
      }

      console.error("Upload error:", errorMessage);
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("Upload successful:", result);
    return result;
  } catch (error) {
    console.error("Upload cover error:", error);
  }
};

/**
 *  leave the board
 */

/*
 * delete task
 */
export const leaveTheBoardService = async (boardId, token) => {
  try {
    //console.log("from service ", token);
    const url = boardRouteGroup.leaveTheBoard(boardId);
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with leave the baord", data);

    return data;
  } catch (error) {
    throw error;
  }
};
