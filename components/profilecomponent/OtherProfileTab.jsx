import React from "react";
import ProfileComponent from "./ProfileComponent";
import ProfileComponentOther from "./ProfileComponentOther";

export default function OtherProfileTab({
  MemberDetails,
  userId,
  userIdDetail,
  userAchievement,
}) {
  console.log("helo in other profiletba", userIdDetail);
  console.log("userAchievementtttttt 2: ", userAchievement);
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileComponentOther
        MemberDetails={MemberDetails}
        userId={userId}
        userIdDetail={userIdDetail}
        userAchievement={userAchievement}
      />
    </div>
  );
}
