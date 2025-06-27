"use server";

import { Token } from "@/constant/token";
import { RenameSchema } from "@/lib/schemas/workspaceSchema";
import { uploadImageBoardService } from "@/service/board.service";
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
  getMemberByBoardIdService,
  getMemeberByBoardIdService,
  getOtherWorkSpaceJoinedService,
  getWorkspacesByUserService,
  updateBoardByIdService,
  updateFavBoardByIdService,
  updateWorkspaceByIdService,
  uploadBoardCoverService,
} from "@/service/workspace.service";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/workspaces");
  return result;
};

/*
 *2. action get all workspaces (my workspace)
 */
export const getAllWorkspaceAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("wwwwwwww", token);
  const result = await getAllWorkspacesService({ token });

  return result;
};

/*
 * 4. for service Delete workspace by id -> deleteWorkspaceById: (id) => `${apiConfig.baseUrl}/workspaces/${id}`,
 */
export const deleteWorkspaceByIdAction = async (id) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("Delete id action : ", id);
  const result = await deleteWorkspaceByIdService({ id, token });

  // revalidate tag related to workspaces
  revalidatePath("/workspaces");
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
  revalidatePath("/workspaces");
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

/* Action in workspace for board */

/*
 * 1. for Get board by ID -> getBoardById: (id) => `${apiConfig.baseUrl}/boards/${id}`,
 */

export const getBoardByIdAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getBoardByIdService({ boardId, token });
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

  const userToken = await Token();
  const token = userToken.Credential;

  const result = await updateBoardByIdService({
    boardId,
    title,
    description,
    cover,
    workspaceId,
    token,
  });

  revalidatePath("/boards");
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

  const userToken = await Token();
  const token = userToken.Credential;

  console.log("🔐 Using token in action:", token);

  const result = await updateFavBoardByIdService({
    boardId,
    isFavourite,
    token,
  });

  revalidatePath("/boards");
  return result;
};

/*
 * 4. Get all boards
 */
export const getAllBoardsAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getAllBoardsService({ token });

  return result;
};

/*
 * 5. Create new board by workspace id
 */
export const createBoardAction = async (payload = {}) => {
  const userToken = await Token();
  const token = userToken.Credential;

  let title, description, cover, workspaceId;

  if (payload instanceof FormData) {
    title = payload.get("title");
    description = payload.get("description");
    cover = payload.get("cover");
    workspaceId = payload.get("workspaceId");

    console.log("Received FormData payload:", {
      title,
      description,
      cover,
      workspaceId,
    });
  } else {
    ({ title, description, cover, workspaceId } = payload);
    console.log("Received object payload:", {
      title,
      description,
      cover,
      workspaceId,
    });
  }

  if (!title || !description) {
    throw new Error("title and description are required");
  }

  const result = await createBoardService({
    title,
    description,
    cover,
    workspaceId,
    token,
  });

  revalidatePath("boards");
  console.log("Results create board in action:", result.payload);
  return result.payload;
};

/*
 * 13. Get all boards by workspace id
 */
export const getAllBoardBywWorkspaceIdAction = async (workspaceId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("workspace id in board action: ", workspaceId);
  const result = await getBoardsByWorkspaceIdService({ workspaceId, token });
  return result;
};

/*
 * 16. Deleted board by id and workspace id
 */
export const deleteBoardAction = async (id, workspaceId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("Delete board id action : ", id);
  console.log("workspaceId board id action : ", workspaceId);
  const result = await deleteBoardService({ id, workspaceId, token });

  // revalidate tag related to workspaces
  revalidatePath("/boards");
  return result;
};
/**
 *
 * favorite
 */

export const getFavoriteBoardAction = async (userId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("from uid", userId);
  const result = await getFavoriteBoardService(userId, token);
  return result;
};

/**
 * other workspace
 */
export const getOtherWorkSpaceJoinedAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getOtherWorkSpaceJoinedService(token);
  return result;
};

/* new
 * get member by board id
 */

export const getMemberByBoardIdAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getMemberByBoardIdService({ boardId, token });
  console.log("Get member in action : ", result);
  return result;
};

export const uploadImageBoardAction = async ({ boardId, image }) => {
  console.log("kakakak", image);
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("sad token", token);
  const result = await uploadImageBoardService({
    boardId,
    image,
    token,
  });
  revalidatePath("/workspaces");
  return result;
};

/*
 * 7. Upload cover by board id
 */
// export const uploadBoardCoverAction = async (boardId, file) => {
//   console.log("upload boardId in action : ", boardId);
//   console.log("upload file in action : ", file);
//   const userToken = await Token();
//   const token = userToken.Credential;
//   const result = await uploadBoardCoverService({ boardId, file, token });
//   console.log("upload cover in action : ", result);
//   return result;
// };
