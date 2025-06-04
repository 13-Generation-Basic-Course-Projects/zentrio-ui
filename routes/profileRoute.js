import { apiConfig } from "@/constant/baseurl";
import { get } from "react-hook-form";

export const profileRoute = {
  getUserProfile: `${apiConfig.baseUrl}/profiles/preview-profile`, // Get user profile current userId
  // getOtherProfile: (userId) => `${apiConfig.baseUrl}/profiles/preview-profile/${userId}`, // Get other user profile by userId

};
