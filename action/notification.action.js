"use server";

import { Token } from "@/constant/token";
import { getNotificationForUserIdService, sendNotificationForAllUserService, sendNotificationToUserId, sendNotificationToUserIdService } from "@/service/notification.service";

export const sendNotificationForAllUserAction = async ({ data }) => {
  const userToken = await Token();
  const token = userToken.Credential;
  try {
    const result = await sendNotificationForAllUserService({ data, token });
    return result;
  } catch (error) {
    console.error("Failt to send notification to users")
  }
  
};

export const sendNotificationToUserIdAction = async ({ senderId, receiverId, taskId, data }) => {
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    // Call the service with token included
    const result = await sendNotificationToUserIdService({
      senderId,
      receiverId,
      taskId,
      data,
      token,
    });

    return result;
  } catch (error) {
    console.error("Failed to send notification to user:", error);
    throw error;
  }
};


export const getNotificationForUserIdAction = async (userId) => {
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    const result = await getNotificationForUserIdService({ userId, token });
    return result;
  } catch (error) {
    console.error("Failed to send notification to user:", error);
    throw error;
  }
}
