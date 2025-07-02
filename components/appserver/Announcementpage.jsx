"use client";

import React, { useState, useMemo } from "react";
import CartPostAnnouncement from "../announcementCompo/CardPostAnnouncement";
import CardCreateAnnouncement from "../announcementCompo/CardCreateAnnouncement";
import CardAllMembers from "../announcementCompo/CardAllMembers";
import { preventImage } from "@/constant/preventimage";
import ClockWeather from "../announcementCompo/ClockWheather";
import Image from "next/image";
import nothing from "@/assets/nothingbox.png";
import DrawerPinAnnoun from "../announcementCompo/DrawerPinAnnoun";
import { Button } from "../ui/button";

export default function Announcementpage({
  boardId,
  Announcements,
  boardMember,
  currentUserProfile,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // console.log("All announcement", Announcements);
  // console.log("kdetttt", boardId);
  // console.log("kdetkoooo", boardMember);
  // console.log("user", currentUserProfile);
  const preventUserImage = preventImage.noProfile;

  const currentUserBoardInfo = boardMember.find(
    (member) => member.userId === currentUserProfile?.payload?.user?.userId
  );
  // console.log("gggg", currentUserProfile?.payload?.user?.userId);
  // console.log("info", currentUserBoardInfo);
  const currentUserRoles = currentUserBoardInfo?.roles || [];
  // console.log("ss", currentUserRoles);
  const isProjectManager = currentUserRoles.includes("ROLE_MANAGER");
  // console.log("rolemamam", isProjectManager);

  // Sort announcements: pinned first, then by date (newest first)
  const sortedAnnouncements = useMemo(() => {
    if (!Announcements?.payload || Announcements.payload.length === 0) {
      return Announcements;
    }

    const sorted = [...Announcements.payload].sort((a, b) => {
      // First priority: pinned status (pinned items first)
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // Second priority: creation date (newest first)
      const dateA = new Date(a.createdAt || a.created_at || 0);
      const dateB = new Date(b.createdAt || b.created_at || 0);
      return dateB - dateA;
    });

    return {
      ...Announcements,
      payload: sorted,
    };
  }, [Announcements]);

  return (
    <>
      <DrawerPinAnnoun
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        announcements={sortedAnnouncements.payload}
      />

      <div className="grid grid-cols-12 w-full h-screen pt-2">
        <div className="flex col-span-1 justify-end p-2 ">
          <Button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] text-white shadow-lg hover:shadow-xl transition-all rounded-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" />
            </svg>
            Pinned
          </Button>
        </div>
        <div className="col-span-7">
          <div className="pt-0 ">
            {isProjectManager && (
              <CardCreateAnnouncement
                boardId={boardId}
                boardMember={boardMember}
                Announcements={Announcements}
                preventUserImage={preventUserImage}
              />
            )}
          </div>

          <div className="w-full h-full">
            <div>
              {sortedAnnouncements?.payload &&
              sortedAnnouncements?.payload.length > 0 ? (
                <CartPostAnnouncement
                  Announcements={sortedAnnouncements}
                  currentUserProfile={currentUserProfile}
                  boardId={boardId}
                  preventUserImage={preventUserImage}
                  boardMember={boardMember}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
                  <Image
                    src={nothing}
                    alt="No Announcements"
                    width={100}
                    height={100}
                  />
                  <p className="text-xl text-primary font-medium mt-4">
                    Nothing has announcement
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <CardAllMembers
            boardMember={boardMember}
            preventUserImage={preventUserImage}
            boardId={boardId}
          />
          <ClockWeather />
        </div>
      </div>
    </>
  );
}