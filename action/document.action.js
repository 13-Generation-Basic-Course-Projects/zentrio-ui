"use server";

import { Token } from "@/constant/token";
import {
  createDocumentByUploadService,
  createDocumentService,
  createDriveFileService,
  deleteDocumentService,
  downloadDocumentByDocumentIdService,
  fetchDocumentsByBoardService,
  getFileByFolderIdService,
  updateDocumentNameByIdService,
} from "@/service/document.service";
import { revalidatePath } from "next/cache";

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

// Download document
export const downloadDocumentByDocumentIdAction = async (
  documentId,
  accessTokenFromGoogle
) => {
  const userToken = await Token();
  const token = userToken.Credential;

  // Only return the blob and filename - NO browser download code
  const { blob, fileName } = await downloadDocumentByDocumentIdService({
    documentId,
    accessToken: accessTokenFromGoogle,
    token,
  });

  return { blob, fileName }; // Just return data
};

// Create
export const createFolderAction = async (data) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("post pending data", data);
  const folder = await createDocumentService(data, token);
  return folder;
};

// Create
export const createFileAction = async ({
  name,
  mimeType,
  boardId,
  token: tokenFromGoogle,
}) => {
  try {
    const userToken = await Token(); // get your backend token
    const token = userToken.Credential;
    revalidatePath("/document");

    const data = {
      accessToken: tokenFromGoogle, // optional, if needed
      folderName: name,
      types: mimeType,
      boardId: boardId,
    };

    const createdDocument = await createDocumentService(data, token);

    return createdDocument;
  } catch (error) {
    console.error("Error creating file:", error);
    throw error;
  }
};

// Create
export const createDocumentByUploadAction = async (
  formData,
  boardId,
  tokenFromGoogle
) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const document = await createDocumentByUploadService(
    formData,
    boardId,
    token,
    tokenFromGoogle
  );
  return document;
};

export const createDriveFileAction = async (
  name,
  folderId,
  fileType,
  tokenFromGoogle
) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const document = await createDriveFileService(
    name,
    folderId,
    fileType,
    token,
    tokenFromGoogle
  );
  return document;
};

// Delete
export const deleteDocumentAction = async (accessToken, documentId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log("object1", documentId);
  const document = await deleteDocumentService({
    accessToken,
    documentId,
    token,
  });

  return document;
};

// Update
export const updateDocumentNameByIdAction = async (
  documentId,
  newName,
  tokenFromGoogle
) => {
  console.log("tokekkek", tokenFromGoogle);
  const userToken = await Token();
  const token = userToken.Credential;
  revalidatePath("/document");

  const updated = await updateDocumentNameByIdService(
    documentId,
    newName,
    token,
    tokenFromGoogle
  );
  return updated;
};
