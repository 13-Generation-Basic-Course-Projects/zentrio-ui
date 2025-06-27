import React from "react";
import AchievmentComponent from "./AchievmentComponent";
import AchievmentComponentOther from "./AchievmentComponentOther";

export default function OtherAchievmentTab({ MemberDetails, userId ,   otherUserAchivement }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AchievmentComponentOther MemberDetails={MemberDetails} userId={userId}    otherUserAchivement={otherUserAchivement} />
    </div>
  );
}
