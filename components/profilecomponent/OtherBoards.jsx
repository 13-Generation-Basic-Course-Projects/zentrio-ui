import React from "react";
import { IconEllipsisVertical } from "../icon/everyicon";

export default function OtherBoards({ achievements }) {
  const data = achievements?.payload?.joinedBoards || [];
  console.log("achievements", achievements);
  // const boards = [
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   {
  //     role: "Team Leader",
  //     color: "bg-gray-300",
  //     date: "01-Jan-2025 to 01-May-2025",
  //   },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  // ];

  return (
    <div className="rounded-xl bg-white flex flex-col border overflow-hidden">
      <div className="flex justify-between py-4 px-4 sticky top-0 bg-white">
        <h3 className="text-lg font-semibold ">Other Boards</h3>
        <IconEllipsisVertical strokeWidth={2} color={"currentColor"} size={6} />
      </div>
      <div className="grid grid-cols-2 text-body-sm font-semibold text-description bg-gray-50 p-4">
        <span>Board Name</span>
      </div>
      <ul className="p-4 space-y-3 mt-2">
        {data.map((board, index) => {
          const colors = [
            "bg-slate-blue",
            "bg-slate-red",
            "bg-slate-purple",
            "bg-slate-orange",
          ];
          const colorIndex =
            Math.abs(board.boardName?.charCodeAt(0) || 0) % colors.length;
          const color = colors[colorIndex];
          const initial = board.boardName?.charAt(0).toUpperCase() || "B";

          return (
            <li key={index} className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-slate-400 font-semibold ${color}`}>
                  {initial}
                </div>
                <div>
                  <p className="font-medium">{board.boardName}</p>
                  <p className="text-body-sm text-description">
                    Role:{" "}
                    {board.role === "ROLE_LEADER"
                      ? "Leader"
                      : board.role === "ROLE_MEMBER"
                      ? "Member"
                      : " "}
                  </p>
                  <p className="text-label-sm text-description">
                    Date: {board.createdAt.split("T")[0]} to{" "}
                    {board.updatedAt.split("T")[0]}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
