"use server";

import { Token } from "@/constant/token";
import {
  createAnnouncementByBoardIdService,
  createCommentByAnnouncementIdService,
  deleteAnnouncementByIdService,
  deleteCommentByIdService,
  editCommentByIdService,
  getAllAnnouncementByBoardIdService,
  pinedAnnouncementByIdService,
  updateAnnouncementByIdService,
  uploadMultiImgByBoardIdService,
} from "@/service/annoncement.service";
import { revalidatePath } from "next/cache";

export const createAnnouncementByBoardIdAction = async (payload = {}) => {
  const { title, description, boardId } = payload;
  console.log("pay", payload);

  const userToken = await Token();
  const token = userToken.Credential;
  console.log("Calling service with:", { title, description, token, boardId });
  const result = await createAnnouncementByBoardIdService({
    title,
    description,
    boardId,
    token,
  });
  revalidatePath("/create");
  return result;
};

export const uploadMultiImgByBoardIdAction = async (boardId, image) => {
  console.log("kakakak", image);
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await uploadMultiImgByBoardIdService({
    boardId,
    image,
    token,
  });
  return result;
};

export const getAllAnnouncementByBoardIdAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getAllAnnouncementByBoardIdService({
    boardId,
    token,
  });
  return result;
};

export const deleteAnnouncementByIdAction = async (id) => {
  console.log("kdet", id);
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await deleteAnnouncementByIdService(id, token);
  revalidatePath("/delete");
  return result;
};

export const pinedAnnouncementByIdAction = async (announId) => {
  console.log("pined id", announId);

  const userToken = await Token();
  const token = userToken.Credential;
  const result = await pinedAnnouncementByIdService(announId, token);
  revalidatePath("/update");
  return result;
};

export const updateAnnouncementByIdAction = async (
  announId,
  description,
  title,
  boardId
) => {
  console.log("update id annon", announId, description, title, boardId);

  const userToken = await Token();
  const token = userToken.Credential;
  const result = await updateAnnouncementByIdService({
    announId,
    description,
    title,
    boardId,
    token,
  });
  revalidatePath("/update");
  return result;
};

export const createCommentByAnnouncementIdAction = async ({
  content,
  announcementId,
}) => {
  console.log("raaa", content, announcementId);
  const userToken = await Token();
  const token = userToken.Credential;

  console.log("toooken", token);
  const result = await createCommentByAnnouncementIdService({
    content,
    announcementId,
    token,
  });
  revalidatePath("/create");
  console.log("reeee", result);
  return result;
};

export const editCommentByIdAction = async ({
  content,
  announId,
  commentId,
}) => {
  console.log("dddddd",announId)

  const userToken = await Token();
  const token = userToken.Credential;
  const result = await editCommentByIdService({
    content,
    announId,
    commentId,
    token,
  });
  revalidatePath("/update");
  return result;
};

export const deleteCommentByIdAction = async ({ commentId }) => {
  // console.log("Comment Actionpd",commentId);

  const userToken = await Token();
  const token = userToken.Credential;
  const result = await deleteCommentByIdService({ commentId, token });
  revalidatePath("/detele");
  return result;
};
