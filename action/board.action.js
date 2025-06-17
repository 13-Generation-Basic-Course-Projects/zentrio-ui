"use server";
import { Token } from "@/constant/token";
import {
  assignMemberInChecklistService,
  assignMemberToChecklistService,
  assignUserRoleLeadeerToBoardService,
  changeStageToUnderReviewService,
  createCheckListService,
  createGanttChartByBoardIdService,
  createTaskByBoardIdAndGanttChartIdService,
  deleteMemberService,
  deleteTaskService,
  editCommmentService,
  FeedBackService,
  getAllGanttBarByGanttChartIDService,
  getBoardByBoardIdService,
  getCheckListByTaskIdService,
  getCommentByCheckListIdService,
  getMemberByBoardIdService,
  getTaskByBoardIdAndGanttBarIdService,
  getTaskByBoardIdService,
  inviteMemberToBoardService,
  moveTaskOrderService,
  postCommentByCheckListIdService,
} from "@/service/board.service";
import { revalidatePath } from "next/cache";
import { sendNotificationToUserIdAction } from "./notification.action";
import { sendNotificationToUserIdService } from "@/service/notification.service";

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
  //console.log(token);
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
  //console.log(token);
  const result = await getCheckListByTaskIdService({
    taskId,
    token,
  });
  return result;
};

/*
 * get all  memeber  specific boardId
 */
export const getMemberByBoardIdAction = async ({ boardId }) => {
  const userToken = await Token();
  const token = userToken.Credential;
  //console.log(token);
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
    //console.log("Token retrieved:", token);

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

  if (
    !checklistId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      checklistId
    )
  ) {
    console.warn(`Invalid checklistId: ${checklistId}`);
    return {
      success: false,
      data: [],
      error: "Invalid checklistId",
    };
  }

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
  //console.log(token);
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
    revalidatePath("/task");
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
    revalidatePath("/gantbar");
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
    revalidatePath("/checklist");
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
    revalidatePath("/comment");
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
    revalidatePath("/comment");
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
  revalidatePath("/task");
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
  revalidatePath("/task");
  // console.log("📥 Backend responded with delete action", result);

  return result;
};

/*
 *move the task
 */
export const moveTaskOrderAction = async (boardId, newId, oldId) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await moveTaskOrderService(boardId, newId, oldId, token);
  revalidatePath("/task");
  // console.log("📥 Backend responded with delete action", result);
  return result;
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
    console.log("Token retrieved:", token);
    console.log("Data create form:", data);

    // Create the task
    const result = await createTaskByBoardIdAndGanttChartIdService({
      boardId,
      ganttChartId,
      data,
      token,
    });

    // Log the result to confirm response structure
    console.log("Create task result:", JSON.stringify(result, null, 2));

    // Extract taskId from result.payload.taskId
    const taskId = result.payload?.taskId;
    if (!taskId || typeof taskId !== "string") {
      throw new Error("Task ID is missing or invalid in the response");
    }

    // Check if leaderId exists
    if (data.leaderId) {
      // Create notification message with startedAt date
      const startDate = new Date(data.startedAt).toLocaleDateString();
      const notificationData = {
        message: `You have been assigned as the leader for the task "${data.title}"`,
        taskId: taskId,
        assignId: data.leaderId,
        taskTitle: data.title,
        type: "leader_assignment",
      };

      // Send notification
      const notiResult = await sendNotificationToUserIdAction(
        data.leaderId,
        taskId,
        notificationData
      );
      if (!notiResult.success) {
        console.warn("Failed to send notification:", notiResult.error);
        // Optionally, throw error to halt process
        // throw new Error(`Failed to send notification: ${notiResult.error}`);
      }
    }

    revalidatePath("/task");
    return { success: true, data: result };
  } catch (error) {
    console.error("Create task action error:", error.message);
    return { success: false, error: error.message };
  }
};

export const assignLeaderAction = async (taskId, assignId) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  if (!token) {
    throw new Error("No authentication token found");
  }

  console.log("Assigning leader with:", {
    taskId,
    assignId,
    token: token.substring(0, 10) + "...",
  });

  const result = await assignUserRoleLeadeerToBoardService({
    taskId,
    assignId,
    token,
  });

  console.log("Assign leader result:", JSON.stringify(result, null, 2));
  revalidatePath("/assignLd");
  return { success: true, data: result };
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
    revalidatePath("/assignLd");
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
  revalidatePath("/checklist");
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
  revalidatePath("/checklist");
  //console.log("status action", taskId, stage);
  return result;
};
/*
 * achange stage task
 */
export const FeedBackAction = async (taskId, comment) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await FeedBackService(taskId, token, comment);
  revalidatePath("/checklist");
  //console.log("status action", taskId, stage);
  return result;
};
/*
 * delete member action
 */
export const deleteMemberAction = async (boardId, userId) => {
  const userToken = await Token();
  const token = userToken?.Credential;
  const result = await deleteMemberService(boardId, userId, token);
  revalidatePath("/member");
  return result;
};
