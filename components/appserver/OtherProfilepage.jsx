import React from "react";
import Image from "next/image";
import coverOtherProfile from "@/assets/coverotherprofile.png";
import userProfile from "@/assets/profile.png";
import { Camera } from "lucide-react";
import ActiveBoards from "../profilecomponent/ActiveBoards";
import ProfileDetailsCard from "../profilecomponent/ProfileDetailsCard";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

import {
  IconDate,
  IconJob,
  IconMap,
} from "../icon/everyicon";

export default function OtherProfilepage() {
  return (
    <div className="mt-4 px-8 rounded-xl">
      <Breadcrumbs
        itemClasses={{
          separator: "px-2",
        }}
        separator="/"
      >
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Music</BreadcrumbItem>
        <BreadcrumbItem>Artist</BreadcrumbItem>
        <BreadcrumbItem>Album</BreadcrumbItem>
        <BreadcrumbItem>Song</BreadcrumbItem>
      </Breadcrumbs>
      <div className="relative">
        <Image
          className="w-full rounded-xl"
          src={coverOtherProfile}
          alt="cover profile"
        />

        {/* Profile Image with hover effect */}
        <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-2 border-desc p-0.5 group cursor-pointer bg-white shadow overflow-hidden">
          <Image
            className="rounded-full w-full h-full object-cover"
            src={userProfile}
            alt="user profile"
          />

          {/* Hover Overlay (stays within circle) */}
          <div className="absolute top-20 inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white w-3 h-3" />
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <h1 className="text-h4 text-title font-bold">Skan</h1>
        <div className="flex justify-center gap-6 text-body text-description mt-2">
          <p className="flex items-center gap-1">
            <IconJob strokeWidth={1} size={5} color={"currentColor"} />{" "}
            Front-end Developer
          </p>
          <p className="flex items-center gap-1">
            <IconMap strokeWidth={1} size={5} color={"currentColor"} /> Phnom
            Penh
          </p>
          <p className="flex items-center gap-1">
            <IconDate strokeWidth={1} size={5} color={"currentColor"} /> Started
            07-May-2025
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-6 border-b w-fit">
          <p className="text-blue-500 border-b-2 border-blue-500 pb-2 cursor-pointer">
            Profile
          </p>
          <p className="text-muted cursor-pointer">Achievements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[43%_55%] gap-6 mt-6">
        <div className="space-y-6">
          {/* Overall Board Completeness */}
          <div className="p-4 rounded-xl shadow bg-white">
            <h3 className="text-md font-semibold mb-2">
              Overall Board Completeness
            </h3>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-progress-blue w-[70%]"></div>
            </div>
            <p className="text-body text-right text-description mt-1">70%</p>
          </div>

          {/* Profile Details */}
          <ProfileDetailsCard />
        </div>

        {/* Active Boards */}
        <ActiveBoards />
      </div>
    </div>
  );
}
