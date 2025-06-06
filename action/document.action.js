"use server";

import { Token } from "@/constant/token";
import {
  createDocumentByUploadService,
  createDocumentService,
  deleteDocumentService,
  fetchDocumentsByBoardService,
  getFileByFolderIdService,
} from "@/service/document.service";

// Get
export const getDocumentsByBoardAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const documents = await fetchDocumentsByBoardService(boardId, token);

  return documents;
};

// Get file by folder id
export const getFileByFolderIdAction = async (accessToken, folderId) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const files = await getFileByFolderIdService({
    accessToken,
    folderId,
    token,
  });

  return files;
};

// Create
export const createFolderAction = async (data) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const folder = await createDocumentService(data, token);
  return folder;
};

export const createDocumentByUploadAction = async (formData, boardId) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const document = await createDocumentByUploadService(
    formData,
    boardId,
    token
  );
  return document;
};

// Delete
export const deleteDocumentAction = async (accessToken, documentId) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const document = await deleteDocumentService({
    accessToken,
    documentId,
    token,
  });

  return document;
};
