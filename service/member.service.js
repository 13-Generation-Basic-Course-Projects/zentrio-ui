"use server";

import { memberRouteGroup, taskRouteGroup } from "@/routes/memberRoute";
/*
 * Get board members service
 */
export const getBoardMembersService = async ({ boardId, token }) => {
  try {
    const url = memberRouteGroup.getBoardMembers(boardId);
    console.log("url member", url, boardId);
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
