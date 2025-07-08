"use server";

import { Token } from "@/constant/token";
import {
  getCurrentUserProfileService,
  getPreviewProfileService,
  getUserAchievementService,
  updateAchievementService,
  updateProfileImageService,
  updateUserProfileService,
} from "@/service/profile.service";
import { revalidatePath, revalidateTag } from "next/cache";

export const getCurrentUserProfileAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("token", token);
  const result = await getCurrentUserProfileService({
    token,
  });
  console.log("Result current user action : ", result);
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
    revalidateTag("profile");
    return updatedData;
  } catch (err) {
    console.error("Error in updateUserProfileAction:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
};

export const updateAchievementAction = async (payload) => {
  console.log("PAYLOAD DATA IN ACTION", payload);
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await updateAchievementService({ token, payload });
  revalidateTag("profile");
  revalidateTag("achievements");
  return result;
};

export const getUserAchievementAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getUserAchievementService({
    token,
  });
  console.log("resulttttttttt: ", result);
  return result;
};

export const getPreviewProfileAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getPreviewProfileService({
    token,
  });
  return result;
};



export const updateProfileImageAction = async ({formData}) => {
  console.log("paylaod data", formData);
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await updateProfileImageService({ token, formData });
  revalidateTag("profile");
  return result;
};
