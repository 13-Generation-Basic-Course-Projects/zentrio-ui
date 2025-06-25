"use client";

import { usePathname } from "next/navigation";
import WorkSpaceSideBar from "./WorkSpaceSidebar";
import DashbaordSideBar from "./SideBar";

export default function SidebarRenderer({
  workspaceData,
  workspaceUsersData,
  createWorkspace,
  deleteWorkspace,
  updateNameWorkspace,
  getBoardByWorkspaceId,
  getWorKSpaceJoined,
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return <DashbaordSideBar getWorKSpaceJoined={getWorKSpaceJoined} workspaceData={workspaceData}/>;
  }

  if (pathname.startsWith("/workspace")) {
    return (
      <WorkSpaceSideBar
        workspaceData={workspaceData}
        workspaceUsersData={workspaceUsersData}
        createWorkspace={createWorkspace}
        deleteWorkspace={deleteWorkspace}
        updateNameWorkspace={updateNameWorkspace}
        getBoardByWorkspaceId={getBoardByWorkspaceId}
        getWorKSpaceJoined={getWorKSpaceJoined}
      />
    );
  }
  // Show sidebar on /profile/... but NOT exactly /profile
  if (pathname.startsWith("/profile/")) {
    return <DashbaordSideBar />; // or your own <ProfileSidebar />
  }
  return ""; // fallback default
}
