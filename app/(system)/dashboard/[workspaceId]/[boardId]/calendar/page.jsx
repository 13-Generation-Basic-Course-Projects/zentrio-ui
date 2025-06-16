import {
  createNoteInCalendarAction,
  getAllNoteInCalendarAction,
  getGanttBarByGanttChartIdAction,
  getGanttChartByBoardIdAction,
  getTaskByBoardIdAndGanttBarIdAction,
} from "@/action/calendarV2.action";
import { auth } from "@/auth";
import MyCalender from "@/components/appserver/Calenderpage";

const FALLBACK_STRING = "No data available";
const FALLBACK_ARRAY = [];
const FALLBACK_OBJECT = {};

// Utility to fetch ganttChartId by boardId
async function fetchGanttChartId(boardId) {
  try {
    const ganttchartByBoardId = await getGanttChartByBoardIdAction({ boardId });
    return ganttchartByBoardId?.payload?.ganttChartId || FALLBACK_STRING;
  } catch (error) {
    console.error("Error fetching gantt chart by board ID:", error);
    return FALLBACK_STRING;
  }
}

export default async function Calender({ params }) {
  const boardId = (await params.boardId) || FALLBACK_STRING;
  const session = await auth();

  try {
    // Step 1: Fetch ganttChartId
    const ganttchartByBoardId = await getGanttChartByBoardIdAction(boardId);
    const ganttChartId = ganttchartByBoardId?.payload?.ganttChartId;
    console.log("✅ GanttChart ID:", ganttChartId);

    // Step 2: Fetch all gantt bars by ganttChartId
    let allGanttBar = { payload: FALLBACK_ARRAY };
    try {
      if (ganttChartId !== FALLBACK_STRING) {
        allGanttBar = await getGanttBarByGanttChartIdAction(ganttChartId);
      }
    } catch (error) {
      console.error("Error fetching all gantt bars:", error);
    }

    const ganttBars = allGanttBar?.payload || FALLBACK_ARRAY;
    console.log("ganttbars in calendar: ", ganttBars);

    // Step 3: Extract ganttBarIds
    const ganttBarIds = Array.isArray(ganttBars)
      ? ganttBars.map((item) => item?.ganttBarId).filter(Boolean)
      : [];

    // Step 4: Fetch tasks for each gantt bar
    const allTasks = [];
    for (const ganttBarId of ganttBarIds) {
      try {
        const tasksResponse = await getTaskByBoardIdAndGanttBarIdAction(
          boardId,
          ganttBarId
        );

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
    console.log("✅👨‍🏭 All tasks in calendar: ", allTasks);

    return (
      <div>
        <MyCalender
          tasks={allTasks}
          createNoteAction={createNoteInCalendarAction}
          boardId={boardId}
        />
      </div>
    );
  } catch (error) {
    console.error("❌ Error loading calendar page:", error);
    return <div>Something went wrong while loading the calendar.</div>;
  }
}
