"use server";

import { Token } from "@/constant/token";
import { RenameSchema } from "@/lib/schemas/workspaceSchema";
import {
  createWorkspaceService,
  deleteWorkspaceByIdService,
  getAllWorkspacesService,
  getWorkspacesByUserService,
  updateWorkspaceByIdService,
} from "@/service/workspace.service";
import { revalidateTag } from "next/cache";

/*
 * 1. action for create workspaces
 */
export const createWorkspaceAction = async (payload = {}) => {
  console.log("Payload received:", payload);
  const { title, description } = payload;

  if (!title || !description) {
    throw new Error("title and description are required");
  }

  const userToken = await Token();
  const token = userToken.Credential;
  const result = await createWorkspaceService({
    title,
    description,
    token,
  });

  // revalidate tag related to workspaces
  revalidateTag("workspaces");
  return result;
};

/*
 *2. action get all workspaces (my workspace)
 */
export const getAllWorkspaceAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getAllWorkspacesService({ token });
  
  return result;
};

/*
 * 4. for service Delete workspace by id -> deleteWorkspaceById: (id) => `${apiConfig.baseUrl}/api/v1/workspaces/${id}`,
 */
export const deleteWorkspaceByIdAction = async (id) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("Delete id action : ", id);
  const result = await deleteWorkspaceByIdService({ id, token });

  // revalidate tag related to workspaces
  revalidateTag("workspaces");
  return result;
};

/*
 * 5. for service Update workspace by id -> updateWorkspaceById: (id) => `${apiConfig.baseUrl}/workspaces/${id}`,
 */
export const updateWorkspaceByIdAction = async (id, payload = {}) => {
  const { title, description } = payload;

  if (!id) throw new Error("Workspace ID is required");
  if (title === undefined && description === undefined) {
    throw new Error("At least one of title or description must be provided");
  }

  const userToken = await Token();
  const token = userToken.Credential;

  const result = await updateWorkspaceByIdService({
    id,
    title,
    description,
    token,
  });

  // revalidate tag related to workspaces
  revalidateTag("workspaces");
  return result;
};

/*
 * 6. for service Get all workspaces for users
 */
export const getAllWorkspaceForUserAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getWorkspacesByUserService({ token });
  return result;
};
