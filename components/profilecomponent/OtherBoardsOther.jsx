import React from "react";
import { IconEllipsisVertical } from "../icon/everyicon";

export default function OtherBoardsOther({ currentUserProfile }) {
  const otherBoards = currentUserProfile?.payload?.joinedBoards || [];
  // const boards = [
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   {
  //     role: "Team Leader",
  //     color: "bg-gray-300",
  //     date: "01-Jan-2025 to 01-May-2025",
  //   },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  //   { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  // ];

  const roleLabels = {
    ROLE_LEADER: "Leader",
    ROLE_MEMBER: "Member",
  };
  const getRoleLabel = (role) => roleLabels[role] || "N/A";

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];

  const colorPairs = [
    {
      avatar: "bg-slate-green",
      progress: "bg-green-400",
      text: "text-green-400",
    },
    {
      avatar: "bg-slate-orange",
      progress: "bg-orange-200",
      text: "text-orange-300",
    },
    {
      avatar: "bg-slate-purple",
      progress: "bg-gray-400",
      text: "text-gray-400",
    },
    {
      avatar: "bg-slate-blue",
      progress: "bg-blue-300",
      text: "text-blue-300",
    },
  ];

  // Stable color assignment based on board ID or name
  const getStableRandomColor = (key) => {
    const hash = Array.from(key || "").reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    return colorPairs[hash % colorPairs.length];
  };

  // Map and enrich `otherBoards` before rendering
  const processedBoards = otherBoards.map((board) => {
    const color = getStableRandomColor(board.boardId || board.boardName);
    const initial = board.boardName?.charAt(0).toUpperCase() || "B";
    const createdDate = board.createdAt?.split("T")[0] || "N/A";
    const updatedDate = board.updatedAt?.split("T")[0] || "N/A";

    return {
      ...board,
      initial,
      color: color.avatar,
      textColor: color.text,
      createdDate,
      updatedDate,
    };
  });

  return (
    <div className="rounded-xl shadow bg-white  flex flex-col">
      <div className="flex justify-between px-4 border-b-1 border-stroke">
        <h3 className="text-body font-semibold">Other Boards</h3>
      </div>
      <div className="grid grid-cols-2 text-body-sm font-semibold text-description bg-gray-100 p-4">
        <span>Board Name</span>
      </div>
      <ul className="p-4 space-y-3 mt-2">
        {processedBoards.map((board, index) => (
          <li key={index} className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${board.textColor} font-semibold ${board.color}`}
              >
                {board.initial}
              </div>
              <div>
                <p className="font-medium">{board.boardName}</p>
                <p className="text-body-sm text-description">
                  Role: {getRoleLabel(board.role)}
                </p>
                <p className="text-label-sm text-description">
                  Date: {board.createdDate} to {board.updatedDate}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
