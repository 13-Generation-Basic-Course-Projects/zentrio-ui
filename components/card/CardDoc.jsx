"use client";
import ModalFolderList from "../modal/docu/ModalFolderList";
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
import { icon } from "../icon/allicon";
import ModalOptionDocument from "../modal/docu/ModalOptionDocument";
import Link from "next/link";

export default function CardFolder({ title, status, date, link }) {
  return (
    <Link href={link || ""} target="-blank">
      <Card className="rounded-xl text-blue-400 cursor-pointer hover:bg-blue-50 transition sm:w-[160px] md:w-full h-[160px] shadow-sm ">
      {/* Header */}
      <CardHeader className="pb-0 pt-2 px-4 flex justify-end">
        <div className="hover:text-black text-gray-600">
          <ModalOptionDocument />
        </div>
      </CardHeader>
      <CardBody>
        <ModalFolderList link={link} title={title} />
      </CardBody>

      {/* Body */}

      {/* Footer */}
      <CardFooter className="pt-2 px-4">
        <div className="flex justify-between items-center w-full text-caption-tiny text-title/50">
          <div className="flex items-center space-x-1 justify-center">
            {status === "personal" ? (
              <Image
                src="https://www.svgrepo.com/show/425663/profile-people-account.svg"
                alt="Person Icon"
                width={10}
                height={10}
                className="rounded-full"
              />
            ) : (
              <Image
                src="https://www.svgrepo.com/show/116369/earth-globe-tool.svg"
                alt="Public Icon"
                width={10}
                height={10}
                className="rounded-full"
              />
            )}
            <span>{status}</span>
          </div>

          <span>{date}</span>
        </div>
      </CardFooter>
    </Card>
    </Link>
  );
}
//just make for icon file
const icons = {
  pdf: "https://cdn-icons-png.flaticon.com/128/4726/4726010.png",
  docx: "https://cdn-icons-png.flaticon.com/128/2991/2991108.png",
  xlsx: "https://cdn-icons-png.flaticon.com/128/2504/2504768.png",
  pptx: "https://cdn-icons-png.flaticon.com/128/2875/2875416.png",
};
function FileIcon({ type, size = 45 }) {
  // Get the matching icon based on type, fallback to a default icon if not found
  const src = icons[type] || icons.docx; // Fallback to 'docx' icon as default

  return (
    <img
      src={src}
      alt={`${type || "folder"} icon`}
      width={size}
      height={size}
      className="object-contain"
    />
  );
}

export function CardFile({ title, status, date, type, link }) {
  return (
    <Card className="rounded-xl text-blue-400 cursor-pointer hover:bg-blue-50 transition sm:w-[160px] md:w-full h-[160px] shadow-sm">
      {/* Header */}
      <CardHeader className="pb-0 pt-2 px-4 flex justify-end">
        <div className="hover:text-black text-gray-600">
          <ModalOptionDocument />
        </div>
      </CardHeader>

      {/* Body */}
      <Link href={link || ""} target="_blank">
        <CardBody className="overflow-visible py-2 flex flex-col items-center space-y-2">
          <FileIcon type={type} />
          <div className="flex items-center justify-center w-full">
            <p className="truncate text-base font-semibold text-title/80 text-center px-2">
              {title}.{type}
            </p>
          </div>
        </CardBody>
      </Link>
      {/* Footer */}
      <CardFooter className="pt-2 px-4">
        <div className="flex justify-between items-center w-full text-[10px] text-title/50">
          <div className="flex items-center space-x-1 justify-center">
            {status === "personal" ? (
              <Image
                src="https://www.svgrepo.com/show/425663/profile-people-account.svg"
                alt="Person Icon"
                width={10}
                height={10}
                className="rounded-full"
              />
            ) : (
              <Image
                src="https://www.svgrepo.com/show/116369/earth-globe-tool.svg"
                alt="Public Icon"
                width={10}
                height={10}
                className="rounded-full"
              />
            )}
            <span>{status}</span>
          </div>
          <span>{date}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
