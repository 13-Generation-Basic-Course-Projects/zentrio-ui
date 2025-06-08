import { getMemberByBoardIdAction } from "@/action/board.action";
import OtherUserProfile from "@/components/appserver/OtherProfilepage";
import React from "react";

export default async function MemberProfile({ params, searchParams }) {
  const { boardId } = searchParams; // Query parameter
  const { userId } = params;
  console.log("Board ID:", boardId);
  console.log("User ID:", userId, "Board ID:", boardId);
  /*
   * get member
   */
  const MemberDetails = await getMemberByBoardIdAction({ boardId });
  console.log("here is the member  details", MemberDetails);
  return <OtherUserProfile MemberDetails={MemberDetails} userId={userId} />;
}
