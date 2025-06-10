import React from "react";
import CartPostAnnouncement from "../announcementCompo/CardPostAnnouncement";
import CardCreateAnnouncement from "../announcementCompo/CardCreateAnnouncement";
import CardAllMembers from "../announcementCompo/CardAllMembers";
import CardFilterComponent from "../announcementCompo/CardFilterComponent";

export default function Announcementpage() {
  return (
    <div className="grid grid-cols-12 w-full h-screen p-4">
      <div className="bg-red-400 col-span-3">
        <CardFilterComponent />
      </div>

      <div
        className="col-span-6 overflow-y-auto h-full p-2 space-y-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>
          {`
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <div className="sticky top-0 z-10 mt-0 pt-0">
          <CardCreateAnnouncement />
        </div>

        <div className="space-y-4">
          <CartPostAnnouncement />
        </div>
      </div>

      <div className="col-span-3">
        <CardAllMembers />
      </div>
    </div>
  );
};
