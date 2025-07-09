import React from "react";
import ActiveBoards from "./ActiveBoards";
import OtherBoards from "./OtherBoards";

export default function AchievmentComponent({
  currentUserProfile,
  userAchievement,
}) {
    ("in achievement compo", currentUserProfile);
  return (
    <div className="min-h-screen p-2">
      <div className="grid grid-cols-1 md:grid-cols-[55%_43%] gap-6 mt-6">
        {/* Active Boards */}
        <div className="max-h-[calc(100vh-12rem)]  overflow-y-auto scrollbar-hidden pb-[250px] p-2">
          <ActiveBoards
            currentUserProfile={currentUserProfile}
            userAchievement={userAchievement}
          />
        </div>

        <div className="max-h-[calc(100vh-12rem)]  overflow-y-auto scrollbar-hidden pb-[200px]">
          <OtherBoards
            currentUserProfile={currentUserProfile}
            userAchievement={userAchievement}
          />
        </div>
      </div>
    </div>
  );
}
