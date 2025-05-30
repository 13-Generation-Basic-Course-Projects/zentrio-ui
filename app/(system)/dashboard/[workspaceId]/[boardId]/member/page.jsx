import DocuEmpty from "@/components/appserver/DocumentEmpty";
import Memberempty from "@/components/appserver/Memberempty";
import Memberpage from "@/components/appserver/Memberpage";
import ReportEmpty from "@/components/appserver/ReportEmpty";
import React from "react";


//useage route : http://localhost:3000/dashboard/1/1/member
export default function Member() {
  return (
    <>
      <Memberpage />
      {/* <Memberempty /> */}
      {/* <DocuEmpty/> */}
      {/* <ReportEmpty/> */}
    </>
  );
}
