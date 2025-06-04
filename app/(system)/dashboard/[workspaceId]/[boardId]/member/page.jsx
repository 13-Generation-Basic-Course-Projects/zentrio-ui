import Memberpage from "@/components/appserver/Memberpage";
import React from "react";
import Memberempty from "@/components/appserver/Memberempty";
import { getAllMembersByBoardIdAction } from "@/action/member.action";

//useage route : http://localhost:3000/dashboard/1/1/member
export default async function Member() {
  const memberData = await getAllMembersByBoardIdAction("5faf3282-7711-47d5-81c9-b253833a5501");
  // console.log("memberData", memberData);
  return (
    <>
      <Memberpage memberData={memberData} />
      {/* <Memberempty /> */}
    </>
  );
}
