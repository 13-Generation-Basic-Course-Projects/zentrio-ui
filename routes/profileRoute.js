import { apiConfig } from "@/constant/baseurl";

export const profileRouteGroup = {
  // get current user profile information
  getCurrentUserProfile: () => `${apiConfig.baseUrl}/achievements/current`,

  // update current user information
  updateCurrentUserProfile: () =>
    `${apiConfig.baseUrl}/profiles/update-profile`,

  // set up current user achievement
  setUpAchievementCurrentUser: () => `${apiConfig.baseUrl}/achievements`,

  // update achievement for current user
  updateAchievementCurrentUser: () => `${apiConfig.baseUrl}/achievements`,

  // get current user achievement after update data
  getCurrentUserAchievement: () =>
    `${apiConfig.baseUrl}/achievements/my-achievement`,

  //Fetches the details of the currently authenticated user.
  getPreviewProfile: () => `${apiConfig.baseUrl}/profiles/preview-profile`,

  //updateCurrentProfile
  updateProfileImgae:()=>`${apiConfig.baseUrl}/files/upload-file`,

  //get other achivement
  getOtherAchivementById: (userId) => `${apiConfig.baseUrl}/achievements/users/${userId}`
};
