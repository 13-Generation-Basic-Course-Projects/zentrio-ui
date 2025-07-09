import Memberpage from "@/components/appserver/Memberpage";
import React from "react";
import Memberempty from "@/components/appserver/Memberempty";
import {
  getBoardMemberAction,
  getTaskByBoardIdAction,
} from "@/action/member.action";
import { preventImage } from "@/constant/preventimage";
import { getCurrentUserProfileAction } from "@/action/profile.action";
import { getBoardByBoardIdAction, getMemberByBoardIdAction } from "@/action/board.action";
import { getOtherWorkSpaceJoinedAction } from "@/action/workspace.action";

//useage route : http://localhost:3000/dashboard/1/1/member
export default async function Member({ params }) {
  const boardId = params.boardId;
  const workspaceId = params.workspaceId;

  const boardData= await getBoardByBoardIdAction(boardId);
  const boardName= boardData?.payload?.title;
    ("Board ID in app:", boardName);


  const boardMember = await getBoardMemberAction(boardId);
    ("Fetched board members:", boardMember);
  //pf
  /*
   * This function is the main entry point for the profile page.
   */
  const currentUserProfile = await getCurrentUserProfileAction();
  const imageUser = currentUserProfile?.payload?.user?.profileImage;
  const noImage = preventImage.noProfile;
  const preventUserImage = imageUser == null ? noImage : imageUser;
  /**
   * workspace joined
   */
  //workspace other
  const getWorKSpaceJoined = await getOtherWorkSpaceJoinedAction();
    ("getWorKSpaceJoined other", getWorKSpaceJoined);
  // Search through all workspaces and their otherBoards to find the matching board
  let matchingBoard = null;
  let matchingWorkspace = null;

  for (const workspace of getWorKSpaceJoined.payload) {
    const board = workspace.otherBoards?.find(
      (board) => board.boardId === boardId
    );

    if (board) {
      matchingBoard = board;
      matchingWorkspace = workspace;
      break; // Found it, no need to continue searching
    }
  }

    ("matching board:", matchingBoard);
    ("matching workspace:", matchingWorkspace);

  if (!matchingBoard) {
      ("Board not found with ID:", boardId);
  } else {
      ("Found board:", matchingBoard);
      ("Board belongs to workspace:", matchingWorkspace.title);
  }
  const matchingBoardForNotPM = matchingBoard;
  const membersResponse = await getMemberByBoardIdAction({ boardId });
  const allMemberInBoard = membersResponse?.payload || [];
    ("vvvv", allMemberInBoard);

  //curent user

  return (
    <Memberpage
      boardId={boardId}
      boardMember={boardMember}
      preventUserImage={preventUserImage}
      matchingBoardForNotPM={matchingBoardForNotPM}
      workspaceId={workspaceId}
      allMemberInBoard={allMemberInBoard}
      currentUserProfile={currentUserProfile}
      boardName={boardName}
    />
  );
}
