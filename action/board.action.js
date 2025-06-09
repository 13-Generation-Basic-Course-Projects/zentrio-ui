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
export const getCommentByCheckListIdAction = async ({ checkListId }) => {
  const userToken = await Token();
  const token = userToken.Credential;
  //console.log(token);
  const result = await getCommentByCheckListIdService({
    checkListId,
    token,
  });
  return result;
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
    console.log("data create form", data);
    const result = await createTaskByBoardIdAndGanttChartIdService({
      boardId,
      ganttChartId,
      data,
      token,
    });

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
