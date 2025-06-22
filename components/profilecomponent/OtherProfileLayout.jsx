"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import coverProfile from "@/assets/coverprofile.png";
import userProfile from "@/assets/profile.png";
import { Button } from "@heroui/react";
import { Camera } from "lucide-react";
import {
  IconDate,
  IconEdit,
  IconJob,
  IconMap,
  IconReturnLeft,
} from "../icon/everyicon";
import { useSearchParams, useParams } from "next/navigation"; // Add useParams here
import ButtonEditprofile from "../modal/profile/ModalEditProfileTab";
import BredCrum from "../bredcrum/MyBredcrum";
import { preventImage } from "@/constant/preventimage";
import OtherAchievmentTab from "./OtherAchievmentTab";
import OtherProfileTab from "./OtherProfileTab";

export default function OtherProfileLayout({
  user,
  acheivment,
  profile,
  action,
  userName,
  MemberDetails,
  userIdDetail,
}) {
  const searchParams = useSearchParams();
  const params = useParams(); // Get params from the URL path

  const name = searchParams.get("name");
  const profileImage = searchParams.get("profileImage");
  const boardId = searchParams.get("boardId");

  // Get userId from search params, props, or URL path
  const targetUserId =
    searchParams.get("userId") || user?.userId || params.userId; // Prioritize params.userId

  // Find the specific member by userId
  const memberData =
    MemberDetails?.payload?.find((member) => member.userId === targetUserId) ||
    MemberDetails?.payload?.[0] ||
    {};

  const {
    userId,
    username,
    email,
    profileImage: memberProfileImage,
    gender,
    tasks = [],
    roles = [],
  } = memberData;

  // Use member data or fallback to search params
  const displayName = username || name || "Unknown User";
  const displayProfileImage = memberProfileImage || profileImage;

  // Format roles for display
  const formatRoles = (roles) => {
    return roles
      .map((role) =>
        role
          .replace("ROLE_", "")
          .toLowerCase()
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      )
      .join(", ");
  };

  // Get primary role for job display
  const getPrimaryRole = (roles) => {
    const roleHierarchy = ["ROLE_LEADER", "ROLE_MANAGER", "ROLE_MEMBER"];
    for (const role of roleHierarchy) {
      if (roles.includes(role)) {
        return role
          .replace("ROLE_", "")
          .toLowerCase()
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
    }
    return "Member";
  };

  const back = searchParams.get("from") || "/"; // Fallback to home

  const tabItems = [
    {
      key: "profile",
      title: "Profile",
      content: (
        <OtherProfileTab
          MemberDetails={MemberDetails}
          userId={userId}
          userIdDetail={userIdDetail}
        />
      ),
    },
    {
      key: "achievement",
      title: "Achievements",
      content: (
        <OtherAchievmentTab MemberDetails={MemberDetails} userId={userId} />
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState("profile");

  const currentTab = tabItems.find((tab) => tab.key === activeTab);

  // Prevent profile fallback
  const preventProfile = preventImage.noProfile;

  console.log("detail member in specific", MemberDetails?.payload);

  return (
    <>
      <div className="w-full sticky top-0 z-[20] px-10 py-2 ">
        <BredCrum
          board={"Hikko Design"}
          feature={"Members"}
          user={displayName}
        />
        <div className="relative">
          <Image
            className="w-full rounded-xl"
            src={coverProfile}
            alt="cover profile"
          />

          <Button
            className="absolute top-2 left-0"
            size="md"
            color="primary"
            variant="bordered"
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back(); // Go back if possible
              } else {
                window.location.href = "/dashboard"; // Fallback URL
              }
            }}
          >
            <IconReturnLeft strokeWidth={2} size={5} color={"currentColor"} />
            Go Back
          </Button>

          <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-2 border-desc p-0.5 group  bg-white shadow overflow-hidden">
            {displayProfileImage ? (
              <img
                className="rounded-full w-full h-full object-cover"
                src={displayProfileImage}
                alt="user profile"
              />
            ) : (
              <img
                className="rounded-full w-full h-full object-cover"
                src={preventProfile}
                alt="user profile"
              />
            )}
            {/* <div className="absolute top-20 inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white w-3 h-3" />
            </div> */}
          </div>
        </div>

        <div className="text-center mt-16 text-body-sm ">
          <h1 className="text-body-sm font-bold">{displayName}</h1>

          {/* Display member information */}
          <div className="flex justify-center gap-6 text-sm text-gray-600 mt-2">
            <p className="flex items-center gap-1">
              <IconJob strokeWidth={1} size={4} color={"currentColor"} />
              {getPrimaryRole(roles)}
            </p>
            <p className="flex items-center gap-1">
              <IconMap strokeWidth={1} size={4} color={"currentColor"} />
              Phnom Penh
            </p>
            <p className="flex items-center gap-1">
              <IconDate strokeWidth={1} size={4} color={"currentColor"} />
              Started 07-May-2025
            </p>
          </div>

          {/* Additional member info */}
          <div className="flex flex-col gap-3 items-center justify-center">
            {email && <div className="mt-2 text-sm text-gray-500">{email}</div>}

            <div className="hidden flex items-center gap-3">
              {roles.length > 1 && (
                <div className="mt-1 text-xs text-gray-400">
                  Roles: {formatRoles(roles)}
                </div>
              )}

              {tasks.length > 0 && (
                <div className="mt-1 text-xs text-gray-400">
                  Active Tasks: {tasks.length}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-0">
          <div className="flex gap-6 border-b w-fit">
            {tabItems.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-2 cursor-pointer transition-colors relative ${
                  activeTab === tab.key
                    ? "text-blue-500"
                    : "text-muted hover:text-gray-700"
                }`}
              >
                {tab.title}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-screen px-4 ">
        <div className="mx-auto">{currentTab?.content}</div>
      </div>
    </>
  );
}
