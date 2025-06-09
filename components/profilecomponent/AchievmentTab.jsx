import React from "react";
import AchievmentComponent from "./AchievmentComponent";

export default function AchievmentTab({ currentUserProfile, userAchievement }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AchievmentComponent
        currentUserProfile={currentUserProfile}
        userAchievement={userAchievement}
      />
    </div>
  );
}
