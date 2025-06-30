"use client";

import { usePathname } from "next/navigation";
import { NavbarAuthorized } from "./NavbarAutherized";

export default function NavbarWrapper({
  user,
  notificationData,
  preventUserImage,
}) {
  const pathname = usePathname();

  // Hide navbar if:
  const hideNavbar =
    (pathname?.startsWith("/dashboard/") &&
      (pathname.includes("/board") ||
        pathname.match(
          /\/dashboard\/(otherworkspace\/)?[^/]+\/[^/]+\/docu$/
        ))) ||
    pathname === "/profile" ||
    // New condition for /guestuser/:workspaceId/:boardId
    pathname?.startsWith("/guestuser/");

  if (hideNavbar) return null;

  return (
    <NavbarAuthorized
      user={user}
      notificationData={notificationData}
      preventUserImage={preventUserImage}
    />
  );
}
