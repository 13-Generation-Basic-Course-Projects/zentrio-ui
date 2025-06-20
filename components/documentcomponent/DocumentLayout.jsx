"use client";
import Image from "next/image";
import notification from "../../assets/notification.png";
import Link from "next/link";
import React, { useState } from "react";
import TestDocument from "../documentcomponent/TestDocument";
import PublicDocument from "../documentcomponent/PublicDocument";
import PrivateDocument from "../documentcomponent/PrivateDocument";
import userProfile from "@/assets/profile.png";
import ModalNotification from "../modal/noti/ModalNotification";
import AllDocument from "./AllDocument";
import ModalCreateDocu from "../modal/docu/ModalCreateDocu";
import WelcomePage from "../modal/docu/EmptyDocumentPage";

export default function DocumentLayout({
  user,
  documents,
  publicDocuments,
  tokenFromGoogle,
  boardId,
  preventUserImage,
}) {
  const [activeTab, setActiveTab] = useState("personal");

  const tabItems = [
    {
      key: "personal",
      title: "Personal",
      content: <PrivateDocument />,
      icon: (isActive) => (
        <svg
          width={14}
          height={17}
          viewBox="0 0 14 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 6.44137C6.17533 6.44137 5.469 6.15325 4.881 5.57701C4.293 5.00077 3.99933 4.30745 4 3.49705C4.00067 2.68665 4.29433 1.99399 4.881 1.41905C5.46767 0.84412 6.174 0.556 7 0.554692C7.826 0.553384 8.53233 0.841504 9.119 1.41905C9.70567 1.9966 9.99933 2.68959 10 3.49803C10.0007 4.30647 9.707 4.99914 9.119 5.57603C8.531 6.15293 7.82467 6.44137 7 6.44137ZM7 5.46026C7.55 5.46026 8.021 5.26796 8.413 4.88336C8.805 4.49877 9.00067 4.03699 9 3.49803C8.99933 2.95907 8.80367 2.49697 8.413 2.11172C8.02233 1.72647 7.55133 1.5345 7 1.53581C6.44867 1.53711 5.978 1.72908 5.588 2.11172C5.198 2.49435 5.002 2.95646 5 3.49803C4.998 4.03961 5.194 4.50138 5.588 4.88336C5.982 5.26534 6.45267 5.45764 7 5.46026ZM0 16.5547V11.549C0 11.1435 0.118 10.7642 0.354 10.411C0.589333 10.0578 0.915 9.78239 1.331 9.58486C2.16767 9.18456 3.07567 8.86243 4.055 8.61846C5.03367 8.37449 6.01533 8.25251 7 8.25251C7.98467 8.25251 8.96633 8.37449 9.945 8.61846C10.9237 8.86243 11.8317 9.18456 12.669 9.58486C13.085 9.78304 13.4107 10.0584 13.646 10.411C13.882 10.7642 14 11.1435 14 11.549V14.9692C14 15.4205 13.846 15.7976 13.538 16.1004C13.23 16.4033 12.8457 16.5547 12.385 16.5547H5.25C4.66333 16.5547 4.17333 16.3621 3.78 15.9768C3.388 15.5922 3.192 15.1115 3.192 14.5346C3.192 13.959 3.38833 13.4789 3.781 13.0943C4.173 12.7091 4.66267 12.5164 5.25 12.5164H8.325L9.817 9.59958C9.36833 9.47138 8.88567 9.3785 8.369 9.32094C7.85233 9.26338 7.396 9.23427 7 9.23362C6.044 9.23362 5.128 9.34514 4.252 9.56818C3.376 9.79187 2.563 10.0842 1.813 10.4453C1.557 10.5643 1.35733 10.7236 1.214 10.9231C1.07067 11.1226 0.999333 11.3312 1 11.549V16.5547H0ZM5.25 15.5736H6.796L7.842 13.4975H5.25C4.96067 13.4975 4.712 13.5996 4.504 13.8036C4.296 14.0071 4.192 14.251 4.192 14.5356C4.192 14.8194 4.296 15.0634 4.504 15.2675C4.712 15.4715 4.96067 15.5736 5.25 15.5736ZM7.9 15.5736H12.385C12.5643 15.5736 12.7117 15.5167 12.827 15.4029C12.9423 15.2897 13 15.1452 13 14.9692V11.549C13 11.3312 12.922 11.1226 12.766 10.9231C12.6107 10.7236 12.4193 10.5643 12.192 10.4453C11.9793 10.3341 11.753 10.2317 11.513 10.1382C11.273 10.0447 11.033 9.95507 10.793 9.86938L7.9 15.5736Z"
            fill={isActive ? "#3B82F6" : "#143A47"} // Blue-500 when active, dark color when inactive
          />
        </svg>
      ),
    },
    {
      key: "public",
      title: "Public",
      content: <PublicDocument />,
      icon: (isActive) => (
        <svg
          width={17}
          height={18}
          viewBox="0 0 17 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.50283 17.0547C7.32794 17.0547 6.22294 16.8318 5.18783 16.386C4.15335 15.9396 3.2533 15.3339 2.48767 14.5689C1.72204 13.8039 1.11602 12.9048 0.669611 11.8716C0.223204 10.8384 0 9.73367 0 8.55752C0 7.38137 0.223204 6.27637 0.669611 5.24252C1.11539 4.20804 1.72015 3.30798 2.48389 2.54235C3.24763 1.77672 4.14706 1.17071 5.18217 0.724299C6.21728 0.277891 7.32228 0.0546875 8.49717 0.0546875C9.67206 0.0546875 10.7771 0.277891 11.8122 0.724299C12.8466 1.17008 13.7467 1.77515 14.5123 2.53952C15.278 3.30389 15.884 4.20332 16.3304 5.2378C16.7768 6.27228 17 7.37696 17 8.55185C17 9.72674 16.7771 10.8317 16.3313 11.8669C15.8856 12.902 15.2799 13.802 14.5142 14.567C13.7486 15.332 12.8495 15.938 11.8169 16.3851C10.7843 16.8321 9.67961 17.0553 8.50283 17.0547ZM7.55556 16.063V14.2214C7.03611 14.2214 6.59159 14.0366 6.222 13.667C5.85241 13.2974 5.6673 12.8525 5.66667 12.3325V11.388L1.13333 6.85469C1.08611 7.13802 1.04298 7.42135 1.00394 7.70469C0.964908 7.98802 0.945074 8.27135 0.944444 8.55469C0.944444 10.4593 1.5703 12.1278 2.822 13.5602C4.0737 14.9926 5.65156 15.8269 7.55556 16.063ZM14.0722 13.6547C14.7176 12.9464 15.2096 12.1555 15.5484 11.2822C15.8871 10.4089 16.0562 9.49756 16.0556 8.54808C16.0556 6.99793 15.6296 5.58221 14.7777 4.30091C13.9258 3.01961 12.7777 2.09595 11.3333 1.52991V1.94358C11.3333 2.46302 11.1485 2.90785 10.7789 3.27808C10.4094 3.6483 9.96452 3.83309 9.44444 3.83246H7.55556V5.72135C7.55556 5.98895 7.46489 6.21341 7.28356 6.39474C7.10222 6.57608 6.87807 6.66643 6.61111 6.6658H4.72222V8.55469H10.3889C10.6565 8.55469 10.8809 8.64535 11.0623 8.82669C11.2436 9.00802 11.334 9.23217 11.3333 9.49913V12.3325H12.2778C12.687 12.3325 13.0569 12.4546 13.3875 12.6989C13.7181 12.9432 13.9463 13.2618 14.0722 13.6547Z"
            fill={isActive ? "#3B82F6" : "#143A47"} // Blue-500 when active, dark color when inactive
          />
        </svg>
      ),
    },
  ];

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <>
      {/* Navbar */}
      {/* Navbar */}
      <div className="w-full sticky top-0 z-10 bg-bgColor rounded-bl-3xl">
        <header className="px-4 sm:px-6 lg:px-8 ">
          <div className="flex w-full h-16 items-center justify-between">
            {/* Left side - Navigation Tabs */}
            <nav className="flex-1">
              <ul className="flex gap-1 text-sm font-medium">
                {tabItems.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <li
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`cursor-pointer rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        isActive
                          ? "border-b-2 border-blue-500 px-4 py-2 text-blue-600 font-semibold"
                          : "text-gray-600 px-4 py-2 hover:text-gray-900"
                      }`}
                    >
                      {tab.icon(isActive)}
                      {tab.title}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right side - Notification and Profile */}
            <div className="flex items-center gap-4">
              <ModalNotification />

              <Link href="/profile">
                <div className="overflow-hidden rounded-full border-2 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md ">
                  <span className="sr-only">Toggle dashboard menu</span>
                  {preventUserImage ? (
                    <img
                      src={preventUserImage}
                      alt={user.name || "User"}
                      className="size-10 object-cover hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <Image
                      src={userProfile}
                      alt="person"
                      className="size-10 object-cover hover:scale-105 transition-transform duration-200"
                    />
                  )}
                </div>
              </Link>
            </div>
          </div>
        </header>
      </div>
      {/* Tab Content Area */}
      {tokenFromGoogle === null ? (
        <WelcomePage />
      ) : (
        <main className="p-4 min-h-screen">
          <div className="mx-auto">
            {activeTab === "personal" && (
              <PrivateDocument
                documents={documents}
                modal={[
                  <ModalCreateDocu
                    boardId={boardId}
                    tokenFromGoogle={tokenFromGoogle}
                  />,
                ]}
                tokenFromGoogle={tokenFromGoogle}
                isHidden={false}
              />
            )}
            {activeTab === "public" && (
              <PublicDocument
                publicDocuments={publicDocuments}
                modal={[]}
                isHidden={true}
              />
            )}
            {/* {activeTab === null && (
            <AllDocument
              documents={documents}
              tokenFromGoogle={tokenFromGoogle}
              boardId={boardId}
            />
          )} */}
          </div>
        </main>
      )}
    </>
  );
}
