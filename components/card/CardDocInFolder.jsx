"use client";
import ModalFolderList from "../modal/docu/ModalFolderList";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import {
  IconDelete,
  IconFolder,
  StackedProfiles,
  StarIconOutline,
  StarIconSolid,
} from "../icon/everyicon";
import iconMember from "@/assets/memberSideBar.png";

import Image from "next/image";
import { icon } from "../icon/allicon";
import ModalOptionDocument from "../modal/docu/ModalOptionDocument";
import Link from "next/link";
import ModalOptionDocumentInFolder from "../modal/docu/ModalOptionDocumentInFolder";
import { usePathname } from "next/navigation";

export default function CardFolderInFolder({
  title,
  status,
  date,
  link,
  fileId,
  documentId,
  folderId,
  isFolder,
  tokenFromGoogle,
  isHidden,
  workspaceId,
  boardId,
}) {
  const pathname = usePathname();

  // Check if current path contains 'otherworkspace'
  const isOtherWorkspace = pathname.includes("/otherworkspace/");

  // Generate href based on current URL context
  const base = isOtherWorkspace
    ? `/dashboard/otherworkspace/${boardId}/docu/${folderId}`
    : `/dashboard/${workspaceId}/${boardId}/docu/${folderId}`;

  const href = pathname.includes(folderId)
    ? base.replace(folderId, documentId)
    : base;

  return (
    <Card
      className="rounded-xl text-blue-400 cursor-pointer hover:bg-blue-50 transition sm:w-[160px] md:w-full h-[160px] shadow-sm "
    >
      {/* Header */}
      <CardHeader className="pb-0 pt-2 px-4 flex justify-end">
        <div className="hover:text-black text-gray-600">
          {isHidden == true ? (
            ""
          ) : (
            <ModalOptionDocumentInFolder
              fileId={fileId}
              isFolder={isFolder}
              accessToken={tokenFromGoogle}
            />
          )}
        </div>
      </CardHeader>
      <CardBody>
        <Link href={href} className="overflow-hidden">
          <div className=" flex flex-col items-center overflow-hidden ">
            <IconFolder />
          </div>
        </Link>
      </CardBody>
      {/* Body */}

      {/* Footer */}
      <p className="text-center text-base font-bold text-title/90 truncate w-full px-2">
        {title}
      </p>
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

export function CardFileInFolder({
  title,
  status,
  date,
  type,
  link,
  fileId,
  tokenFromGoogle,
  isHidden,
}) {
  return (
    <Card className="rounded-xl text-blue-400 cursor-pointer hover:bg-blue-50 transition sm:w-[160px] md:w-full h-[160px] shadow-sm">
      {/* Header */}
      <CardHeader
        className={`pb-0 pt-2 px-4 flex justify-end  ${isHidden ? `pt-6` : ``}`}
      >
        <div className="hover:text-black text-gray-600">
          {isHidden == true ? (
            ""
          ) : (
            <ModalOptionDocumentInFolder
              fileId={fileId}
                   
            />
          )}
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
