import React from "react";
import CartPostAnnouncement from "../announcementCompo/CardPostAnnouncement";
import CardCreateAnnouncement from "../announcementCompo/CardCreateAnnouncement";
import CardAllMembers from "../announcementCompo/CardAllMembers";
import { preventImage } from "@/constant/preventimage";
import ClockWeather from "../announcementCompo/ClockWheather";
import Image from "next/image";
import nothing from "@/assets/nothingbox.png";

export default function Announcementpage({
  boardId,
  Announcements,
  boardMember,
  currentUserProfile,
}) {
  const preventUserImage = preventImage.noProfile;

  const currentUserBoardInfo = boardMember.find(
    (member) => member.userId === currentUserProfile?.payload?.user?.userId
  );
  const currentUserRoles = currentUserBoardInfo?.roles || [];
  const isProjectManager = currentUserRoles.includes("ROLE_MANAGER");

  // ✅ Sort announcements: pinned ones first
  const sortedAnnouncements = {
    ...Announcements,
    payload: [...(Announcements?.payload || [])].sort((a, b) => {
      if (a.isPinned === b.isPinned) return 0;
      return a.isPinned ? -1 : 1;
    }),
  };

  return (
    <div className="grid grid-cols-12 w-full h-screen p-2">
      {/* Left Section */}
      <div className="col-span-8">
        <div className="pt-0 pl-20">
          {isProjectManager && (
            <CardCreateAnnouncement
              boardId={boardId}
              boardMember={boardMember}
              Announcements={sortedAnnouncements}
              preventUserImage={preventUserImage}
            />
          )}
        </div>

        <div className="w-full h-full pl-20">
          {sortedAnnouncements?.payload?.length > 0 ? (
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

      {/* Right Section */}
      <div className="col-span-4">
        <CardAllMembers
          boardMember={boardMember}
          preventUserImage={preventUserImage}
        />
        <ClockWeather />
      </div>
    </div>
  );
}
