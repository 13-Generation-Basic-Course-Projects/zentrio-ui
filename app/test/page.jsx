import React from "react";

import Workspace from "@/components/appserver/Workspace";
import { getWorkspaceById, getWorkspace } from "@/service/test.service";
import { getBoardByWorkSpaceId } from "@/service/board.service";
import { data } from "autoprefixer";
export default async function TestPage() {
  const data = await getWorkspace();
  const dataId = await getWorkspaceById("a1b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o");
  console.log("pppppp", dataId);

  return <Workspace data={data} />;
  //return <Workspace itembyid={dataId} />;
}
