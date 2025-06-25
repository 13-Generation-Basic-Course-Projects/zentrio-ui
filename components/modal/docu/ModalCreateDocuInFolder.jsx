"use client";
import React, { useRef, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { IconAdd } from "../../icon/everyicon";
import ModalCreateFolder from "./ModalCreateFolder";
import ModalUploadFile from "./ModalUploadfile";
import ModalCreateFolderInFolder from "./ModalCreateFolderInFolder";
import { createDriveFileAction } from "@/action/drive.action";
import { createDocumentByUploadAction } from "@/action/document.action";

export default function ModalCreateDocuInFolder({
  boardId,
  folderId,
  tokenFromGoogle,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const items = [
    {
      key: "create",
      icon: (
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6.14286V9.57143M7.22222 7.85714H10.7778M1 11.2857V1H7.22222L9 2.71429H17V11.2857C17 11.7404 16.8127 12.1764 16.4793 12.4979C16.1459 12.8194 15.6937 13 15.2222 13H2.77778C2.30628 13 1.8541 12.8194 1.5207 12.4979C1.1873 12.1764 1 11.7404 1 11.2857Z"
            stroke="#143A47"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Create new folder",
    },
    {
      key: "upload",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#143A47"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 10.5L12 6m0 0l4.5 4.5M12 6v12"
          />
        </svg>
      ),
      label: "Upload file",
    },
    {
      key: "doc",
      icon: "https://cdn-icons-png.flaticon.com/128/2991/2991108.png",
      label: "Google Docs",
    },
    {
      key: "slide",
      icon: "https://cdn-icons-png.flaticon.com/128/2875/2875416.png",
      label: "Google Slides",
    },
    {
      key: "sheet",
      icon: "https://cdn-icons-png.flaticon.com/128/2504/2504768.png",
      label: "Google Sheets",
    },
  ];

  const handleItemClick = async (key) => {
    setIsDropdownOpen(false);
    if (key === "create") {
      setIsCreateFolderOpen(true);
    } else if (key === "upload") {
      setIsUploadModalOpen(true);
    } else if (["doc", "slide", "sheet"].includes(key)) {
      try {
        const mimeTypes = {
          doc: "DOC",
          slide: "SLIDE",
          sheet: "SHEET",
        };

        const defaultNames = {
          doc: "Untitled Document",
          slide: "Untitled Presentation",
          sheet: "Untitled Spreadsheet",
        };

        const data = {
          name: defaultNames[key],

          folderId: folderId,
          fileType: mimeTypes[key],
          token: tokenFromGoogle,

          folderId: folderId,
          fileType: mimeTypes[key],
          token: tokenFromGoogle,
        };

        console.log("Creating Google file with data: ", data);

        const result = await createDriveFileAction(data);
        console.log("Create drive file result:", result);

        const driveUrl = result?.payload?.webViewLink;

        if (driveUrl) {
          console.log("Opening Google Drive URL:", driveUrl);
          window.open(driveUrl, "_blank");
        } else {
          console.error("Drive URL missing from result:", result);
          alert("Drive URL missing. Could not open editor.");
        }
      } catch (err) {
        console.error("Error creating Google file: ", err);
        alert(
          `Failed to create Google ${
            key === "doc"
              ? "document"
              : key === "slide"
              ? "presentation"
              : "spreadsheet"
          }: ${err.message}`
        );
      }
    }
  };

  console.log("board in modal create doc", boardId);
  return (
    <>
      <Dropdown
        isOpen={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
        size="xl"
      >
        <DropdownTrigger>
          <Button
            onPress={() => setIsDropdownOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary border border-gray-300 rounded-[8px] shadow-sm hover:bg-[#000] h-[50px]"
          >
            <IconAdd />
            Create
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label="Dynamic Actions" items={items}>
          {(item) => (
            <DropdownItem
              key={item.key}
              onClick={() => handleItemClick(item.key)}
              color={item.key === "delete" ? "danger" : "default"}
            >
              <div className="flex items-center gap-2">
                {typeof item.icon === "string" ? (
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                ) : (
                  item.icon
                )}
                <span>{item.label}</span>
              </div>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>

      {/* Modals */}
      <ModalCreateFolderInFolder
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        folderId={folderId}
        tokenFromGoogle={tokenFromGoogle}
      />

      <ModalUploadFile
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        boardId={boardId}
        folderId={folderId}
        uploadDocument={createDocumentByUploadAction}
        tokenFromGoogle={tokenFromGoogle}
      />
    </>
  );
}
