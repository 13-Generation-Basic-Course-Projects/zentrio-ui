import React from "react";
import ProfileDetailsCard from "./ProfileDetailsCard";
import ActiveBoards from "./ActiveBoards";

export default function ProfileComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[43%_55%] gap-6 mt-6">
      <div className="space-y-6">
        {/* Overall Board Completeness */}
        <div className="p-4 rounded-xl shadow bg-white">
          <h3 className="text-md font-semibold mb-2">
            Overall Board Completeness
          </h3>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-progress-blue w-[70%]"></div>
          </div>
          <p className="text-body text-right text-description mt-1">70%</p>
        </div>

        {/* Profile Details */}
        <ProfileDetailsCard />
      </div>

      {/* Active Boards */}
      <ActiveBoards />
    </div>
  );
}
