import Myworkspace from "@/components/appserver/Myworkspace";
import React from "react";

export default async function WorkspaceSpcific({ params }) {
  const data = await params.workspaceId;
  return <Myworkspace Workspaceid={data} />;
}
