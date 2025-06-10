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
import { preventImage } from "@/constant/preventimage";
import { getCurrentUserProfileAction } from "@/action/profile.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Utility function to fetch ganttChartId
async function fetchGanttChartId(boardId) {
  const FALLBACK_STRING = "No data available";
  try {
    const ganttchartByBoardId = await getGanttChartByBoardIdAction({ boardId });
    return ganttchartByBoardId?.payload?.ganttChartId || FALLBACK_STRING;
  } catch (error) {
    console.error("Error fetching gantt chart by board ID:", error);
    return FALLBACK_STRING;
  }
}
async function fetchGanttChartName(boardId) {
  const FALLBACK_STRING = "No data available";
  try {
    const ganttchartByBoardId = await getGanttChartByBoardIdAction({ boardId });
    return ganttchartByBoardId?.payload?.title || FALLBACK_STRING;
  } catch (error) {
    console.error("Error fetching gantt chart by board ID:", error);
    return FALLBACK_STRING;
  }
}

export default async function BoardLayout({ children, params }) {
  // Fallback values
  const FALLBACK_STRING = "No data available";
  const FALLBACK_ARRAY = [];
  const FALLBACK_OBJECT = {};
  const boardId = params?.boardId || FALLBACK_STRING;

  /*
   * Get ganttChartId using the utility function
   */
  const ganttChartId = await fetchGanttChartId(boardId);
  const ganttChartName = await fetchGanttChartName(boardId);
  console.log("test gant chart id", ganttChartId); // Log inside BoardLayout
  try {
    /*
     * Get prop id with fallback
     */

    const session = await auth();

    /*
     * Get for gantt bar feature with error handling
     */
    let ganttbar = FALLBACK_OBJECT;
    try {
      const ganttbarResponse = await getGanttBarAction();
      ganttbar = ganttbarResponse || FALLBACK_OBJECT;
    } catch (error) {
      console.error("Error fetching gantt bar:", error);
    }

    /*
     * Get for gantt chart by boardId with error handling
     */
    let ganttchartByBoardId = null;
    try {
      ganttchartByBoardId = await getGanttChartByBoardIdAction({ boardId });
    } catch (error) {
      console.error("Error fetching gantt chart by board ID:", error);
    }

    /*
     * Get for gantt bar by ganttChartId with safe access
     */
    let ganttBarByGanttChartId = FALLBACK_OBJECT;
    try {
      if (ganttChartId !== FALLBACK_STRING) {
        const ganttBarResponse = await getGanttBarByGanttChartIdAction({
          ganttChartId,
        });
        ganttBarByGanttChartId = ganttBarResponse || FALLBACK_OBJECT;
      } else {
        console.warn("No gantt chart ID found, skipping gantt bar fetch");
      }
    } catch (error) {
      console.error("Error fetching gantt bar by chart ID:", error);
    }

    /*
     * Get all members for specific boardId with error handling
     */
    let allMemberInBoard = FALLBACK_ARRAY;
    try {
      const membersResponse = await getMemberByBoardIdAction({ boardId });
      allMemberInBoard = membersResponse?.payload || FALLBACK_ARRAY;
    } catch (error) {
      console.error("Error fetching members:", error);
    }

    /*
     * Get all gantt bars with safe access
     */
    let allGanttBar = { payload: FALLBACK_ARRAY };
    try {
      if (ganttChartId !== FALLBACK_STRING) {
        allGanttBar = await getGanttBarByGanttChartIdAction({
          ganttChartId,
        });
      }
    } catch (error) {
      console.error("Error fetching all gantt bars:", error);
    }

    const ganttBars = allGanttBar?.payload || FALLBACK_ARRAY;

    /*
     * Safe extraction of gantt bar IDs
     */
    const ganttBarIds = Array.isArray(ganttBars)
      ? ganttBars.map((item) => item?.ganttBarId).filter(Boolean)
      : [];

    /*
     * Get tasks for each ganttBar with error handling
     */
    const allTasks = [];
    for (const ganttBarId of ganttBarIds) {
      try {
        const tasksResponse = await getTaskByBoardIdAndGanttBarIdAction({
          boardId,
          ganttbarId: ganttBarId,
        });
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
     * Get checklists with error handling
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
        const resolvedChecklists = await Promise.all(checklistPromises);
        checklistbyTaskIds = resolvedChecklists.filter(Boolean);
      }
    } catch (error) {
      console.error("Error processing checklists:", error);
    }

    //pf
    /*
     * This function is the main entry point for the profile page.
     */
    const currentUserProfile = await getCurrentUserProfileAction();
    const imageUser = currentUserProfile?.payload?.user?.profileImage;
    const noImage = preventImage.noProfile;
    const preventUserImage = imageUser == null ? noImage : imageUser;
    console.log("what inside layout and userprofile", imageUser);

    // /**
    //  * get comment
    //  * */
    // const getCommentByChecklistId = await getCommentByCheckListIdAction(
    //   checklistbyTaskIds
    // );
    // Extract checklistId values from checklistbyTaskIds

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
          ganttChartId={ganttChartId}
          ganttChartName={ganttChartName}
          preventUserImage={preventUserImage}
        />
        <ToastContainer position="top-right" autoClose={3000} />
        <main>{children}</main>
      </div>
    );
  } catch (error) {
    console.error("Critical error in BoardLayout:", error);
    return (
      <div>
        <SystemBoard
          user={null}
          tasks={FALLBACK_ARRAY}
          ganttbar={FALLBACK_OBJECT}
          checklistbyTaskIds={FALLBACK_ARRAY}
          allMemberInBoard={FALLBACK_ARRAY}
          boardId={boardId}
          ganttChartId={ganttChartId}
          ganttChartName={ganttChartName}
          preventUserImage={preventUserImage}
        />
        <main>{children}</main>
      </div>
    );
  }
}
