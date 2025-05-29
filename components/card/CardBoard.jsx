"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import {
  IconDelete,
  StackedProfiles,
  StarIconOutline,
  StarIconSolid,
} from "../icon/everyicon";
import iconMember from "@/assets/memberSideBar.png";
import Image from "next/image";

import { usePathname, useSearchParams } from "next/navigation";

export default function CardBoard({ title, image, role }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // extract workspaceId and projectId from URL
  const pathSegments = pathname.split("/"); // ['', 'dashboard', workspaceId, projectId, 'board']
  const workspaceId = pathSegments[2] || "defaultWorkspace";
  const projectId = pathSegments[3] || "defaultProject";

  // get role from props or query param
  const userRole = role || searchParams.get("role") || "pm";
  const [favorited, setFavorited] = useState(false);

  return (
    <Link href={`/dashboard/${workspaceId}/${projectId}/board?role=${role}`}>
      <Card className="py-4 h-[340px] rounded-xl shadow-lg">
        {/* Header */}
        <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-center">
          <p className="text-body-sm font-semibold text-primary truncate">
            {title}
          </p>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFavorited(!favorited);
            }}
            className="text-yellow-500 hover:text-yellow-600 p-3"
            aria-label="Toggle favorite"
          >
            {favorited ? <StarIconSolid /> : <StarIconOutline />}
          </button>
        </CardHeader>

        {/* Body */}
        <CardBody className="overflow-visible py-2">
          {image && image.startsWith("bg-") ? (
            <div
              className={`rounded-xl w-full h-32 bg-cover bg-center ${image}`}
              aria-label={`Card background for ${title}`}
            />
          ) : (
            <img
              src={image}
              alt={`Card background for ${title}`}
              className="object-cover rounded-xl w-full h-32"
            />
          )}
        </CardBody>

        {/* Footer */}
        <CardFooter className="pt-2 px-4 flex flex-col items-start space-y-4">
          <StackedProfiles />
          <div className="flex w-full justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Image
                src={iconMember}
                className="w-[16px] h-[16px]"
                alt="Members icon"
              />
              <p className="text-body-sm">13 Members</p>
            </div>
            <div className="flex items-center text-progress-red p-3 gap-1">
              <IconDelete />
              <button className="hover:underline text-body-sm">Remove</button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

//-> Card for in Checklist

export const CardCheckList = ({ title, startDate, status, image, label,comment }) => {
  return (
    <div>
      <Card className="py-4 rounded-xl cursor-pointer hover:bg-blue-50 transition ">
        {/* Header */}
        <CardHeader className="pb-0 pt-2 px-4 flex items-start flex-col">
          <p className="text-h6 font-semibold text-title truncate">{title}</p>
          <p className="text-caption font-semibold text-title/50 truncate mt-2">
            {startDate}
          </p>
          <div className="text-body-lg mt-4 flex flex-row items-center space-x-2">
            <div>
              {status === "In Progress" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="#FBBF24" // Yellow for In Progress
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15h-1v-1h1v1zm0-3h-1V7h1v7z" />
                </svg>
              )}

              {status === "Completed" && (
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM7.0718 10.7106L11.3905 5.31232L10.6096 4.68762L6.92825 9.2893L4.32012 7.11586L3.67993 7.88408L7.0718 10.7106Z"
                      fill="#00f576"
                    />
                  </g>
                </svg>
              )}

              {status === "Overdue" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="#EF4444" // Red for Overdue
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13l-1.41 1.41L12 13.41l-3.59 3.59L7 15l3.59-3.59L7 7.83 8.41 6.41 12 10l3.59-3.59L17 7.83l-3.59 3.58L17 15z" />
                </svg>
              )}
            </div>

            <p
              className={`${
                status === "In Progress"
                  ? "text-yellow-500"
                  : status === "Completed"
                  ? "text-green-500"
                  : status === "Overdue"
                  ? "text-red-500"
                  : "text-black"
              }`}
            >
              {status}
            </p>
          </div>
        </CardHeader>

        {/* Body */}
        {image && (
          <CardBody className="overflow-visible py-2">
            <img
              src={image}
              alt={`Card background for ${title}`}
              className="object-cover rounded-xl w-full h-32"
            />
          </CardBody>
        )}

        {/* Footer */}

        <div className="flex justify-between items-center p-4">
          <div className="bg-primary/50 p-2 text-label rounded-small text-blueActive ">
            {label}
          </div>
          <StackedProfiles />
        </div>

        <div className="border-b m-4 items-center border-2"></div>

        <CardFooter className="pt-2 px-4 flex flex-col items-start space-y-4">
          <div className="flex w-full justify-between text-sm text-gray-600">
            <div className="flex flex-row justify-center items-center space-x-2">
              <Image
                src={CommentIcon}
                className="w-[16px] h-[16px]"
                alt="Comments icon"
              />
              <p className="text-body-sm font-semibold">{comment}</p>
            </div>
            <div className="flex flex-row justify-center items-center space-x-2">
              <Image
                src={CalendarIcon}
                className="w-[16px] h-[16px]"
                alt="Comments icon"
              />
              <button className="text-body-sm/50 ">Date</button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
