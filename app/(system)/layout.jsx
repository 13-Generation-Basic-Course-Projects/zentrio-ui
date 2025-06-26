import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarTest } from "@/components/sidebar/SideBar";

import { auth } from "../../auth";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import SidebarRenderer from "@/components/sidebar/SidebarRenderer";
import { SideBarIcon } from "@/components/icon/everyicon";
import {
  createWorkspaceAction,
  deleteWorkspaceByIdAction,
  getAllBoardBywWorkspaceIdAction,
  getAllWorkspaceAction,
  getAllWorkspaceForUserAction,
  getFavoriteBoardAction,
  getOtherWorkSpaceJoinedAction,
  updateWorkspaceByIdAction,
} from "@/action/workspace.action";
import {
  getCurrentUserProfileAction,
  getPreviewProfileAction,
} from "@/action/profile.action";
import { preventImage } from "@/constant/preventimage";
import {
  getNotificationForUserIdAction,
  sendNotificationToUserIdAction,
} from "@/action/notification.action";
import OneSignalInitializer from "@/components/onesignal/OneSignalInitializer";
import ModalNotification from "@/components/modal/noti/ModalNotification";
//import { LoadingBarContainer } from "react-top-loading-bar";
export const metadata = {
  title: "Zentrio | Task Mangement",
  description: "Welcome to Zentrio Cambodia",
};

//this layout is use for everything of workspace, and dashbaord .......

export default async function SystemLayout({ children, params }) {
  const session = await auth();
  console.log("aaa", session);
  if (session) {
    const boardId = params.id;
    /*  call action get all workspace */
    const workspaceData = await getAllWorkspaceAction();
    /*  call action get all workspace for users */
    const workspaceUsersData = await getAllWorkspaceForUserAction();

    /*
     * This function is the main entry point for the profile page.
     */

    const currentUserProfile = await getCurrentUserProfileAction();
    /**
     * get board favorite
     */
    const getUserDetials = await getPreviewProfileAction();
    //  console.log("getPreviewProfileAction", getUserDetials);
    const myUserId = getUserDetials?.payload?.userId;
    const imageUser = getUserDetials?.payload?.profileImage;
    const noImage = preventImage.noProfile;
    const preventUserImage = imageUser == null ? noImage : imageUser;
    console.log("what inside layout and userprofile", imageUser);

    const myFavBoard = await getFavoriteBoardAction(myUserId);
    console.log("getFavoriteBoardAction", myFavBoard);
    console.log("myUserId", myUserId);

    //workspace other

    const getWorKSpaceJoined = await getOtherWorkSpaceJoinedAction();
    console.log("getWorKSpaceJoined", getWorKSpaceJoined);

    const notificationData = await getNotificationForUserIdAction(myUserId);



    return (
      // <LoadingBarContainer>
      <SidebarProvider className="bg-bgColor">
        <OneSignalInitializer userId={myUserId} />
        <SidebarRenderer
          workspaceData={workspaceData}
          workspaceUsersData={workspaceUsersData}
          createWorkspace={createWorkspaceAction}
          deleteWorkspace={deleteWorkspaceByIdAction}
          updateNameWorkspace={updateWorkspaceByIdAction}
          getBoardByWorkspaceId={getAllBoardBywWorkspaceIdAction}
          getWorKSpaceJoined={getWorKSpaceJoined}
        />
        <div
          className={" font-poppin h-screen overflow-hidden  bg-white  w-full"}>
          {/* <SidebarTrigger className="fixed top-0  z-[30]" /> */}
          <div className="w-full  ">
            <NavbarWrapper
              user={session?.user}
              preventUserImage={preventUserImage}
              notificationData={notificationData}
            />
            {children}
          </div>
        </div>
      </SidebarProvider>
      // </LoadingBarContainer>
    );
  }
  return <div className="w-full  ">{children}</div>;
}
