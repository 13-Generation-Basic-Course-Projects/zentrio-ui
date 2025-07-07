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

    return data; // just return the data, don't redirect here
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

    return data; // just return the data, don't redirect here
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

    return data; // just return the data, don't redirect here
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error;
  }
};

/* calendar controller */
/* 
* create noted in calendar 
*/
// export const createNoteInCalendarService = async ({
//   token,
//   noted,
//   startDate,
//   tillDate,
//   taskId,
// }) => {
//   try {
//     console.log("Service noted input:", noted);
//     console.log("Service startDate input:", startDate);
//     console.log("Service tillDate input:", tillDate);
//     console.log("Service taskId input:", taskId);

//     const url = calendarV2RouteGroup.createNoteInCalendar();
//     const res = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         noted,
//         startDate,
//         tillDate,
//         taskId,
//       }),
//     });

//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.message || "Failed to create note");
//     }

//     const result = await res.json();
//     return result;
//   } catch (error) {
//     console.error("Create note service error:", error.message);
//     // throw error; 
//   }
// };

export const createNoteInCalendarService = async ({
  token,
  noted,
  startDate,
  tillDate,
  taskId,
}) => {
  try {
    console.log("Service noted input:", noted);
    console.log("Service startDate input:", startDate);
    console.log("Service tillDate input:", tillDate);
    console.log("Service taskId input:", taskId);

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

    if (!res.ok) {
      const errorData = await res.json();
      // Return error object instead of throwing
      return {
        success: false,
        error: {
          detail: errorData.message || "Failed to create note",
          status: res.status,
        },
      };
    }

    const result = await res.json();
    console.log("Result in service : ", result);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Create note service error:", error.message);

    // Return error object for network/parsing errors
    return {
      success: false,
      error: {
        detail: error.message || "Network error occurred",
      },
    };
  }
};

/*
* Get note in calendar
*/
// service\calendarV2.service.js

export const getAllNoteInCalendarService = async ({ taskId, token }) => {
  // console.log("Service - Received taskId (should be string):", taskId);

  try {
    const url = calendarV2RouteGroup.getAllNoteInCalendar(taskId);
    // console.log("Service - Fetching URL (final):", url);

    const res = await fetch(url, {
      method: "GET",
      next: {
        tags: ["calendar"],
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    
    if (res.status === 404) {
      // console.log("Service - No notes found for taskId:", taskId);
     
      return { data: [], message: "No notes found" };
    }

    if (!res.ok) {
      // Handle other HTTP errors (500, 403, etc.)
      const errorText = await res.text();
      console.error(`Service - HTTP Error ${res.status}:`, errorText);
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    // console.log("Service - getAllNoteInCalendar (successful data):", data);
    return data;
  } catch (error) {
    // Handle network errors and other exceptions
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      console.error("Service - Network error:", error.message);
      throw new Error("Network connection failed");
    }

    console.error("Service - Error fetching note in Calendar:", error.message);
    throw error;
  }
};


/*
* delete note in calendar
*/
export const deleteNoteInCalendarService = async ({calendarId, taskId, token }) => {
  try {
    const url = calendarV2RouteGroup.deleteNoteInCalendar(calendarId, taskId);
    // console.log("Service - Fetching URL (final):", url);

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["calendar"] },
    });
    const data = await res.json();
    // console.log("Service - deleteNoteInCalendar (successful data):", data);
    return data;
  } catch (error) {
    // console.error("Service - Error deleteNoteInCalendar :", error.message);
    throw error;
  }
};

/*
* update note in calendar
*/
export const updateNoteInCalendarService = async ({
  calendarId,
  noted,
  startDate,
  tillDate,
  taskId,
  token,
}) => {
  try {
    const url = calendarV2RouteGroup.updateNoteInCalendar(calendarId);
    const res = await fetch(url, {
      method: "PUT",
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
      next: { tags: ["calendar"] },
    });

    if (!res.ok) {
      const text = await res.text(); // Parse as text to see the actual response
      console.error("Error response:", res.status, text);
      throw new Error(`Failed to update note: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Service - Error updateNoteInCalendar:", error.message);
    throw error;
  }
};



/*
 * Get all checklist by task id
 */
export const getChecklistByTaskIdService = async ({ taskId, token }) => {
 
  try {
    const url = calendarV2RouteGroup.getChecklistByTaskId(taskId);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log("📥 Backend responded checklist with:", data);

    return data; // just return the data, don't redirect here
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error;
  }
};

export const deleteCalendarV2ByIdService = async ({ calendarId, token }) => {
  const url = calendarV2RouteGroup.deleteCalendarV2ById(calendarId);
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["calendar"] },
  });
  const data = await res.json();
  return data;
};