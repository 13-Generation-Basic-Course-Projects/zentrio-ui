import React from "react";
import { IconEllipsisVertical } from "../icon/everyicon";

export default function ActiveBoards() {
  const boards = [
    { percent: 25, role: "Owner", color: "bg-red-500" },
    { percent: 50, role: "Team Leader", color: "bg-orange-400" },
    { percent: 75, role: "Owner", color: "bg-blue-500" },
    { percent: 90, role: "Owner", color: "bg-green-500" },
  ];

  return (
    <div className="rounded-xl shadow bg-white">
      <div className="flex justify-between py-4 px-4 border-b-1">
        <h3 className="text-body font-semibold">Active Boards</h3>
        <IconEllipsisVertical strokeWidth={2} color={"currentColor"} size={6} />
      </div>
      <div className="grid grid-cols-2 text-body-sm font-semibold text-gray-500 bg-gray-100 p-4">
        <span>Board Name</span>
        <span>Progress</span>
      </div>
      <ul className="p-4 space-y-3 mt-2">
        {boards.map((board, index) => (
          <li key={index} className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${board.color}`}
              >
                D
              </div>
              <div>
                <p className="font-medium">Zentrio UI Design</p>
                <p className="text-body-sm text-gray-500">Role: {board.role}</p>
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${board.color}`}
                  style={{ width: `${board.percent}%` }}
                ></div>
              </div>
              <p className="text-body-sm text-gray-600 mt-1 text-right">
                {board.percent}%
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
