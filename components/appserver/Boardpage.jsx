"use client";
import Image from "next/image";
import notification from "../../assets/notification.png";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import KanbanBoard from "../kanban/Kanban";
import GanttChart from "../Gantt/GanttChart";
import userProfile from "@/assets/profile.png";
import ModalInviteMember from "../modal/ModalInviteMember";
import StarBoard from "../button/StarBoard";
import ModalCreateTask from "../modal/board/ModalCreateTask";
import ModalNotification from "../modal/noti/ModalNotification";
import ModalCreateGanttChart from "../modal/board/ModalCreateGanttChart";
import ModalCreateGanttBar from "../modal/board/ModalCreateGanttBar";
import { data } from "autoprefixer";
import NotFound from "@/app/not-found";
import { checkEmailForClearAction } from "@/action/board.action";
import DrawerGanttBarFetch from "../Gantt/DrawerGanttBar";

const clearAllCookies = () => {
  //  (" Starting to clear all cookies...");

  // Get all cookies and clear them
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (name) {
      // Clear with multiple strategies to ensure removal
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; max-age=0`;
      document.cookie = `${name}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC; max-age=0`;
      document.cookie = `${name}=; path=/; domain=.${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC; max-age=0`;
    }
  });

  // Also clear localStorage and sessionStorage
  try {
    localStorage.clear();
    sessionStorage.clear();
    //  (" All cookies and storage cleared successfully");
  } catch (error) {
    //console.warn(" Could not clear storage:", error);
  }
};

export default function SystemBoard({
  user,
  tasks,
  ganttbar,
  checklistbyTaskIds,
  allMemberInBoard,
  boardId,
  ganttChartId,
  ganttChartName,
  preventUserImage,
  boardData,
  matchingBoardForNotPM,
  workspaceId,
  currentUserProfile,
  myUserId,
  feedbackByTaskIds,
}) {
  if (
    !boardData ||
    boardData.status >= 400 ||
    boardData.type === "about:blank"
  ) {
    return <NotFound />;
  }

  //  ("feedbackByTaskIds", feedbackByTaskIds);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // Extract boardId from path
  const pathSegments = pathname.split("/");
  const boardIdFromURL = pathSegments[3];

  //  ("Board ID:", boardIdFromURL);
  //  ("Email from URL:", email);
  //  (
  //   "Current user email:",
  //   currentUserProfile?.user?.email || currentUserProfile?.email
  // );

  useEffect(() => {
    const handleEmailCheck = async () => {
      // Check if email exists in URL
      if (!email) {
        //  ("❌ No email found in URL, no action needed");
        return;
      }

      // Get current user's email (adjust based on your data structure)
      const currentUserEmail =
        currentUserProfile?.user?.email ||
        currentUserProfile?.email ||
        currentUserProfile?.payload?.user?.email;

      //  ("📧 Comparing emails:");
      //  ("  - URL email:", email);
      //  ("  - Current user email:", currentUserEmail);

      // If emails are the same, do nothing
      if (email === currentUserEmail) {
        //  ("✅ Email matches current user - no action needed");
        //  ("🔒 Cookies will remain intact");
        return;
      }

      // If emails are different, proceed with clearing
      //  ("⚠️ Email is different from current user");
      //  ("🔍 Checking if URL email exists in database...");

      try {
        const result = await checkEmailForClearAction(email);

        //  ("📋 Backend response:", result);

        // Check if the URL email exists in database
        if (
          result &&
          result.success === true &&
          result.payload &&
          result.payload.userId
        ) {
          // //  ("✅ URL email user found in database!");
          // //  ("👤 URL email user details:", {
          //   userId: result.payload.userId,
          //   username: result.payload.username,
          //   email: result.payload.email,
          // });

          //   (
          //   "🧹 Different user detected - clearing cookies and storage..."
          // );
          clearAllCookies();

          //  ("🎉 Cookies cleared successfully for different user");

          // Optional: Redirect after clearing
          setTimeout(() => {
            //  ("🔄 Redirecting to login...");
            window.location.href = "/login";
          }, 1500);
        } else {
          //  ("❌ URL email user not found in database");
          //  ("🔒 No cookies cleared - user doesn't exist");
        }
      } catch (error) {
        //console.error("💥 Error checking URL email:", error);
      }
    };

    // Execute the email check logic
    handleEmailCheck();
  }, [email, currentUserProfile]); // Run when email or current user changes

  const [activeTab, setActiveTab] = useState("kanban");
  //  (matchingBoardForNotPM, "roleeeeee");

  // Get role from matchingBoardForNotPM with priority logic
  const getUserRole = (roles) => {
    if (!roles || roles.length === 0) return "ROLE_MEMBER";

    // If has 3 roles (ROLE_LEADER, ROLE_MEMBER, ROLE_MANAGER), return ROLE_MANAGER
    if (roles.length === 3 && roles.includes("ROLE_MANAGER")) {
      return "ROLE_MANAGER";
    }

    // If has 2 roles (ROLE_LEADER, ROLE_MEMBER), return ROLE_LEADER
    if (roles.length === 2 && roles.includes("ROLE_LEADER")) {
      return "ROLE_LEADER";
    }

    // Default to highest priority role available
    if (roles.includes("ROLE_MANAGER")) return "ROLE_MANAGER";
    if (roles.includes("ROLE_LEADER")) return "ROLE_LEADER";
    return "ROLE_MEMBER";
  };

  // Updated role assignment
  const role =
    matchingBoardForNotPM === null
      ? "ROLE_MANAGER"
      : getUserRole(matchingBoardForNotPM?.role) || user.role || "ROLE_MEMBER";



  const favBoard = boardData?.payload?.isFavourite;

  // Modal components based on role
  const modalComponents = [
    (role === "ROLE_LEADER" || role === "ROLE_MANAGER") && (
      <ModalCreateTask
        key="create-task"
        boardId={boardId}
        ganttChartId={ganttChartId}
        ganttbar={ganttbar}
        allMemberInBoard={allMemberInBoard}
        isGanttChartId={ganttChartId}
        setActiveTab={setActiveTab}
        userId={myUserId}
      />
    ),
    role === "ROLE_MANAGER" && (
      <ModalInviteMember
        key="invite-member"
        boardId={boardId}
        allMemberInBoard={allMemberInBoard}
        workspaceId={workspaceId}
      />
    ),
    <StarBoard key="star-board" favBoard={favBoard} boardId={boardId} />,
  ].filter(Boolean);

  // GanttChart modal based on role
  const ganttModal =
    role === "ROLE_MEMBER" || role === "ROLE_LEADER"
      ? []
      : [
          <ModalCreateGanttChart
            key="create-gantt-chart"
            boardId={boardId}
            ganttChartId={ganttChartId}
          />,
          <DrawerGanttBarFetch ganttChartId={ganttChartId} />,
          <ModalCreateGanttBar
            key="create-gantt-bar"
            boardId={boardId}
            ganttChartId={ganttChartId}
          />,
        ];
  const tabItems = [
    {
      key: "kanban",
      title: "Board",
      icon: (isActive) => (
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.375 15.8703V4.02031C8.375 2.89531 7.895 2.44531 6.7025 2.44531H3.6725C2.48 2.44531 2 2.89531 2 4.02031V15.8703C2 16.9953 2.48 17.4453 3.6725 17.4453H6.7025C7.895 17.4453 8.375 16.9953 8.375 15.8703Z"
            fill={isActive ? "#3B82F6" : "#143A47"} // Tailwind's blue-500
          />
          <path
            d="M17 10.6203V4.02031C17 2.89531 16.52 2.44531 15.3275 2.44531H12.2975C11.105 2.44531 10.625 2.89531 10.625 4.02031V10.6203C10.625 11.7453 11.105 12.1953 12.2975 12.1953H15.3275C16.52 12.1953 17 11.7453 17 10.6203Z"
            fill={isActive ? "#3B82F6" : "#143A47"}
          />
        </svg>
      ),
      content: (
        <KanbanBoard
          key={`kanban-${boardId}`}
          role={role}
          modal={modalComponents}
          tasks={tasks}
          checklistbyTaskIds={checklistbyTaskIds}
          allMemberInBoard={allMemberInBoard}
          preventUserImage={preventUserImage}
          boardData={boardData}
          ganttbar={ganttbar}
          boardId={boardId}
          workspaceId={workspaceId}
          feedbackByTaskIds={feedbackByTaskIds}
        />
      ),
    },
    {
      key: "calendar",
      title: "Gantt Chart",
      icon: (isActive) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66675 1.6665V4.1665"
            stroke={isActive ? "#3B82F6" : "#143A47"} // Tailwind's blue-500
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3333 1.6665V4.1665"
            stroke={isActive ? "#3B82F6" : "#143A47"} // Tailwind's blue-500strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.91675 7.5752H17.0834"
            stroke={isActive ? "#3B82F6" : "#143A47"} // Tailwind's blue-500
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 7.08317V14.1665C17.5 16.6665 16.25 18.3332 13.3333 18.3332H6.66667C3.75 18.3332 2.5 16.6665 2.5 14.1665V7.08317C2.5 4.58317 3.75 2.9165 6.66667 2.9165H13.3333C16.25 2.9165 17.5 4.58317 17.5 7.08317Z"
            stroke={isActive ? "#3B82F6" : "#143A47"} // Tailwind's blue-500
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.0788 11.4167H13.0863"
            stroke={isActive ? "#3B82F6" : "#143A47"} // Tailwind's blue-500
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.0788 13.9167H13.0863"
            stroke={isActive ? "#3B82F6" : "#143A47"} // Tailwind's blue-500
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99632 11.4167H10.0038"
            stroke={isActive ? "#3B82F6" : "#143A47"} // Tailwind's blue-500
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99632 13.9167H10.0038"
            stroke={isActive ? "#3B82F6" : "#143A47"} // Tailwind's blue-500
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.91185 11.4167H6.91933"
            stroke={isActive ? "#3B82F6" : "#143A47"} // Tailwind's blue-500
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.91185 13.9167H6.91933"
            stroke={isActive ? "#3B82F6" : "#143A47"} // Tailwind's blue-500
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),

      content: (
        <GanttChart
          key={`gantt-${boardId}`}
          modal={ganttModal}
          ganttbar={ganttbar}
          ganttChartName={ganttChartName}
          boardId={boardId}
          ganttChartId={ganttChartId}
          workspaceId={workspaceId}
          boardData={boardData}
        />
      ),
    },
  ];

  const currentTab = tabItems.find((tab) => tab.key === activeTab);

  return (
    <>
      {/* Navbar */}
      <div className="w-full sticky top-0 z-10 bg-bgColor rounded-bl-3xl">
        <header className="px-4 sm:px-6 lg:px-8 ">
          <div className="flex w-full h-16 items-center justify-between">
            {/* Left side - Navigation Tabs */}
            <nav className="flex-1">
              <ul className="flex gap-1 text-sm font-medium">
                {tabItems.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <li
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`cursor-pointer rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        isActive
                          ? "border-b-2 border-blue-500 px-4 py-2 text-blue-600 font-semibold"
                          : "text-gray-600 px-4 py-2 hover:text-gray-900"
                      }`}
                    >
                      {tab.icon(isActive)}
                      {tab.title}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right side - Notification and Profile */}
            <div className="flex items-center gap-4">
              <ModalNotification />

              <Link href="/profile">
                <div className="overflow-hidden rounded-full border-2 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md ">
                  <span className="sr-only">Toggle dashboard menu</span>
                  {preventUserImage ? (
                    <img
                      src={preventUserImage}
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
