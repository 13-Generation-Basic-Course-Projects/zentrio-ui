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
  /*
   * get prop id
   */
  const boardId = params.boardId;

  const session = await auth();
  /*
   *get task board  feature
   */
  const tasks = await getTaskByBoardIdAndGanttBarIdAction({
    boardId: "feb6d22e-b2d6-4105-b3ad-663c7148c337",
    ganttbarId: "58b7f94e-186b-4d2e-b9f6-13f581b6a226",
  });

  /*
   *get for gantt char feature
   */
  const ganttbar = await getGanttBarAction();
  /*
   *get for gantt chart by boardId
   */
  const ganttchartByBoardId = await getGanttChartByBoardIdAction({
    boardId: boardId,
  });
  /*
   *get for gantt chart by boardId
   */
  const ganttBarByGanttChartId = await getGanttBarByGanttChartIdAction({
    ganttChartId: ganttchartByBoardId,
  });

  /*
   * get all  memeber  specific boardId
   */
  const allMemberInBoard = await getMemberByBoardIdAction({
    boardId: "feb6d22e-b2d6-4105-b3ad-663c7148c337",
  });
  /*
   * get all gant bar
   */

  const allGanttBar = await getAllGanttBarByGanttChartIDAction({
    ganttChartId: ganttchartByBoardId?.payload?.ganttChartId,
  });
  const ganttBars = allGanttBar.payload;

  console.log("test all gannt bars", allGanttBar);

  console.log("old task demo", tasks);

  console.log("✅ allMemberInBoard Board IDs:", allMemberInBoard);

  // Assuming your API response is stored in a variable called 'ganttBarsResponse'
  const ganttBarIds = ganttBars.map((item) => item.ganttBarId);

  // Now use these IDs to get tasks for each ganttBar
  const allTasks = [];

  for (const ganttBarId of ganttBarIds) {
    const tasks = await getTaskByBoardIdAndGanttBarIdAction({
      boardId: "feb6d22e-b2d6-4105-b3ad-663c7148c337",
      ganttbarId: ganttBarId,
    });

    // Add tasks to the collection (assuming tasks.payload contains the task array)
    if (tasks.payload && tasks.payload.length > 0) {
      allTasks.push(...tasks.payload);
    }
  }
  /*
   *get for checklist
   */
  const checklistPromises = allTasks.map((task) =>
    getCheckListByTaskIdAction({ taskId: task.taskId })
  );
  //  resolve all checklistBoardId promises
  const checklistbyTaskIds = await Promise.all(checklistPromises); //get checklist from task

  return (
    <div>
      <SystemBoard
        user={session?.user}
        tasks={allTasks}
        ganttbar={ganttBarByGanttChartId}
        checklistbyTaskIds={checklistbyTaskIds}
        allMemberInBoard={allMemberInBoard}
        boardId={boardId}
      />
      <main> {children}</main>
    </div>
  );
}
