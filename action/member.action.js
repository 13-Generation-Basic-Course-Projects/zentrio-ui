import { getAllMembersByBoardIdService } from "@/service/member.service";

export const getAllMembersByBoardIdAction = async (boardId) => {
   return await getAllMembersByBoardIdService(boardId);
}