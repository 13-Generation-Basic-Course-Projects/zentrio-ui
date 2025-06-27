import React from "react";
import ProfileComponent from "./ProfileComponent";
import ProfileComponentOther from "./ProfileComponentOther";

export default function OtherProfileTab({
  MemberDetails,
  userId,
  userIdDetail,
  otherUserAchivement
}) {
  console.log("helo in other profiletba", userIdDetail);
  console.log("otherAchive3",otherUserAchivement)
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileComponentOther
        MemberDetails={MemberDetails}
        userId={userId}
        userIdDetail={userIdDetail}
        otherUserAchivement={otherUserAchivement}
      />
    </div>
  );
}
