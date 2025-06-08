"use server";

import { memberRouteGroup, taskRouteGroup } from "@/routes/memberRoute";


/* 
* Get board members service
*/
export const getBoardMembersService = async ({boardId, token }) => {
  try {
    const url = memberRouteGroup.getBoardMembers(boardId);

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
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    const data = await res.json();
    // console.log("Raw member response:", data);
    return data;
    
  } catch (error) {
    console.error("❌ Failed to get members:", error.message);
    throw error;
  }
};

/*
 * Delete member from board service
 * deleteMemberInBoard: (boardId, userId) =>
 *   `${apiConfig.baseUrl}/boards/${boardId}/users/${userId}`,
 */
export const deleteMemberFromBoardService = async ({
  boardId,
  userId,
  token,
}) => {
  console.log("Token in delete member service", token);
  console.log("BoardId in delete member service", boardId);
  console.log("UserID in delete member service", userId);
  try {
     const url = memberRouteGroup.deleteMemberInBoard(boardId, userId);
 
     const res = await fetch(url, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
       next: { tags: ["members"] },
      //  body: JSON.stringify({ boardId, userId }),
     });
 
     if (!res.ok) {
       throw new Error(`Failed to delete member: ${res.status}`);
     }
 
     return await res.json();
   } catch (error) {
     console.error("❌ Failed to delete member:", error.message);
     throw error;
   }
};

