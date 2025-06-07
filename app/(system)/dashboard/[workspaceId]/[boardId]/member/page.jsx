import Memberpage from "@/components/appserver/Memberpage";
import React from "react";
import Memberempty from "@/components/appserver/Memberempty";
import { getBoardMemberAction } from "@/action/member.action";

//useage route : http://localhost:3000/dashboard/1/1/member
export default async function Member({ params }) {
  const { boardId } = params;
  console.log("Board ID:", boardId); 

  const boardMember = await getBoardMemberAction(boardId);
  console.log("Fetched board members:", boardMember);

  return <Memberpage boardId={boardId} boardMember={boardMember} />;
}

