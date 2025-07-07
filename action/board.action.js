"use server";
import { Token } from "@/constant/token";
import {
  assignMemberInChecklistService,
  assignMemberToChecklistService,
  assignUserRoleLeadeerNewToBoardService,
  assignUserRoleLeadeerToBoardService,
  chageStatusCheckListService,
  changeStageToUnderReviewService,
  changeStatusTaskService,
  checkEmailForClearService,
  createCheckListService,
  createGanttChartByBoardIdService,
  createTaskByBoardIdAndGanttChartIdService,
  deleteCheckListByTaskIdService,
  deleteCommentBycmtIdService,
  deleteMemberService,
  deleteTaskService,
  editCommmentService,
  FeedBackService,
  getAllGanttBarByGanttChartIDService,
  getBoardByBoardIdService,
  getCheckListByTaskIdService,
  getCommentByCheckListIdService,
  getFeedBackByTaskIdService,
  getGuestUserDisplayKanbanService,
  getMemberByBoardIdService,
  getTaskByBoardIdAndGanttBarIdService,
  getTaskByBoardIdService,
  getTaskByTaskIdService,
  inviteMemberToBoardService,
  leaveTheBoardService,
  moveTaskOrderService,
  postCommentByCheckListIdService,
  updateCheckListByIdAndTaskIdService,
  updateCheckListDateByIdAndTaskIdService,
  updateGanttBarByGanttBarIdService,
  updateTaskByIdService,
  uploadCoverChecklistService,
} from "@/service/board.service";
import { revalidatePath, revalidateTag } from "next/cache";
import { sendNotificationToUserIdAction } from "./notification.action";
import {
  sendNotificationToSpecificArrayIdService,
  sendNotificationToUserIdService,
} from "@/service/notification.service";
import { getBoardMemberAction } from "./member.action";

console.log("test actions must create folders");
/*
 * getTaskbyBoardId and GanttbarId
 */
export const getTaskByBoardIdAndGanttBarIdAction = async ({
  boardId,
  ganttbarId,
}) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getTaskByBoardIdAndGanttBarIdService({
    boardId,
    ganttbarId,
    token,
  });
  return result;
};

/*
 * getChecklist by TaskId
 */
export const getCheckListByTaskIdAction = async ({ taskId }) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const result = await getCheckListByTaskIdService({
    taskId,
    token,
  });
  console.log("Result in getCheckListByTaskIdAction: ", result);
  return result;
};

/*
 * get all  memeber  specific boardId
 */
export const getMemberByBoardIdAction = async ({ boardId }) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getMemberByBoardIdService({
    boardId,
    token,
  });
  return result;
};

/*
 * get all  memeber  specific boardId
 */
export const inviteMemberToBoardAction = async ({
  boardId,
  workspaceId,
  data,
}) => {
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    const result = await inviteMemberToBoardService({
      boardId,
      workspaceId,
      data,
      token,
    });

    return result; // { success: boolean, data?: any, error?: string }
  } catch (error) {
    console.error("Invite action error:", error.message);
    return { success: false, error: error.message };
  }
};
/*
 * get all  comment by CheckList Id
 */
export const getCommentByCheckListIdAction = async (checklistId) => {
  const userToken = await Token();
  const token = userToken.Credential;


  try {
    const result = await getCommentByCheckListIdService({
      checkListId: checklistId,
      token,
    });

    console.log("Raw service response:", result); // Log raw response

    return {
      success: result.success,
      data: result.payload || result.data || [], // Ensure payload is prioritized
      error: result.error || null,
      message: result.message,
    };
  } catch (error) {
    console.error("Error in getCommentByCheckListIdAction:", {
      checklistId,
      error: error.message,
      response: error.response?.data,
    });
    return {
      success: false,
      data: [],
      error: error.message || "Failed to fetch comments",
    };
  }
};
/*
 * get all  gannt chart
 */
export const getAllGanttBarByGanttChartIDAction = async ({ ganttChartId }) => {
  const userToken = await Token();
  const token = userToken.Credential;

  console.log("gantbar by gant chart ", ganttChartId);
  const result = await getAllGanttBarByGanttChartIDService({
    ganttChartId,
    token,
  });
  return result;
};
/*
 * createTask boardid and gantchartid
 */
// action

/*



export const createTaskByBoardIdAndGanttChartIdAction = async (
  data,
  boardId,
  ganttChartId
) => {
  try {
    const userToken = await Token();
    const token = userToken?.Credential;
    if (!token) {
      throw new Error("No authentication token found");
    }
    console.log("Token retrieved:", token);
    console.log("Data create form:", data);
    const result = await createTaskByBoardIdAndGanttChartIdService({
      boardId,
      ganttChartId,
      data,
      token,
    });
    revalidateTag("tasks");
    revalidateTag("gantt");
    return { success: true, data: result };
  } catch (error) {
    console.error("Create task action error:", error.message);
    return { success: false, error: error.message };
  }
};

*/

/*
 * create gantt chart by board id
 */
export const createGanttChartByBoardIdAction = async (data, boardId) => {
  try {
    const userToken = await Token();
    const token = userToken?.Credential;
    if (!token) {
      throw new Error("No authentication token found");
    }
    console.log("boardId:", boardId);
    //console.log("data create form", data);
    const result = await createGanttChartByBoardIdService({
      boardId,
      data,
      token,
    });
    revalidateTag("gantt");
    return { success: true, data: result };
  } catch (error) {
    console.error("Create task action error:", error.message);
    return { success: false, error: error.message };
  }
};

/*
 * create
 */
export const createCheckListAction = async (taskId, data) => {
  try {
    const userToken = await Token();
    const token = userToken?.Credential;
    if (!token) {
      throw new Error("No authentication token found");
    }
    //console.log("data create form", data);
    const result = await createCheckListService({
      taskId,
      data,
      token,
    });
    revalidateTag("checklists");
    return result;
  } catch (error) {
    console.log("Create checklist action error:", error.message);
    return { success: false, error: error.message };
  }
};

/*
 * getboard
 */
export const getBoardByBoardIdAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  try {
    const result = await getBoardByBoardIdService({
      boardId,
      token,
    });

    return result;
  } catch (error) {
    console.log("error:", error.message);
    return { success: false, error: error.message };
  }
};
/*
 * create comment
 */
export const postCommentByCheckListIdAction = async (data, checklistId) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  //console.log("data create form", data);
  try {
    const result = await postCommentByCheckListIdService({
      checklistId,
      data,
      token,
    });
    revalidateTag("comments");
    return { success: true, data: result };
  } catch (error) {
    console.error("Create task action error:", error.message);
    return { success: false, error: error.message };
  }
};
/*
 * edit comment
 */
export const editCommmentAction = async (data) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  //console.log("data create form", data);
  try {
    const result = await editCommmentService({
      data,
      token,
    });
    revalidateTag("comments");
    return { success: true, data: result };
  } catch (error) {
    console.error("put comment action error:", error.message);
    return { success: false, error: error.message };
  }
};
/*
 * assign leader
 */

/*

export const assignLeaderAction = async (taskid, assignId) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  //console.log("data create form", taskid, assignId);

  const result = await assignUserRoleLeadeerToBoardService({
    taskid,
    assignId,
    token,
  });
  revalidatePath("/assignLd");
  return result;
};

*/

/*
 * get task baord id
 */
export const getTaskByBoardIdAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await getTaskByBoardIdService({
    boardId,
    token,
  });
  return result;
};
/*
 * delete task
 */
export const deleteTaskAction = async (taskId, boardId, ganttBarId) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await deleteTaskService(taskId, boardId, ganttBarId, token);
  revalidateTag("tasks");
  revalidateTag("gantt");
  // console.log("📥 Backend responded with delete action", result);

  return result;
};

/*
 * assign member in checklist
 */
export const assignMemberInChecklistAction = async (
  taskId,
  boardId,
  ganttBarId
) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await assignMemberInChecklistService(
    taskId,
    boardId,
    ganttBarId,
    token
  );
  revalidateTag("tasks");
  revalidateTag("members");
  // console.log("📥 Backend responded with delete action", result);

  return result;
};

/*
 *move the task
 */
export const moveTaskOrderAction = async (boardId, newId, oldId) => {
  try {
    const userToken = await Token();
    const token = userToken?.Credential;
    if (!token) {
      throw new Error("No authentication token found");
    }

    const result = await moveTaskOrderService({
      boardId,
      newId,
      oldId,
      token,
    });
    revalidateTag("tasks");
    return { success: true, data: result };
  } catch (error) {
    console.error("Move task action error:", error.message);
    return { success: false, error: error.message };
  }
};

/* fixed bug
 * move the task
 */

export const createTaskByBoardIdAndGanttChartIdAction = async (
  data,
  boardId,
  ganttChartId
) => {
  try {
    const userToken = await Token();
    const token = userToken?.Credential;
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Create the task
    const result = await createTaskByBoardIdAndGanttChartIdService({
      boardId,
      ganttChartId,
      data,
      token,
    });

    console.log("DDDDDDdddatatahhhhhhhhhhhhhhhhh", data);

    // Extract taskId
    const taskId = result.payload?.taskId;
    if (!taskId || typeof taskId !== "string") {
      throw new Error("Task ID is missing or invalid in the response");
    }

    // Send notification if leaderId exists
    if (data.leaderId) {
      const notificationData = {
        userIds: [data.leaderId],
        title: `Task "${data.title}" Assignment`,
        message: `You have been assigned as the leader for the task "${
          data.title
        }" starting on ${new Date(data.startedAt).toLocaleString()}`,
        type: "leader_assignment",
        boardId: boardId,
        taskId: taskId,
        projectManagerId: data.createdBy, // Use createdBy as projectManagerId
        // checklistId omitted as it's optional
      };

      try {
        const notiResult = await sendNotificationToSpecificArrayIdService(
          notificationData,
          token
        );
        console.log("Notification result:", notiResult);
      } catch (error) {
        console.warn("Failed to send notification:", error.message);
        // Continue execution as notification failure is non-critical
      }
    }

    revalidateTag("tasks");
    revalidateTag("gantt");
    return { success: true, data: result };
  } catch (error) {
    console.error("Create task action error:", error.message);
    return { success: false, error: error.message };
  }
};

export const assignLeaderAction = async (taskId, assignId) => {
  try {
    const userToken = await Token();
    const token = userToken?.Credential;

    // leader token not pm token ??

    console.log("token in assignLeaderAction:", token);
    if (!token) {
      throw new Error("No authentication token found");
    }

    const result = await assignUserRoleLeadeerToBoardService({
      taskId,
      assignId,
      token,
    });

    console.log("Assign leader result:", JSON.stringify(result, null, 2));

    // Send notification
    if (result.payload?.boardId) {
      const notificationData = {
        userIds: [assignId],
        title: "Leader Assignment",
        message: `You have been assigned as the leader for task ID ${taskId}`,
        type: "leader_assignment",
        boardId: result.payload.boardId,
        taskId: taskId,
        taskId: result.payload.createdBy,
      };

      try {
        const notiResult = await sendNotificationToSpecificArrayIdService(
          notificationData,
          token
        );
        console.log("Notification result:", notiResult);
      } catch (error) {
        console.warn("Failed to send notification:", error.message);
      }
    }

    revalidateTag("tasks");
    revalidateTag("members");
    return { success: true, data: result };
  } catch (error) {
    console.error("Assign leader action error:", error.message);
    return { success: false, error: error.message };
  }
};
export const declineLeaderAction = async (taskId, assignId) => {
  try {
    const userToken = await Token();
    const token = userToken?.Credential;
    if (!token) {
      throw new Error("No authentication token found");
    }

    console.log("Declining leader with:", {
      taskId,
      assignId,
      token: token.substring(0, 10) + "...",
    });

    const result = await declineUserRoleLeaderService({
      taskId,
      assignId,
      token,
    });

    console.log("Decline leader result:", JSON.stringify(result, null, 2));
    revalidateTag("tasks");
    revalidateTag("members");
    return { success: true, data: result };
  } catch (error) {
    console.error("Decline leader action error:", error.message, error.stack);
    return { success: false, error: error.message };
  }
};

// Placeholder decline service (replace with actual endpoint)
const declineUserRoleLeaderService = async ({ taskId, assignId, token }) => {
  const url = `/api/v1/tasks/${taskId}/decline-leader/${assignId}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || `Failed to decline leader role: ${res.status}`
    );
  }

  return await res.json();
};

/*
 * assignMemberToChecklistAction
 */
export const assignMemberToChecklistAction = async (
  checklistId,
  taskId,
  assignedBy,
  assignedTo
) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await assignMemberToChecklistService(
    checklistId,
    taskId,
    assignedBy,
    assignedTo,
    token
  );
  revalidateTag("checklists");
  revalidateTag("members");
  // console.log("📥 Backend responded with delete action", result);
  return result;
};
/*
 * achange stage task
 */
export const changeStageToUnderReviewAction = async (taskId, stage) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await changeStageToUnderReviewService(taskId, token, stage);
  revalidateTag("tasks");
  revalidateTag("checklists");
  console.log("status action complete fix", taskId, stage);
  return result;
};
/*
 * achange stage task
 */
export const FeedBackAction = async (taskId, comment) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await FeedBackService(taskId, token, comment);
  revalidateTag("tasks");
  revalidateTag("feedback");

  return result;
};
/*
 * delete member action
 */
export const deleteMemberAction = async (boardId, userId) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await deleteMemberService(boardId, userId, token);
  revalidateTag("members");
  return result;
};
/*
 * checkEmail
 */
export const checkEmailForClearAction = async (email) => {
  const result = await checkEmailForClearService(email);
  return result;
};
/*
 * achange status
 */
export const chageStatusCheckListAction = async (checklistId, type) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await chageStatusCheckListService(checklistId, token, type);
  revalidateTag("checklists");
  console.log("status action", checklistId, type);
  return result;
};

/*
 * new add
 * Update task by Id with board id and gantt bar id
 */
export const updateTaskByIdAction = async (
  taskId,
  title,
  description,
  startedAt,
  finishedAt,
  boardId,
  ganttBarId
) => {
  console.log("👉 taskId in updateTask action: ", taskId);
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await updateTaskByIdService({
    taskId,
    title,
    description,
    startedAt,
    finishedAt,
    boardId,
    ganttBarId,
    token,
  });
  revalidateTag("tasks");
  revalidateTag("gantt");
  return result;
};

/*
 * new add
 * Delete checklist by specific tasks ID
 */
export const deleteCheckListByTaskIdAction = async (checkListId, taskId) => {
  console.log("checkListId in delete action task id delete: ", checkListId);
  console.log("taskId in delete action task id delete: ", taskId);
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await deleteCheckListByTaskIdService({
    checkListId,
    taskId,
    token,
  });
  revalidateTag("checklists");
  revalidateTag("tasks");
  return result;
};

/*
 * new add
 * update checklist by specific tasks ID and checklist id
 */

export const updateCheckListByIdAndTaskIdAction = async (
  checkListId,
  title,
  description,
  startedAt,
  finishedAt,
  taskId
) => {
  const userToken = await Token();
  const token = userToken?.Credential;

  console.log("Checklist in upateChecklistByIdAndTaskIdAction: ", checkListId);
  console.log("title in upateChecklistByIdAndTaskIdAction: ", title);
  console.log(
    "description in upateChecklistByIdAndTaskIdAction: ",
    description
  );
  console.log("startedAt in upateChecklistByIdAndTaskIdAction: ", startedAt);
  console.log("finishedAt in upateChecklistByIdAndTaskIdAction: ", finishedAt);
  console.log("taskId in upateChecklistByIdAndTaskIdAction: ", taskId);

  const result = await updateCheckListByIdAndTaskIdService(
    checkListId,
    title,
    description,
    startedAt,
    finishedAt,
    taskId,
    token
  );

  revalidateTag("checklists");
  revalidateTag("tasks");
  console.log("Update checklist in action: ", result);
  return result;
};

/* add new
 *  delete comment in checklist
 */
export const deleteCommentBycmtIdAction = async (commentId) => {
  console.log("delete action comment id delete: ", commentId);

  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await deleteCommentBycmtIdService({
    commentId,
    token,
  });
  revalidateTag("comments");
  console.log("deleteCommentBycmtIdAction result: ", result);
  return result;
};

/* add new
 *  task by task id
 */
export const getTaskByTaskIdAction = async (taskId) => {
  console.log("taskId getTaskByTaskIdAction: ", taskId);

  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await getTaskByTaskIdService({
    taskId,
    token,
  });
  console.log("getTaskByTaskIdAction result: ", result);
  return result;
};

/* add new
 *  getGuestUserDisplayKanbanService
 */
export const getGuestUserDisplayKanbanAction = async ({
  workspaceId,
  boardId,
}) => {
  console.log("from guestrole: ", workspaceId, boardId);

  const result = await getGuestUserDisplayKanbanService({
    workspaceId,
    boardId,
  });
  console.log("getTaskByTaskIdAction result: ", result);
  return result;
};

/* add new
 *  getGuestUserDisplayKanbanService
 */
export const updateGanttBarByGanttBarIdAction = async (ganttbarId, data) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await updateGanttBarByGanttBarIdService(
    ganttbarId,
    data,
    token
  );
  console.log("update the chart ", result);
};
//add new upload cover checklist
export const uploadCoverChecklistAction = async (checklistId, file) => {
  console.log("checklistId uploadCoverChecklistAction: ", checklistId);
  console.log("file uploadCoverChecklistAction: ", file);
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await uploadCoverChecklistService({
    checklistId,
    file,
    token,
  });
  revalidateTag("checklists");
  console.log("uploadCoverChecklistAction result: ", result);
  return result;
};

/*
 * achange status task fix bugss
 */
export const changeStatusTaskAction = async (taskId, type) => {
  try {
    const userToken = await Token();
    const token = userToken?.Credential;
    if (!token) {
      throw new Error("No authentication token found");
    }

    const result = await changeStatusTaskService({
      taskId,
      type,
      token,
    });
    revalidateTag("tasks");
    return { success: true, data: result };
  } catch (error) {
    console.error("Change status action error:", error.message);
    return { success: false, error: error.message };
  }
};

/*
 *leave the baord
 */
export const leaveTheBoardAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await leaveTheBoardService(boardId, token);
  revalidateTag("boards");
  revalidateTag("members");

  return result;
};

//new assign
export const assignLeaderNewAction = async (taskId, leaderId, pmId) => {
  try {
    // Log input parameters for debugging
    console.log("assignLeaderNewAction inputs:", { taskId, leaderId, pmId });

    const userToken = await Token();
    const token = userToken?.Credential;
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Log token for debugging (avoid in production)
    console.log("Token:", token);

    const result = await assignUserRoleLeadeerNewToBoardService({
      taskId,
      leaderId, // Previously assignId
      pmId,
      token,
    });

    // Log service result
    console.log("Service result:", result);

    // Send notification
    if (result.success && result.payload?.boardId) {
      const notificationData = {
        userIds: [leaderId],
        title: "Leader Assignment",
        content: `You have been assigned as the leader for task "${
          result.payload.title || "Task ID: " + taskId
        }"`,
        type: "leader_assignment",
        boardId: result.payload.boardId,
        taskId: taskId,
        receiverId: leaderId,
        projectManagerId: pmId,
        taskTitle: result.payload.title || "Untitled Task",
      };

      try {
        const notiResult = await sendNotificationToSpecificArrayIdService(
          notificationData,
          token
        );
        console.log("Notification result:", notiResult);
      } catch (error) {
        console.warn("Failed to send notification:", error.message);
      }
    } else {
      console.warn("No boardId in result or assignment failed:", result);
    }

    revalidateTag("tasks");
    revalidateTag("members");
    return { success: true, data: result };
  } catch (error) {
    console.error("Assign leader action error:", error.message);
    return { success: false, error: error.message };
  }
};
/*
 * getTaskbyBoardId and GanttbarId
 */
export const getFeedBackByTaskIdAction = async ({ taskId }) => {
  const userToken = await Token();
  const token = userToken.Credential;
  //console.log(token);
  const result = await getFeedBackByTaskIdService({
    taskId,
    token,
  });
  return result;
};

/* add new action for update date in checklist */
export const updateCheckListDateByIdAndTaskIdAction = async ({
  finishedAt,
  checklistId,
}) => {
  console.log("Request Body in update date checklist Action: ", {
    finishedAt,
    checklistId,
  });
  const userToken = await Token();
  const token = userToken.Credential;

  const result = await updateCheckListDateByIdAndTaskIdService({
    finishedAt,
    checklistId,
    token,
  });
  return result;
};

export const getBoardByIdAction = async ({ boardId, token }) => {
  const result = await getBoardByIdService({
    boardId,
    token,
  });
  return result;
};
