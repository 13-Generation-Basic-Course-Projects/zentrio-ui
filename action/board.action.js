"use server";
import { Token } from "@/constant/token";
import {
  getCheckListByTaskIdService,
  getCommentByCheckListIdService,
  getMemberByBoardIdService,
  getTaskByBoardIdAndGanttBarIdService,
  inviteMemberToBoardService,
} from "@/service/board.service";

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
  console.log(token);
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
  console.log(token);
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
  console.log(token);
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
    console.log("Token retrieved:", token);

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
  console.log(token);
  const result = await getCommentByCheckListIdService({
    checkListId,
    token,
  });
  return result;
};
