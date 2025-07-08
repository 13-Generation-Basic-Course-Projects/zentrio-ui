import CardBoardFavorite from "../card/CardBoardFavorite";
import CardMember from "../card/CardMember";
import Bar from "../bredcrum/Bar";

const colorOptions = [
  { key: "red", label: "Red", className: "bg-board-red" },
  { key: "blue", label: "Blue Sky", className: "bg-board-primary" },
  { key: "green", label: "Green", className: "bg-board-green" },
  { key: "purple", label: "Purple", className: "bg-board-purple" },
  { key: "orange", label: "Orange", className: "bg-board-orange" },
  { key: "violet", label: "Violet", className: "bg-board-violet" },
];
export default function MyFavoriteBoard({
  deleteBoardAction,
  updateNameBoardAction,
  updateFavAction,
  myFavBoard,
  memberData,
  memberMap,
}) {
    ("log fav", myFavBoard);
    ("memberDMap fav", memberMap);


  return (
    <div className="w-full grid grid-cols-12 h-full">
      <div className="col-span-9 flex flex-col overflow-hidden p-3 min-h-0">
        <Bar title={"My Favorite Boards"} btn={"see all"} />
        <div className="grid grid-cols-3 gap-3 scrollbar-hidden px-2 pb-[200px] py-4 overflow-y-auto flex-1 min-h-0">
          {myFavBoard.payload?.filter((board) => board.isFavourite).length >
          0 ? (
            myFavBoard.payload
              .filter((board) => board.isFavourite)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
              .map((board, i) => {
                let image = "";
                const boardMembers = memberMap[board.boardId] || [];

                const matchedColor = colorOptions.find(
                  (c) => c.key === board.cover
                );
                if (matchedColor) {
                  image = matchedColor.className; 
                } else if (
                  board.image?.startsWith("http") ||
                  board.image?.startsWith("data:")
                ) {
                  image = board.image; // External URL or data URI
                } else {
                  image = "bg-gray-200";
                }

                return (
                  <CardBoardFavorite
                    key={board.boardId || i}
                    workspaceId={board.workspaceId}
                    boardId={board.boardId}
                    title={board.title}
                    image={image}
                    images={board?.image}
                    isFavourite={board.isFavourite}
                    deleteBoardAction={deleteBoardAction}
                    updateNameBoardAction={updateNameBoardAction}
                    updateFavAction={updateFavAction}
                    role="pm"
                    memberData={boardMembers}
                    isFavBoardDelete={true}
                  />
                );
              })
          ) : (
            <div className="col-span-3 text-gray-500 text-center mt-10">
              No favorite boards found.
            </div>
          )}

          {/* Hidden add new board card */}
          <div className="hidden flex flex-col items-center border-2 border-dashed border-blue-400 rounded-xl p-10 text-center text-blue-400 cursor-pointer hover:bg-blue-50 transition" />
        </div>
      </div>

      <div className="col-span-3 p-2">
        <CardMember members={memberData} />
      </div>
      
    </div>
  );
}
