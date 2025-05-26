import React from "react";
import Image from "next/image";
import coverProfile from "@/assets/coverprofile.png";
import userProfile from "@/assets/profile.png";
import { Button } from "@heroui/react";
import { Camera } from "lucide-react";
import "@/styles/profile.css";
import {
  IconDate,
  IconEdit,
  IconJob,
  IconMap,
  IconReturnLeft,
} from "../icon/everyicon";
import ProfileComponent from "../profilecomponent/ProfileComponent";
import AchievmentComponent from "../profilecomponent/AchievmentComponent";

export default function Profilepage() {
  return (
    <div className="mt-4 px-8 rounded-xl">
      <div className="relative">
        <div className="w-full h-[175px] cut-left-radius">
        <Image
          className="w-full h-full rounded-xl"
          src={coverProfile}
          alt="cover profile"
        />
        </div>
        <Button
          className="absolute top-2 left-0"
          size="lg"
          color="primary"
          variant="bordered"
        >
          <IconReturnLeft strokeWidth={2} size={5} color={"currentColor"} />
          Go Back
        </Button>

        {/* Profile Image with hover effect */}
        <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 p-4 bg-white rounded-full">
          <div className="relative w-28 h-28 rounded-full border-2 border-desc p-0.5 group cursor-pointer bg-white shadow overflow-hidden">
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
      </div>

      <div className="text-center mt-16">
        <h1 className="text-h4 font-bold">Skan</h1>
        <div className="flex justify-center gap-6 text-sm text-gray-600 mt-2">
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
        <Button color="primary">
          {" "}
          <IconEdit strokeWidth={1.5} size={5} color={"currentColor"} /> Edit
          Profile
        </Button>
      </div>

      {/* <ProfileComponent /> */}
      <AchievmentComponent />
    </div>
  );
}
