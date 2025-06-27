import { apiConfig } from "@/constant/baseurl";

export const documentRouteGroup = {
  // Basic document operations
  getDocumentById: (id) => `${apiConfig.baseUrl}/documents/${id}`,
  updateDocumentById: (id, accessToken, newName) =>
    `${apiConfig.baseUrl}/documents/${id}?accessToken=${accessToken}&documentName=${newName}`,

  deleteDocumentById: (documentId, accessToken) =>
    `${apiConfig.baseUrl}/documents/${documentId}?accessToken=${accessToken}`,

  // Access control
  makeDocumentPrivate: (documentId, accessToken) =>
    `${apiConfig.baseUrl}/documents/${documentId}/private?accessToken=${accessToken}`,
  makeDocumentPublic: (documentId, accessToken) =>
    `${apiConfig.baseUrl}/documents/public-document/${documentId}?accessToken=${accessToken}`,

  // Create operations
  createDocument: () => `${apiConfig.baseUrl}/documents`,
  shareDocuments: () => `${apiConfig.baseUrl}/documents/share-document`,
  uploadDocumentToBoard: (boardId, accessToken) =>
    `${apiConfig.baseUrl}/documents/boards/${boardId}/?accessToken=${accessToken}`,
  createDriveFile: (name, folderId, fileType, accessToken) =>
    `${apiConfig.baseUrl}/files/create/${fileType}?accessToken=${accessToken}&name=${name}&folderId=${folderId}`,

  // Get documents (public/private/filters)
  getPublicDocumentsByBoard: (boardId) =>
    `${apiConfig.baseUrl}/documents/public-documents/boards/${boardId}`,
  downloadDocumentByDocumentId: (documentId, accessToken) =>
    `${apiConfig.baseUrl}/documents/download/${documentId}?accessToken=${accessToken}`,
  downloadAllFilesAsZip: ({documentId, accessToken}) =>
  `${apiConfig.baseUrl}/documents/download-folder/${documentId}?accessToken=${encodeURIComponent(accessToken)}`,

  getAllDocumentsByBoard: (boardId) =>
    `${apiConfig.baseUrl}/documents/boards/${boardId}`,
  getDocumentsByType: (boardId, mineType) =>
    `${apiConfig.baseUrl}/documents/boards/${boardId}/file-type/${mineType}`,
  getDocumentByName: (boardId, name) =>
    `${apiConfig.baseUrl}/documents/boards/${boardId}/document/${name}`,

  getFileByFolderId: (folderId, accessToken) =>
    `${apiConfig.baseUrl}/files/getFileBy-FolderID?accessToken=${accessToken}&folderId=${folderId}`,

  //new add route
  getAllDocumentByBoardId: (boardId) =>
    `${apiConfig.baseUrl}/documents/boards/${boardId}`,
  postAttactment: (checklistId) =>
    `${apiConfig.baseUrl}/attachments?checklistId=${checklistId}`,
  postAttactment: (checklistId) =>
    `${apiConfig.baseUrl}/attachments?checklistId=${checklistId}`,
  getAttactment: (checklistId) =>
    `${apiConfig.baseUrl}/attachments/checklists/${checklistId}`,
};
