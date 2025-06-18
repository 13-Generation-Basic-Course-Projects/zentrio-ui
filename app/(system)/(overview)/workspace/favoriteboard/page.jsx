import { getPreviewProfileAction } from "@/action/profile.action";
import {
  getAllBoardsAction,
  getFavoriteBoardAction,
  updateFavBoardByIdAction,
} from "@/action/workspace.action";
import MyFavoriteBoard from "@/components/appserver/FavoriteBoard";
import { preventImage } from "@/constant/preventimage";

export default async function WorkspaceArea() {
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
  console.log("getFavoriteBoardAction in favorite", myFavBoard);
  console.log("myUserId", myUserId);
  return (
    <MyFavoriteBoard
      updateFavAction={updateFavBoardByIdAction}
      myFavBoard={myFavBoard}
    />
  );
}
