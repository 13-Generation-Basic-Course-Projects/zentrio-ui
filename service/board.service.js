///service/board.service.js
"use server";
import { boardRoute } from "@/routes/boardRoute";

export const createBoardById = async (id, name, cover, urlParam, yourToken) => {
  try {
    // Get endpoint URL from your route builder
    const url = boardRoute.createBoardById(
      id,
      name,
      cover,
      urlParam,
      yourToken
    );

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
      body: JSON.stringify({
        id,
        name,
        cover,
        url: urlParam,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Failed to create board:", error.message);
    throw error; // Re-throw if you want to handle it higher up
  }
};

export const getTaskByBoardId = async (id) => {
  try {
    // Get endpoint URL from your route builder
    const url = boardRoute.getTaskByBoardId(id);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Failed to create board:", error.message);
    throw error; // Re-throw if you want to handle it higher up
  }
};
