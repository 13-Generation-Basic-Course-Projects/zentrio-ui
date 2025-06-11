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
  myFavBoard,
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return <DashbaordSideBar />;
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
      />
    );
  }
  // Show sidebar on /profile/... but NOT exactly /profile
  if (pathname.startsWith("/profile/")) {
    return <DashbaordSideBar />; // or your own <ProfileSidebar />
  }
  return ""; // fallback default
}
