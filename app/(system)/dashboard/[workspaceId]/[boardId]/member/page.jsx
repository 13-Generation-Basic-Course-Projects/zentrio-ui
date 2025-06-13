import Memberpage from "@/components/appserver/Memberpage";
import React from "react";
import Memberempty from "@/components/appserver/Memberempty";
import {
  getBoardMemberAction,
  getTaskByBoardIdAction,
} from "@/action/member.action";
import { preventImage } from "@/constant/preventimage";
import { getCurrentUserProfileAction } from "@/action/profile.action";
import { getMemberByBoardIdAction } from "@/action/board.action";

//useage route : http://localhost:3000/dashboard/1/1/member
export default async function Member({ params }) {
  const { boardId } = params;
  console.log("Board ID in app:", boardId);

  const boardMember = await getBoardMemberAction(boardId);
  console.log("Fetched board members:", boardMember);
  //pf
  /*
   * This function is the main entry point for the profile page.
   */
  const currentUserProfile = await getCurrentUserProfileAction();
  const imageUser = currentUserProfile?.payload?.user?.profileImage;
  const noImage = preventImage.noProfile;
  const preventUserImage = imageUser == null ? noImage : imageUser;

  return (
    <Memberpage
    boardId={boardId}
      boardMember={boardMember}
      preventUserImage={preventUserImage}
      boardId={boardId}
    />
  );
}
