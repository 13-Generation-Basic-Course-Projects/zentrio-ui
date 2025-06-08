"use client";
import Image from "next/image";
import React, { useState } from "react";
import coverProfile from "@/assets/coverprofile.png";
import { Button } from "@heroui/react";
import { Camera } from "lucide-react";
import {
  IconDate,
  IconEdit,
  IconJob,
  IconMap,
  IconReturnLeft,
} from "../icon/everyicon";
import { getUploadProfileImageAction } from "@/action/profile.action";

export default function ProfileLayout({
  user,
  acheivment,
  profile,
  action,
  currentUserProfile,
}) {
  const data = currentUserProfile?.payload?.user || {};
  const tabItems = [
    {
      key: "profile",
      title: "Profile",
      content: profile,
    },
    {
      key: "achievement",
      title: "Achievements",
      content: acheivment,
    },
  ];

  const [activeTab, setActiveTab] = useState("profile");

  const currentTab = tabItems.find((tab) => tab.key === activeTab);

  // Filter actions based on activeTab
  const getFilteredActions = () => {
    if (activeTab === "profile") {
      // Return only the first action (index 0)
      return action[0] ? [action[0]] : [];
    } else if (activeTab === "achievement") {
      // Return only the second action (index 1)
      return action[1] ? [action[1]] : [];
    }
    // Fallback for other tabs (if any)
    return [];
  };

  const [previewUrl, setPreviewUrl] = useState(null);
  const handleImageChange = async (e) => {
    try {
      const response = await getUploadProfileImageAction();
      console.log("Upload response", response);
    } catch (err) {
      console.error("upload failed", err);
    }
  };

  return (
    <>
      <div className="w-full sticky top-0 z-[20] px-10 py-2">
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

          <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-2 border-desc p-0.5 group cursor-pointer bg-white shadow overflow-hidden">
            <img
              className="rounded-full object-cover"
              src={
                data?.profileImage == null
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3lC0SfgqCcTGipFh64hddM6xgBYQj90wOA&s"
                  : data?.profileImage
              }
              alt=" "
              width={112}
              height={112}
            />

            <div className="absolute top-20 inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <label className="cursor-pointer flex items-center gap-2">
                <Camera className="text-white w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-full border"
                />
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h1 className="text-h4 font-bold">{data?.username || "N/A"}</h1>
          <div className="flex justify-center gap-6 text-sm text-gray-600 mt-2">
            <p className="flex items-center gap-1">
              <IconJob strokeWidth={1} size={5} color={"currentColor"} />
              {data?.position || "N/A"}
            </p>
            <p className="flex items-center gap-1">
              <IconMap strokeWidth={1} size={5} color={"currentColor"} />{" "}
              {data?.location || "N/A"}
            </p>
            <p className="flex items-center gap-1">
              <IconDate strokeWidth={1} size={5} color={"currentColor"} />
              {data.createdAt ? data.createdAt.split("T")[0] : " "}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
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
          <div className="flex items-center justify-end gap-3">
            {getFilteredActions().length > 0 ? (
              getFilteredActions().map((ModalComp, index) => (
                <div className="" key={ModalComp.key || index}>
                  {ModalComp}
                </div>
              ))
            ) : (
              <div>No actions available</div>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-screen px-4 ">
        <div className="mx-auto">{currentTab?.content}</div>
      </div>
    </>
  );
}
