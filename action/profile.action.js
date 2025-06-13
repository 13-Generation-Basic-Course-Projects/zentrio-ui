'use server';

import { Token } from "@/constant/token";
import {
  getCurrentUserProfileService,
  getUserAchievementService,
  updateAchievementService,
  updateUserProfileService,
} from "@/service/profile.service";
import { revalidatePath } from "next/cache";


export const getCurrentUserProfileAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("token", token);
  const result = await getCurrentUserProfileService({
    token,
  });
  return result;
};

export const updateUserProfileAction = async (data) => {
  const userToken = await Token();
  const token = userToken.Credential;
    const genderMap = {
      female: "FEMALE",
      male: "MALE",
      other: "OTHER",
    };

    if (data.gender) {
      const normalizedGender = genderMap[data.gender.toLowerCase()];
      if (normalizedGender) {
        data.gender = normalizedGender;
      }
    }
    
    try {
      const updatedData = await updateUserProfileService({
        token,
        userData: data,
      });
      revalidatePath('/profile')
      return updatedData;
    } catch (err) {
      console.error("Error in updateUserProfileAction:", err);
      return { success: false, error: err.message || "Unknown error" };
    }
};


export const updateAchievementAction = async (payload) => {
  console.log("paylaod data", payload);
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await updateAchievementService({ token, payload });
  revalidatePath('/profile')
  return result;
}


export const getUserAchievementAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getUserAchievementService({
    token
  });
  return result;
}
