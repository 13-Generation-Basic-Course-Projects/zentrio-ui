"use server";

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
    console.error("Notification API error:", response.status, text);
    throw new Error("Failed to send notification");
  }

  // Only parse if content exists
  const resultText = await response.text();
  try {
    return JSON.parse(resultText);
  } catch (err) {
    console.warn("Response is not valid JSON:", resultText);
    return { message: "Notification sent, but no JSON returned" };
  }
};

export const sendNotificationToUserIdService = async ({
  senderId,
  receiverId,
  taskId,
  data,
  token,
}) => {
  const url = notificationRouteGroup.sendNotificationToUserId(
    senderId,
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
      body: JSON.stringify(data),
    });

    const resultText = await response.text(); // Get text first

    if (!response.ok) {
      throw new Error(
        `Failed to send notification. Status: ${response.status}. Body: ${resultText}`
      );
    }

    // Try to parse JSON, fallback to plain text
    try {
      return JSON.parse(resultText); // will succeed if backend returns JSON
    } catch (err) {
      // If parsing fails, return plain text response as message
      return {
        message: resultText || "Notification sent (no JSON returned)",
      };
    }
  } catch (error) {
    console.error("Error sending notification to user:", error.message);
    throw error;
  }
};


export const getNotificationForUserIdService = async({ userId, token }) => {
  const response = await fetch(notificationRouteGroup.getNotificationForUserId(userId),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    throw new Error("Can't get notification data")
  }
  const data = await response.json();
  return data;
}