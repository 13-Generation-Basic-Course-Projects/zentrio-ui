import React from "react";
import ActiveBoards from "./ActiveBoards";
import OtherBoards from "./OtherBoards";
import ActiveBoardsOther from "./ActiveBoardsOther";
import OtherBoardsOther from "./OtherBoardsOther";

export default function AchievmentComponentOther({
  currentUserProfile,
  userAchievement,
  MemberDetails,
  userId,
  otherUserAchivement

}) {
  return (
    <div className="min-h-screen p-2">
      <div className="grid grid-cols-1 md:grid-cols-[55%_43%] gap-6 mt-6">
        {/* Active Boards */}
        <div className="max-h-[calc(100vh-12rem)]  overflow-y-auto scrollbar-hidden pb-[250px] px-2">
          <ActiveBoardsOther
            currentUserProfile={currentUserProfile}
            userAchievement={userAchievement}
            otherUserAchivement={otherUserAchivement}

          />
        </div>

        <div className="max-h-[calc(100vh-12rem)]  overflow-y-auto scrollbar-hidden pb-[200px]">
          <OtherBoardsOther
            currentUserProfile={currentUserProfile}
            userAchievement={userAchievement}
            MemberDetails={MemberDetails}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
}
