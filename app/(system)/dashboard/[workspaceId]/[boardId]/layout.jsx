import { getMemberByBoardIdAction } from "@/action/board.action";
import { getPreviewProfileAction } from "@/action/profile.action";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashBoardLayout({ children, params }) {
  const session = await auth();
  const { boardId, workspaceId } = await params;

  try {
    // Fetch members and user details concurrently
    const [membersResponse, getUserDetails] = await Promise.all([
      getMemberByBoardIdAction({ boardId }),
      getPreviewProfileAction(),
    ]);

    const myUserId = getUserDetails?.payload?.userId;

    // Debugging log to inspect structure
    console.log("allMemberInBoard", membersResponse);

    // Check if myUserId exists in membersResponse.payload (not .data)
    const userExists = Array.isArray(membersResponse?.payload)
      ? membersResponse.payload.some((member) => member.userId === myUserId)
      : false;

    // Redirect to /workspace if myUserId is falsy or not in membersResponse
    if (!myUserId || !userExists) {
      redirect(`/workspace/${workspaceId}`);
    }

    console.log("this is the boardId", boardId);

    return <div>{children}</div>;
  } catch (error) {
    console.error("Error fetching data:", error);
    redirect(`/workspace/${workspaceId}`);
  }
}