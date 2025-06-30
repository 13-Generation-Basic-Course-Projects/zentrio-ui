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
    //// //console.log("📥 Backend responded with:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    //console.error("Login service error:", error.message);
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
    // //console.log("📥 Backend responded with:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    //console.error("Login service error:", error.message);
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
    // //console.log("📥 Backend responded with:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    //console.error("Login service error:", error.message);
    throw error;
  }
};

/*
 * create gantt bar by GantchartId
 */
export const createGanttBarsByGanttChartIdService = async ({
  ganttChartId,
  data,
  token,
}) => {
  try {
    //console.log("from service", { ganttChartId, data, token });

    const url = ganttRouteGroup.createGanttBar();
    const bodyToSend = data.map((item) => ({
      title: item.title,
      startedAt: item.startedAt,
      finishedAt: item.finishedAt,
      face: item.face,
      ganttChartId: ganttChartId,
    }));

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyToSend),
    });

    const result = await res.json();
    //console.log("📥 Backend responded with gantbar:", result);

    return result;
  } catch (error) {
    //console.error("🐞 Error:", error.message);
    throw error;
  }
};

/*
 * create gantt bar by GantchartId
 */
export const deleteGanttBarsByGanttChartIdService = async ({
  ganttChartId,
  ganttbarId,
  token,
}) => {
  try {
    // //console.log("from service", { ganttChartId, ganttbarId, token });

    const url = ganttRouteGroup.deleteGanttBar(ganttbarId, ganttChartId);

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    ////console.log("📥 Backend responded with:", result);

    return result;
  } catch (error) {
    //console.error("🐞 Error:", error.message);
    throw error;
  }
};

/*
 * create gantt bar by GantchartId
 */
// src/service/gantt.service.js
export async function updateGantChartBytIdService({
  ganttChartId,
  boardId,
  data,
  token,
}) {
  
    console.log("from service", { ganttChartId, boardId, token, data });

    const url = ganttRouteGroup.updateGanttChart(ganttChartId);

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: data.title, boardId }), // Moved body out of headers
    });



    const result = await res.json();
    console.log("📥 Backend responded with:", result);

    return { success: true, data: result };
  
};