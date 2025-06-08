"use server";

import { Token } from "@/constant/token";
import { getBoardMembersService } from "@/service/member.service";



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

