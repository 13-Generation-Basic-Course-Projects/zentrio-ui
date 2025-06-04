import SystemBoard from "@/components/appserver/Boardpage";
import { auth } from "@/auth";
import {
  getCheckListByTaskIdAction,
  getTaskByBoardIdAndGanttBarIdAction,
} from "@/action/board.action";
import {
  getGanttBarAction,
  getGanttBarByGanttChartIdAction,
  getGanttChartByBoardIdAction,
} from "@/action/gantt.action";
export default async function BoardLayout({ children }) {
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
    boardId: "feb6d22e-b2d6-4105-b3ad-663c7148c337",
  });
  /*
   *get for gantt chart by boardId
   */
  const ganttBarByGanttChartId = await getGanttBarByGanttChartIdAction({
    ganttChartId: "66404c78-08cb-45a3-ae8e-88944ab56ec4",
  });

  /*
   *get for gantt char feature
   */
  const checklistBoardId = await getCheckListByTaskIdAction({
    taskId: "f5d4b728-77fc-4cc4-a1fd-cb2f55371212",
  });

  console.log("fetch -----", tasks);
  return (
    <div>
      <SystemBoard
        user={session?.user}
        tasks={tasks}
        ganttbar={ganttBarByGanttChartId}
      />
      <main> {children}</main>
    </div>
  );
}
