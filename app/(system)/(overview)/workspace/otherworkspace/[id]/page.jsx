import React from "react";
import Otherworkspace from "@/components/appserver/Otherworkspace";

//useage route : http://localhost:3000/workspace/otherworkspace/1
export default async function OtherWorkspace({ params }) {
  return <Otherworkspace Workspaceid={await params.id} />;
}
