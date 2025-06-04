import SystemBoard from "@/components/appserver/Boardpage";
import { auth } from "@/auth";
import { getTaskByBoardIdAndGanttBarIdAction } from "@/action/board.action";
export default async function BoardLayout({ children }) {
  const session = await auth();
  const tasks = await getTaskByBoardIdAndGanttBarIdAction({
    boardId: "feb6d22e-b2d6-4105-b3ad-663c7148c337",
    ganttbarId: "58b7f94e-186b-4d2e-b9f6-13f581b6a226",
  });

  //console.log("fetch task", tasks);
  return (
    <div>
      <SystemBoard user={session?.user} tasks={tasks} />
      <main> {children}</main>
    </div>
  );
}
