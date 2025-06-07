import SystemBoard from "@/components/appserver/Boardpage";
import { auth } from "@/auth";
import {
  getAllGanttBarByGanttChartIDAction,
  getCheckListByTaskIdAction,
  getCommentByCheckListIdAction,
  getMemberByBoardIdAction,
  getTaskByBoardIdAndGanttBarIdAction,
} from "@/action/board.action";
import {
  getGanttBarAction,
  getGanttBarByGanttChartIdAction,
  getGanttChartByBoardIdAction,
} from "@/action/gantt.action";

export default async function BoardLayout({ children, params }) {
  // Fallback values
  const FALLBACK_STRING = "No data available";
  const FALLBACK_ARRAY = [];
  const FALLBACK_OBJECT = {};

  try {
    /*
     * get prop id with fallback
     */
    const boardId = params?.boardId || FALLBACK_STRING;

    const session = await auth();

    /*
     * get task board feature with error handling
     */
    let tasks = [];
    try {
      const tasksResponse = await getTaskByBoardIdAndGanttBarIdAction({
        boardId: "feb6d22e-b2d6-4105-b3ad-663c7148c337",
        ganttbarId: "58b7f94e-186b-4d2e-b9f6-13f581b6a226",
      });
      tasks = tasksResponse?.payload || FALLBACK_ARRAY;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      tasks = FALLBACK_ARRAY;
    }

    /*
     * get for gantt bar feature with error handling
     */
    let ganttbar = FALLBACK_OBJECT;
    try {
      const ganttbarResponse = await getGanttBarAction();
      ganttbar = ganttbarResponse || FALLBACK_OBJECT;
    } catch (error) {
      console.error("Error fetching gantt bar:", error);
    }

    /*
     * get for gantt chart by boardId with error handling
     */
    let ganttchartByBoardId = null;
    try {
      ganttchartByBoardId = await getGanttChartByBoardIdAction({
        boardId: boardId,
      });
    } catch (error) {
      console.error("Error fetching gantt chart by board ID:", error);
    }

    /*
     * get for gantt chart by boardId with safe access
     */
    let ganttBarByGanttChartId = FALLBACK_OBJECT;
    try {
      // Check if ganttchartByBoardId exists and has payload with ganttChartId
      if (ganttchartByBoardId?.payload?.ganttChartId) {
        const ganttBarResponse = await getGanttBarByGanttChartIdAction({
          ganttChartId: ganttchartByBoardId.payload.ganttChartId,
        });
        ganttBarByGanttChartId = ganttBarResponse || FALLBACK_OBJECT;
      } else {
        console.warn("No gantt chart ID found, skipping gantt bar fetch");
      }
    } catch (error) {
      console.error("Error fetching gantt bar by chart ID:", error);
    }

    /*
     * get all member specific boardId with error handling
     */
    let allMemberInBoard = FALLBACK_ARRAY;
    try {
      const membersResponse = await getMemberByBoardIdAction({
        boardId: boardId, // Use the boardId from params
      });
      allMemberInBoard = membersResponse?.payload || FALLBACK_ARRAY;
    } catch (error) {
      console.error("Error fetching members:", error);
    }

    /*
     * get all gantt bar with safe access
     */
    let allGanttBar = { payload: FALLBACK_ARRAY };
    try {
      if (ganttchartByBoardId?.payload?.ganttChartId) {
        allGanttBar = await getAllGanttBarByGanttChartIDAction({
          ganttChartId: ganttchartByBoardId.payload.ganttChartId,
        });
      }
    } catch (error) {
      console.error("Error fetching all gantt bars:", error);
    }

    const ganttBars = allGanttBar?.payload || FALLBACK_ARRAY;

    /* console.log("test all gantt bars", allGanttBar);
    console.log("old task demo", tasks);
    console.log("✅ allMemberInBoard Board IDs:", allMemberInBoard);
    */

    // Safe extraction of gantt bar IDs
    const ganttBarIds = Array.isArray(ganttBars)
      ? ganttBars.map((item) => item?.ganttBarId).filter(Boolean)
      : [];

    // Now use these IDs to get tasks for each ganttBar with error handling
    const allTasks = [];

    for (const ganttBarId of ganttBarIds) {
      try {
        const tasksResponse = await getTaskByBoardIdAndGanttBarIdAction({
          boardId: boardId, // Use the boardId from params
          ganttbarId: ganttBarId,
        });

        // Add tasks to the collection with safe access
        const taskPayload = tasksResponse?.payload;
        if (Array.isArray(taskPayload) && taskPayload.length > 0) {
          allTasks.push(...taskPayload);
        }
      } catch (error) {
        console.error(
          `Error fetching tasks for gantt bar ${ganttBarId}:`,
          error
        );
      }
    }

    /*
     * get for checklist with error handling
     */
    let checklistbyTaskIds = FALLBACK_ARRAY;
    try {
      if (Array.isArray(allTasks) && allTasks.length > 0) {
        const checklistPromises = allTasks.map(async (task) => {
          try {
            if (task?.taskId) {
              return await getCheckListByTaskIdAction({ taskId: task.taskId });
            }
            return null;
          } catch (error) {
            console.error(
              `Error fetching checklist for task ${task?.taskId}:`,
              error
            );
            return null;
          }
        });

        // Resolve all checklist promises and filter out null values
        const resolvedChecklists = await Promise.all(checklistPromises);
        checklistbyTaskIds = resolvedChecklists.filter(Boolean);
      }
    } catch (error) {
      console.error("Error processing checklists:", error);
    }

    return (
      <div>
        <SystemBoard
          user={session?.user || null}
          tasks={Array.isArray(allTasks) ? allTasks : FALLBACK_ARRAY}
          ganttbar={ganttBarByGanttChartId || FALLBACK_OBJECT}
          checklistbyTaskIds={
            Array.isArray(checklistbyTaskIds)
              ? checklistbyTaskIds
              : FALLBACK_ARRAY
          }
          allMemberInBoard={
            Array.isArray(allMemberInBoard) ? allMemberInBoard : FALLBACK_ARRAY
          }
          boardId={boardId || FALLBACK_STRING}
        />
        <main>{children}</main>
      </div>
    );
  } catch (error) {
    console.error("Critical error in BoardLayout:", error);
    // Return fallback component in case of critical error
    return (
      <div>
        <SystemBoard
          user={null}
          tasks={FALLBACK_ARRAY}
          ganttbar={FALLBACK_OBJECT}
          checklistbyTaskIds={FALLBACK_ARRAY}
          allMemberInBoard={FALLBACK_ARRAY}
          boardId={FALLBACK_STRING}
        />
        <main>{children}</main>
      </div>
    );
  }
}
