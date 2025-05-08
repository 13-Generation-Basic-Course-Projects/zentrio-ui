"use server";
console.log("test services must create folders");

import { apiConfig } from "@/constant/baseurl";

export const getBoard = async ({ workspaceId }) => {
  const res = await fetch(`${apiConfig.baseUrl}/api/board/${workspaceId}`);
  if (!res.ok) throw new Error("Failed to fetch workspace");
  const data = await res.json();
  return data.payload;
};
