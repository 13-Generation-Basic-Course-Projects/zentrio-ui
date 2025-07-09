import { getBoardByBoardIdAction } from "@/action/board.action";
import {
  createNoteInCalendarAction,
  getGanttBarByGanttChartIdAction,
  getGanttChartByBoardIdAction,
  getTaskByBoardIdAndGanttBarIdAction,
} from "@/action/calendarV2.action";
import { auth } from "@/auth";
import MyCalender from "@/components/appserver/Calenderpage";

const FALLBACK_STRING = "No data available";
const FALLBACK_ARRAY = [];

export default async function Calendar({ params }) {
  // Extract boardId from route parameters
  const boardId = (await params).boardId || FALLBACK_STRING;
  const workspaceId =(await params).workspaceId || FALLBACK_STRING;
    const boardData= await getBoardByBoardIdAction(boardId);
  const boardName= boardData?.payload?.title;

  // Authenticate user session
  const session = await auth();

  try {
    // Step 1: Get gantt chart ID from board
    const ganttChartId = await fetchGanttChartId(boardId);
      (" GanttChart ID:", ganttChartId);

    // Step 2: Get all gantt bars from the gantt chart
    const ganttBars = await fetchGanttBars(ganttChartId);
      (" Gantt bars in calendar:", ganttBars);

    // Step 3: Get all tasks from gantt bars
    const allTasks = await fetchAllTasks(boardId, ganttBars);
      (" All tasks in calendar:", allTasks);

    // Step 4: Render the calendar component
    return (
      <div>
        <MyCalender tasks={allTasks} workspaceId={workspaceId} boardName={boardName}/>
      </div>
    );
  } catch (error) {
    // console.error("❌ Error loading calendar page:", error);
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600 text-center">
          <h2 className="text-xl font-semibold mb-2">Calendar Error</h2>
          <p>Something went wrong while loading the calendar.</p>
        </div>
      </div>
    );
  }
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Fetches gantt chart ID by board ID
 */
async function fetchGanttChartId(boardId) {
  if (!boardId || boardId === FALLBACK_STRING) {
    // console.warn("⚠️ Invalid board ID provided");
    return FALLBACK_STRING;
  }

  try {
    const response = await getGanttChartByBoardIdAction(boardId);
    const ganttChartId = response?.payload?.ganttChartId;

    if (!ganttChartId) {
      // console.warn("⚠️ No gantt chart found for board:", boardId);
      return FALLBACK_STRING;
    }

    return ganttChartId;
  } catch (error) {
    // console.error("❌ Error fetching gantt chart by board ID:", error);
    return FALLBACK_STRING;
  }
}

/**
 * Fetches all gantt bars by gantt chart ID
 *
 */
async function fetchGanttBars(ganttChartId) {
  // Skip fetching if no valid gantt chart ID
  if (!ganttChartId || ganttChartId === FALLBACK_STRING) {
    // console.info(" No valid gantt chart ID, skipping gantt bars fetch");
    return FALLBACK_ARRAY;
  }

  try {
    const response = await getGanttBarByGanttChartIdAction(ganttChartId);
    const ganttBars = response?.payload || FALLBACK_ARRAY;

    if (!Array.isArray(ganttBars) || ganttBars.length === 0) {
      // console.info(" No gantt bars found for chart:", ganttChartId);
      return FALLBACK_ARRAY;
    }

    return ganttBars;
  } catch (error) {
    // console.error(" Error fetching gantt bars:", error);
    return FALLBACK_ARRAY;
  }
}

/**
 * Fetches all tasks from multiple gantt bars
 */
async function fetchAllTasks(boardId, ganttBars) {
  if (!Array.isArray(ganttBars) || ganttBars.length === 0) {
    // console.info(" No gantt bars available, returning empty tasks array");
    return FALLBACK_ARRAY;
  }

  // Extract valid gantt bar IDs
  const ganttBarIds = ganttBars.map((bar) => bar?.ganttBarId).filter(Boolean);

  if (ganttBarIds.length === 0) {
    // console.warn(" No valid gantt bar IDs found");
    return FALLBACK_ARRAY;
  }

  // console.info(` Fetching tasks from ${ganttBarIds.length} gantt bars`);

  const allTasks = [];

  // Fetch tasks for each gantt bar sequentially
  for (const ganttBarId of ganttBarIds) {
    try {
      const tasksResponse = await getTaskByBoardIdAndGanttBarIdAction(
        boardId,
        ganttBarId
      );

      const tasks = tasksResponse?.payload;

      // Add tasks to collection if they exist and are valid
      if (Array.isArray(tasks) && tasks.length > 0) {
        allTasks.push(...tasks);
        // console.info(
        //   ` Added ${tasks.length} tasks from gantt bar: ${ganttBarId}`
        // );
      } else {
        // console.info(` No tasks found for gantt bar: ${ganttBarId}`);
      }
    } catch (error) {
      // console.error(
      //   ` Error fetching tasks for gantt bar ${ganttBarId}:`,
      //   error
      // );
      // Continue with other gantt bars even if one fails
      continue;
    }
  }

  // console.info(` Total tasks collected: ${allTasks.length}`);
  return allTasks;
}
