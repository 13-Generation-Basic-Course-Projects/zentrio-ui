"use server";

import { Token } from "@/constant/token";
import {
  getCurrentUserProfileService,
  getOtherAchivementByIdService,
  getPreviewProfileService,
  getUserAchievementService,
  updateAchievementService,
  updateProfileImageService,
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
    revalidatePath("/profile");
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
  revalidatePath("/profile");
  return result;
};

export const getUserAchievementAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getUserAchievementService({
    token,
  });
  return result;
};


export const getOtherAchivementByIdAction= async ({userId}) => {
  console.log("userId member",userId)
    const userToken = await Token();
  const token = userToken.Credential;
  const result = await getOtherAchivementByIdService({
    token,
    userId
  });
  return result;
}

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
  revalidatePath("/updateProfile");
  return result;
};
