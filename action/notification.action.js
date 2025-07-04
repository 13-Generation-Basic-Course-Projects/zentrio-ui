"use server";

import { Token } from "@/constant/token";
import {
  deleteAllNotificationService,
  deleteNotificationByIdService,
  getNotificationForUserIdService,
  sendNotificationForAllUserService,
  sendNotificationToUserIdService,
} from "@/service/notification.service";
import { revalidatePath, revalidateTag } from "next/cache";

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

export const sendNotificationToUserIdAction = async (
  receiverId,
  taskId,
  data
) => {
  try {
    const userToken = await Token();
    const token = userToken.Credential;
    // Call the service with token included
    const result = await sendNotificationToUserIdService(
      receiverId,
      taskId,
      data,
      token
    );
    revalidateTag("notifications");
    return result;
  } catch (error) {
    console.error("Failed to send notification to user:", error);
    throw error;
  }
};

export const getNotificationForUserIdAction = async (userId) => {
  console.log("userrrrrrrrrrrrrrrrrrrrrrrrr id Action", userId);
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

export const deleteNotificationByIdAction = async (notificationId) => {
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    if (!token) {
      console.error("Authentication token is missing.");
      return { error: "Authentication token missing" }; // Plain object
    }

    const result = await deleteNotificationByIdService(notificationId, token);
    revalidateTag("notifications");

    // Ensure the result is a plain object
    const plainResult = {
      success: true,
      id: notificationId,
      // Add other serializable properties if needed
    };

    return plainResult; // Return a plain object
  } catch (error) {
    console.error("Failed to delete notification:", error.message);
    return { error: error.message }; // Return a plain object
  }
};

export const deleteAllNotificationAction = async () => {
  try {
    const userToken = await Token();
    const token = userToken?.Credential;

    if (!token) {
      console.error("Authentication token is missing.");
      return { error: "Authentication token missing" };
    }

    const result = await deleteAllNotificationService(token);
    revalidateTag("notifications");
    const plainResult = {
      success: true,
    };
    return plainResult;
  } catch (error) {
    console.error("Failed to delete all notifications:", error);
    return { error: error.message || "Unknown error occurred" };
  }
};
