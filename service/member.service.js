"use server";

import { memberRouteGroup, taskRouteGroup } from "@/routes/memberRoute";

/*
 * Get board members service
 */
export const getBoardMembersService = async ({ boardId, token }) => {
  
    const url = memberRouteGroup.getBoardMembers(boardId);
    //console.log("url member", url, boardId);
    const res = await fetch(url, {
      next: {
        tags: ["members"],
      },
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log("Raw member response:", data);
    return data;
  
};

/*
 * Get board members service
 */
export const getUserByUserIdService = async ({ userId, token }) => {
  try {
    const url = memberRouteGroup.getUserByUserId(userId);

    const res = await fetch(url, {
      next: {
        tags: ["members"],
      },
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("errorData", errorData);
      return errorData;
    }

    const data = await res.json();
    //console.log("Raw member response:", data);
    return data;
  } catch (error) {
    //console.error("❌ Failed to get members:", error.message);
    throw error;
  }
};

export const getAllMemberByBoardIdService = async ({ boardId, token }) => {
  const url = memberRouteGroup.getAllMemberByBoardId(boardId);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
