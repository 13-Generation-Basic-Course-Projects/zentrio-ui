"use client";

import { usePathname } from "next/navigation";
import { NavbarAuthorized } from "./NavbarAutherized";

export default function NavbarWrapper({ user }) {
  const pathname = usePathname();

  // Check if path matches your pattern (you can customize this)
  const hideNavbar =
    pathname.startsWith("/dashboard/") &&
    (pathname.includes("/board") || pathname.includes("/docu"));

  if (hideNavbar) return null;

  return <NavbarAuthorized user={user} />;
}
