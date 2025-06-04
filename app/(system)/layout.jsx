import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarTest } from "@/components/sidebar/SideBar.jsx";

import { auth } from "../../auth";
import { UserAvatar } from "@/components/testcomponent/Avatar";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import { Suspense } from "react";
import Loading from "../loading";
import SidebarRenderer from "@/components/sidebar/SidebarRenderer";
import { SideBarIcon } from "@/components/icon/everyicon";
//import { LoadingBarContainer } from "react-top-loading-bar";
export const metadata = {
  title: "Zentrio | Task Mangement",
  description: "Welcome to Zentrio Cambodia",
};

//this layout is use for everything of workspace, and dashbaord .......

export default async function SystemLayout({ children }) {
  const session = await auth();
  console.log("aaa", session?.user);
  return (
    // <LoadingBarContainer>
    <SidebarProvider className="bg-bgColor">
      <SidebarRenderer />
      <div
        className={" font-poppin h-screen overflow-hidden  bg-white  w-full"}
      >
        {/* <SidebarTrigger className="fixed top-0  z-[30]" /> */}
        <div className="w-full  ">
          <NavbarWrapper user={session?.user} />
          {children}
        </div>
      </div>
    </SidebarProvider>
    // </LoadingBarContainer>
  );
}
