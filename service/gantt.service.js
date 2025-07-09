import { ganttRouteGroup } from "@/routes/ganttRoute";
import { revalidatePath } from "next/cache";

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
    //// //  ("📥 Backend responded with:", data);

    return data; // just return the data, don't redirect here
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
    // //  ("📥 Backend responded with:", data);

    return data; // just return the data, don't redirect here
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
    // //  ("📥 Backend responded with:", data);

    return data; // just return the data, don't redirect here
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
    //  ("from service", { ganttChartId, data, token });

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
      next: { tags: ["gantt"] },
    });

    const result = await res.json();
    //  ("📥 Backend responded with gantbar:", result);

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
  ganttBarId,
  token,
}) => {
    ("from service", { ganttChartId, ganttBarId, token });

  const url = ganttRouteGroup.deleteGanttBar(ganttBarId, ganttChartId);

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["gantt"] },
  });

  const result = await res.json();
    ("📥 Backend responded with delete:", result);

  return result;
};

/*
 * update gantt by GantchartId
 */
// src/service/gantt.service.js
export async function updateGantChartBytIdService({
  ganttChartId,
  boardId,
  data,
  token,
}) {
    ("from service", { ganttChartId, boardId, token, data });

  const url = ganttRouteGroup.updateGanttChart(ganttChartId);

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: data.title, boardId }),
    next: { tags: ["gantt"] },
  });

  const result = await res.json();
    ("📥 Backend responded with:", result);

  return { success: true, data: result };
}



/*
 * update gantt bar by GantchartId
 */
export async function updateGantBarBytGantChartIdService({
  ganttBarId,
  ganttChartId,
  title,
  startedAt,
  finishedAt,
  face,
  token,
}) {
    ("from service", {token,  ganttBarId,
    ganttChartId,
    title,
    startedAt,
    finishedAt,
    face, });

  const url = ganttRouteGroup.updateGanttBar(ganttBarId);

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({  
      ganttChartId,
      title,
      startedAt,
      finishedAt,
      face,}), 
    next: { tags: ["gantt"] },
  });

  const result = await res.json();
    ("📥 Backend responded with ganttbar update:", result);
  
  return { success: true, data: result };
}

export const createGanttChartByBoardIdService = async ({ boardId, data, token }) => {
  const url = ganttRouteGroup.createGanttChartByBoardId(boardId);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    next: { tags: ["gantt"] },
  });
  const result = await res.json();
  return result;
};
