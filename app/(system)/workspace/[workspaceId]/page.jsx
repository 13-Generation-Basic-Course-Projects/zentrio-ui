import Myworkspace from "@/components/appserver/Myworkspace";
import React from "react";

export default async function WorkspaceSpcific({ params }) {
  return <Myworkspace Workspaceid={await params.workspaceId} />;
}
