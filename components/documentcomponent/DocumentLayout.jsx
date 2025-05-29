"use client";
import Image from "next/image";
import notification from "../../assets/notification.png";
import Link from "next/link";
import React, { useState } from "react";
import TestDocument from "../documentcomponent/TestDocument";
import PublicDocument from "../documentcomponent/PublicDocument";
import userProfile from "@/assets/profile.png";
import ModalNotification from "../modal/noti/ModalNotification";
export default function DocumentLayout({
  user,
  publicdocument,
  privatedocument,
}) {
  const tabItems = [
    {
      key: "kanban",
      title: "Personal",
      content: privatedocument,
    },
    {
      key: "calendar",
      title: "Public",

      content: publicdocument,
    },
  ];
  const [activeTab, setActiveTab] = useState("kanban");

  const currentTab = tabItems.find((tab) => tab.key === activeTab);

  return (
    <>
      {/* Navbar */}

      <div className="w-full sticky top-0 z-[20]  bg-bgColor  ">
        <header className=" px-4 sm:px-6 lg:px-8  ">
          <div className="flex w-full h-16 items-center justify-between ">
            {/* Left side - Navigation Tabs */}
            <nav className="flex-1">
              <ul className="flex gap-1 text-sm font-medium">
                {tabItems.map((tab) => (
                  <li
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`cursor-pointer rounded-lg transition-all duration-200 ${
                      activeTab === tab.key
                        ? "border-b-2 border-blue-500  px-4 py-2  text-blue-600 font-semibold"
                        : "text-gray-600   px-4 py-2  hover:text-gray-900"
                    }`}
                  >
                    {tab.title}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right side - Notification and Profile */}
            <div className="flex items-center gap-4">
              {/* Notification Icon */}
              <ModalNotification />

              {/* Profile */}
              <Link href="/profile">
                <div className="overflow-hidden rounded-full border-2 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md">
                  <span className="sr-only">Toggle dashboard menu</span>
                  {user?.image != null ? (
                    <img
                      src={
                        user?.image ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzyLc8LMQIrviNz6u2EP3TtPRZZt3OlhrhHA&s"
                      }
                      alt={user?.name || "User"}
                      className={`size-10 object-cover hover:scale-105 transition-transform duration-200 `}
                    />
                  ) : (
                    <Image
                      src={userProfile}
                      alt="person"
                      className={`size-10 object-cover hover:scale-105 transition-transform duration-200 `}
                    />
                  )}
                </div>
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* Tab Content Area */}
      <main className="p-4   min-h-screen">
        <div className=" mx-auto">{currentTab?.content}</div>
      </main>
    </>
  );
}
