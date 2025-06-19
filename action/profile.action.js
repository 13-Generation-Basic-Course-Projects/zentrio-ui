"use server";

import { Token } from "@/constant/token";
import {
  getCurrentUserProfileService,
  getPreviewProfileService,
  getUserAchievementService,
  updateAchievementService,
  updateUserProfileService,
} from "@/service/profile.service";
import { revalidatePath } from "next/cache";

export const getCurrentUserProfileAction = async () => {
 const token = await Token();
  console.log("token", token);
  const result = await getCurrentUserProfileService({
    token,
  });
  return result;
};

export const updateUserProfileAction = async (data) => {
 const token = await Token();
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
    revalidatePath("/profile");
    return updatedData;
  } catch (err) {
    console.error("Error in updateUserProfileAction:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
};

export const updateAchievementAction = async (payload) => {
  console.log("paylaod data", payload);
 const token = await Token();
  const result = await updateAchievementService({ token, payload });
  revalidatePath("/profile");
  return result;
};

export const getUserAchievementAction = async () => {
 const token = await Token();
  const result = await getUserAchievementService({
    token,
  });
  return result;
};

export const getPreviewProfileAction = async () => {
 const token = await Token();
  const result = await getPreviewProfileService({
    token,
  });
  return result;
};
