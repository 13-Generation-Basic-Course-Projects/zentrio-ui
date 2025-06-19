"use server";
import { Token } from "@/constant/token";
import { createNoteInCalendarService, deleteNoteInCalendarService, getAllNoteInCalendarService, getCalendarByBoardIdAndUserIdService, getChecklistByTaskIdService, getGanttBarByGanttChartIdService, getGanttChartByBoardIdService, getNoteInCalendarService, getTaskByBoardIdAndGanttBarIdService } from "@/service/calendarV2.service";
import { revalidatePath, revalidateTag } from "next/cache";
/*
 * getTaskbyBoardId and GanttbarId
 */
export const getTaskByBoardIdAndGanttBarIdAction = async (boardId, ganttBarId) => {
  // console.log(
  //   "ganttBarId in getTaskByBoardIdAndGanttBarIdAction: ",
  //   ganttBarId
  // );
  const token = await Token();
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
  // console.log("ganttchartId  in calendar: ", ganttChartId);
  const token = await Token();
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
    // console.log("BoardId ingetGanttChartByBoardIdAction: ", boardId);
  const token = await Token();
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
export const createNoteInCalendarAction = async (
  noted,
  startDate,
  tillDate,
  taskId,
) => {
  const token = await Token();
  console.log("Action noted input:", noted);
  console.log("Action startDate input:", startDate);
  console.log("Action tillDate input:", tillDate);
  console.log("Action taskId input:", taskId);
  

  const result = await createNoteInCalendarService({
    token,
    noted,
    startDate,
    tillDate,
    taskId,
  });
  revalidatePath("/createNote");

  return result;
};


/*
 * Action Get all note from calendar by current user (note in each task)
 */


export const getAllNoteInCalendarAction = async (taskId) => {
  // console.log("Action - Received taskId (should be string):", taskId);
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    const result = await getAllNoteInCalendarService({
      taskId: taskId,
      token: token,
    });
    // revalidateTag("calendar");
    return result; 
  } catch (error) {
    console.error("getNoteInCalendarAction error:", error);
    throw error; 
  }
};

/*
* delete note in calendar
*/
export const deleteNoteInCalendarAction = async (calendarId, taskId) => {
  
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    const result = await deleteNoteInCalendarService({
      calendarId,
      taskId: taskId,
      token: token,
    });
    revalidateTag ("calendar");
    return result;
  } catch (error) {
    console.error("deleteNoteInCalendarAction error:", error);
    throw error;
  }
};


/*
* update note in calendar
*/
export const updateNoteInCalendarAction = async (
  calendarId,
  noted,
  startDate,
  tillDate,
  taskId
) => {
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    const result = await deleteNoteInCalendarService({
      calendarId,
      noted,
      startDate,
      tillDate,
      taskId,
      token: token,
    });
    return result;
  } catch (error) {
    console.error("updateNoteInCalendarAction error:", error);
    throw error;
  }
};


/*
 * Get all checklist by task id
 */


export const getChecklistByTaskIdAction = async (taskId) => {
  
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    const result = await getChecklistByTaskIdService({
      taskId: taskId,
      token: token,
    });
    return result;
  } catch (error) {
    console.error("getChecklistByTaskIdAction error:", error);
    throw error;
  }
};