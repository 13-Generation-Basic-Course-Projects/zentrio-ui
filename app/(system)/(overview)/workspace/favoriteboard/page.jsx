import { getPreviewProfileAction } from "@/action/profile.action";
import {
  getAllBoardsAction,
  getFavoriteBoardAction,
  getMemberByBoardIdAction,
  updateFavBoardByIdAction,
} from "@/action/workspace.action";
import MyFavoriteBoard from "@/components/appserver/FavoriteBoard";
import { preventImage } from "@/constant/preventimage";

export default async function WorkspaceArea() {
  /**
   * get board favorite
   */
  const getUserDetials = await getPreviewProfileAction();
  //    ("getPreviewProfileAction", getUserDetials);
  const myUserId = getUserDetials?.payload?.userId;
  const imageUser = getUserDetials?.payload?.profileImage;
  const noImage = preventImage.noProfile;
  const preventUserImage = imageUser == null ? noImage : imageUser;
    ("what inside layout and userprofile", imageUser);

  const myFavBoard = await getFavoriteBoardAction(myUserId);
    ("getFavoriteBoardAction in favorite", myFavBoard);
    ("myUserId", myUserId);

  let allMembers = [];

  if (Array.isArray(myFavBoard?.payload) && myFavBoard?.payload?.length > 0) {
    const boardIds = myFavBoard?.payload
      .filter((board) => board.boardId)
      .map((board) => board.boardId);
      ("Board IDs in page workspace:", boardIds);

    if (boardIds.length === 0) {
        ("No valid board IDs found.");
    } else {
      // Fetch members sequentially
      for (const boardId of boardIds) {
        try {
          const response = await getMemberByBoardIdAction(boardId);
          const members = response?.payload || [];
          allMembers.push(...members);
        } catch (error) {
          console.error(
            `Failed to fetch members for boardId ${boardId}:`,
            error
          );
        }
      }

      // Deduplicate by userId
      allMembers = allMembers.reduce((unique, member) => {
        if (member.userId && !unique.some((m) => m.userId === member.userId)) {
          unique.push(member);
        }
        return unique;
      }, []);

        ("Members in page fav workspace:", allMembers);
    }
  } else {
      ("No boards found in workspace.");
  }

  let memberMap = {};

  if (Array.isArray(myFavBoard?.payload) && myFavBoard.payload.length > 0) {
    const boardIds = myFavBoard.payload
      .filter((board) => board.boardId)
      .map((board) => board.boardId);

    for (const boardId of boardIds) {
      try {
        const response = await getMemberByBoardIdAction(boardId);
        const members = response?.payload || [];
        memberMap[boardId] = members;
      } catch (error) {
        console.error(`Failed to fetch members for boardId ${boardId}:`, error);
        memberMap[boardId] = [];
      }
    }

      ("Final board members map:", memberMap);
  }

  return (
    <MyFavoriteBoard
      updateFavAction={updateFavBoardByIdAction}
      myFavBoard={myFavBoard}
      memberData={allMembers}
      memberMap={memberMap}
    />
  );
}
