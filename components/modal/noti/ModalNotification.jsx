"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import notification from "@/assets/notification.png";
import ActiveIcon from "@/assets/profile.png";

import useWebSocketNotifications from "@/app/hooks/useWebSocketNotifications";
import { getPreviewProfileAction } from "@/action/profile.action";
import {
  deleteNotificationByIdAction,
  deleteAllNotificationAction,
} from "@/action/notification.action";
import { assignLeaderAction, declineLeaderAction } from "@/action/board.action";

export default function ModalNotification() {
  const [userId, setUserId] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [markAllRead, setMarkAllRead] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState(null);

  const { notifications: liveNotifications, connected } =
    useWebSocketNotifications({ userId });

  console.log("liveNotifications:", liveNotifications);
  // Fetch user ID once
  useEffect(() => {
    (async () => {
      const data = await getPreviewProfileAction();
      setUserId(data?.payload?.userId);
    })();
  }, []);

  // Load & Save status in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("notificationStatus");
    if (stored) setNotificationStatus(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "notificationStatus",
      JSON.stringify(notificationStatus)
    );
  }, [notificationStatus]);

  // Format incoming live notifications
  const formattedNotifications = Array.isArray(liveNotifications?.payload)
    ? liveNotifications.payload.map((item, index) => ({
        id: item.id ?? index,
        content: item.content ?? item.message ?? "No content",
        action: item.action ?? "",
        createdAt: item.createdAt?.split("T")[0] ?? item.date ?? "",
        read: item.read ?? item.isRead ?? false,
        notificationId: item.notificationId ?? item.id ?? index,
        sender: item.sender
          ? {
              userId: item.sender.userId ?? item.projectManagerId,
              username: item.sender.username ?? "Unknown Sender",
              email: item.sender.email ?? "",
              contact: item.sender.contact ?? "",
              gender: item.sender.gender ?? "",
              location: item.sender.location ?? "",
              position: item.sender.position ?? "",
              profileImage: item.sender.profileImage ?? "",
            }
          : {
              userId: item.projectManagerId ?? null,
              username: "Unknown Sender",
            },
        type: item.type ?? "general",
        taskId: item.taskId ?? null,
        assignId: item.receiverId ?? null,
        taskTitle: item.taskTitle ?? item.title ?? "Untitled Task",
      }))
    : [];

  // Local helper actions
  const markAllAsRead = () => {
    setIsActive(true);
    setMarkAllRead(true);
    formattedNotifications.forEach((n) => {
      setNotificationStatus((prev) => ({
        ...prev,
        [n.notificationId]: { ...prev[n.notificationId], read: true },
      }));
    });
  };

  const deleteNotification = (id) => {
    setNotificationStatus((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const deleteAllNotifications = () => {
    setNotificationStatus({});
    localStorage.removeItem("notificationStatus");
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteNotificationByIdAction(id);
      if (!res.success) throw new Error(res.error);
      deleteNotification(id);
      toast.success("Notification deleted");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const res = await deleteAllNotificationAction();
      if (!res.success) throw new Error(res.error);
      deleteAllNotifications();
      toast.success("All notifications deleted");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleAccept = async (id, taskId, assignId) => {
    const pmId = formattedNotifications.find((n) => n.notificationId === id)
      ?.sender?.userId;
    if (!pmId) return toast.error("Missing project manager ID");

    setNotificationStatus((prev) => ({
      ...prev,
      [id]: { isActive: true, isPending: true, isApproved: false },
    }));

    try {
      const res = await assignLeaderAction(taskId, assignId, pmId);
      if (!res.success) throw new Error(res.error);
      setNotificationStatus((prev) => ({
        ...prev,
        [id]: { isActive: false, isPending: false, isApproved: true },
      }));
      await handleDelete(id);
      toast.success("Accepted leader role");
    } catch (e) {
      setNotificationStatus((prev) => ({
        ...prev,
        [id]: { isActive: null, isPending: false, isApproved: false },
      }));
      toast.error(e.message);
    }
  };

  const handleDecline = async (id, taskId, assignId) => {
    const pmId = formattedNotifications.find((n) => n.notificationId === id)
      ?.sender?.userId;
    if (!pmId) return toast.error("Missing project manager ID");

    setNotificationStatus((prev) => ({
      ...prev,
      [id]: { isActive: true, isPending: true, isApproved: false },
    }));

    try {
      const res = await declineLeaderAction(taskId, assignId, pmId);
      if (!res.success) throw new Error(res.error);
      setNotificationStatus((prev) => ({
        ...prev,
        [id]: { isActive: true, isPending: false, isApproved: false },
      }));
      await handleDelete(id);
      toast.success("Declined leader role");
    } catch (e) {
      setNotificationStatus((prev) => ({
        ...prev,
        [id]: { isActive: null, isPending: false, isApproved: false },
      }));
      toast.error(e.message);
    }
  };

  const displayed = showAll
    ? formattedNotifications
    : formattedNotifications.slice(0, 3);

  return (
    <>
      <p className="text-xs text-gray-500 mb-2">
        Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}
      </p>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="none" className="p-0">
            <Image
              src={notification}
              alt="Notification"
              width={20}
              height={20}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="w-[400px] max-h-[500px] overflow-y-auto">
          <DropdownItem>
            <div className="px-4 py-2 flex justify-between items-center border-b">
              <span className="font-medium">
                Notifications ({formattedNotifications.length})
              </span>
              <div className="flex gap-2">
                {formattedNotifications.length > 0 && (
                  <button
                    onClick={handleDeleteAll}
                    className="text-red-500 text-sm">
                    Delete All
                  </button>
                )}
                {formattedNotifications.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-blue-500 text-sm"
                    disabled={isActive}>
                    Mark All Read
                  </button>
                )}
              </div>
            </div>
            {displayed.length === 0 ? (
              <p className="text-sm text-center py-4 text-gray-400">
                No notifications
              </p>
            ) : (
              displayed.map((n) => (
                <div
                  key={n.notificationId}
                  className={`p-3 border-b ${
                    markAllRead || notificationStatus[n.notificationId]?.read
                      ? "bg-white"
                      : "bg-blue-50"
                  }`}>
                  <div className="flex gap-3">
                    <Image
                      src={n.sender.profileImage || ActiveIcon}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt="User"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{n.sender.username}</p>
                      <p className="text-xs text-gray-600">{n.content}</p>
                      {n.type === "leader_assignment" && (
                        <p className="text-xs text-gray-500">
                          Task: {n.taskTitle}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">{n.createdAt}</p>

                      {n.type === "leader_assignment" &&
                        !notificationStatus[n.notificationId]?.isApproved &&
                        !notificationStatus[n.notificationId]?.isActive && (
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={() =>
                                handleAccept(
                                  n.notificationId,
                                  n.taskId,
                                  n.assignId
                                )
                              }
                              disabled={
                                notificationStatus[n.notificationId]?.isPending
                              }
                              className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
                              {notificationStatus[n.notificationId]?.isPending
                                ? "Accepting..."
                                : "Accept"}
                            </button>
                            <button
                              onClick={() =>
                                handleDecline(
                                  n.notificationId,
                                  n.taskId,
                                  n.assignId
                                )
                              }
                              disabled={
                                notificationStatus[n.notificationId]?.isPending
                              }
                              className="text-xs text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
                              {notificationStatus[n.notificationId]?.isPending
                                ? "Declining..."
                                : "Decline"}
                            </button>
                          </div>
                        )}

                      {notificationStatus[n.notificationId]?.isApproved && (
                        <p className="text-xs text-green-600 mt-2">Accepted</p>
                      )}
                      {notificationStatus[n.notificationId]?.isActive &&
                        !notificationStatus[n.notificationId]?.isApproved && (
                          <p className="text-xs text-red-600 mt-2">Declined</p>
                        )}
                    </div>
                    <button
                      onClick={() => handleDelete(n.notificationId)}
                      className="text-red-500 text-xs">
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
            {formattedNotifications.length > 3 && (
              <div className="text-center p-2">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm text-blue-500 hover:underline">
                  {showAll ? "Show Less" : "Show All"}
                </button>
              </div>
            )}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
