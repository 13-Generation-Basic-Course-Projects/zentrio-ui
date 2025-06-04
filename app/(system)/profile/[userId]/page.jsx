import { getOtherAchievementActions } from "@/action/achievement.action";
import OtherUserProfile from "@/components/appserver/OtherProfilepage";
import React from "react";

export default async function MemberProfile({ params }) {
  const { userId } = params;
  const otherAchievement = await getOtherAchievementActions(userId);
  console.log("otherAchievement", otherAchievement);
  return (
    <OtherUserProfile otherAchievement={otherAchievement}/>
  );
}
