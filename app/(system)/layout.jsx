import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { auth } from "../../auth";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import SidebarRenderer from "@/components/sidebar/SidebarRenderer";
import { getNotificationForUserIdAction, sendNotificationToUserIdAction } from "@/action/notification.action";
//import { LoadingBarContainer } from "react-top-loading-bar";
export const metadata = {
  title: "Zentrio | Task Mangement",
  description: "Welcome to Zentrio Cambodia",
};

//this layout is use for everything of workspace, and dashbaord .......

export default async function SystemLayout({ children }) {
  const session = await auth();

  const userId = "bcf9227f-c24a-47a0-b91f-50125c4ef0a2";
  const notificationData = await getNotificationForUserIdAction(userId);

  // const taskId = "b3f26788-acd8-4afc-b6a6-6d3fbfb00f5a";
  // const message = "Task is completed ";
  // const sendNoti = await sendNotificationToUserIdAction(userId, taskId, message);
  return (
    // <LoadingBarContainer>
    <SidebarProvider className="bg-bgColor">
      <SidebarRenderer />
      <div
        className={" font-poppin h-screen overflow-hidden  bg-white  w-full"}>
        {/* <SidebarTrigger className="fixed top-0  z-[30]" /> */}
        <div className="w-full  ">
          <NavbarWrapper
            user={session?.user}
            notificationData={notificationData}
          />
          {children}
        </div>
      </div>
    </SidebarProvider>
    // </LoadingBarContainer>
  );
}
