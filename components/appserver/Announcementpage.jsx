import React from "react";
import CartPostAnnouncement from "../announcementCompo/CardPostAnnouncement";
import CardCreateAnnouncement from "../announcementCompo/CardCreateAnnouncement";
import CardAllMembers from "../announcementCompo/CardAllMembers";
import CardFilterComponent from "../announcementCompo/CardFilterComponent";
import { preventImage } from "@/constant/preventimage";

export default function Announcementpage({
  boardId,
  Announcements,
  boardMember,
  currentUserProfile,
}) {
  console.log("All announcement", Announcements);
  console.log("kdet", boardId);
  console.log("kdetko", boardMember);
  const preventUserImage = preventImage.noProfile;
  return (
    <div className="grid grid-cols-12 w-full h-screen p-2">
      <div className="col-span-8 ">
        <div className="pt-0 ">
          <CardCreateAnnouncement
            boardId={boardId}
            boardMember={boardMember}
            Announcements={Announcements}
            preventUserImage={preventUserImage}
          />
        </div>

        <div className="w-full h-full ">
          <div className="space-y-4 px-2 py-4">
            <CartPostAnnouncement
              Announcements={Announcements}
              currentUserProfile={currentUserProfile}
              boardId={boardId}
              preventUserImage={preventUserImage}
            />
          </div>
        </div>
      </div>

      <div className="col-span-4">
        <CardAllMembers
          boardMember={boardMember}
          preventUserImage={preventUserImage}
        />
      </div>
    </div>
  );
}
