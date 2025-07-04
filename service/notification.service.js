"use server";

import { apiConfig } from "@/constant/baseurl";
import { notificationRouteGroup } from "@/routes/notificationRoute";

export const sendNotificationForAllUserService = async ({ token, data }) => {
  const response = await fetch(
    notificationRouteGroup.sendNotificationToAllUser(),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const text = await response.text(); // Log raw body
    //console.error("Notification API error:", response.status, text);
    throw new Error("Failed to send notification");
  }

  // Only parse if content exists
  const resultText = await response.text();
  try {
    return JSON.parse(resultText);
  } catch (err) {
    //console.warn("Response is not valid JSON:", resultText);
    return { message: "Notification sent, but no JSON returned" };
  }
};

export const sendNotificationToUserIdService = async (
  receiverId,
  taskId,
  data,
  token
) => {
  const url = notificationRouteGroup.sendNotificationToUserId(
    receiverId,
    taskId
  );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data), // wrap data inside an object
    });

    const resultText = await response.text();

    if (!response.ok) {
      throw new Error(
        `Failed to send notification. Status: ${response.status}. Body: ${resultText}`
      );
    }

    try {
      return JSON.parse(resultText);
    } catch (err) {
      return {
        message: resultText || "Notification sent (no JSON returned)",
      };
    }
  } catch (error) {
    //console.error("Error sending notification to user:", error.message);
    throw error;
  }
};

export const getNotificationForUserIdService = async ({ userId, token }) => {

  console.log("user id service", userId);
  // Validate userId to ensure it's not undefined or null before making the request
  if (!userId) {
    //console.error(
   //   "Error: userId is undefined or null. Cannot fetch notifications."
    //);
    throw new Error("userId is required to fetch notifications.");
  }

  const url = notificationRouteGroup.getNotificationForUserId(userId);

  const response = await fetch(url, {
    next: {
      tags: ["notifications"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // It's good practice to include Content-Type even for GET requests if applicable
    },
  });

  const data = await response.json();
  return data;
};

export const deleteNotificationByIdService = async (notificationId, token) => {
  if (!notificationId) {
    //console.error(
    //  "Error: notificationId is undefined or null. Cannot delete notification."
    //);
    throw new Error("notificationId is required to delete notification.");
  }

  const url = notificationRouteGroup.deleteNotificationById(notificationId); // ✅ adjust this too

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    //console.log("response", response);

    return response;
  } catch (error) {
    //console.error("Can't delete notification:", error);
    throw error;
  }
};

export const deleteAllNotificationService = async (token) => {
  const url = notificationRouteGroup.deleteAllNotification();
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    //console.error("Can't delete notification:", error);
    throw error;
  }
};

//new

export const sendNotificationToSpecificArrayIdService = async (data, token) => {
  const url = `${apiConfig.baseUrl}/notifications/sendSpecificToUsers`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const resultText = await response.text();

    if (!response.ok) {
      throw new Error(
        `Failed to send notification. Status: ${response.status}. Body: ${resultText}`
      );
    }

    try {
      return JSON.parse(resultText);
    } catch (err) {
      return {
        message: resultText || "Notification sent (no JSON returned)",
      };
    }
  } catch (error) {
    //console.error("Error sending notification:", error.message);
    throw error;
  }
};
