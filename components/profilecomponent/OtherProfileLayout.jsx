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
import { useParams, useSearchParams } from "next/navigation";
import ButtonEditprofile from "../modal/profile/ModalEditProfileTab";
import BredCrum from "../bredcrum/MyBredcrum";

export default function OtherProfileLayout({
  user,
  acheivment,
  profile,
  action,
  userName,
}) {
  const searchParams = useSearchParams();
  const param = useParams();
  const name = searchParams.get("name");

  const profileImage = searchParams.get("profileImage");
  const userId = param.id;
  console.log("userId", userId);


  //
  const back = searchParams.get("from") || "/"; // Fallback to home

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
  return (
    <>
      <div className="w-full sticky top-0 z-[20] px-10 py-2">
        <BredCrum board={"Hikko Design"} feature={"Members"} user={name} />
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
              className="rounded-full w-full h-full object-cover"
              src={profileImage}
              alt="user profile"
            />
            <div className="absolute top-20 inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white w-3 h-3" />
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h1 className="text-h4 font-bold">{name}</h1>
          <div className="flex justify-center gap-6 text-sm text-gray-600 mt-2">
            <p className="flex items-center gap-1">
              <IconJob strokeWidth={1} size={5} color={"currentColor"} />
              Front-end Developer
            </p>
            <p className="flex items-center gap-1">
              <IconMap strokeWidth={1} size={5} color={"currentColor"} /> Phnom
              Penh
            </p>
            <p className="flex items-center gap-1">
              <IconDate strokeWidth={1} size={5} color={"currentColor"} />
              Started 07-May-2025
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
        </div>
      </div>

      <div className="min-h-screen px-4 ">
        <div className="mx-auto">{currentTab?.content}</div>
      </div>
    </>
  );
}
