"use client";

import React, { useState } from "react";
import Image from "next/image";
import notification from "../../assets/notification.png";
import Link from "next/link";
import Tapp from "../taps/BoardTab";
import userProfile from "@/assets/profile.png";
import ModalNotification from "../modal/noti/ModalNotification";
export function NavbarAuthorized({ user }) {
  console.log("pf", user);
  return (
    <>
      {/* Navbar */}

      <div className="w-full sticky top-0 z-20  bg-bgColor flex justify-end items-center  rounded-bl-3xl ">
        <header className="px-4 sm:px-6 lg:px-8 ">
          <div className="flex w-full h-16 items-center justify-end ">
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
    </>
  );
}
