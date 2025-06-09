"use server";
import { Token } from "@/constant/token";
import { createNoteInCalendarService, getGanttBarByGanttChartIdService, getGanttChartByBoardIdService, getTaskByBoardIdAndGanttBarIdService } from "@/service/calendarV2.service";
/*
 * getTaskbyBoardId and GanttbarId
 */
export const getTaskByBoardIdAndGanttBarIdAction = async (boardId, ganttBarId) => {
  console.log(
    "ganttBarId in getTaskByBoardIdAndGanttBarIdAction: ",
    ganttBarId
  );
  const userToken = await Token();
  const token = userToken.Credential;
  //console.log(token);
  const result = await getTaskByBoardIdAndGanttBarIdService({
    boardId,
    ganttBarId,
    token,
  });
  return result;
};


/*
 * get ganttbar by gantt chart id
 */
export const getGanttBarByGanttChartIdAction = async (ganttChartId) => {
  console.log("ganttchartId  in calendar: ", ganttChartId);
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
 * get ganttchart by boardId
 */
export const getGanttChartByBoardIdAction = async (boardId) => {
    console.log("BoardId ingetGanttChartByBoardIdAction: ", boardId);
  const userToken = await Token();
  const token = userToken.Credential;
  console.log(token);

  const result = await getGanttChartByBoardIdService({
    boardId,
    token,
  });
  return result;
};

/* 
* create noted in calendar 
*/
export const createNoteInCalendarAction = async ({
  noted,
  startDate,
  tillDate,
  taskId,
}) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("Token:", token);

  const result = await createNoteInCalendarService({
    token,
    noted,
    startDate,
    tillDate,
    taskId,
  });

  return result;
};
