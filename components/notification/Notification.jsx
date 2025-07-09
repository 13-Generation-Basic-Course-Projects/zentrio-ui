"use client";

import ActiveIcon from "@/assets/notification/activeIcon.png";
import SettingIcon from "@/assets/notification/settingIcon.png";
import TrashIcon from "@/assets/notification/trashIcon.png";
import Image from "next/image";
import { notifications } from "@/data/allDataV2";
import { useState } from "react";
import { assignLeaderAction } from "@/action/board.action";
import { toast } from "react-toastify";

export function Notification() {
  const [isActive, setIsActive] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState({}); // Track acceptance status

  const notifi = notifications;
  //  ("Notifications:", notifi);

  const handleAccept = async (notificationId, taskId, assignId) => {
    try {
      // Mark as loading
      setNotificationStatus((prev) => ({
        ...prev,
        [notificationId]: { isLoading: true, isAccepted: false },
      }));

      const result = await assignLeaderAction(taskId, assignId);
      if (!result.success) {
        throw new Error(result.error || "Failed to accept leader role");
      }

      // Mark as accepted
      setNotificationStatus((prev) => ({
        ...prev,
        [notificationId]: { isLoading: false, isAccepted: true },
      }));

      toast.success("Successfully accepted team leader role!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      //console.error("Error accepting leader role:", error.message);
      setNotificationStatus((prev) => ({
        ...prev,
        [notificationId]: { isLoading: false, isAccepted: false },
      }));
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-slate-blue">
        <div className="w-[450px] h-fit bg-white shadow-sm rounded-[22px]">
          {/* Header */}
          <div className="flex items-center justify-between px-[15px]">
            <div className="h-fit">
              <p className="text-body-lg text-title py-[28px] font-medium h-fit">
                Notifications
              </p>
            </div>
            <div className="h-fit">
              <Image
                src={SettingIcon}
                alt="Setting Icon"
                className="w-[22px] h-fit cursor-pointer"
              />
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-scroll h-[400px]">
            {notifi.map((notification) => (
              <div
                key={notification.id}
                className="flex justify-between items-start bg-slate-blue-more py-[20px]"
              >
                <div className="flex gap-[15px] pl-[15px]">
                  <div>
                    <Image
                      src={ActiveIcon}
                      alt="Active Icon"
                      className="w-[40px] h-fit"
                    />
                  </div>
                  <div className="flex flex-col gap-[3.5px]">
                    <p className="text-[15px] text-title">
                      {notification.sender}
                    </p>
                    <p className="text-body-sm text-description">
                      {notification.message}
                    </p>
                    {notification.type === "leader_assignment" && (
                      <p className="text-body-sm text-description">
                        Task: {notification.taskTitle}
                      </p>
                    )}
                    <p className="text-body-sm text-description">
                      {notification.date}
                    </p>
                    {/* Accept Button for Leader Assignment */}
                    {notification.type === "leader_assignment" &&
                      !notificationStatus[notification.id]?.isAccepted && (
                        <button
                          onClick={() =>
                            handleAccept(
                              notification.id,
                              notification.taskId,
                              notification.assignId
                            )
                          }
                          disabled={
                            notificationStatus[notification.id]?.isLoading
                          }
                          className={`mt-[8px] px-[16px] py-[6px] text-white text-body-sm font-medium rounded-[8px] ${
                            notificationStatus[notification.id]?.isLoading
                              ? "bg-blue-300 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {notificationStatus[notification.id]?.isLoading
                            ? "Accepting..."
                            : "Accept"}
                        </button>
                      )}
                    {notificationStatus[notification.id]?.isAccepted && (
                      <p className="mt-[8px] text-body-sm text-green-600">
                        Accepted
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center pr-[15px]">
                  <Image
                    src={ActiveIcon}
                    alt="Active Icon"
                    className="w-[7px] h-fit"
                  />
                  <Image
                    src={TrashIcon}
                    alt="Trash Icon"
                    className="w-[20px] h-fit mt-[10px] cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between px-[15px] py-[33px]">
            <p className="text-description cursor-pointer">
              See All Notifications
            </p>
            <p
              className={
                isActive
                  ? "text-description cursor-pointer"
                  : "text-blueActive cursor-pointer"
              }
              onClick={() => setIsActive(!isActive)}
            >
              Mark All As Read
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
