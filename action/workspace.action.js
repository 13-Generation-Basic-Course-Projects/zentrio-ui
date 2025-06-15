"use server";

import { auth } from "@/auth";
import { Token } from "@/constant/token";
import { RenameSchema } from "@/lib/schemas/workspaceSchema";
import {
  createBoardService,
  createWorkspaceService,
  deleteBoardService,
  deleteWorkspaceByIdService,
  getAllBoardsService,
  getAllWorkspacesService,
  getBoardByIdService,
  getBoardsByWorkspaceIdService,
  getFavoriteBoardService,
  getOtherWorkSpaceJoinedService,
  getWorkspacesByUserService,
  updateBoardByIdService,
  updateFavBoardByIdService,
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

  const token = await Token();
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

  const token = await Token();
  console.log("token hhhhhhhhhhhhhhhhhh", token);
  const result = await getAllWorkspacesService({token});
   return result;
 };


/*
 * 4. for service Delete workspace by id -> deleteWorkspaceById: (id) => `${apiConfig.baseUrl}/workspaces/${id}`,
 */
export const deleteWorkspaceByIdAction = async (id) => {
  const token = await Token();
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
  const token = await Token();
  const result = await getWorkspacesByUserService({ token });
  return result;
};

/* Action in workspace for board */

/*
 * 1. for Get board by ID -> getBoardById: (id) => `${apiConfig.baseUrl}/boards/${id}`,
 */

export const getBoardByIdAction = async (boardId) => {
  const token = await Token();

  const result = await getBoardByIdService({ boardId, token });

  revalidateTag("boards");
  return result;
};

/*
 * 2. Update board by board Id and workspace id
 */

export const updateBoardByIdAction = async (boardId, payload = {}) => {
  const { title, description, cover, workspaceId } = payload;
  console.log("🔁 Sending update payload in action:", {
    title,
    description,
    cover,
    workspaceId,
  });

  if (!boardId) throw new Error("Board ID is required");
  const token = await Token();

  const result = await updateBoardByIdService({
    boardId,
    title,
    description,
    cover,
    workspaceId,
    token,
  });

  revalidateTag("boards");
  return result;
};

/*
 * 3. Updated favourite of board by id
 */
export const updateFavBoardByIdAction = async ({ boardId, isFavourite }) => {
  console.log("🔁 Sending update favorite payload in action:", {
    boardId,
    isFavourite,
  });

  if (!boardId) throw new Error("Board ID is required");

  const token = await Token();

  console.log("🔐 Using token in action:", token);

  const result = await updateFavBoardByIdService({
    boardId,
    isFavourite,
    token,
  });

  revalidateTag("boards");
  return result;
};

/*
 * 4. Get all boards
 */
export const getAllBoardsAction = async () => {
  const token = await Token();
  const result = await getAllBoardsService({ token });

  return result;
};

/*
 * 5. Create new board by workspace id
 */
export const createBoardAction = async (payload = {}) => {
  console.log("Payload  board received:", payload);
  const { title, description, cover, workspaceId } = payload;

  if (!title || !description) {
    throw new Error("title and description are required");
  }

  const token = await Token();
  const result = await createBoardService({
    title,
    description,
    cover,
    workspaceId,
    token,
  });

  revalidateTag("boards");
  return result;
};

/*
 * 13. Get all boards by workspace id
 */
export const getAllBoardBywWorkspaceIdAction = async (workspaceId) => {
  const token = await Token();
  console.log("workspace id in board action: ", workspaceId);
  const result = await getBoardsByWorkspaceIdService({ workspaceId, token });
  return result;
};

/*
 * 16. Deleted board by id and workspace id
 */
export const deleteBoardAction = async (id, workspaceId) => {
  const token = await Token();
  console.log("Delete board id action : ", id);
  console.log("workspaceId board id action : ", workspaceId);
  const result = await deleteBoardService({ id, workspaceId, token });

  // revalidate tag related to workspaces
  revalidateTag("/boards");
  return result;
};
/**
 *
 * favorite
 */

export const getFavoriteBoardAction = async (userId) => {
  const token = await Token();
  console.log("from uid", userId);
  const result = await getFavoriteBoardService(userId, token);
  return result;
};

/**
 * other workspace
 */
export const getOtherWorkSpaceJoinedAction = async () => {
  const token = await Token();
  const result = await getOtherWorkSpaceJoinedService(token);
  return result;
};
