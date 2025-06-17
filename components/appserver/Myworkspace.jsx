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
  memberData,
}) {
  console.log("Workspace id in myworkspace: ", Workspaceid);

  console.log("Data in my workspace: ", memberData);
  return (
    <>
      {getBoardByWorkspaceId?.status === 404 ||
      !Array.isArray(getBoardByWorkspaceId?.payload) ? (
        <div className="w-full grid grid-cols-12 h-full">
          {/* Main board area - left 9 columns */}
          <div className="col-span-9 flex flex-col overflow-hidden p-3 min-h-0">
            <Bar title="My Boards" btn="see all" />

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center flex-1 py-10 text-center">
              <div className="w-[127px] h-[127px] mb-4">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Magnifying Glass */}
                  <line
                    x1="23.43"
                    y1="23.401"
                    x2="21.214"
                    y2="21.186"
                    stroke="#455A64"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M29.914,27.086l-3.5-3.5c-0.756-0.756-2.072-0.756-2.828,0C23.208,23.964,23,24.466,23,25s0.208,1.036,0.586,1.414l3.5,3.5
        c0.378,0.378,0.88,0.586,1.414,0.586s1.036-0.208,1.414-0.586S30.5,29.034,30.5,28.5S30.292,27.464,29.914,27.086z"
                    stroke="#455A64"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  {/* Circle */}
                  <circle
                    cx="13"
                    cy="13"
                    r="11.5"
                    stroke="#455A64"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  {/* Mouth */}
                  <path
                    d="M12,15.521c0-0.55,0.45-1,1-1s1,0.45,1,1"
                    stroke="#455A64"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />

                  {/* Eyes */}
                  <circle cx="17.5" cy="13.5" r="0.5" fill="#263238" />
                  <circle cx="8.5" cy="13.5" r="0.5" fill="#263238" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-700">
                This workspace was not found
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                It may have been deleted or you don’t have permission to access
                it.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-12 h-full">
          {/* Main board area - left 9 columns */}
          <div className="col-span-9 flex flex-col overflow-hidden p-3 min-h-0">
            <Bar title={"My Boards"} btn={"see all"} />

            <div className="grid grid-cols-3 gap-3 scrollbar-hidden px-2 pb-[200px] py-4 overflow-y-auto flex-1 min-h-0">
              {getBoardByWorkspaceId.payload.length > 0 ? (
                <>
                  {/* ➕ Add new board card */}
                  <CardBoardEmpty
                    Workspaceid={Workspaceid}
                    createBoardAction={createBoardAction}
                  />
                  {getBoardByWorkspaceId.payload
                    .slice() // avoid mutating original array
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    ) // sort by newest
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
                          workspaceId={board?.workspaceId}
                          boardId={board?.boardId}
                          title={board?.title}
                          image={image}
                          isFavourite={board?.isFavourite}
                          deleteBoardAction={deleteBoardAction}
                          updateNameBoardAction={updateNameBoardAction}
                          getBoardByIdAction={getBoardByIdAction}
                          updateFavAction={updateFavAction}
                        />
                      );
                    })}
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
            <CardMember members={memberData} />
          </div>
        </div>
      )}
    </>
  );
}
