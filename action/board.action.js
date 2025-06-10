"use server";
import { Token } from "@/constant/token";
import {
  createGanttChartByBoardIdService,
  createTaskByBoardIdAndGanttChartIdService,
  getAllGanttBarByGanttChartIDService,
  getCheckListByTaskIdService,
  getCommentByCheckListIdService,
  getMemberByBoardIdService,
  getTaskByBoardIdAndGanttBarIdService,
  inviteMemberToBoardService,
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

    // Transform the backend response to match your expected frontend format
    return {
      success: result.success,
      data: result.payload || result.data || [], // Map payload to data
      error: result.error || null,
      message: result.message,
    };
  } catch (error) {
    console.error("Error in getCommentByCheckListIdAction:", error);
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
