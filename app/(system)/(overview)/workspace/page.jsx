import MyworkspaceEmpty from "@/components/appserver/MyworkspaceEmpty";
import React from "react";

//useage route : http://localhost:3000/workspace
import { auth } from "@/auth";
export default async function WorkspaceArea() {
  const session = await auth();
  console.log("wow", session?.token?.user?.payload?.token);
  return <MyworkspaceEmpty />;
}
