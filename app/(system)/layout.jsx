import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarTest } from "@/components/sidebar/SideBar";

import { auth } from "../../auth";
import { UserAvatar } from "@/components/testcomponent/Avatar";
import NavbarWrapper from "@/components/layout/NavbarWrapper";

export const metadata = {
  title: "Zentrio | Task Mangement",
  description: "Welcome to Zentrio Cambodia",
};

//this layout is use for everything of workspace, and dashbaord .......

export default async function SystemLayout({ children }) {
  const session = await auth();
  console.log("aaa", session?.user);
  return (
    <SidebarProvider>
      <SidebarTest />
      <body className={" font-poppin  "}>
        <SidebarTrigger className="sticky top-0" />
        <div className="w-full ">
          <NavbarWrapper user={session?.user} />
          {children}
        </div>
      </body>
    </SidebarProvider>
  );
}
