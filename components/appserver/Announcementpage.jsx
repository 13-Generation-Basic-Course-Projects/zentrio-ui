import React from "react";
import CartPostAnnouncement from "../announcementCompo/CardPostAnnouncement";
import CardCreateAnnouncement from "../announcementCompo/CardCreateAnnouncement";
import CardAllMembers from "../announcementCompo/CardAllMembers";
import CardFilterComponent from "../announcementCompo/CardFilterComponent";

export default function Announcementpage({ boardId, Announcements, boardMember }) {
  console.log("All announcement",Announcements);
  console.log("boardid",boardId);
  return (
    <div className="grid grid-cols-12 w-full h-screen p-4">
      <div className="bg-red-400 col-span-3">
        <CardFilterComponent />
      </div>

      <div className="col-span-6 ">
        <div className="pt-0">
          <CardCreateAnnouncement boardId={boardId} />
        </div>

        <div className="space-y-4">
          <CartPostAnnouncement Announcements={Announcements}/>
        </div>
      </div>

      <div className="col-span-3">
        <CardAllMembers boardMember={boardMember} />
      </div>
    </div>
  );
};
