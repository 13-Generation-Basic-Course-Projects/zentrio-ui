"use server";

import { Token } from "@/constant/token";
import { createDocumentService, deleteDocumentService, fetchDocumentsByBoardService } from "@/service/document.service";

// Get
export const getDocumentsByBoardAction = async (boardId) => {
  const userToken = await Token();
  const token = userToken.Credential;

  
  const documents = await fetchDocumentsByBoardService(boardId, token);

  return documents;
};

// Create
export const createFolderAction = async (data) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const folder = await createDocumentService(data, token);
  return folder;
}

// Delete
export const deleteDocumentAction = async (documentId) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const document = await deleteDocumentService(documentId, token);

  return document;
}