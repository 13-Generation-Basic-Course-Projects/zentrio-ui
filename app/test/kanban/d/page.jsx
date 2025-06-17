import Reportpage from "@/components/appserver/Reportpage";
import React from "react";
// import { testAction } from "../../../../action/test.action";
// import TestFetch from "@/components/testcomponent/TestFetch";
export default async function page() {
  // const getTest = await testAction();
  // console.log("gettestaction", getTest);
  return (
    <div>
      {/* <TestFetch dataProp={getTest} /> */}
      <Reportpage />
    </div>
  );
}
