import React from "react";
import Otherworkspace from "@/components/appserver/Otherworkspace";

//useage route : http://localhost:3000/workspace/otherworkspacepage
export default function OtherWorkspace({ params }) {
  return <Otherworkspace Workspaceid={params.id} />;
}
