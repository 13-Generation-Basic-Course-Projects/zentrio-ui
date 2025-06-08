import React from "react";
import ProfileComponent from "./ProfileComponent";

export default function OtherProfileTab({ MemberDetails, userId }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileComponent MemberDetails={MemberDetails} userId={userId} />
    </div>
  );
}
