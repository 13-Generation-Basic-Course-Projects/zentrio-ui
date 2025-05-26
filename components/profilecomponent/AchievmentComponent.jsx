import React from "react";
import ProfileDetailsCard from "./ProfileDetailsCard";
import ActiveBoards from "./ActiveBoards";
import OtherBoards from "./OtherBoards";

export default function AchievmentComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[55%_43%] gap-6 mt-6">
      {/* Active Boards */}
      <ActiveBoards />
      <div className="space-y-6">
        <OtherBoards />
      </div>
    </div>
  );
}
