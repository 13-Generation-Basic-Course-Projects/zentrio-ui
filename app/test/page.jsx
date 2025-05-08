import React from "react";

import Workspace from "@/components/appserver/Workspace";
import { getWorkspace } from "@/service/test.service";
export default async function TestPage() {
  const data = await getWorkspace();
  console.log(data);

  return <Workspace data={data} />;
}
