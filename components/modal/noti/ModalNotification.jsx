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
import { useState } from "react";

export default function ModalNotification() {
  const [isActive, setIsActive] = useState(false);
  const [markAllRead, setMarkAllRead] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Sample notifications data - moved to state so we can modify it
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      sender: "Seam Chiminh",
      message: "welcome to Zentrio system",
      action: "created Task Back-End.",
      date: "5 May",
      read: false,
    },
    {
      id: 2,
      sender: "John Doe",
      message: "updated project timeline",
      action: "modified Task Front-End.",
      date: "6 May",
      read: false,
    },
    // Add more notifications as needed
    ...Array.from({ length: 10 }, (_, i) => ({
      id: i + 3,
      sender: `User ${i + 3}`,
      message: `Notification message ${i + 3}`,
      action: `performed action ${i + 3}`,
      date: `${i + 7} May`,
      read: false,
    })),
  ]);

  const markAllAsRead = () => {
    setIsActive(true);
    setMarkAllRead(true);
  };

  // Delete notification function
  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  // Delete all notifications function
  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const displayedNotifications = showAll
    ? notifications
    : notifications.slice(0, 3);

  return (
    <Dropdown className="p-0 bg-transparent">
      <DropdownTrigger>
        <Button
          variant="none"
          className="p-2 rounded-lg transition-transform duration-150 active:scale-95 focus:outline-none"
        >
          <Image src={notification} className="size-5" alt="notification" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu  closeOnSelect={false} aria-label="Static Actions" className="p-0 bg-transparent">
        <DropdownItem
          key="delete"
          className="text-danger p-0 bg-transparent"
          color="danger"
        >
          <div className="w-full flex items-center justify-center">
            <div className="w-[380px] h-fit bg-white shadow-sm rounded-[22px]">
              {/* Header */}
              <div className="flex items-center justify-between px-[15px] py-[20px] border-b-1 border-stroke">
                <div className="h-fit">
                  <p className="text-[15px] text-title font-medium h-fit">
                    Notification ({notifications.length})
                  </p>
                </div>
                <div className="h-fit flex gap-2">
                  {/* Delete all button */}
                  {notifications.length > 0 && (
                    <button 
                      onClick={deleteAllNotifications}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete all notifications"
                    >
                      <svg
                        width="17"
                        height="20"
                        viewBox="0 0 17 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.75 4.58325L14.2336 12.9375C14.1016 15.072 14.0356 16.1392 13.5006 16.9065C13.2361 17.2858 12.8955 17.606 12.5006 17.8466C11.7018 18.3333 10.6325 18.3333 8.49395 18.3333C6.3526 18.3333 5.28192 18.3333 4.48254 17.8457C4.08733 17.6046 3.74666 17.2839 3.48224 16.904C2.9474 16.1354 2.88288 15.0667 2.75384 12.9292L2.25 4.58325"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M1 4.58341H16M11.8798 4.58341L11.3109 3.40985C10.933 2.6303 10.744 2.24052 10.4181 1.99742C10.3458 1.9435 10.2692 1.89553 10.1892 1.854C9.82826 1.66675 9.3951 1.66675 8.52877 1.66675C7.64069 1.66675 7.19665 1.66675 6.82974 1.86185C6.74842 1.90509 6.67082 1.95499 6.59774 2.01105C6.26803 2.264 6.08386 2.66804 5.7155 3.47613L5.21077 4.58341"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  )}
                  {/* Settings icon */}
                  <svg
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.91663 17.25L3.91663 14.5"
                      stroke="#787486"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.0834 17.25L13.0834 11.75"
                      stroke="#787486"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.0834 3.5L13.0834 0.75"
                      stroke="#787486"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.91663 6.25L3.91663 0.75"
                      stroke="#787486"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.91663 14.5C3.0624 14.5 2.63529 14.5 2.29837 14.3604C1.84915 14.1744 1.49225 13.8175 1.30618 13.3683C1.16663 13.0313 1.16663 12.6042 1.16663 11.75C1.16663 10.8958 1.16663 10.4687 1.30618 10.1317C1.49225 9.68253 1.84915 9.32563 2.29837 9.13955C2.63529 9 3.0624 9 3.91663 9C4.77085 9 5.19797 9 5.53488 9.13955C5.9841 9.32563 6.341 9.68253 6.52707 10.1317C6.66663 10.4687 6.66663 10.8958 6.66663 11.75C6.66663 12.6042 6.66663 13.0313 6.52707 13.3683C6.341 13.8175 5.9841 14.1744 5.53488 14.3604C5.19797 14.5 4.77085 14.5 3.91663 14.5Z"
                      stroke="#787486"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M13.0834 9C12.2291 9 11.802 9 11.4651 8.86045C11.0159 8.67437 10.659 8.31747 10.4729 7.86825C10.3334 7.53134 10.3334 7.10423 10.3334 6.25C10.3334 5.39577 10.3334 4.96866 10.4729 4.63175C10.659 4.18253 11.0159 3.82563 11.4651 3.63955C11.802 3.5 12.2291 3.5 13.0834 3.5C13.9376 3.5 14.3647 3.5 14.7016 3.63955C15.1508 3.82563 15.5077 4.18253 15.6938 4.63175C15.8334 4.96866 15.8334 5.39577 15.8334 6.25C15.8334 7.10423 15.8334 7.53134 15.6938 7.86825C15.5077 8.31747 15.1508 8.67437 14.7016 8.86045C14.3647 9 13.9376 9 13.0834 9Z"
                      stroke="#787486"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Notification Items */}
              <div className="overflow-y-scroll h-[350px] scrollbar-hidden">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
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
                        markAllRead
                          ? "bg-white"
                          : notificationItem.read
                          ? "bg-white"
                          : "bg-slate-blue-more"
                      } py-[15px] px-[5px] border-b border-white hover:bg-gray-50 transition-colors`}
                    >
                      <div className="flex gap-[12px] pl-[12px]">
                        <div>
                          <Image
                            src={ActiveIcon}
                            alt="ActiveIcon"
                            className="w-[40px] h-fit"
                          />
                        </div>
                        <div className="flex flex-col gap-[3px]">
                          <p className="text-[14px] text-title">
                            {notificationItem.sender}
                          </p>
                          <p className="text-[12px] text-description">
                            {notificationItem.message}
                          </p>
                          <p className="text-[12px] text-description">
                            {notificationItem.action}
                          </p>
                          <p className="text-[12px] text-description">
                            {notificationItem.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center pr-[12px]">
                        {!markAllRead && !notificationItem.read && (
                          <div className="w-[7px] h-[7px] rounded-full bg-primary mb-[7px]"></div>
                        )}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notificationItem.id);
                          }}
                          className="hover:scale-110 transition-transform text-red-500 hover:text-red-700"
                          title="Delete notification"
                        >
                          <svg
                            width="17"
                            height="20"
                            viewBox="0 0 17 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.75 4.58325L14.2336 12.9375C14.1016 15.072 14.0356 16.1392 13.5006 16.9065C13.2361 17.2858 12.8955 17.606 12.5006 17.8466C11.7018 18.3333 10.6325 18.3333 8.49395 18.3333C6.3526 18.3333 5.28192 18.3333 4.48254 17.8457C4.08733 17.6046 3.74666 17.2839 3.48224 16.904C2.9474 16.1354 2.88288 15.0667 2.75384 12.9292L2.25 4.58325"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M1 4.58341H16M11.8798 4.58341L11.3109 3.40985C10.933 2.6303 10.744 2.24052 10.4181 1.99742C10.3458 1.9435 10.2692 1.89553 10.1892 1.854C9.82826 1.66675 9.3951 1.66675 8.52877 1.66675C7.64069 1.66675 7.19665 1.66675 6.82974 1.86185C6.74842 1.90509 6.67082 1.95499 6.59774 2.01105C6.26803 2.264 6.08386 2.66804 5.7155 3.47613L5.21077 4.58341"
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
              <div className="flex justify-between px-[15px] py-[20px] border-t-1 border-stroke">
                {notifications.length > 3 && (
                  <p
                    className="text-[12px] text-description cursor-pointer hover:text-primary transition-colors"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? "Show Less" : "See All Notification"}
                  </p>
                )}
                {notifications.length <= 3 && <div></div>}
                {notifications.length > 0 && (
                  <p
                    className={
                      isActive
                        ? `text-[12px] text-description cursor-pointer`
                        : `text-[12px] text-primary cursor-pointer hover:text-blue-600 transition-colors`
                    }
                    onClick={markAllAsRead}
                  >
                    Mark All As Read
                  </p>
                )}
              </div>
            </div>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}