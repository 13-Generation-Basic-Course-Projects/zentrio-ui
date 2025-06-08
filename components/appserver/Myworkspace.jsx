import SmallCalendar from "../testcomponent/SmallCalendar";
import CardWelcomeComponent from "../card/CardWelcome";
import CardBoard from "../card/CardBoard";
import CardBoardEmpty from "../card/CardBoardAdd";
import { Link } from "lucide-react";
import CardMember from "../card/CardMember";
import Bar from "../bredcrum/Bar";

export default function Myworkspace({
  Workspaceid,
  getBoardByWorkspaceId,
  createBoardAction,
  deleteBoardAction,
  updateNameBoardAction,
  getBoardByIdAction,
  updateFavAction,
}) {
  console.log("Workspace id in myworkspace: ", Workspaceid);

  return (
    <div className="w-full grid grid-cols-12 h-full">
      {/* board - scrollable */}
      <div className="col-span-9 flex flex-col overflow-hidden p-3 min-h-0">
        <Bar title={"My Boards"} btn={"see all"} />
        <div className="grid grid-cols-3 gap-3 scrollbar-hidden px-2 pb-[200px] py-4 overflow-y-auto flex-1 min-h-0 ">
          {getBoardByWorkspaceId.payload.length > 0 ? (
            <>
              {getBoardByWorkspaceId.payload
                .slice() // create a copy to avoid mutating original array
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by createdAt descending
                .map((board, i) => {
                  return (
                    <CardBoard
                      key={i}
                      role="pm"
                      workspaceId={board.workspaceId}
                      boardId={board.boardId}
                      // projectId={board.boardId}
                      title={board.title}
                      image={board.cover}
                      isFavourite={board.isFavourite}
                      deleteBoardAction={deleteBoardAction}
                      updateNameBoardAction={updateNameBoardAction}
                      getBoardByIdAction={getBoardByIdAction}
                      updateFavAction={updateFavAction}
                    />
                  );
                })}
              {/* Add new board card */}
              <CardBoardEmpty
                Workspaceid={Workspaceid}
                createBoardAction={createBoardAction}
              />
            </>
          ) : (
            
              <CardBoardEmpty
                Workspaceid={Workspaceid}
                createBoardAction={createBoardAction}
              />
            
          )}
        </div>
      </div>

      {/* right side column - fixed */}
      <div className="col-span-3 p-2">
        <CardMember />
      </div>
    </div>
  );
}
