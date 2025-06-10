import React from "react";
import CardAnnouncement from "../announcementCompo/CardAnnouncement";
import CardCreateAnnouncement from "../announcementCompo/CardCreateAnnouncement";

export default function Announcementpage() {
  return (
    <div>
      <CardCreateAnnouncement />
      <CardAnnouncement />
    </div>
  );
}
