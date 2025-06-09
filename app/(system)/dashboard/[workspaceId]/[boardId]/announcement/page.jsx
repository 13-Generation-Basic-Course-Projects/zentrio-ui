import Announcementpage from "@/components/appserver/Announcementpage";
import React from "react";

export default async function page() {
  return (
    <div>
      your component here example :
      <Announcementpage />
      {/* <AnnouncemntComponent />
        --> put in appServer
        --> in app server design component and put componet in announcement
        */}
    </div>
  );
}
