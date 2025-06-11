import { apiConfig } from "@/constant/baseurl";

export const notificationRouteGroup = {
  sendNotificationToAllUser: () =>
    `${apiConfig.baseUrl}/notifications/sendMessageToAllUsers`,

  sendNotificationToUserId: (receiverId, taskId) =>
    `${apiConfig.baseUrl}/notifications/sendMessageToUser/users/${receiverId}/tasks/${taskId}`,

  getNotificationForUserId: (userId) =>
    `${apiConfig.baseUrl}/notifications/users/${userId}`,
};