"use server";

import { Token } from "@/constant/token";
import {
  getNotificationForUserIdService,
  sendNotificationForAllUserService,
  sendNotificationToUserId,
  sendNotificationToUserIdService,
} from "@/service/notification.service";

export const sendNotificationForAllUserAction = async ({ data }) => {
  const userToken = await Token();
  const token = userToken.Credential;
  try {
    const result = await sendNotificationForAllUserService({ data, token });
    return result;
  } catch (error) {
    console.error("Failt to send notification to users");
  }
};

export const sendNotificationToUserIdAction = async ({
  receiverId,
  taskId,
  data,
}) => {
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    // Call the service with token included
    const result = await sendNotificationToUserIdService({
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
    const token = userToken.Credential; // Assuming Credential is the property holding the token

    if (!token) {
      console.error(
        "Authentication token is missing. Cannot proceed with fetching notifications."
      );
      throw new Error("Authentication token missing.");
    }

    const result = await getNotificationForUserIdService({ userId, token });
    return result;
  } catch (error) {
    // Catch specific errors if needed, otherwise re-throw or handle generically
    console.error("Failed to get notification for user:", error.message);
    throw error; // Re-throwing the error to be handled by the caller of the action
  }
};
