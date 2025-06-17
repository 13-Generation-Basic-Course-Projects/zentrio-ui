import React from "react";
import { IconEllipsisVertical } from "../icon/everyicon";

export default function OtherBoards() {
  const boards = [
    { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
    {
      role: "Team Leader",
      color: "bg-gray-300",
      date: "01-Jan-2025 to 01-May-2025",
    },
    { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
    { role: "Owner", color: "bg-gray-300", date: "01-Jan-2025 to 01-May-2025" },
  ];

  return (
    <div className="rounded-xl shadow bg-white  flex flex-col">
      <div className="flex justify-between py-4 px-4 border-b-1 border-stroke">
        <h3 className="text-body font-semibold">Other Boards</h3>
        <IconEllipsisVertical strokeWidth={2} color={"currentColor"} size={6} />
      </div>
      <div className="grid grid-cols-2 text-body-sm font-semibold text-description bg-gray-100 p-4">
        <span>Board Name</span>
      </div>
      <ul className="p-4 space-y-3 mt-2">
        {boards.map((board, index) => (
          <li key={index} className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${board.color}`}
              >
                D
              </div>
              <div>
                <p className="font-medium">Zentrio UI Design</p>
                <p className="text-body-sm text-description">
                  Role: {board.role}
                </p>
                <p className="text-label-sm text-description">
                  Date: {board.date}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
