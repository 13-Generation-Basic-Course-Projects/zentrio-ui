"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { IconAdd } from "../../icon/everyicon"; // Your icon import
import ModalCreateFolder from "./ModalCreateFolder"; // Your modal component import

export default function ModalCreateDocu() {
  // Dropdown open state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dropdown menu items
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
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* your svg path here */}
          <path
            d="M6.5 10.075V14.269C6.5 14.4117 6.54767 14.5307 6.643 14.626C6.73833 14.7213 6.85733 14.769 7 14.769C7.14267 14.769 7.26167 14.7213 7.357 14.626C7.45233 14.5307 7.5 14.4117 7.5 14.269V10.075L9.246 11.821C9.29467 11.8697 9.34933 11.9063 9.41 11.931C9.47133 11.955 9.53233 11.9663 9.593 11.965C9.65367 11.963 9.717 11.9497 9.783 11.925C9.84833 11.901 9.905 11.8643 9.953 11.815C10.0597 11.705 10.114 11.5873 10.116 11.462C10.118 11.336 10.064 11.218 9.954 11.108L7.565 8.719C7.47833 8.63233 7.38933 8.57133 7.298 8.536C7.20733 8.50067 7.108 8.483 7 8.483C6.892 8.483 6.79267 8.50067 6.702 8.536C6.61133 8.57133 6.52233 8.63233 6.435 8.719L4.046 11.108C3.94867 11.2053 3.89767 11.32 3.893 11.452C3.88833 11.584 3.94133 11.7053 4.052 11.816C4.162 11.922 4.28 11.976 4.406 11.978C4.532 11.98 4.64967 11.926 4.759 11.816L6.5 10.075ZM1.616 18C1.15533 18 0.771 17.846 0.463 17.538C0.155 17.23 0.000666667 16.8457 0 16.385V1.615C0 1.155 0.154333 0.771 0.463 0.463C0.771667 0.155 1.156 0.000666667 1.616 0H8.829C9.04433 0 9.25367 0.0433334 9.457 0.13C9.66033 0.216667 9.83433 0.333 9.979 0.479L13.52 4.02C13.6647 4.16533 13.7807 4.33933 13.868 4.542C13.9553 4.74467 13.999 4.954 13.999 5.17V16.384C13.999 16.844 13.8447 17.2283 13.536 17.537C13.2273 17.8457 12.8437 18 12.385 18H1.616ZM9 4.192V1H1.616C1.462 1 1.32067 1.064 1.192 1.192C1.06333 1.32 0.999333 1.461 1 1.615V16.385C1 16.5383 1.064 16.6793 1.192 16.808C1.32 16.9367 1.461 17.0007 1.615 17H12.385C12.5383 17 12.6793 16.936 12.808 16.808C12.9367 16.68 13.0007 16.5387 13 16.384V5H9.808C9.57533 5 9.38267 4.92333 9.23 4.77C9.07733 4.61667 9.00067 4.424 9 4.192Z"
            fill="#143A47"
          />
        </svg>
      ),
      label: "Upload file",
    },
    {
      key: "doc",
      icon: "https://cdn-icons-png.flaticon.com/128/2991/2991108.png",
      label: "Google docs",
    },
    {
      key: "slide",
      icon: "https://cdn-icons-png.flaticon.com/128/2875/2875416.png",
      label: "Google slides",
    },
    {
      key: "sheet",
      icon: "https://cdn-icons-png.flaticon.com/128/2504/2504768.png",
      label: "Google sheets",
    },
  ];

  const fileInputRef = React.useRef(null);
  // Handle dropdown item click
  const handleItemClick = (key) => {
    if (key === "create") {
      setIsModalOpen(true);
      setIsDropdownOpen(false); // close dropdown after click
    } else if (key === "upload") {
      fileInputRef.current?.click(); // Trigger file input
    }
  };

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
            className="flex  items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary border border-gray-300 rounded-[8px] shadow-sm hover:bg-[#000] h-[50px]"
            // fullWidth={true}
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

      {/* Modal for creating folder */}
      <ModalCreateFolder
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Hidden file input for file upload */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            console.log("File selected:", file.name);
            // Handle your file upload logic here
          }
        }}
      />
    </>
  );
}
