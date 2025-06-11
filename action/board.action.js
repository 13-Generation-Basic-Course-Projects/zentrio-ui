"use server";
import { Token } from "@/constant/token";
import {
  createCheckListService,
  createGanttChartByBoardIdService,
  createTaskByBoardIdAndGanttChartIdService,
  getAllGanttBarByGanttChartIDService,
  getBoardByBoardIdService,
  getCheckListByTaskIdService,
  getCommentByCheckListIdService,
  getMemberByBoardIdService,
  getTaskByBoardIdAndGanttBarIdService,
  inviteMemberToBoardService,
  postCommentByCheckListIdService,
} from "@/service/board.service";
import { revalidatePath } from "next/cache";

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
export const inviteMemberToBoardAction = async ({ boardId, data }) => {
  try {
    const userToken = await Token();
    const token = userToken.Credential;
    //console.log("Token retrieved:", token);

    const result = await inviteMemberToBoardService({
      boardId,
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
    console.log("data create form", data);
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
    console.log("data create form", data);
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
  console.log("data create form", data);
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
