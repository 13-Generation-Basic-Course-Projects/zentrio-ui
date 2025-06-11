import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { auth } from "../../auth";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import SidebarRenderer from "@/components/sidebar/SidebarRenderer";
import { getNotificationForUserIdAction } from "@/action/notification.action";
//import { LoadingBarContainer } from "react-top-loading-bar";
export const metadata = {
  title: "Zentrio | Task Mangement",
  description: "Welcome to Zentrio Cambodia",
};

//this layout is use for everything of workspace, and dashbaord .......

export default async function SystemLayout({ children }) {
  const session = await auth();

  const userId = "bcf9227f-c24a-47a0-b91f-50125c4ef0a2";
  const notification = await getNotificationForUserIdAction(userId);
  return (
    // <LoadingBarContainer>
    <SidebarProvider className="bg-bgColor">
      <SidebarRenderer />
      <div
        className={" font-poppin h-screen overflow-hidden  bg-white  w-full"}
      >
        {/* <SidebarTrigger className="fixed top-0  z-[30]" /> */}
        <div className="w-full  ">
          <NavbarWrapper user={session?.user} notification={notification}/>
          {children}
        </div>
      </div>
    </SidebarProvider>
    // </LoadingBarContainer>
  );
}
