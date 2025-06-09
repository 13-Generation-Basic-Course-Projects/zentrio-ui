"use client";

import { usePathname } from "next/navigation";
import { NavbarAuthorized } from "./NavbarAutherized";

export default function NavbarWrapper({ user, preventUserImage }) {
  const pathname = usePathname();

  // Hide navbar if on certain paths
  const hideNavbar =
    (pathname.startsWith("/dashboard/") &&
      (pathname.includes("/board") || pathname.includes("/docu"))) ||
    pathname === "/profile";

  if (hideNavbar) return null;

  return <NavbarAuthorized user={user} preventUserImage={preventUserImage} />;
}
