"use server";

import { documentRouteGroup } from "@/routes/documentRoute";
import { headers } from "next/headers";

/*
 * get document by ID
 */
export const fetchDocumentService = async (id, token) => {
  const res = await fetch(documentRouteGroup.getDocumentById(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch document: ${res.status}`);
  }

  return res.json();
};

/*
 * get public documents by board
 */
export const fetchPublicDocumentsService = async (boardId, token) => {
  const res = await fetch(
    documentRouteGroup.getPublicDocumentsByBoard(boardId),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch document: ${res.status}`);
  }

  return res.json();
};

/*
 * get documents by board
 */
export const fetchDocumentsByBoardService = async (boardId, token) => {
  const res = await fetch(
    documentRouteGroup.getAllDocumentsByBoard(boardId), // URL only
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch document: ${res.status}`);
  }

  return res.json();
};

/*
 * delete document by ID
 */

export const deleteDocumentService = async (id, token) => {
  const res = await fetch(documentRouteGroup.deleteDocumentById(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete document: ${res.status}`);
  }

  return res.json();
};

/*
 * (create) new document
 */

export const createDocumentService = async (data, token) => {
  const res = await fetch(documentRouteGroup.createDocument(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to create document: ${res.status}`);
  }

  return res.json();
};
