// ProfileComponent.jsx
import React from "react";
import ProfileDetailsCard from "./ProfileDetailsCard";
import ActiveBoards from "./ActiveBoards";

export default function ProfileComponent({
  currentUserProfile,
  userAchievement,
}) {
  return (
    <div className="min-h-screen p-2">
      <div className="grid grid-cols-1 md:grid-cols-[43%_55%] gap-2 ">
        {/* Left Column: Profile Details */}
        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hidden  pb-[350px] p-2">
          <ProfileDetailsCard currentUserProfile={currentUserProfile} userAchievement={userAchievement} />
        </div>

        {/* Right Column: Active Boards */}
        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hidden  pb-[250px] p-2">
          <ActiveBoards
            currentUserProfile={currentUserProfile}
            userAchievement={userAchievement}
          />
        </div>
      </div>
    </div>
  );
}
