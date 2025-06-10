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


export const getNotificationForUserIdService = async ({ userId, token }) => {
  // Ensure userId is not undefined here, if it is, the URL will be malformed
  if (!userId) {
    throw new Error("User ID is required for fetching notifications.");
  }
  if (!token) {
    throw new Error(
      "Authentication token is required for fetching notifications."
    );
  }

  // Define url *before* using it
  const url = notificationRouteGroup.getNotificationForUserId(userId);

  // Place console.log statements *before* the fetch call
  console.log("Fetching notifications from URL:", url); // Debugging: log the URL
  console.log(
    "Using token (first 10 chars):",
    token ? token.substring(0, 10) + "..." : "No Token"
  ); // Debugging: log token (partially)

  const response = await fetch(
    url, // First argument: the URL
    {
      // Second argument: the options object
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    // Attempt to read the error body for more details
    let errorDetail = "No additional error detail available.";
    try {
      errorDetail = await response.text();
    } catch (e) {
      // Ignore if reading text fails
    }
    console.error(
      `HTTP Error: ${response.status} ${response.statusText} - Response Body: ${errorDetail}`
    );
    throw new Error(
      `Can't get notification data: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
};