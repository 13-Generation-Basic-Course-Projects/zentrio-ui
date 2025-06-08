import Memberpage from "@/components/appserver/Memberpage";
import React from "react";
import Memberempty from "@/components/appserver/Memberempty";

//useage route : http://localhost:3000/dashboard/1/1/member
export default function Member() {
  const boardId = "feb6d22e-b2d6-4105-b3ad-663c7148c337";
  return (
    <>
      <Memberpage boardId={boardId} />
      {/* <Memberempty /> */}
    </>
  );
}
