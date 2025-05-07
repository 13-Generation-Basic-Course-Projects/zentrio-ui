"use server";
console.log("test services must create folders");
import { apiConfig } from "@/constant/baseurl";
export const getWorkspace = async () => {
  const res = await fetch(`${apiConfig.baseUrl}/api/workspace`);
  if (!res.ok) throw new Error("Failed to fetch workspace");
  const data = await res.json();
  return data.payload;
};
