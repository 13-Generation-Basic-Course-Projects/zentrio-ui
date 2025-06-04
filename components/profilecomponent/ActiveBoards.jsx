// ActiveBoards.jsx
import React from "react";
import { IconEllipsisVertical } from "../icon/everyicon";
import ProgressBar from "./ProgressBar";

export default function ActiveBoards({ achievements }) {
  const data = achievements?.payload.ownBoards || [];
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
  //   { percent: 90, role: "Owner", color: "bg-progress-green" },
  //   { percent: 90, role: "Owner", color: "bg-progress-green" },
  //   { percent: 90, role: "Owner", color: "bg-progress-green" },
  //   { percent: 90, role: "Owner", color: "bg-progress-green" },
  //   { percent: 90, role: "Owner", color: "bg-progress-green" },
  // ];

  return (
    <div className="rounded-xl shadow-small bg-white flex flex-col sticky top-0 z-20 overflow-hidden">
      <div>
        <div className="flex justify-between py-4 px-4 border-stroke bg-white">
          <h3 className="text-body font-semibold">Active Boards</h3>
          <IconEllipsisVertical
            strokeWidth={2}
            color={"currentColor"}
            size={6}
          />
        </div>

        <div className="grid grid-cols-2 text-body-sm font-semibold text-description bg-gray-50 p-4">
          <span>Board Name</span>
        </div>

        <ul className="p-4 space-y-3 mt-2">
          {data.map((board) => {
            const colors = [
              "bg-slate-blue",
              "bg-slate-red",
              "bg-slate-purple",
              "bg-slate-orange",
            ];

            const progressColors = [
              "bg-progress-blue",
              "bg-progress-red",
              "bg-progress-purple",
              "bg-progress-orange",
              "bg-progress-green",
            ];
            const progressColor =
              progressColors[Math.floor(Math.random() * progressColors.length)];

            const colorIndex =
              Math.abs(board.boardName?.charCodeAt(0) || 0) % colors.length;
            const color = colors[colorIndex];
            const initial = board.boardName?.charAt(0).toUpperCase() || "B";

            return (
              <li
                key={board.boardId}
                className="grid grid-cols-12 items-center gap-4">
                <div className="flex items-center gap-3 col-span-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-slate-400 font-semibold ${color}`}>
                    {initial}
                  </div>
                  <div>
                    <p className="font-medium">{board.boardName}</p>
                    <p className="text-body-sm text-description">
                      Role: {board.role === "ROLE_MANAGER" ? "Owner" : " "}
                    </p>
                    <p className="text-label-sm text-description">
                      Date: {board.createdAt?.split("T")[0] || " "}
                    </p>
                  </div>
                </div>
                <div className="col-span-9">
                  <ProgressBar percent={board.percent} color={progressColor} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
  
}
