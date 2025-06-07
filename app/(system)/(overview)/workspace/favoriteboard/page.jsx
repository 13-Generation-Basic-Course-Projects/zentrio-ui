import { getAllBoardsAction, updateFavBoardByIdAction } from "@/action/workspace.action";
import MyFavoriteBoard from "@/components/appserver/FavoriteBoard";

export default async function WorkspaceArea() {
  const getAllBoard = await getAllBoardsAction();
  console.log("Get all board in WorkspaceArea: ", getAllBoard);

  return (
    <MyFavoriteBoard
      getAllBoard={getAllBoard}
      updateFavAction={updateFavBoardByIdAction}
    />
  );
}
