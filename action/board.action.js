"use server";
import { Token } from "@/constant/token";
import { getTaskByBoardIdAndGanttBarIdService } from "@/service/board.service";

console.log("test actions must create folders");
/*
 * test
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
