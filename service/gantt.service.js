import { ganttRouteGroup } from "@/routes/ganttRoute";

/*
 *       GANTT BAR
 */

/*
 * get ganttbar
 */
export const getGanttBarService = async ({ token }) => {
  try {
    const url = ganttRouteGroup.getAllGanttBar();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("📥 Backend responded with:", data);

    // Check if payload exists and return it, otherwise return null or handle accordingly
    if (data && data.payload) {
      return data;
    } else {
      console.log("⚠️ No gantt chart data found.");
      return null; // or throw an error, or return a default value
    }
  } catch (error) {
    console.error("🔥 Gantt service error:", error.message);
    throw error;
  }
};

/*
 * get ganttchart by ganntchart Id
 */
export const getGanttBarByGanttChartIdService = async ({
  ganttChartId,
  token,
}) => {
  try {
    const url = ganttRouteGroup.getAllGanttBarByGanttChartID(ganttChartId);
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
 *       GANTT CHART
 */

/*
 * get ganttchart by spacific board
 */
export const getGanttChartByBoardIdService = async ({ boardId, token }) => {
  try {
    const url = ganttRouteGroup.getGanttChartByBoardId(boardId);
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
