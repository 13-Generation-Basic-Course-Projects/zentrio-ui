import { apiConfig } from "@/constant/baseurl";

export const profileRouteGroup = {
  // get current user profile information
  getCurrentUserProfile: () => `${apiConfig.baseUrl}/achievements/current`,

  // update current user information
  updateCurrentUserProfile: () =>
    `${apiConfig.baseUrl}/profiles/update-profile`,

  // set up current user achievement
  setUpAchievementCurrentUser: () =>
    `${apiConfig.baseUrl}/achievements`,

  // update achievement for current user
  updateAchievementCurrentUser: () => `${apiConfig.baseUrl}/achievements`,

  // get current user achievement after update data
  getCurrentUserAchievement: () =>
    `${apiConfig.baseUrl}/achievements/my-achievement`,
};
