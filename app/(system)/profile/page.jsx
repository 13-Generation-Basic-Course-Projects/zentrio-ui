import { getAchievementActions } from "@/action/achievement.action";
import { getUserProfile } from "@/action/profile.action";
import Profilepage from "@/components/appserver/Profilepage";
import React from "react";
import { get } from "react-hook-form";
export default async function ProfilePage() {
  // const profiles = await getUserProfile();
  const achievements = await getAchievementActions();
  return (
    <>
      <Profilepage achievements={achievements} />
    </>
  );
}
