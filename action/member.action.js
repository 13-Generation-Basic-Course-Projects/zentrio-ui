"use server";

import { Token } from "@/constant/token";
import {
  getBoardMembersService,
  getUserByUserIdService,
} from "@/service/member.service";

/*
 * Get board members action
 */
export const getBoardMemberAction = async (boardId) => {
  const token = await Token();
  const result = await getBoardMembersService({ boardId, token });

  // return result;
  console.log("getBoardMembersService result:", result);

  return Array.isArray(result?.payload) ? result.payload : [];
};

/*
 * Get board members action
 */
export const getUserByUserIdAction = async (userId) => {
  const token = await Token();
  const result = await getUserByUserIdService({ userId, token });

  // return result;
  console.log("getBoardMembersService depend on id result:", result);

  return result;
};
