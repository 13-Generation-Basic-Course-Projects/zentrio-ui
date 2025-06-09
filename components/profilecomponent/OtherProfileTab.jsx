import React from "react";
import ProfileComponent from "./ProfileComponent";
import ProfileComponentOther from "./ProfileComponentOther";

export default function OtherProfileTab({
  MemberDetails,
  userId,
  userIdDetail,
}) {
  console.log("helo", MemberDetails);
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileComponentOther
        MemberDetails={MemberDetails}
        userId={userId}
        userIdDetail={userIdDetail}
      />
    </div>
  );
}
