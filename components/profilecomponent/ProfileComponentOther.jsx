// ProfileComponent.jsx
import React from "react";
import ProfileDetailsCard from "./ProfileDetailsCard";
import ActiveBoards from "./ActiveBoards";
import ActiveBoardsOther from "./ActiveBoardsOther";
import ProfileDetailsCardOther from "./ProfileDetailsCardOther";

export default function ProfileComponentOther({
  currentUserProfile,
  userAchievement,
  MemberDetails,
  userId,
  userIdDetail,
}) {
  //  ("detail the member", MemberDetails);
  //  ("88", userIdDetail);
  return (
    <div className="min-h-screen p-2">
      <div className="grid grid-cols-1 md:grid-cols-[43%_55%] gap-2 ">
        {/* Left Column: Profile Details */}
        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hidden  pb-[350px] p-2">
          <ProfileDetailsCardOther
            currentUserProfile={currentUserProfile}
            MemberDetails={MemberDetails?.payload}
            userId={userId}
            userIdDetail={userIdDetail}
          />
        </div>

        {/* Right Column: Active Boards */}
        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hidden  pb-[350px] px-2">
          <ActiveBoardsOther
            currentUserProfile={currentUserProfile}
            userAchievement={userAchievement}
            MemberDetails={MemberDetails?.payload}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
}
