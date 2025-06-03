import { apiConfig } from "@/constant/baseurl";

export const documentRoute = {
  // Basic document operations
  getDocumentById: (id) => `${apiConfig.baseUrl}/documents/${id}`,
  updateDocumentById: (id) => `${apiConfig.baseUrl}/documents/${id}`,
  deleteDocumentById: (id) => `${apiConfig.baseUrl}/documents/${id}`,

  // Access control
  makeDocumentPrivate: (id) => `${apiConfig.baseUrl}/documents/${id}/private`,
  makeDocumentPublic: (id) => `${apiConfig.baseUrl}/documents/public-document/${id}`,

  // Create operations
  createDocument: () => `${apiConfig.baseUrl}/documents`,
  shareDocuments: () => `${apiConfig.baseUrl}/documents/share-document`,
  uploadDocumentToBoard: (boardId) => `${apiConfig.baseUrl}/documents/boards/${boardId}`,

  // Get documents (public/private/filters)
  getPublicDocumentsByBoard: (boardId) => `${apiConfig.baseUrl}/documents/public-documents/boards/${boardId}`,
  getAllDocumentsByBoard: (boardId) => `${apiConfig.baseUrl}/documents/boards/${boardId}`,
  getDocumentsByType: (boardId, mineType) => `${apiConfig.baseUrl}/documents/boards/${boardId}/file-type/${mineType}`,
  getDocumentByName: (boardId, name) => `${apiConfig.baseUrl}/documents/boards/${boardId}/document/${name}`,
}