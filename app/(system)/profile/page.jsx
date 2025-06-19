import {
  getCurrentUserProfileAction,
  getUserAchievementAction,
} from "@/action/profile.action";
import Profilepage from "@/components/appserver/Profilepage";
import React from "react";
export default async function ProfilePage() {
  /*
   * This function is the main entry point for the profile page.
   */
  const currentUserProfile = await getCurrentUserProfileAction();

  /*
   * This function is to get the achievement when user update.
   */
  const userAchievement = await getUserAchievementAction();

  return (
    <Profilepage
      currentUserProfile={currentUserProfile}
      userAchievement={userAchievement}
    />
  );
}
