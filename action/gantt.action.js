"use server";
import { Token } from "@/constant/token";
import {
  getGanttBarByGanttChartIdService,
  getGanttBarService,
  getGanttChartByBoardIdService,
} from "@/service/gantt.service";

console.log("test actions must create folders");
/*
 * get ganttbar
 */
export const getGanttBarAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log(token);
  const result = await getGanttBarService({
    token,
  });
  return result;
};
/*
 * get ganttbar by gantt chart id
 */
export const getGanttBarByGanttChartIdAction = async ({ ganttChartId }) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log(token);
  const result = await getGanttBarByGanttChartIdService({
    ganttChartId,
    token,
  });
  return result;
};

/*
 * get ganttchart
 */
export const getGanttChartByBoardIdAction = async ({ boardId }) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log(token);

  const result = await getGanttChartByBoardIdService({
    boardId,
    token,
  });
  return result;
};
