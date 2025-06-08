"use server";

import { Token } from "@/constant/token";
import { deleteMemberFromBoardService, getBoardMembersService } from "@/service/member.service";



/* 
* Get board members action
*/
export const getBoardMemberAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getBoardMembersService({boardId ,token });

  // return result;
  console.log("getBoardMembersService result:", result);

  return Array.isArray(result?.payload) ? result.payload : [];
};

/* 
* Delete member from board action
*/
export const deleteMemberFromBoardAction = async (boardId, userId) => {
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    console.log("Token in delete member action:", token);
    console.log("BoardId in delete member action:", boardId);
    console.log("UserID in delete member action:",userId);

    const result = await deleteMemberFromBoardService({
      boardId,
      userId,
      token,
    });

    console.log("deleteMemberFromBoardService result:", result);
    return result;
  } catch (error) {
    console.error("❌ deleteMemberFromBoardAction failed:", error.message);
    throw error; // or handle error appropriately
  }
};
