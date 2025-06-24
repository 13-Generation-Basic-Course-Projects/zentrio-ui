"use server";

import { Token } from "@/constant/token";
import {
  createDocumentByUploadService,
  createDocumentService,
  createDriveFileService,
  deleteDocumentService,
  downloadAllFilesAsZipService,
  downloadDocumentByDocumentIdService,
  fetchDocumentsByBoardService,
  fetchPublicDocumentsService,
  getAllDocumentByBoardIdSerivce,
  getAttactmentService,
  getFileByFolderIdService,
  postAttactmentService,
  privateDocumentByIdService,
  publicDocumentByIdService,
  updateDocumentNameByIdService,
  uploadDocumentToFolderServie,
} from "@/service/document.service";
import { revalidatePath } from "next/cache";

// Get
export const getDocumentsByBoardAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const documents = await fetchDocumentsByBoardService(boardId, token);

  return documents;
};

// Get public documents
export const getPublicDocumentsByBoardAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const publicDocuments = await fetchPublicDocumentsService(boardId, token);

  return publicDocuments;
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

  revalidatePath("/document");

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

// Download as zip action
export const downloadAllFilesAsZipAction = async (
  {documentId,
  accessToken}
) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const { blob, filename } = await downloadAllFilesAsZipService({
    documentId,
    accessToken,
    token,
  });

  revalidatePath("/docu");
  return { blob, filename };
};

// Create
export const createFolderAction = async (
  accessTokenFromGoogle,
  name,
  types,
  boardId
) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const folderData = {
    accessToken: accessTokenFromGoogle,
    folderName: name,
    types, // e.g. "FOLDER"
    boardId,
  };

  console.log("Payload to service:", folderData);

  const folder = await createDocumentService(folderData, token);

  revalidatePath("/document");
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

    const data = {
      accessToken: tokenFromGoogle, // optional, if needed
      folderName: name,
      types: mimeType,
      boardId: boardId,
    };

    const createdDocument = await createDocumentService(data, token);
    revalidatePath("/document");
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
  revalidatePath("/document");
  return document;
};

// Upload to folder action
export const uploadDocumentToFolderAction = async (
  file,
  folderId,
  tokenFromGoogle
) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const document = await uploadDocumentToFolderServie(
    file,
    folderId,
    token,
    tokenFromGoogle
  );
  revalidatePath("/document");

  return document;
};

export const createDriveFileAction = async ({
  name,
  folderId,
  fileType,
  token: tokenFromGoogle,
}) => {
  try {
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
  } catch (error) {
    console.error("Error creting file: ", error);
    throw error;
  }
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

  revalidatePath("/docu");
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

  const updated = await updateDocumentNameByIdService(
    documentId,
    newName,
    token,
    tokenFromGoogle
  );
  revalidatePath("/docu");
  return updated;
};

// public document (update)
export const publicDocumentByIdAction = async (documentId, tokenFromGoogle) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const updated = await publicDocumentByIdService(
    documentId,
    token,
    tokenFromGoogle
  );
  revalidatePath("/docu");
  return updated;
};

// Private document (update)
export const privateDocumentByIdAction = async (
  documentId,
  tokenFromGoogle
) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const updated = await privateDocumentByIdService(
    documentId,
    token,
    tokenFromGoogle
  );
  revalidatePath("/docu");
  return updated;
};

/* new add
 * get all document by board id
 */
export const getAllDocumentByBoardIdAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const getAllDocument = await getAllDocumentByBoardIdSerivce({
    boardId,
    token,
  });
  console.log("Get all doucemnt action : ", getAllDocument);
  return getAllDocument;
};
/* new add
 * post attactment
 */
export const postAttactmentAction = async (checklistId, details) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await postAttactmentService({
    checklistId,
    details,
    token,
  });
  console.log("Get all attachments action : ", result);
  revalidatePath("/docu");
  return result;
};
/* new add
 * get attactment
 */
export const getAttactmentAction = async (checklistId) => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await getAttactmentService({
    checklistId,
    token,
  });
  console.log("Get all attachments action : ", result);
  return result;
};
///
