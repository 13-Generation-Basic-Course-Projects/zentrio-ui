// ActiveBoards.jsx
import React from "react";
import { IconEllipsisVertical } from "../icon/everyicon";
import ProgressBar from "./ProgressBar";

export default function ActiveBoards({ userAchievement }) {
  const boards = userAchievement?.payload?.boards || [];

  console.log("userAchievement in ActiveBoards:", userAchievement);

  // Define color pairs for board avatars
  const colorPairs = [
    {
      avatar: "bg-slate-green",
      progress: "bg-green-400",
      text: "text-green-400",
    },
    {
      avatar: "bg-slate-orange",
      progress: "bg-orange-400",
      text: "text-orange-400",
    },
    {
      avatar: "bg-slate-purple",
      progress: "bg-purple-400",
      text: "text-purple-400",
    },
    {
      avatar: "bg-slate-blue",
      progress: "bg-blue-400",
      text: "text-blue-400",
    },
  ];

  // Generate stable color based on board ID
  const getStableColor = (boardId) => {
    const hash = Array.from(boardId || "").reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    return colorPairs[hash % colorPairs.length];
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return dateString.split("T")[0];
  };

  // Calculate completion percentage
  const calculateCompletionRate = (completedTasks, totalTasks) => {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  // Process boards data for UI display
  const processedBoards = boards.map((board) => {
    const boardTitle = board.title || "Untitled Board";
    const initial = boardTitle.charAt(0).toUpperCase() || "B";
    const colorPair = getStableColor(board.boardId);

    // Calculate actual completion rate from tasks
    const completionPercent = calculateCompletionRate(
      board.completedTasks || 0,
      board.totalTasks || 0
    );

    return {
      id: board.boardId,
      title: boardTitle,
      initial,
      totalTasks: board.totalTasks || 0,
      completedTasks: board.completedTasks || 0,
      completionPercent,
      completionRate: board.completionRate || "0%", // Keep original for reference
      color: colorPair.avatar,
      progressColor: colorPair.progress,
      textColor: colorPair.text,
      // Since role info isn't in backend response, we'll assume manager role
      // You may want to add this to your backend response
      role: "Manager", // This should come from backend
      createdDate: formatDate(board.createdAt), // Use board-level createdAt when available
    };
  });

  return (
    <div className="rounded-xl shadow bg-white flex flex-col">
      <div>
        {/* Header */}
        <div className="flex justify-between py-4 px-4 border-b-1 border-stroke">
          <h3 className="text-body font-semibold">Active Boards</h3>
          <IconEllipsisVertical
            strokeWidth={2}
            color={"currentColor"}
            size={6}
          />
        </div>

        {/* Column Headers - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-12 text-body-sm font-semibold text-description bg-gray-100 p-4">
          <span className="col-span-4">Board Name</span>
          <span className="col-span-4">Tasks Progress</span>
          <span className="col-span-4 text-right">Completion</span>
        </div>

        {/* Board List */}
        <ul className="p-2 md:p-4 space-y-3 md:space-y-4">
          {processedBoards.length > 0 ? (
            processedBoards.map((board) => (
              <li
                key={board.id}
                className="block md:grid md:grid-cols-12 md:items-center md:gap-4 p-3 md:p-0  rounded-lg md:rounded-none"
              >
                {/* Mobile Layout */}
                <div className="md:hidden space-y-3">
                  {/* Board Info */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${board.textColor} font-semibold ${board.color} flex-shrink-0`}
                    >
                      {board.initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm" title={board.title}>
                        {board.title}
                      </p>
                      <p className="text-xs text-description">
                        Role: {board.role}
                      </p>
                      <p className="text-xs text-description">
                        Total: {board.totalTasks} tasks
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span
                        className={`text-lg font-semibold ${board.textColor}`}
                      >
                        {board.completionPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Task Progress */}
                  <div>
                    <div className="text-xs text-gray-600 mb-1">
                      {board.completedTasks} / {board.totalTasks} tasks
                      completed
                    </div>
                    <ProgressBar
                      percent={board.completionPercent}
                      color={board.progressColor}
                    />
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:contents">
                  {/* Board Info */}
                  <div className="flex items-center gap-3 col-span-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${board.textColor} font-semibold ${board.color}`}
                    >
                      {board.initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate" title={board.title}>
                        {board.title}
                      </p>
                      <p className="text-body-sm text-description">
                        Role: {board.role}
                      </p>
                      <p className="text-body-sm text-description">
                        Totals: {board.totalTasks} tasks
                      </p>
                    </div>
                  </div>

                  {/* Task Progress */}
                  <div className="col-span-7">
                    <div className="text-sm text-gray-600 mb-1">
                      {board.completedTasks} / {board.totalTasks} tasks
                    </div>
                    <ProgressBar
                      percent={board.completionPercent}
                      color={board.progressColor}
                    />
                  </div>

                  {/* Completion Rate */}
                  <div className="col-span-1 text-right">
                    <span
                      className={`text-lg font-semibold ${board.textColor}`}
                    >
                      {board.completionPercent}%
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center py-8 text-gray-500">
              No active boards found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
