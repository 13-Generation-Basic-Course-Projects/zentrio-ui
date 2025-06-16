
import CardBoard from "../card/CardBoard";
import CardBoardEmpty from "../card/CardBoardAdd";
import CardMember from "../card/CardMember";
import Bar from "../bredcrum/Bar";

/* 🎨 Central color mapping for predefined background colors */
const colorOptions = [
  { key: "red", label: "Red", className: "bg-board-red" },
  { key: "blue", label: "Blue Sky", className: "bg-board-primary" },
  { key: "green", label: "Green", className: "bg-board-green" },
  { key: "purple", label: "Purple", className: "bg-board-purple" },
  { key: "orange", label: "Orange", className: "bg-board-orange" },
  { key: "violet", label: "Violet", className: "bg-board-violet" },
];

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
      {/* Main board area - left 9 columns */}
      <div className="col-span-9 flex flex-col overflow-hidden p-3 min-h-0">
        <Bar title={"My Boards"} btn={"see all"} />

        <div className="grid grid-cols-3 gap-3 scrollbar-hidden px-2 pb-[200px] py-4 overflow-y-auto flex-1 min-h-0">
          {getBoardByWorkspaceId.payload.length > 0 ? (
            <>
              {getBoardByWorkspaceId.payload
                .slice() // avoid mutating original array
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by newest
                .map((board, i) => {
                  let image = "";

                  const matchedColor = colorOptions.find(
                    (c) => c.key === board.cover
                  );

                  if (matchedColor) {
                    image = matchedColor.className;
                  } else if (
                    board.cover?.startsWith("http") ||
                    board.cover?.startsWith("data:")
                  ) {
                    image = board.cover;
                  } else if (board.cover) {
                    // ⛳️ New logic for uploaded files
                    // image = `http://localhost:8080/api/v1/files/${board.cover}`; // or your actual static file URL path
                   image = `http://localhost:8080/api/v1/boards/${board.boardId}/cover/${board.cover}`;
                  // image = `D:\\Albums\\Pictures\\${board.cover}`;

                  } else {
                    image = "bg-gray-200";
                  }
                  console.log("Final image value for board:", image);

                  console.log("Id board in my workspace: ", board.boardId);

                  return (
                    <CardBoard
                      key={i}
                      role="pm"
                      workspaceId={board.workspaceId}
                      boardId={board.boardId}
                      title={board.title}
                      image={image}
                      isFavourite={board.isFavourite}
                      deleteBoardAction={deleteBoardAction}
                      updateNameBoardAction={updateNameBoardAction}
                      getBoardByIdAction={getBoardByIdAction}
                      updateFavAction={updateFavAction}
                    />
                  );
                })}

              {/* ➕ Add new board card */}
              <CardBoardEmpty
                Workspaceid={Workspaceid}
                createBoardAction={createBoardAction}
              />
            </>
          ) : (
            /* When there are no boards, still allow creating a new one */
            <CardBoardEmpty
              Workspaceid={Workspaceid}
              createBoardAction={createBoardAction}
            />
          )}
        </div>
      </div>

      {/* Right sidebar - member info */}
      <div className="col-span-3 p-2">
        <CardMember />
      </div>
    </div>
  );
}
