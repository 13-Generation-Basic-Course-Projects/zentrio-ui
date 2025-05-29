"use client";
import Image from "next/image";
import notification from "../../assets/notification.png";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import KanbanBoard from "../kanban/Kanban";
import GanttChart from "../Gantt/GanttChart";
import userProfile from "@/assets/profile.png";
import ModalInviteMember from "../modal/ModalInviteMember";
import StarBoard from "../button/StarBoard";
import ModalCreateTask from "../modal/board/ModalCreateTask";
import ModalNotification from "../modal/noti/ModalNotification";

export default function SystemBoard({ user }) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const workspaceId = segments[2]; // gets workspaceId from URL like /dashboard/otherworkspace/2/board

  const [activeTab, setActiveTab] = useState("kanban");

  // Conditionally add ModalInviteMember only if workspaceId is NOT 'otherworkspace'
  const modalComponents = [
    <ModalCreateTask key="create-task" />,
    workspaceId !== "otherworkspace" && (
      <ModalInviteMember key="invite-member" />
    ),
    <StarBoard key="star-board" />,
  ].filter(Boolean);

  const tabItems = [
    {
      key: "kanban",
      title: "Board",
      content: <KanbanBoard modal={modalComponents} />,
    },
    {
      key: "calendar",
      title: "Gantt Chart",
      content: <GanttChart />,
    },
  ];

  const currentTab = tabItems.find((tab) => tab.key === activeTab);

  return (
    <>
      {/* Navbar */}
      <div className="w-full sticky top-0 z-10 bg-bgColor">
        <header className="px-4 sm:px-6 lg:px-8">
          <div className="flex w-full h-16 items-center justify-between">
            {/* Left side - Navigation Tabs */}
            <nav className="flex-1">
              <ul className="flex gap-1 text-sm font-medium">
                {tabItems.map((tab) => (
                  <li
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`cursor-pointer rounded-lg transition-all duration-200 ${
                      activeTab === tab.key
                        ? "border-b-2 border-blue-500 px-4 py-2 text-blue-600 font-semibold"
                        : "text-gray-600 px-4 py-2 hover:text-gray-900"
                    }`}
                  >
                    {tab.title}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right side - Notification and Profile */}
            <div className="flex items-center gap-4">
              <ModalNotification />

              <Link href="/profile">
                <div className="overflow-hidden rounded-full border-2 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md">
                  <span className="sr-only">Toggle dashboard menu</span>
                  {user?.image ? (
                    <img
                      src={
                        user.image ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzyLc8LMQIrviNz6u2EP3TtPRZZt3OlhrhHA&s"
                      }
                      alt={user.name || "User"}
                      className="size-10 object-cover hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <Image
                      src={userProfile}
                      alt="person"
                      className="size-10 object-cover hover:scale-105 transition-transform duration-200"
                    />
                  )}
                </div>
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* Tab Content Area */}
      <main className="p-4">
        <div className="mx-auto overflow-hidden h-screen">
          {currentTab?.content}
        </div>
      </main>
    </>
  );
}
