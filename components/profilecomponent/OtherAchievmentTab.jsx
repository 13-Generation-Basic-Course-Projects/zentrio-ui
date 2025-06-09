import React from "react";
import AchievmentComponent from "./AchievmentComponent";
import AchievmentComponentOther from "./AchievmentComponentOther";

export default function OtherAchievmentTab({ MemberDetails, userId }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AchievmentComponentOther MemberDetails={MemberDetails} userId={userId} />
    </div>
  );
}
