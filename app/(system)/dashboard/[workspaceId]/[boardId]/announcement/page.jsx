
import { getAllAnnouncementByBoardIdAction } from "@/action/announcement.action";
import Announcementpage from "@/components/appserver/Announcementpage";
import { getBoardMemberAction } from "@/action/member.action";
import React from "react";


export default async function page({params}) {

  const boardId = await params.boardId;
  const Announcements = await getAllAnnouncementByBoardIdAction(boardId);
  const boardMember = await getBoardMemberAction(boardId);

  return (
    <div>
      <Announcementpage 
          boardId={boardId} 
          Announcements={Announcements}
          boardMember={boardMember}
      />
    </div>
  );
};
