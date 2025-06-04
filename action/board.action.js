"use server";
import { Token } from "@/constant/token";
import {
  getCheckListByTaskIdService,
  getTaskByBoardIdAndGanttBarIdService,
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
