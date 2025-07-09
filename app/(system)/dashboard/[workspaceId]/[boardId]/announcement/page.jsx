
import { getAllAnnouncementByBoardIdAction } from "@/action/announcement.action";
import Announcementpage from "@/components/appserver/Announcementpage";
import { getBoardMemberAction } from "@/action/member.action";
import React from "react";
import { getCurrentUserProfileAction } from "@/action/profile.action";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default async function page({params}) {

  const boardId = params?.boardId ;
  const Announcements = await getAllAnnouncementByBoardIdAction(boardId);
  const boardMember = await getBoardMemberAction(boardId);
  const currentUserProfile = await getCurrentUserProfileAction();
  return (
    <div>
      <Announcementpage 
          boardId={boardId} 
          Announcements={Announcements}
          boardMember={boardMember}
          currentUserProfile={currentUserProfile}
      />
      {/* <ToastContainer/> */}
    </div>
  );
};
