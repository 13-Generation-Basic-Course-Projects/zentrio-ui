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
import { revalidatePath, revalidateTag } from "next/cache";

export const createAnnouncementByBoardIdAction = async (payload = {}) => {
  const { title, description, boardId } = payload;

  const userToken = await Token();
  const token = userToken.Credential;
  const result = await createAnnouncementByBoardIdService({
    title,
    description,
    boardId,
    token,
  });
  revalidateTag("announcements");
  return result;
};

export const uploadMultiImgByBoardIdAction = async (boardId, image ,announcementId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await uploadMultiImgByBoardIdService({
    boardId,
    image,
    token,
    announcementId
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
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await deleteAnnouncementByIdService(id, token);
  revalidateTag("announcements");
  return result;
};

export const pinedAnnouncementByIdAction = async (announId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await pinedAnnouncementByIdService(announId, token);
  revalidateTag("announcements");
  return result;
};

export const updateAnnouncementByIdAction = async (
  announId,
  description,
  title,
  boardId
) => {

  const userToken = await Token();
  const token = userToken.Credential;
  const result = await updateAnnouncementByIdService({
    announId,
    description,
    title,
    boardId,
    token,
  });
  revalidateTag("announcements");
  return result;
};

export const createCommentByAnnouncementIdAction = async ({
  content,
  announcementId,
}) => {

  const userToken = await Token();
  const token = userToken.Credential;
  const result = await createCommentByAnnouncementIdService({
    content,
    announcementId,
    token,
  });
  revalidateTag("announcements");
  revalidateTag("comments");
  return result;
};

export const editCommentByIdAction = async ({
  content,
  announId,
  commentId,
}) => {

  const userToken = await Token();
  const token = userToken.Credential;
  const result = await editCommentByIdService({
    content,
    announId,
    commentId,
    token,
  });
  revalidateTag("announcements");
  revalidateTag("comments");
  return result;
};

export const deleteCommentByIdAction = async ({ commentId }) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await deleteCommentByIdService({ commentId, token });
  revalidateTag("announcements");
  revalidateTag("comments");
  return result;
};