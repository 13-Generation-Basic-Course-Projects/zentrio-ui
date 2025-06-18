// ActiveBoards.jsx
import React from "react";
import { IconEllipsisVertical } from "../icon/everyicon";
import ProgressBar from "./ProgressBar";

export default function ActiveBoards({ userAchievement }) {
  const ownedBoards = userAchievement?.payload?.details?.ownBoard || [];
  const joinedBoards = userAchievement?.payload?.details?.otherBoard || [];
  const allBoards = [...ownedBoards, ...joinedBoards];
  const createdAt = userAchievement?.payload?.createdAt?.split("T")[0] || "";
  // Define a set of base colors for board cards
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

  // Define role-based configuration for board display properties
  const roleConfig = {
    ROLE_MANAGER: {
      display: "Manager",
      showProgress: true,
      isOwner: true,
    },
    ROLE_LEADER: {
      display: "Leader",
      showProgress: false,
      isOwner: false,
    },
    ROLE_MEMBER: {
      display: "Member",
      showProgress: false,
      isOwner: false,
    },
    DEFAULT: {
      display: "Unknown Role",
      showProgress: false,
      isOwner: false,
    },
  };

  // Stable hash function based on string (boardId or boardName)
  const getStableColor = (key) => {
    const hash = Array.from(key || "").reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    return colorPairs[hash % colorPairs.length];
  };

  // Process each board to add derived properties for UI display
  // Map and process boards
  const processedBoards = allBoards.map((board) => {
    const boardTitle = board.title || board.boardName || "Untitled Board";
    const initial = boardTitle.charAt(0).toUpperCase() || "B";

    const key = board.boardId || boardTitle; // Prefer unique ID for hashing
    const selectedColorPair = getStableColor(key);

    const createdDate = board.createdAt?.split("T")[0] || "";
    const config = roleConfig[board.role] || roleConfig.DEFAULT;
    const percent = Math.floor(Math.random() * 101);

    return {
      ...board,
      id: board.boardId,
      title: boardTitle,
      color: selectedColorPair.avatar,
      progressColor: config.showProgress ? selectedColorPair.progress : null,
      textColor: selectedColorPair.text,
      initial,
      createdDate,
      roleDisplay: config.display,
      showProgress: config.showProgress,
      isOwner: config.isOwner,
      isLeader: board.role === "ROLE_LEADER",
      isMember: board.role === "ROLE_MEMBER",
      percent,
    };
  });

  const boards = processedBoards.map((board) => ({
    id: board.boardId,
    title: board.title,
    role: board.roleDisplay,
    color: board.color,
  }));

  // const boards = [
  //   { percent: 25, role: "Owner", color: "bg-progress-red" },
  //   { percent: 50, role: "Team Leader", color: "bg-progress-orange" },
  //   { percent: 75, role: "Owner", color: "bg-progress-blue" },
  //   { percent: 90, role: "Owner", color: "bg-progress-green" },
  //   { percent: 90, role: "Owner", color: "bg-progress-green" },
  //   { percent: 90, role: "Owner", color: "bg-progress-green" },
  //   { percent: 90, role: "Owner", color: "bg-progress-green" },
  //   { percent: 90, role: "Owner", color: "bg-progress-green" },
  //   { percent: 90, role: "Owner", color: "bg-progress-green" },
  // ];

  return (
    <div className="rounded-xl shadow bg-white flex flex-col">
      <div>
        <div className="flex justify-between py-4 px-4 border-b-1 border-stroke">
          <h3 className="text-body font-semibold">Active Boards</h3>
          <IconEllipsisVertical
            strokeWidth={2}
            color={"currentColor"}
            size={6}
          />
        </div>
        <div
          className={`grid grid-cols-2 text-body-sm font-semibold text-description bg-gray-100 p-4`}>
          <span>Board Name</span>
        </div>
        <ul className="p-4 space-y-3 mt-2">
          {processedBoards.map((board) => (
            <li
              key={board.boardId}
              className="grid grid-cols-12 items-center gap-4">
              <div className="flex items-center gap-3 col-span-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${board?.textColor} font-semibold ${board.color}`}>
                  {board.initial}
                </div>
                <div>
                  <p className="font-medium">{board.title}</p>
                  <p className="text-body-sm text-description">
                    Role: {board.isOwner ? "Owner" : board.roleDisplay}
                  </p>
                  <p className="text-label-sm text-description">
                    Date: {createdAt}
                  </p>
                </div>
              </div>
              {board.showProgress && (
                <div className="col-span-9">
                  <ProgressBar
                    percent={board.percent}
                    color={board.progressColor}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
