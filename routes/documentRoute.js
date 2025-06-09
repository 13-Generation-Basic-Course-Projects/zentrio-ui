import { apiConfig } from "@/constant/baseurl";

export const documentRouteGroup = {
  // Basic document operations
  getDocumentById: (id) => `${apiConfig.baseUrl}/documents/${id}`,
  updateDocumentById: (id, accessToken, newName) =>
    `${apiConfig.baseUrl}/documents/${id}?accessToken=${accessToken}&documentName=${newName}`,

  deleteDocumentById: (documentId, accessToken) =>
    `${apiConfig.baseUrl}/documents/${documentId}?accessToken=${accessToken}`,

  // Access control
  makeDocumentPrivate: (id) => `${apiConfig.baseUrl}/documents/${id}/private`,
  makeDocumentPublic: (id) =>
    `${apiConfig.baseUrl}/documents/public-document/${id}`,

  // Create operations

  createDocument: () => `${apiConfig.baseUrl}/documents`,
  shareDocuments: () => `${apiConfig.baseUrl}/documents/share-document`,
  uploadDocumentToBoard: (boardId, accessToken) =>
    `${apiConfig.baseUrl}/documents/boards/${boardId}/?accessToken=${accessToken}`,

  // Get documents (public/private/filters)
  getPublicDocumentsByBoard: (boardId) =>
    `${apiConfig.baseUrl}/documents/public-documents/boards/${boardId}`,
  downloadDocumentByDocumentId: (documentId, accessToken) =>
    `${apiConfig.baseUrl}/documents/download/${documentId}?accessToken=${accessToken}`,
  getAllDocumentsByBoard: (boardId) =>
    `${apiConfig.baseUrl}/documents/boards/${boardId}`,
  getDocumentsByType: (boardId, mineType) =>
    `${apiConfig.baseUrl}/documents/boards/${boardId}/file-type/${mineType}`,
  getDocumentByName: (boardId, name) =>
    `${apiConfig.baseUrl}/documents/boards/${boardId}/document/${name}`,

  getFileByFolderId: (folderId, accessToken) =>
    `${apiConfig.baseUrl}/files/getFileBy-FolderID?accessToken=${accessToken}&folderId=${folderId}`,

  // Create drive file
  createDriveFile: (name, folderId, fileType, accessToken) =>
    `${
      apiConfig.baseUrl
    }/files/create/${fileType}?accessToken=${accessToken}&name=${encodeURIComponent(
      name
    )}&folderId=${folderId}`,
};
