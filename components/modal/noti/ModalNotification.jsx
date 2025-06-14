"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import notification from "../../../assets/notification.png";
import ActiveIcon from "@/assets/profile.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  deleteAllNotificationAction,
  deleteNotificationByIdAction,
} from "@/action/notification.action";
import { assignLeaderAction, declineLeaderAction } from "@/action/board.action";
import { toast } from "react-toastify";

export default function ModalNotification({ notificationData }) {
  const [isActive, setIsActive] = useState(false);
  const [markAllRead, setMarkAllRead] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState({});

  // Process notificationData to create notifications array
  useEffect(() => {
    if (!notificationData || !Array.isArray(notificationData?.payload)) {
      console.warn("Invalid notificationData:", notificationData);
      setNotifications([]);
      return;
    }

    const formatted = notificationData.payload.map((item, index) => {
      let contentObj = { message: "No content", type: "general" };
      try {
        // Parse content if it's a JSON string
        if (item.content && typeof item.content === "string") {
          contentObj = JSON.parse(item.content);
        }
      } catch (err) {
        // console.error("Failed to parse content JSON:", item.content, err);
      }

      return {
        id: item.id ?? index,
        content:
          contentObj.message ?? item.message ?? item.content ?? "No content",
        action: item.action ?? "",
        createdAt: item.createdAt?.split("T")[0] ?? item.date ?? "",
        read: item.read ?? item.isRead ?? false,
        notificationId: item.notificationId ?? item.id ?? index,
        sender: item.sender
          ? {
              userId: item.sender.userId,
              username: item.sender.username,
              email: item.sender.email,
              contact: item.sender.contact,
              gender: item.sender.gender,
              location: item.sender.location,
              position: item.sender.position,
              profileImage: item.sender.profileImage,
            }
          : {
              userId: null,
              username: "Unknown Sender",
            },
        type: contentObj.type ?? item.type ?? "general",
        taskId: contentObj.taskId ?? item.taskId ?? null,
        assignId: contentObj.assignId ?? item.assignId ?? null,
        taskTitle: contentObj.taskTitle ?? item.taskTitle ?? null,
      };
    });
    console.log("Formatted notifications:", formatted);
    setNotifications(formatted);
  }, [notificationData]);

  // Mark all notifications as read
  const markAllAsRead = () => {
    setIsActive(true);
    setMarkAllRead(true);
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      }))
    );
  };

  // Delete a single notification from local state
  const deleteNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter(
        (notification) => notification.notificationId !== notificationId
      )
    );
  };

  // Delete all notifications
  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  // Handle delete action
  async function handleDelete(notificationId) {
    try {
      setError(null);
      const result = await deleteNotificationByIdAction(notificationId);
      if (result.success) {
        deleteNotification(notificationId);
      } else {
        setError(result.error || "Failed to delete notification");
      }
    } catch (error) {
      console.error("Error in handleDelete:", error.message);
      setError(
        error.message || "An error occurred while deleting the notification"
      );
    }
  }

  async function handleDeleteAll() {
    try {
      setError(null);
      const result = await deleteAllNotificationAction();
      if (result.success) {
        deleteAllNotifications();
      } else {
        setError(result.error || "Failed to delete all notifications");
      }
    } catch (error) {
      console.error("Error in handleDeleteAll:", error.message);
      setError(
        error.message || "An error occurred while deleting all notifications"
      );
    }
  }

  // Handle accept leader
  async function handleAccept(notificationId, taskId, assignId) {
    try {
      setError(null);
      setNotificationStatus((prev) => ({
        ...prev,
        [notificationId]: {
          isActive: true,
          isPending: true,
          isApproved: false,
        },
      }));

      const result = await assignLeaderAction(taskId, assignId);
      if (!result.success) {
        throw new Error(result.error || "Failed to accept leader role");
      }

      setNotificationStatus((prev) => ({
        ...prev,
        [notificationId]: {
          isActive: false,
          isPending: false,
          isApproved: true,
        },
      }));

      toast.success("Successfully accepted team leader role!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error accepting leader role:", error.message);
      setNotificationStatus((prev) => ({
        ...prev,
        [notificationId]: {
          isActive: null,
          isPending: false,
          isApproved: false,
        },
      }));
      setError(error.message || "Failed to accept leader role");
      toast.error(error.message || "Failed to accept leader role", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  // Handle decline leader
  async function handleDecline(notificationId, taskId, assignId) {
    try {
      setError(null);
      setNotificationStatus((prev) => ({
        ...prev,
        [notificationId]: {
          isActive: true,
          isPending: true,
          isApproved: false,
        },
      }));

      const result = await declineLeaderAction(taskId, assignId);
      if (!result.success) {
        throw new Error(result.error || "Failed to decline leader role");
      }

      setNotificationStatus((prev) => ({
        ...prev,
        [notificationId]: {
          isActive: true,
          isPending: false,
          isApproved: false,
        },
      }));

      toast.success("Successfully declined team leader role.", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error declining leader role:", error.message);
      setNotificationStatus((prev) => ({
        ...prev,
        [notificationId]: {
          isActive: null,
          isPending: false,
          isApproved: false,
        },
      }));
      setError(error.message || "Failed to decline leader role");
      toast.error(error.message || "Failed to decline leader role", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  // Limit displayed notifications
  const displayedNotifications = showAll
    ? notifications
    : notifications.slice(0, 3);

  console.log("Notifications:", displayedNotifications);

  return (
    <Dropdown className="p-4">
      <DropdownTrigger>
        <Button
          variant="none"
          className="p-2 rounded-lg transition-transform duration-150 active:scale-95 focus:outline-none"
          aria-label="Open notifications"
        >
          <Image
            src={notification}
            className="size-6"
            alt="Notification icon"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={false}
        aria-label="Notification Actions"
        className="p-0 bg-transparent"
      >
        <DropdownItem className="p-0 bg-transparent">
          <div className="w-full flex items-center justify-center">
            <div className="w-[400px] h-auto bg-white shadow-md rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <p className="text-base font-semibold text-gray-800">
                  Notifications ({notifications.length})
                </p>
                <div className="flex gap-3">
                  {notifications.length > 0 && (
                    <button
                      onClick={handleDeleteAll}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200"
                      title="Delete all notifications"
                      aria-label="Delete all notifications"
                    >
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 17 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.625 4.58333L14.125 12.9375C13.99625 15.0722 13.9325 16.1389 13.40625 16.9063C13.1475 17.2875 12.8125 17.6088 12.40625 17.8475C11.5925 18.3333 10.53125 18.3333 8.40625 18.3333C6.28125 18.3333 5.21875 18.3333 4.40625 17.8475C4 17.6088 3.65625 17.2875 3.40625 16.9063C2.875 16.1389 2.8125 15.0722 2.6875 12.9375L2.1875 4.58333"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M0.875 4.58333H15.875M11.7812 4.58333L11.2187 3.41667C10.8437 2.63889 10.6562 2.25 10.3437 2C10.2812 1.94444 10.2187 1.88889 10.1562 1.83333C9.78125 1.66667 9.34375 1.66667 8.46875 1.66667C7.59375 1.66667 7.15625 1.66667 6.78125 1.83333C6.71875 1.88889 6.65625 1.94444 6.59375 2C6.28125 2.25 6.09375 2.63889 5.71875 3.41667L5.15625 4.58333"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  )}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500 hover:text-gray-600 cursor-pointer"
                    title="Notification settings"
                    aria-label="Notification settings"
                  >
                    <path
                      d="M3.91667 17.25V14.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.0833 17.25V11.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.0833 3.5V0.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.91667 6.25V0.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.91667 14.5C3.05556 14.5 2.625 14.5 2.29167 14.3611C1.83333 14.1667 1.5 13.8333 1.30556 13.375C1.16667 13.0417 1.16667 12.6111 1.16667 11.75C1.16667 10.8889 1.16667 10.4583 1.30556 10.125C1.5 9.66667 1.83333 9.33333 2.29167 9.13889C2.625 9 3.05556 9 3.91667 9C4.77778 9 5.20833 9 5.54167 9.13889C6 9.33333 6.33333 9.66667 6.52778 10.125C6.66667 10.4583 6.66667 10.8889 6.66667 11.75C6.66667 12.6111 6.66667 13.0417 6.52778 13.375C6.33333 13.8333 6 14.1667 5.54167 14.3611C5.20833 14.5 4.77778 14.5 3.91667 14.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M13.0833 9C12.2222 9 11.7917 9 11.4583 8.86111C11 8.66667 10.6667 8.33333 10.4722 7.875C10.3333 7.54167 10.3333 7.11111 10.3333 6.25C10.3333 5.38889 10.3333 4.95833 10.4722 4.625C10.6667 4.16667 11 3.83333 11.4583 3.63889C11.7917 3.5 12.2222 3.5 13.0833 3.5C13.9444 3.5 14.375 3.5 14.7083 3.63889C15.1667 3.83333 15.5 4.16667 15.6944 4.625C15.8333 4.95833 15.8333 5.38889 15.8333 6.25C15.8333 7.11111 15.8333 7.54167 15.6944 7.875C15.5 8.33333 15.1667 8.66667 14.7083 8.86111C14.375 9 13.9444 9 13.0833 9Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="px-6 py-3 text-red-600 text-sm text-center bg-red-50">
                  {error}
                </div>
              )}

              {/* Notification Items */}
              <div className="max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-8">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-3 text-gray-400"
                    >
                      <path
                        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.73 21a2 2 0 0 1-3.46 0"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm">No notifications</p>
                  </div>
                ) : (
                  displayedNotifications.map((notificationItem) => (
                    <div
                      key={notificationItem.id}
                      className={`flex justify-between items-start ${
                        markAllRead || notificationItem.read
                          ? "bg-white"
                          : "bg-blue-50"
                      } py-4 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200`}
                    >
                      <div className="flex gap-3 flex-1">
                        <div className="flex-shrink-0">
                          <Image
                            src={ActiveIcon}
                            alt="Profile icon"
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium text-gray-800">
                            {notificationItem.sender?.username ??
                              "Unknown sender"}
                          </p>
                          <p className="text-xs text-gray-600">
                            {notificationItem.content}
                          </p>
                          {/* {notificationItem.type === "leader_assignment" && (
                            <p className="text-xs text-gray-600">
                              Task: {notificationItem.taskTitle}
                            </p>
                          )} */}
                          <p className="text-xs text-gray-500">
                            {notificationItem.createdAt}
                          </p>
                          {/* Accept/Decline Buttons */}
                          {notificationItem.type === "leader_assignment" &&
                            !notificationStatus[notificationItem.notificationId]
                              ?.isApproved && (
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() =>
                                    handleAccept(
                                      notificationItem.notificationId,
                                      notificationItem.taskId,
                                      notificationItem.assignId
                                    )
                                  }
                                  disabled={
                                    notificationStatus[
                                      notificationItem.notificationId
                                    ]?.isPending
                                  }
                                  className={`px-3 py-1.5 text-white text-xs font-medium rounded-full ${
                                    notificationStatus[
                                      notificationItem.notificationId
                                    ]?.isPending
                                      ? "bg-blue-300 cursor-not-allowed"
                                      : "bg-blue-600 hover:bg-blue-700"
                                  } transition-colors duration-200`}
                                  aria-label="Accept leader role"
                                >
                                  {notificationStatus[
                                    notificationItem.notificationId
                                  ]?.isPending
                                    ? "Accepting..."
                                    : "Accept"}
                                </button>
                                <button
                                  onClick={() =>
                                    handleDecline(
                                      notificationItem.notificationId,
                                      notificationItem.taskId,
                                      notificationItem.assignId
                                    )
                                  }
                                  disabled={
                                    notificationStatus[
                                      notificationItem.notificationId
                                    ]?.isPending
                                  }
                                  className={`px-3 py-1.5 text-white text-xs font-medium rounded-full ${
                                    notificationStatus[
                                      notificationItem.notificationId
                                    ]?.isPending
                                      ? "bg-red-300 cursor-not-allowed"
                                      : "bg-red-600 hover:bg-red-700"
                                  } transition-colors duration-200`}
                                  aria-label="Decline leader role"
                                >
                                  {notificationStatus[
                                    notificationItem.notificationId
                                  ]?.isPending
                                    ? "Declining..."
                                    : "Decline"}
                                </button>
                              </div>
                            )}
                          {notificationStatus[notificationItem.notificationId]
                            ?.isApproved && (
                            <p className="mt-2 text-xs text-green-600 font-medium">
                              Accepted
                            </p>
                          )}
                          {!notificationStatus[notificationItem.notificationId]
                            ?.isApproved &&
                            notificationStatus[notificationItem.notificationId]
                              ?.isActive && (
                              <p className="mt-2 text-xs text-red-600 font-medium">
                                Declined
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center pr-2">
                        {!markAllRead && !notificationItem.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 mb-2"></div>
                        )}
                        <button
                          onClick={() =>
                            handleDelete(notificationItem.notificationId)
                          }
                          className="text-red-500 hover:text-red-600 transition-colors duration-200 hover:scale-110"
                          title="Delete notification"
                          aria-label="Delete notification"
                        >
                          <svg
                            width="17"
                            height="20"
                            viewBox="0 0 17 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.625 4.58333L14.125 12.9375C13.99625 15.0722 13.9325 16.1389 13.40625 16.9063C13.1475 17.2875 12.8125 17.6088 12.40625 17.8475C11.5925 18.3333 10.53125 18.3333 8.40625 18.3333C6.28125 18.3333 5.21875 18.3333 4.40625 17.8475C4 17.6088 3.65625 17.2875 3.40625 16.9063C2.875 16.1389 2.8125 15.0722 2.6875 12.9375L2.1875 4.58333"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M0.875 4.58333H15.875M11.7812 4.58333L11.2187 3.41667C10.8437 2.63889 10.6562 2.25 10.3437 2C10.2812 1.94444 10.2187 1.88889 10.1562 1.83333C9.78125 1.66667 9.34375 1.66667 8.46875 1.66667C7.59375 1.66667 7.15625 1.66667 6.78125 1.83333C6.71875 1.88889 6.65625 1.94444 6.59375 2C6.28125 2.25 6.09375 2.63889 5.71875 3.41667L5.15625 4.58333"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between px-6 py-4 border-t border-gray-200">
                {notifications.length > 3 && (
                  <button
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setShowAll(!showAll)}
                    aria-label={
                      showAll
                        ? "Show less notifications"
                        : "Show all notifications"
                    }
                  >
                    {showAll ? "Show Less" : "See All Notifications"}
                  </button>
                )}
                {notifications.length <= 3 && <div></div>}
                {notifications.length > 0 && (
                  <button
                    className={`text-sm ${
                      isActive
                        ? "text-gray-400 cursor-default"
                        : "text-blue-600 hover:text-blue-700"
                    } transition-colors duration-200`}
                    onClick={markAllAsRead}
                    disabled={isActive}
                    aria-label="Mark all notifications as read"
                  >
                    Mark All As Read
                  </button>
                )}
              </div>
            </div>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
