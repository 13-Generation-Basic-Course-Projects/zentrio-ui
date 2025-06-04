///service/board.service.js
"use server";
import { boardRouteGroup } from "@/routes/boardRoute";
import { checklistRouteGroup } from "@/routes/checklistRoute";

/*
 * getTaskByBoardIdAndGanttBarIdService in side board feature or stage
 */
export const getTaskByBoardIdAndGanttBarIdService = async ({
  boardId,
  ganttbarId,
  token,
}) => {
  try {
    console.log("from service ", token);
    const url = boardRouteGroup.getTaskByBoardAndGanttBarId(
      boardId,
      ganttbarId
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
    console.error("Login service error:", error.message);
    throw error;
  }
};

/*
 * getCheckListByTaskId in side board feature or stage
 */
export const getCheckListByTaskIdService = async ({ taskId, token }) => {
  try {
    console.log("from service ", token);
    const url = checklistRouteGroup.getCheckListByTaskId(taskId);
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
