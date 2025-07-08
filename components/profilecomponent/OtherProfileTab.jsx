import React from "react";
import ProfileComponent from "./ProfileComponent";
import ProfileComponentOther from "./ProfileComponentOther";

export default function OtherProfileTab({
  MemberDetails,
  userId,
  userIdDetail,
  boardName,
  userAchievement,
}) {
  console.log("helo in other profiletba", userIdDetail);
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileComponentOther
        MemberDetails={MemberDetails}
        userId={userId}
        userIdDetail={userIdDetail}
        boardName={boardName}
        userAchievement={userAchievement}
      />
    </div>
  );
}
