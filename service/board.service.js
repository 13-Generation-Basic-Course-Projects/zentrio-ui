///service/board.service.js
"use server";
import { boardRouteGroup } from "@/routes/boardRoute";
import { checklistRouteGroup } from "@/routes/checklistRoute";
import { ganttRouteGroup } from "@/routes/ganttRoute";
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

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
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

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
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

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
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

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
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
    console.error("bug", error.message);
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
    console.error("bug", error.message);
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

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
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
    console.error("bug", error.message);
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
    console.error("bug", error.message);
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

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
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

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
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
    console.error("bug", error.message);
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
    console.error("bug", error.message);
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
    console.error("bug", error.message);
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

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
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

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
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
    console.log("📥 Backend responded with change status:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
    throw error;
  }
};

export const FeedBackService = async (taskId, token, comment) => {
  try {
    console.log("from service ", taskId, token, comment);
    const url = boardRouteGroup.changeStageToInProgress();
    console.log(url);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        body: JSON.stringify({
          comment: comment,
          taskId: taskId,
        }),
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with change status:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
    throw error;
  }
};
