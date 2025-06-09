"use server";

import { calendarV2RouteGroup } from "@/routes/calendarV2Route";

/*
 * getTaskByBoardIdAndGanttBarIdService in side board feature or stage
 */
export const getTaskByBoardIdAndGanttBarIdService = async ({
  boardId,
  ganttBarId,
  token,
}) => {
  console.log("boardId in getTaskByBoardIdAndGanttBarIdService: ", boardId);
  console.log(
    "ganttbarId in getTaskByBoardIdAndGanttBarIdService: ",
    ganttBarId
  );
  try {
    //console.log("from service ", token);
    const url = calendarV2RouteGroup.getTaskByBoardAndGanttBarId(
      boardId,
      ganttBarId
    );
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("bug", error.message);
    throw error;
  }
};

/*
 * get ganttbar by ganntchart Id
 */
export const getGanttBarByGanttChartIdService = async ({ ganttChartId, token }) => {
  try {
    const url = calendarV2RouteGroup.getAllGanttBarByGanttChartID(ganttChartId);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error;
  }
};

/*
 * get ganttchart by spacific board
 */
export const getGanttChartByBoardIdService = async ({ boardId, token }) => {
    // console.log("BoardId in getGanttChartByBoardIdService : ", boardId);
  try {
    const url = calendarV2RouteGroup.getGanttChartByBoardId(boardId);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error;
  }
};

/* calendar controller */
/* 
* create noted in calendar 
*/
export const createNoteInCalendarService = async ({
  token,
  noted,
  startDate,
  tillDate,
  taskId,
}) => {
  try {
    const url = calendarV2RouteGroup.createNoteInCalendar();
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        noted,
        startDate,
        tillDate,
        taskId,
      }),
    });

    const data = await res.json();
    console.log("📥📝 Backend responded create note with:", data);

    return data; s
  } catch (error) {
    console.error("Create note service error📝🤔:", error.message);
    throw error;
  }
};
