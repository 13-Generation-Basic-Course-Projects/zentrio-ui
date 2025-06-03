"use server";
console.log("test services must create folders");
import { apiConfig } from "@/constant/baseurl";
import { dashboardRoute } from "@/routes/allRoute";
import { mockWorkspaces } from "@/data/workspace/data";

import { workSpaceRouteGroup } from "../routes/workspaceRoute";

//import auth

import { auth } from "../auth";

export const getWorkspace = async () => {
  const url = `${dashboardRoute.getWorkspace}`;
  const res = await fetch(url);
  //const res = await fetch(`${dashboardRoute.getWorkspace}`);

  const data = await res.json();
  return data.payload;
};

export const getWorkspaceById = async (workspaceId) => {
  //enpoint
  const url = `${dashboardRoute.getWorkspaceById(workspaceId)}`;
  const res = await fetch(url);
  // Filter the data based on workspaceId
  const data = mockWorkspaces;
  const filteredWorkspace = data.payload.filter(
    (workspace) => workspace.workspaceId === workspaceId
  );

  if (filteredWorkspace.length === 0) {
    throw new Error(`Workspace with workspaceId ${workspaceId} not found`);
  }

  return filteredWorkspace[0];
};

const url = "https://fakestoreapi.com/products";
export const testSusupne = async () => {
  const res = await fetch(url);
  //const res = await fetch(`${dashboardRoute.getWorkspace}`);

  const data = await res.json();
  return data;
};

/*
 * retrive token
 */

export const myToken = async () => {
  const token = await auth();
  return token;
};

/*
 * test
 */
