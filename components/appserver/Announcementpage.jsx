import React from "react";
import CartPostAnnouncement from "../announcementCompo/CardPostAnnouncement";
import CardCreateAnnouncement from "../announcementCompo/CardCreateAnnouncement";
import CardAllMembers from "../announcementCompo/CardAllMembers";
import CardFilterComponent from "../announcementCompo/CardFilterComponent";
import { preventImage } from "@/constant/preventimage";
import ClockWeather from "../announcementCompo/ClockWheather";

export default function Announcementpage({
  boardId,
  Announcements,
  boardMember,
  currentUserProfile,
}) {
  console.log("All announcement", Announcements);
  console.log("kdetttt", boardId);
  console.log("kdetkoooo", boardMember);
  console.log("user",currentUserProfile)
  const preventUserImage = preventImage.noProfile;

  const currentUserBoardInfo = boardMember.find(
    (member) => member.userId === currentUserProfile?.payload?.user?.userId
  );
  console.log("gggg",currentUserProfile?.payload?.user?.userId)
  console.log("info",currentUserBoardInfo);
  const currentUserRoles = currentUserBoardInfo?.roles || [];
  console.log("ss",currentUserRoles)
  const isProjectManager = currentUserRoles.includes("ROLE_MANAGER");
  console.log("rolemamam",isProjectManager)
  

  return (
    <div className="grid grid-cols-12 w-full h-screen p-2">
      <div className="col-span-8 ">
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
            <CartPostAnnouncement
              Announcements={Announcements}
              currentUserProfile={currentUserProfile}
              boardId={boardId}
              preventUserImage={preventUserImage}
              boardMember={boardMember}
            />
          </div>
        </div>
      </div>

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
