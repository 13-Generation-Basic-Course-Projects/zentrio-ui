import { apiConfig } from "@/constant/baseurl";

export const notificationRouteGroup = {
  sendNotificationToAllUser: () =>
    `${apiConfig.baseUrl}/notifications/sendMessageToAllUsers`,

  sendNotificationToUserId: () =>
    `${apiConfig.baseUrl}/notifications/sendSpecificToUsers`,

  getNotificationForUserId: (userId) =>
    `${apiConfig.baseUrl}/notifications/users/${userId}`,
  sendNotificationToUseArrayrId: () =>
    `${apiConfig.baseUrl}/notifications/sendSpecificToUsers`,
  deleteNotificationById: (notificationId) =>
    `${apiConfig.baseUrl}/notifications/${notificationId}`,

  deleteAllNotification: () => `${apiConfig.baseUrl}/notifications`,
};
