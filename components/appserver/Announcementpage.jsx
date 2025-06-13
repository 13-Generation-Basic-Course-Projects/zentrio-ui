import React from "react";
import CartPostAnnouncement from "../announcementCompo/CardPostAnnouncement";
import CardCreateAnnouncement from "../announcementCompo/CardCreateAnnouncement";
import CardAllMembers from "../announcementCompo/CardAllMembers";
import CardFilterComponent from "../announcementCompo/CardFilterComponent";

export default function Announcementpage({ boardId, Announcements, boardMember }) {
  console.log("All announcement",Announcements);
  console.log("kdet",boardId);
    console.log("kdet2",boardMember);
  return (
    <div className="grid grid-cols-10 w-full h-screen p-4">
      <div className=" col-span-1">
        <CardFilterComponent />
      </div>

      <div className="col-span-6 ">
        <div className="pt-0">
          <CardCreateAnnouncement boardId={boardId} boardMember={boardMember} Announcements={Announcements}/>
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
