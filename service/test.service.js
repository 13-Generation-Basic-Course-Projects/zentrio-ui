"use server";
console.log("test services must create folders");

import { auth } from "../auth";
import { testRouteGroup } from "@/routes/testRoute";

const url = "https://fakestoreapi.com/products";
export const testSusupne = async () => {
  const res = await fetch(url);
  //const res = await fetch(`${dashboardRoute.getWorkspace}`);

  const data = await res.json();
  return data;
};

/*
 * test
 */
export const testFetchService = async ({ zentrioToken }) => {
  try {
    const url = testRouteGroup.getTaskAllUser();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${zentrioToken}`,
      },
      //  body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error;
  }

  // const url = testRouteGroup.getTaskAllUser();
  // console.log("this is url", url);
};
