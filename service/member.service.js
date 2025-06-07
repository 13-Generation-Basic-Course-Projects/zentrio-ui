"use server";

import { memberRouteGroup } from "@/routes/memberRoute";


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
