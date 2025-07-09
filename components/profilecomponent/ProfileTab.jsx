import React from "react";
import ProfileComponent from "./ProfileComponent";

export default function ProfileTab({ currentUserProfile, userAchievement }) {

    ("user achievement", userAchievement);

  return (
    <div className="flex flex-col min-h-screen">
      <ProfileComponent
        currentUserProfile={currentUserProfile}
        userAchievement={userAchievement}
      />
    </div>
  );
}
