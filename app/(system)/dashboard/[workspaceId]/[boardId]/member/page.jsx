import Memberpage from "@/components/appserver/Memberpage";
import React from "react";
import Memberempty from "@/components/appserver/Memberempty";

//useage route : http://localhost:3000/dashboard/1/1/member
export default function Member() {
  return (
    <>
      <Memberpage />
      {/* <Memberempty /> */}
    </>
  );
}
