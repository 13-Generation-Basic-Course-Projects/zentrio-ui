import MyworkspaceEmpty from "@/components/appserver/MyworkspaceEmpty";
import React from "react";

//useage route : http://localhost:3000/workspace
import { auth } from "@/auth";
import { getNotificationForUserIdAction } from "@/action/notification.action";
export default async function WorkspaceArea() {
  const session = await auth();
  console.log("wow", session?.token?.user?.payload?.token);
  const ggt = session?.token?.account?.id_token
    ? `found${session?.token?.account?.id_token}`
    : "not found";
  console.log("i am about to test ggt", session?.user?.idToken);
  return <MyworkspaceEmpty />;
}
