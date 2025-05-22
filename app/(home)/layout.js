"use client";

import "../globals.css";
import { usePathname } from "next/navigation";
import { NavbarLanding } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  return (
    <body className="font-poppin">
      <div className={isRoot ? "mx-0" : "mx-[50px]"}>
        {/* Show landing header background only on root */}
        {isRoot && ""}

        {/* Show Navbar only once */}
        {!isRoot && <NavbarLanding />}

        {children}
      </div>
      <Footer />
    </body>
  );
}
